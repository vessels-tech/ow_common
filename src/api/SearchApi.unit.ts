import 'mocha';
import * as assert from 'assert';
//@ts-ignore
import MockFirestore from 'mock-cloud-firestore';
import { SearchApi } from './SearchApi';
import { unsafeUnwrap } from '../utils/AppProviderTypes';
// import { DefaultUser, User } from '../model/User';
// import { Resource, ResourceType } from '../model/Resource';
// import { unsafeUnwrap } from '../utils/AppProviderTypes';
// import UserStatus from '../enums/UserStatus';
// import UserType from '../enums/UserType';
// import { admin } from '../test/TestFirebase';
// type Firestore = admin.firestore.Firestore;

// const {
//   orgId,
// } = require('../test/testConfig.json');

describe('Search Api', function () {

  it.only('transforms shortId strings into valid shortId lookup ranges', () => {

    const inputs = [
      "100-000",
      "100--000",
      "100 100 000 ",
      "100",
      "1001",
      "00010001",
    ];
    const expected = [
      ["000100000", "000100000"],
      ["000100000", "000100000"],
      ["100100000", "100100000"],
      ["000100000", "000101000"],
      ["000100100", "000100200"],
      ["000100010", "000100020"],
    ]

    inputs.forEach((input, idx) => assert.deepEqual(
      unsafeUnwrap(SearchApi.rangeFromShortIdString(input)), 
      expected[idx]
    ));
    // inputs.forEach((input, idx) => console.log(SearchApi.rangeFromShortIdString(input), expected[idx]));
  });


});