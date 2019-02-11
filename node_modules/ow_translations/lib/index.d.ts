import { TranslationOrg, TranslationFiles, TranslationEnum, TranslationFile, TranslationOverrideFile } from "./Types";
/**
 * Get a list of the possible Translations for a given org
 */
export declare function possibleTranslationsForOrg(orgId: TranslationOrg): TranslationEnum[];
/**
 * This is the root translations file.
 *
 * Include this to get the magical translations working.
 *
 * In this class, we pull in the common translations, and override any
 * values for the given orgId if they exist.
 */
export declare function translationsForTranslationOrg(orgId: TranslationOrg): TranslationFiles;
/**
 * Get the translations for the given user language setting
 *
 * I'm thinking of a better way to do this with less typing, but at least
 * this method is fully type safe
 */
export declare function getTranslationForLanguage(files: TranslationFiles, language: TranslationEnum): TranslationFile;
/**
 * Tools for saving and parsing translations as json
 */
export declare const functionReplacer: (name: any, val: any) => any;
export declare const functionReviver: (name: any, val: any) => any;
export declare function translationFromJSON(jsonString: string): TranslationFiles;
export { TranslationOrg, TranslationFiles, TranslationEnum, TranslationFile, TranslationOverrideFile, };
