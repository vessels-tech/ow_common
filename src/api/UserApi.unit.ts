import 'mocha';
import * as assert from 'assert';
import { UserApi } from './UserApi';
//@ts-ignore
import MockFirestore from 'mock-cloud-firestore';
import { DefaultUser, User } from '../model/User';
import { Resource, ResourceType, DefaultResource, DefaultPendingResource, DefaultMyWellResource } from '../model/Resource';
import { unsafeUnwrap } from '../utils/AppProviderTypes';
import UserStatus from '../enums/UserStatus';
import UserType from '../enums/UserType';
import { admin } from '../test/TestFirebase';
import { DefaultReading } from '../model';
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
    this.timeout(5000);
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

  describe('merge users', function() {
    this.timeout(5000);
    const firestore: Firestore = new MockFirestore({}).firestore();
    const userApi = new UserApi(firestore, orgId);

    const oldUserId = "old_user_1234";
    const newUserId = "new_user_1234";

    this.beforeEach(async function() {
      //Create 2 users
      await userApi.userRef(orgId, oldUserId).set(DefaultUser);
      await userApi.userRef(orgId, newUserId).set(DefaultUser);

      const oldUserOwner = { name: "Lewis ji", createdByUserId: oldUserId };
      const newUserOwner = { name: "Lewis ji", createdByUserId: newUserId };

      //Create Pending Resources
      await userApi.userRef(orgId, oldUserId).collection('pendingResources').doc('00001').set({ ...DefaultPendingResource, owner: oldUserOwner, id: "00001", groups: { country: "IN", pincode: "313603" } });
      await userApi.userRef(orgId, oldUserId).collection('pendingResources').doc('00002').set({ ...DefaultPendingResource, owner: oldUserOwner, id: "00002", groups: { country: "IN", pincode: "313603" } });
      await userApi.userRef(orgId, oldUserId).collection('pendingResources').doc('00003').set({ ...DefaultPendingResource, id: "00002", groups: { country: "IN", pincode: "313603" } });

      await userApi.userRef(orgId, newUserId).collection('pendingResources').doc('00004').set({ ...DefaultPendingResource, owner: newUserOwner, id: "00003", groups: { country: "IN", pincode: "313603" } });
      await userApi.userRef(orgId, newUserId).collection('pendingResources').doc('00005').set({ ...DefaultPendingResource, owner: newUserOwner, id: "00004", groups: { country: "IN", pincode: "313603" } });
      await userApi.userRef(orgId, newUserId).collection('pendingResources').doc('00006').set({ ...DefaultPendingResource, owner: newUserOwner, id: "00005", groups: { country: "IN", pincode: "313603" } });

      //Create pending readings:
      await userApi.userRef(orgId, oldUserId).collection('pendingReadings').doc("reading_001").set({ ...DefaultReading, resourceId: "00001", timeseriesId: 'default' })
      await userApi.userRef(orgId, oldUserId).collection('pendingReadings').doc("reading_002").set({ ...DefaultReading, resourceId: "00001", timeseriesId: 'default' })
      await userApi.userRef(orgId, oldUserId).collection('pendingReadings').doc("reading_003").set({ ...DefaultReading, resourceId: "00002", datetime: '2017-01-01T01:11:01Z', value: 1, timeseriesId: 'default' })

      await userApi.userRef(orgId, newUserId).collection('pendingReadings').doc("reading_001").set({ ...DefaultReading, resourceId: "00003", datetime: '2017-01-02T01:11:01Z', value: 2, timeseriesId: 'default' })
      await userApi.userRef(orgId, newUserId).collection('pendingReadings').doc("reading_002").set({ ...DefaultReading, resourceId: "00004", datetime: '2017-01-03T01:11:01Z', value: 3, timeseriesId: 'default' })

    });

    it('merges together the pendingReadings', async() => {
      //Arrange

      //Act
      



      //Assert

    });

    it('merges together pending resources, and updates the createdByUserId');
    it('merges together two users');

    this.afterEach(async function () {
      //This will clear nested subcollections.
      await userApi.userRef(orgId, oldUserId).delete();
      await userApi.userRef(orgId, newUserId).delete();
    });
  });

  describe('Merge Users 2', function() {
    //TODO: create the users only

    it('merges together pending resources when none exist');
    it('merges together the pendingReadings when none exist');
  });

});