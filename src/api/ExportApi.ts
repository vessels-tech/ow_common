import { Reading } from "../model";
import { isNullOrUndefined } from "util";


export enum ExportFormat {
  TSV='TSV',
  CSV='CSV',
}


/**
 * Saftely get a ket from the resource
 */
function safeGet(key: string, reading: Reading): string {

  // TODO: handle nested values
  //@ts-ignore
  let value: any = reading[key];
  if (isNullOrUndefined(value)) {
    return "";
  }

  return `${value}`;
}

export class ExportApi {

  public static readingsToExport(readings: Reading[], format: ExportFormat): string {
    return readings.reduce((acc, curr) => acc + this.formatReading(curr, format) + '\n','')
  }

  public static formatReading(reading: Reading, format: ExportFormat): string {
    let separator = ",";
    if (format === ExportFormat.TSV) {
      separator = '\t';
    }

    const eligibleKeys: Array<{id: string, accessor: (id: string) => string}> = [
      {id: 'id', accessor: (id: string) => safeGet(id, reading) }, 

      //Handle legacy timestamps from Firestore
      {id: 'datetime', accessor: (id: string) => {
        //@ts-ignore
        let dateRaw: any = reading[id];
        if (isNullOrUndefined(dateRaw)) {
          return "";
        }

        // @ts-ignore
        if (dateRaw.toDate) {
          // @ts-ignore
          const jsDate: Date = dateRaw.toDate();
          return jsDate.toISOString()
        }

        return dateRaw;
      }}, 
      {id: 'resourceId', accessor: (id: string) => safeGet(id, reading) }, 
      {id: 'resourceType', accessor: (id: string) => safeGet(id, reading) }, 
      {id: 'timeseriesId', accessor: (id: string) => safeGet(id, reading) }, 
      {id: 'value', accessor: (id: string) => safeGet(id, reading) }, 

      //Mywell fields:
      { id: 'image', accessor: (id: string) => safeGet(id, reading) }, 
      { id: 'location', accessor: (id: string) => safeGet(id, reading) }, 
    ];

    const formatted = eligibleKeys.reduce((acc, curr) => {
      return acc + curr.accessor(curr.id) + separator;
    }, '');

    return formatted;
  }



}