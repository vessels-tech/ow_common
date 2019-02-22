import 'mocha';
import * as assert from 'assert';
//@ts-ignore
import MockFirestore from 'mock-cloud-firestore';
import { SearchApi, SearchPageParams } from './SearchApi';
import { unsafeUnwrap } from '../utils/AppProviderTypes';
// import { DefaultUser, User } from '../model/User';
// import { Resource, ResourceType } from '../model/Resource';
// import { unsafeUnwrap } from '../utils/AppProviderTypes';
// import UserStatus from '../enums/UserStatus';
// import UserType from '../enums/UserType';
import { admin } from '../test/TestFirebase';
import { DefaultShortId } from '../model';
type Firestore = admin.firestore.Firestore;

const {
  orgId,
} = require('../test/testConfig.json');

describe.only('Search Api', function () {
  this.timeout(5000);

  const firestore: Firestore = new MockFirestore({}).firestore();
  const searchApi = new SearchApi(firestore, orgId);

  this.beforeAll(async () => {
    //TODO: Add a bunch of shortIds
    await SearchApi.shortIdCol(firestore, orgId).doc("000100001").set({ ...DefaultShortId, id: '000100001', shortId: '000100001'});
    await SearchApi.shortIdCol(firestore, orgId).doc("000100002").set({ ...DefaultShortId, id: '000100002', shortId: '000100002'});
    await SearchApi.shortIdCol(firestore, orgId).doc("000100003").set({ ...DefaultShortId, id: '000100003', shortId: '000100003'});
    await SearchApi.shortIdCol(firestore, orgId).doc("000100004").set({ ...DefaultShortId, id: '000100004', shortId: '000100004'});
  });


  it('transforms shortId strings into valid shortId lookup ranges', () => {
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
    ];

    inputs.forEach((input, idx) => assert.deepEqual(
      unsafeUnwrap(SearchApi.rangeFromShortIdString(input)), 
      expected[idx]
    ));
  });

  it('performs a basic search', async () => {
    //Arrange
    const shortId = "100-001";

    //Act
    const result = unsafeUnwrap(await searchApi.searchByShortId(shortId, {limit: 10}));

    //Assert
    assert.equal(result.results.length, 1);
  });

  it('performs a paginated search', async () => {
    //Arrange
    //This test assumes onlt 4 shortIds
    const query = "100";
    let searchParams: SearchPageParams = { limit: 3 };

    //Act
    const searchResultA = unsafeUnwrap(await searchApi.searchByShortId(query, searchParams));
    searchParams = searchResultA.params;
    const searchResultB = unsafeUnwrap(await searchApi.searchByShortId(query, searchParams));

    //Assert
    assert.equal(searchResultA.results.length, 3);
    assert.equal(searchResultB.results.length, 1);
  });

  it('Fails to search with an invalid id');
  it('performs a search with no results');

  this.afterAll(async () => {
    await SearchApi.shortIdCol(firestore, orgId).doc("000100001").delete();
    await SearchApi.shortIdCol(firestore, orgId).doc("000100002").delete();
    await SearchApi.shortIdCol(firestore, orgId).doc("000100003").delete();
    await SearchApi.shortIdCol(firestore, orgId).doc("000100004").delete();
  });


});