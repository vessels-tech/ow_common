import 'mocha';
import * as assert from 'assert';
import { UserApi } from './UserApi';
//@ts-ignore
import MockFirestore from 'mock-cloud-firestore';
import { DefaultUser, User } from '../model/User';
import { Resource, ResourceType } from '../model/Resource';
import { unsafeUnwrap } from '../utils/AppProviderTypes';
import UserStatus from '../enums/UserStatus';
import UserType from '../enums/UserType';
import { admin } from '../test/TestFirebase';
type Firestore = admin.firestore.Firestore;

const { 
  orgId,
} = require('../test/testConfig.json');

const defaultResource: Resource = {
  type: ResourceType.Any,
  id: 'resource_1',
  coords: { latitude: 12, longitude: 13 },
  timeseries: {},
}

describe('User Api', function() {

  describe('favourites', async function() {
    const firestore: Firestore = new MockFirestore({}).firestore();
    const userApi = new UserApi(firestore, orgId);
    const userId = 'user_id_1';
    
    this.beforeEach(async () => {
      await userApi.userRef(orgId, userId).set(DefaultUser);
    });

    it('addFavouriteResource adds a favourite resource', async () => {
      //Arrange
      //Act 
      const addFavResult = await userApi.addFavouriteResource(userId, defaultResource);
      unsafeUnwrap(addFavResult);
      const favouriteResources = unsafeUnwrap(await userApi.getFavouriteResources(userId));

      //Assert
      assert.deepEqual({resource_1: defaultResource}, favouriteResources);
    });

    it('removeFavouriteResource removes a favourite resource', async () => {
      //Arrange
      const addFavResult = await userApi.addFavouriteResource(userId, defaultResource);
      unsafeUnwrap(addFavResult);

      //Act
      const removeFavResult = await userApi.removeFavouriteResource(userId, defaultResource.id);
      unsafeUnwrap(removeFavResult);
      const favouriteResources = unsafeUnwrap(await userApi.getFavouriteResources(userId));

      //Assert
      assert.deepEqual(favouriteResources, {});

    });

    this.afterEach(async () => {
      await userApi.userRef(orgId, userId).delete();
    });
  });

  describe('recents', function() {
    const firestore: Firestore = new MockFirestore({}).firestore();
    const userApi = new UserApi(firestore, orgId);
    const userId = 'user_id_1';
    const expectedResources = [
      { ...defaultResource, id: '1' },
      { ...defaultResource, id: '2' },
      { ...defaultResource, id: '3' },
    ];

    this.beforeEach(async () => {
      const defaultUser: User = {
        ...DefaultUser,
        recentResources: expectedResources,
      };
      await userApi.userRef(orgId, userId).set(defaultUser);
    });


    it('getRecentResources gets the most recent resources', async () => {
      //Arrange
      //Act
      const actual = unsafeUnwrap(await userApi.getRecentResources(userId));

      //Assert
      assert.deepEqual(actual, expectedResources)
    });

    this.afterEach(async () => {
      await userApi.userRef(orgId, userId).delete();
    });
  });

  describe('changeUserStatus', function() {
    const firestore: Firestore = new MockFirestore({}).firestore();
    const userApi = new UserApi(firestore, orgId);
    const userId = 'user_id_1';

    this.beforeEach(async () => {
      await userApi.userRef(orgId, userId).set(DefaultUser);
    });

    it('approves a user', async () => {
      //Arrange
      const expected: UserStatus = UserStatus.Approved;

      //Act
      unsafeUnwrap(await userApi.changeUserStatus(userId, UserStatus.Approved));
      const user = unsafeUnwrap(await userApi.getUser(userApi.userRef(orgId, userId)));
      const actual = user.status;

      //Assert
      assert.equal(actual, expected);
    });

    it('rejects a user', async () => {
      //Arrange
      const expected: UserStatus = UserStatus.Rejected;

      //Act
      unsafeUnwrap(await userApi.changeUserStatus(userId, UserStatus.Rejected));
      const user = unsafeUnwrap(await userApi.getUser(userApi.userRef(orgId, userId)));
      const actual = user.status;

      //Assert
      assert.equal(actual, expected);
    });

    this.afterEach(async () => {
      await userApi.userRef(orgId, userId).delete();
    });
  });

  describe('change user type', function() {
    const firestore: Firestore = new MockFirestore({}).firestore();
    const userApi = new UserApi(firestore, orgId);
    const userId = 'user_id_1';

    this.beforeEach(async () => {
      await userApi.userRef(orgId, userId).set(DefaultUser);
    });


    it('elevates a user to Admin', async () => {
      //Arrange
      const expected: UserType = UserType.Admin;

      //Act
      unsafeUnwrap(await userApi.changeUserType(userId, expected));
      const user = unsafeUnwrap(await userApi.getUser(userApi.userRef(orgId, userId)));
      const actual = user.type;

      //Assert
      assert.equal(actual, expected);
    });

    it('demotes a user to User', async () => {
      //Arrange
      const expected: UserType = UserType.User;
      unsafeUnwrap(await userApi.changeUserType(userId, UserType.Admin));

      //Act
      unsafeUnwrap(await userApi.changeUserType(userId, UserType.User));

      //Assert
      const user = unsafeUnwrap(await userApi.getUser(userApi.userRef(orgId, userId)));
      const actual = user.type;
      assert.equal(actual, expected);
    });

    this.afterEach(async () => {
      await userApi.userRef(orgId, userId).delete();
    });
  });


  describe('new resource add/delete', function() {
    const firestore: Firestore = new MockFirestore({}).firestore();
    const userApi = new UserApi(firestore, orgId);
    const userId = 'user_id_1';

    this.beforeEach(async () => {
      await userApi.userRef(orgId, userId).set(DefaultUser);
    });

    it('adds new resource ids to the user', async () => {
      //Arrange
      const resourceIds = ["00001", "00002", "00003", "00004", "00005"];

      //Act
      unsafeUnwrap(await userApi.markAsNewResources(userId, resourceIds));

      //Assert
      const newResources = unsafeUnwrap(await userApi.getNewResources(userId));
      assert.equal(Object.keys(newResources).length, resourceIds.length);
    });

    it('delete a resource id from the user', async () => {
      //Arrange
      const resourceIds = ["00001", "00002", "00003", "00004", "00005"];

      //Act
      unsafeUnwrap(await userApi.markAsNewResources(userId, resourceIds));
      unsafeUnwrap(await userApi.removeNewResource(userId, "00004"));

      //Assert
      const newResources = unsafeUnwrap(await userApi.getNewResources(userId));
      assert.equal(Object.keys(newResources).length, resourceIds.length - 1);
    });

    this.afterEach(async () => {
      await userApi.userRef(orgId, userId).delete();
    });

  });

});