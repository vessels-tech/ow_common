import { Resource, PendingResource } from "./Resource";
import { PendingReading } from "./Reading";
import { TranslationEnum } from "ow_translations";
import DictType from "../utils/DictType";
import UserStatus from "../enums/UserStatus";


export type User = {
  id: string;
  recentResources: Resource[],
  favouriteResources: DictType<Resource>,
  pendingSavedReadings: PendingReading[],
  pendingSavedResources: PendingResource[],
  recentSearches: string[],
  translation: TranslationEnum,
  status: UserStatus,

}

export const DefaultUser: User = {
  id: 'no_user_id', 
  status: UserStatus.Unapproved,
  recentResources: [],
  favouriteResources: {},
  pendingSavedReadings: [],
  pendingSavedResources: [],
  recentSearches: [],
  translation: TranslationEnum.en_AU,
}