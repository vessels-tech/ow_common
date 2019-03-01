// import { SomeResult, makeError, makeSuccess, ResultType, ErrorResult } from "../utils/AppProviderTypes";
import * as admin from "firebase-admin";
import { DocumentSnapshot, CollectionReference, QueryDocumentSnapshot, QuerySnapshot } from "@google-cloud/firestore";
import { Reading, DefaultReading } from "../model";
import { SomeResult, safeLower, makeSuccess, makeError, ErrorResult, ResultType } from "../utils";

type Firestore = admin.firestore.Firestore;


export type ReadingPageParams = {
  lastVisible?: DocumentSnapshot,
  limit: number,
}

export type ReadingResult = {
  readings: Reading[],
  params: ReadingPageParams
}

export class ReadingApi {
  private firestore: Firestore;
  private orgId: string;


  constructor(firestore: Firestore, orgId: string) {
    this.firestore = firestore;
    this.orgId = orgId;
  }


  /**
   * getReadingsForResources
   * 
   * Given a list of resourceIds, get all of the readings for the resources up to 
   * a limit of n (params.limit). Implementing this limit will be tricky as Firestore
   * doesn't currently support OR queries, meaning that we will have to merge and keep
   * track of of cursors for each id.
   * 
   * For now gets the latest n readings for the given resources, but if needed we 
   * may add the ability to filter by date. Also ignores the lastVisible, as we 
   * can't really implement paginiation across multiple queries very easily atm.
   * 
   * This also wont respect date ordering from one resource to another, as the individual 
   * date queries are merged together.
   * 
   * @param resourceIds 
   * @param params 
   */
  async getReadingsForResources(resourceIds: string[], params: ReadingPageParams): Promise<SomeResult<ReadingResult>> {

    //Hard rules because of firebase restrictions
    delete params.lastVisible;
    params.limit = 100;

    const readingsResults = await Promise.all(resourceIds.map(id => this.getReadingsForResourceId(id, params)));
    let readings: Reading[] = [];
    const errors: ErrorResult[] = [];
    readingsResults.forEach(result => {
      if (result.type === ResultType.ERROR) {
        errors.push(result);
        return;
      }

      readings = readings.concat(result.result.readings);
    });

    if (errors.length > 0) {
      const message = errors.reduce((acc, curr) => acc + " " + curr.message, "Multiple Errors:");
      return makeError(message);
    }

    return makeSuccess({
      params,
      readings,
    });
  }


  /**
   * getReadingsForResourceId
   *
   * Given a resourceId, get all of the readings for the resources up to
   * a limit of n (params.limit)
   * 
   * For now gets the latest n readings for the given resources, but if needed we
   * may add the ability to filter by date
   *
   * @param resourceId
   * @param params
   */
  async getReadingsForResourceId(resourceId: string, params: ReadingPageParams): Promise<SomeResult<ReadingResult>> {

    let query: any = this.readingCol()
    .where(`resourceId`, '==', resourceId)

    //I think these results will be ordered, since the readingIds are ordered inherently, but here:
    .orderBy('datetime', 'desc');

    if (params.lastVisible) {
      query = query.startAfter(params.lastVisible);
    }
    query = query.limit(safeLower(params.limit, 100));

    //Run the query
    let lastVisible: QueryDocumentSnapshot;
    return await query.get()
    .then((sn: QuerySnapshot) => {
      const readingResults: Reading[] = [];
      lastVisible = sn.docs[sn.docs.length - 1];

      sn.forEach(doc => {
        const data = doc.data();
        if (!data) {
          return;
        }
        
        const reading: Reading = {
          ...DefaultReading,
          ...data,
          //TODO: deserialize here.
        };
        readingResults.push(reading);
      });

      return readingResults;
    })
    .then((readings: Reading[]) => {
      const readingResult: ReadingResult = {
        params: {
          ...params,
          lastVisible,
        },
        readings,
      };

      return makeSuccess(readingResult);
    })
    .catch((err: Error) => makeError(err.message));
  }


  public readingCol(): CollectionReference {
    return this.firestore.collection('org').doc(this.orgId).collection('reading');
  }

}