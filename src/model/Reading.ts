import { FirestoreDoc } from "../utils/FirestoreDoc";
import { DocumentData, Firestore } from "@google-cloud/firestore";
import DocNames from "../enums/DocNames";
import { MyWellExternalIds } from "./ExternalIds";
import { Maybe } from "../utils/Maybe";
import { ReadingDoc } from "./ReadingDoc";
import ResourceStationType from "../enums/ResourceStationType";


export enum ReadingType {
  Any = 'Any',
  MyWell = 'MyWell',
  GGMN = 'GGMN',
}


export type Reading =  BaseReading | MyWellReading | GGMNReading;
export type BaseReading = {
  type: ReadingType;

  datetime: string; //iso formatted string
  resourceId: string;
  resourceType: ResourceStationType
  timeseriesId: string,
  value: number;
};

type MyWellReadingProps = {
  type: ReadingType.MyWell;
  isLegacy: boolean,
  externalIds: MyWellExternalIds,
  image: Maybe<{ base64Image: string }>,
  location: Maybe<{
    latitude: number,
    longitude: number,
  }>,
}

type GGMNReadingProps = {
  type: ReadingType.GGMN,
  resourceType: ResourceStationType.well,
}

export type MyWellReading = BaseReading & MyWellReadingProps;
export type GGMNReading = BaseReading & GGMNReadingProps;


/**
 * Pending Types
 * 
 * Represents an incomplete or pending version of Reading
 */
export type PendingReading = BasePendingReading | PendingMyWellReading | PendingGGMNReading;

export type BasePendingReading = {
  pending: true,

  datetime: string; //iso formatted string
  resourceId: Maybe<string>;
  resourceType: ResourceStationType,
  timeseriesId: Maybe<string>,
  value: number;
}

//TODO: this doesn't generalize well - it doesn't allow for missing values properly in the
//MyWell and GGMN reading props
export type PendingMyWellReading = BasePendingReading & MyWellReadingProps;
export type PendingGGMNReading = BasePendingReading & GGMNReadingProps;


// const mywellReading: AnyReading = {
//   type: ReadingType.MyWell,
//   isLegacy: false,
//   datetime: "12345",
//   value: 10,
//   resourceId: "213",
//   resourceType: ResourceType.well,
//   timeseriesId: "1234",
// };


// const myWellReadingDoc = new ReadingDoc(mywellReading);
// myWellReadingDoc.create()

// const getTheDoc = async () => {
//   const doc: FirestoreDoc<MyWellReading> = await ReadingDoc.get<MyWellReading>(firestore, 'mywell', "1234");
//   const myReading: MyWellReading = doc.underlyingProps();
// }

