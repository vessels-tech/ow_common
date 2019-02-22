import { Resource, PendingResource } from "./Resource";
import { PendingReading } from "./Reading";
import { TranslationEnum } from "ow_translations";
import { DictType } from "../utils/DictType";
import UserStatus from "../enums/UserStatus";
import UserType from "../enums/UserType";


export type User = {
  id: string;
  favouriteResources: DictType<Resource>,
  pendingSavedReadings: PendingReading[],
  pendingSavedResources: PendingResource[],
  recentResources: Resource[],
  recentSearches: string[],
  status: UserStatus,
  translation: TranslationEnum,
  type: UserType,
}

export const DefaultUser: User = {
  id: 'no_user_id', 
  favouriteResources: {},
  pendingSavedReadings: [],
  pendingSavedResources: [],
  recentResources: [],
  recentSearches: [],
  status: UserStatus.Unapproved,
  translation: TranslationEnum.en_AU,
  type: UserType.User,
}