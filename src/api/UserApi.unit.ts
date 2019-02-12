import 'mocha';
import * as assert from 'assert';
import { UserApi } from './UserApi';
import { firestore as realFirestore, admin} from '../test/TestFirebase';
import MockFirestore from 'mock-cloud-firestore';
import { isUndefined } from '../utils/Maybe';
import { DefaultUser, User } from '../model/User';
import { Resource, ResourceType } from '../model/Resource';
import { ResultType, unsafeUnwrap } from '../utils/AppProviderTypes';
type Firestore = admin.firestore.Firestore;


//TODO: tidy this up
// if (isUndefined(realFirestore)) {
//   throw new Error("firestore is undefined");
// }

const { 
  orgId,
} = require('../test/testConfig.json');

// let firestore: Firestore = realFirestore;
// if (shouldUseMockFirestore) {
//   firestore = mockFirestore
// }


describe.only('User Api', function() {

  describe('favourites', async function() {
    const firestore: Firestore = new MockFirestore({}).firestore();
    const userApi = new UserApi(firestore, orgId);
    const userId = 'user_id_1';
    
    this.beforeAll(async () => {
      await userApi.userRef(orgId, userId).set(DefaultUser);
    });

    it('addFavouriteResource adds a favourite resource', async () => {
      //Arrange
      const resource: Resource = {
        type: ResourceType.Any,
        id: 'resource_1',
        coords: {latitude: 12, longitude: 13},
        timeseries: {},
      }
      //Act 
      const addFavResult = await userApi.addFavouriteResource(userId, resource);
      unsafeUnwrap(addFavResult);
      const favouriteResources = unsafeUnwrap(await userApi.getFavouriteResources(userId));

      //Assert
      assert.deepEqual({resource_1: resource}, favouriteResources);
    });

    it('removeFavouriteResource removes a favourite resource');
    it('getFavouriteResources gets the favourite resources');
  });

  describe('recents', function() {
    it('getRecentResources gets the most recent resources');
  });

  describe('changeUserStatus', function() {
    it('approves a user');
    it('rejects a user');
  });

  describe('change user type', function() {
    it('elevates a user to Admin');
    it('demotes a user to User');
  });
});