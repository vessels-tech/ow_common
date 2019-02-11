import { FirestoreDoc } from "../utils/FirestoreDoc";
import { DocumentData, Firestore } from "@google-cloud/firestore";
import DocNames from "../enums/DocNames";


//TODO: should this be a generic enum? or defined per type?
export enum ReadingType {
  Any = 'Any',
  MyWell = 'MyWell',
  GGMN = 'GGMN',
}


export type AnyReading = Reading | MyWellReading | GGMNReading;
export type Reading = {
  type: ReadingType.Any;
  datetime: string; //iso formatted string
  value: number;
};

export type MyWellReading = {
  type: ReadingType.MyWell;
  datetime: string; //iso formatted string
  value: number;
  isLegacy: boolean, 
}

export type GGMNReading = {
  type: ReadingType.GGMN,
  datetime: string; //iso formatted string
  value: number;
  secretField: number,
}


// const mywellReading: AnyReading = {
//   type: ReadingType.MyWell,
//   isLegacy: false,
//   datetime: "12345",
//   value: 10,
// }

// const myWellReadingDoc = new ReadingDoc(mywellReading);
// myWellReadingDoc.create()

// const getTheDoc = async () => {
//   const doc: FirestoreDoc<MyWellReading> = await ReadingDoc.get<MyWellReading>(firestore, 'mywell', "1234");
//   const myReading: MyWellReading = doc.underlyingProps();
// }

