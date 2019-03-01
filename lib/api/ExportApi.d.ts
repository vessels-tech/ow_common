import { Reading } from "../model";
export declare enum ExportFormat {
    TSV = "TSV",
    CSV = "CSV"
}
export declare class ExportApi {
    static readingsToExport(readings: Reading[], format: ExportFormat): string;
    static formatReading(reading: Reading, format: ExportFormat): string;
}
