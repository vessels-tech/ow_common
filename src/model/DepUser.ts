import { PendingReading } from "./Reading";
import UserStatus from "../enums/UserStatus";
import { TranslationEnum } from "ow_translations";
import { Resource } from "./Resource";


/**
 * We are migrating to new types.
 * 
 * Instead of rewriting them all at once, we are are gradually
 * consolidating them properly here. 
 * 
 * TODO: Remove all uses of DepUser in favour of a redefined User type
 */

export type DepUser = {
  userId: string,
  recentResources: Resource[],
  favouriteResources: AnyResource[],
  pendingSavedReadings: PendingReading[],
  pendingSavedResources: PendingResource[],
  recentSearches: string[],
  translation: TranslationEnum,
  mobile: string | null,
  email: string | null,
  name: string | null,
  nickname: string | null,
  status: UserStatus,
}