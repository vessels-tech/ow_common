import { TranslationRowType } from "./parser";
import { TranslationEnum } from "./Types";
export declare function fileForTranslations(translationEnum: TranslationEnum, translations: {
    [index: string]: [string, TranslationRowType];
}): string;
export declare function fileForOverrides(translationOrg: string, translationEnum: TranslationEnum, translations: {
    [index: string]: [string, TranslationRowType];
}): string;
