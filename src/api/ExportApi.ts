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
    
    return readings.reduce((acc, curr) => {
      return acc + this.formatReading(curr, format) + '\n'
    },'')
  }

  public static formatReading(reading: Reading, format: ExportFormat): string {
    let separator = ",";
    if (format === ExportFormat.TSV) {
      separator = '\t';
    }

    const eligibleKeys = [
      'id',
      'datetime',
      'resourceId',
      'resourceType',
      'timeseriesId',
      'value',

      //Mywell fields:
      'image',
      'location',
    ];

    const formatted = eligibleKeys.reduce((acc, curr) => {
      return acc + safeGet(curr, reading) + separator;
    }, '');

    return formatted;
  }



}