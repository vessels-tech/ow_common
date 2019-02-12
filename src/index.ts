

import { UserApi } from './api/';
// import {
//   Docnames,
//   ResourceStationType,
//   UserStatus,
//   UserType,
// } from './enums';

import * as enums from './enums';

const Api = {
  UserApi
};


// export namespace Enums {
//   Docnames
//   ResourceStationType
//   UserStatus
//   UserType
// }

const Enums = {
  ...enums
}

export default {
  Api,
  Enums,
};