import ResourceStationType from "../enums/ResourceStationType";

export enum ResourceType {
  Any = 'Any',
  MyWell = 'MyWell',
  GGMN = 'GGMN',
}

export type Resource = BaseResource | MyWellResource | GGMNResource;

export type BaseResource = {
  type: ResourceType;

  id: string,
  coords: { latitude: number, longitude: number},
  timeseries: any, //TODO: figure out timeseries...
}

type MyWellResourceProps = {
  type: ResourceType.MyWell,
  legacyId: string,
  owner: {name: string},
  resourceType: ResourceStationType,
  lastValue: number,
  lastReadingDatetime: Date,
}

type GGMNResourceProps = {
  type: ResourceType.GGMN,

  description: string,
  title: string,
  name: string,
  groundwaterStationId: string,
  waterColumnHeight: number,
}


export type MyWellResource = BaseResource & MyWellResourceProps;
export type GGMNResource = BaseResource & GGMNResourceProps;

/**
 * Pending Types
 *
 * Represents an incomplete or pending version of Resource
 */
export type PendingResource = BasePendingResource | PendingMyWellResource | PendingGGMNResource;

export type BasePendingResource = {
  pending: true,

  pendingId: string,
  coords: { latitude: number, longitude: number },
  timeseries: any,
}

export type PendingMyWellResource = BasePendingResource & MyWellResourceProps
export type PendingGGMNResource = BasePendingResource & GGMNResourceProps