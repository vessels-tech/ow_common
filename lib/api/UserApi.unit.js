"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = __importStar(require("assert"));
const UserApi_1 = require("./UserApi");
//@ts-ignore
const mock_cloud_firestore_1 = __importDefault(require("mock-cloud-firestore"));
const User_1 = require("../model/User");
const Resource_1 = require("../model/Resource");
const AppProviderTypes_1 = require("../utils/AppProviderTypes");
const UserStatus_1 = __importDefault(require("../enums/UserStatus"));
const UserType_1 = __importDefault(require("../enums/UserType"));
//TODO: tidy this up
// if (isUndefined(realFirestore)) {
//   throw new Error("firestore is undefined");
// }
const { orgId, } = require('../test/testConfig.json');
const defaultResource = {
    type: Resource_1.ResourceType.Any,
    id: 'resource_1',
    coords: { latitude: 12, longitude: 13 },
    timeseries: {},
};
// let firestore: Firestore = realFirestore;
// if (shouldUseMockFirestore) {
//   firestore = mockFirestore
// }
describe.only('User Api', function () {
    describe('favourites', async function () {
        const firestore = new mock_cloud_firestore_1.default({}).firestore();
        const userApi = new UserApi_1.UserApi(firestore, orgId);
        const userId = 'user_id_1';
        this.beforeEach(async () => {
            await userApi.userRef(orgId, userId).set(User_1.DefaultUser);
        });
        it('addFavouriteResource adds a favourite resource', async () => {
            //Arrange
            //Act 
            const addFavResult = await userApi.addFavouriteResource(userId, defaultResource);
            AppProviderTypes_1.unsafeUnwrap(addFavResult);
            const favouriteResources = AppProviderTypes_1.unsafeUnwrap(await userApi.getFavouriteResources(userId));
            //Assert
            assert.deepEqual({ resource_1: defaultResource }, favouriteResources);
        });
        it('removeFavouriteResource removes a favourite resource', async () => {
            //Arrange
            const addFavResult = await userApi.addFavouriteResource(userId, defaultResource);
            AppProviderTypes_1.unsafeUnwrap(addFavResult);
            //Act
            const removeFavResult = await userApi.removeFavouriteResource(userId, defaultResource.id);
            AppProviderTypes_1.unsafeUnwrap(removeFavResult);
            const favouriteResources = AppProviderTypes_1.unsafeUnwrap(await userApi.getFavouriteResources(userId));
            //Assert
            assert.deepEqual(favouriteResources, {});
        });
        this.afterEach(async () => {
            await userApi.userRef(orgId, userId).delete();
        });
    });
    describe('recents', function () {
        const firestore = new mock_cloud_firestore_1.default({}).firestore();
        const userApi = new UserApi_1.UserApi(firestore, orgId);
        const userId = 'user_id_1';
        const expectedResources = [
            { ...defaultResource, id: '1' },
            { ...defaultResource, id: '2' },
            { ...defaultResource, id: '3' },
        ];
        this.beforeEach(async () => {
            const defaultUser = {
                ...User_1.DefaultUser,
                recentResources: expectedResources,
            };
            await userApi.userRef(orgId, userId).set(defaultUser);
        });
        it('getRecentResources gets the most recent resources', async () => {
            //Arrange
            //Act
            const actual = AppProviderTypes_1.unsafeUnwrap(await userApi.getRecentResources(userId));
            //Assert
            assert.deepEqual(actual, expectedResources);
        });
        this.afterEach(async () => {
            await userApi.userRef(orgId, userId).delete();
        });
    });
    describe('changeUserStatus', function () {
        const firestore = new mock_cloud_firestore_1.default({}).firestore();
        const userApi = new UserApi_1.UserApi(firestore, orgId);
        const userId = 'user_id_1';
        this.beforeEach(async () => {
            await userApi.userRef(orgId, userId).set(User_1.DefaultUser);
        });
        it('approves a user', async () => {
            //Arrange
            const expected = UserStatus_1.default.Approved;
            //Act
            AppProviderTypes_1.unsafeUnwrap(await userApi.changeUserStatus(userId, UserStatus_1.default.Approved));
            const user = AppProviderTypes_1.unsafeUnwrap(await userApi.getUser(userApi.userRef(orgId, userId)));
            const actual = user.status;
            //Assert
            assert.equal(actual, expected);
        });
        it('rejects a user', async () => {
            //Arrange
            const expected = UserStatus_1.default.Rejected;
            //Act
            AppProviderTypes_1.unsafeUnwrap(await userApi.changeUserStatus(userId, UserStatus_1.default.Rejected));
            const user = AppProviderTypes_1.unsafeUnwrap(await userApi.getUser(userApi.userRef(orgId, userId)));
            const actual = user.status;
            //Assert
            assert.equal(actual, expected);
        });
        this.afterEach(async () => {
            await userApi.userRef(orgId, userId).delete();
        });
    });
    describe('change user type', function () {
        const firestore = new mock_cloud_firestore_1.default({}).firestore();
        const userApi = new UserApi_1.UserApi(firestore, orgId);
        const userId = 'user_id_1';
        this.beforeEach(async () => {
            await userApi.userRef(orgId, userId).set(User_1.DefaultUser);
        });
        it('elevates a user to Admin', async () => {
            //Arrange
            const expected = UserType_1.default.Admin;
            //Act
            AppProviderTypes_1.unsafeUnwrap(await userApi.changeUserType(userId, expected));
            const user = AppProviderTypes_1.unsafeUnwrap(await userApi.getUser(userApi.userRef(orgId, userId)));
            const actual = user.type;
            //Assert
            assert.equal(actual, expected);
        });
        it('demotes a user to User', async () => {
            //Arrange
            const expected = UserType_1.default.User;
            AppProviderTypes_1.unsafeUnwrap(await userApi.changeUserType(userId, UserType_1.default.Admin));
            //Act
            AppProviderTypes_1.unsafeUnwrap(await userApi.changeUserType(userId, UserType_1.default.User));
            //Assert
            const user = AppProviderTypes_1.unsafeUnwrap(await userApi.getUser(userApi.userRef(orgId, userId)));
            const actual = user.type;
            assert.equal(actual, expected);
        });
        this.afterEach(async () => {
            await userApi.userRef(orgId, userId).delete();
        });
    });
});
