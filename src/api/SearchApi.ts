
import { SomeResult, makeError, makeSuccess } from "../utils/AppProviderTypes";
// import DictType from "../utils/DictType";
// import { User, DefaultUser } from "../model/User";
// import UserStatus from "../enums/UserStatus";
// import UserType from "../enums/UserType";
import { leftPad, rightPad }  from '../utils/StringUtils';
import * as admin from "firebase-admin";
import { CollectionReference } from "@google-cloud/firestore";
type Firestore = admin.firestore.Firestore;


export type SearchPageParams = {

}

export type SearchResult = PartialResourceResult;
export type PartialResourceResult = {
  id: string,
}



export class SearchApi { 
  firestore: Firestore;
  orgId: string;


  constructor(firestore: Firestore, orgId: string) {
    this.firestore = firestore;
    this.orgId = orgId;
  }


  /**
   * searchByShortId
   * 
   * Search for a resource given a 
   * 
   * @param shortId: string - a 6 digit or 9 digit shortId
   * @param params: SearchPageParams - params for pagination and limiting etc.
   * @returns Promise<SomeResult<SearchResult>> - PartialResourceResult
   */
  public async searchByShortId(shortId: string, params: SearchPageParams): Promise<SomeResult<Array<SearchResult>>> {

    //TODO: figure out what a partial resource result looks like.



    return Promise.resolve(makeError<Array<SearchResult>>("Oh no!"));
  }


  //
  // Helpers
  // ------------------------------------

  public shortIdCol(orgId: string): CollectionReference {
    return this.firestore.collection('org').doc(orgId).collection('shortId');
  }


  /**
   * rangeFromShortIdString
   * 
   * 
   * Transform the shortId or shortId partial into a searchable string. For example:
   * 
   *   100-000  -> 000100000, 000100000 | exactly id 000-100-000
   *   100      -> 000100000, 000101000 | any shortId starting with 000-100
   *   1001     -> 000100100, 000100200 | Any short id between 000-100-100 and 000-100-200
   *   00010001 -> 000100010, 000100020 | Any short id between 000-100-010 and 000-100-020
   * 
   * 
   * @param shortId: shortId string or partial string
   * @returns SomeResult<[string, string]>: the range of strings to search for.
   */
  public static rangeFromShortIdString(shortId: string): SomeResult<[string, string]> {
    let lowerRange: string = "";
    let upperRange: string = "";

    //Strip out all spaces, dashes, etc
    let base = shortId.replace(new RegExp(/[^\d]+/, 'g'), '');

    //Make sure it's within the range
    if (base.length === 0 || base.length > 9) {
      return makeError<[string, string]>("search short id is too long or short");
    }

    //If it's shorter than 6 digits, long, assume we have an extra three 000s at
    //the start. This may break things later on, but only when we have 530,000+ ids
    if (base.length <= 6) {
      base = "000" + base;
    }

    //If we are using a fullId, then just return that id twice
    if (base.length === 9) {
      return makeSuccess<[string, string]>([base, base]);
    }

    //We have a partial short id.
    //This means we need to convert it into a number and add one, then convert
    //back and add any left zeros we may have removed.
    lowerRange = base;
    let lowerNumber
    let upperNumber;
    try {
      lowerNumber = parseInt(lowerRange);
      if (lowerNumber === NaN) {
        throw new Error(`Error parsing shortId base string: ${lowerNumber}`);
      }
      upperNumber = lowerNumber + 1;
      upperRange = upperNumber.toString();
    } catch (err) {
      return makeError<[string, string]>(err.message);
    }

    if (!upperNumber) {
      return makeError<[string, string]>(`Error parsing shortId base string and adding 1: ${lowerNumber}`);
    }

    //Pad the left side of the string to get the leading 00's back
    upperRange = leftPad(upperRange, '0', lowerRange.length);

    //Pad the right hand side to make a 9 digit number
    lowerRange = rightPad(lowerRange, '0', 9);
    upperRange = rightPad(upperRange, '0', 9);


    return makeSuccess<[string, string]>([lowerRange, upperRange]);
  }


}