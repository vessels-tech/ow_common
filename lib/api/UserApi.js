"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppProviderTypes_1 = require("../utils/AppProviderTypes");
const User_1 = require("../model/User");
class UserApi {
    constructor(firestore, orgId) {
        this.firestore = firestore;
        this.orgId = orgId;
    }
    async addFavouriteResource(userId, resource) {
        const favouritesResult = await this.getFavouriteResources(userId);
        if (favouritesResult.type === AppProviderTypes_1.ResultType.ERROR) {
            return favouritesResult;
        }
        const favourites = favouritesResult.result;
        favourites[resource.id] = resource;
        return this.updateFavouriteResources(userId, favourites);
    }
    async removeFavouriteResource(userId, resourceId) {
        const favouritesResult = await this.getFavouriteResources(userId);
        if (favouritesResult.type === AppProviderTypes_1.ResultType.ERROR) {
            return favouritesResult;
        }
        const favourites = favouritesResult.result;
        delete favourites[resourceId];
        return this.updateFavouriteResources(userId, favourites);
    }
    async updateFavouriteResources(userId, favouriteResources) {
        return this.userRef(this.orgId, userId).set({ favouriteResources }, { merge: true })
            .then(() => AppProviderTypes_1.makeSuccess(undefined))
            .catch((err) => AppProviderTypes_1.makeError(err.message));
    }
    async getFavouriteResources(userId) {
        const userResult = await this.getUser(this.userRef(this.orgId, userId));
        if (userResult.type === AppProviderTypes_1.ResultType.ERROR) {
            return userResult;
        }
        const user = userResult.result;
        return AppProviderTypes_1.makeSuccess(user.favouriteResources);
    }
    async getRecentResources(userId) {
        const userResult = await this.getUser(this.userRef(this.orgId, userId));
        if (userResult.type === AppProviderTypes_1.ResultType.ERROR) {
            return userResult;
        }
        const user = userResult.result;
        return AppProviderTypes_1.makeSuccess(user.recentResources);
    }
    /**
     * Change the user's status
     */
    async changeUserStatus(userId, status) {
        return this.userRef(this.orgId, userId).set({ status }, { merge: true })
            .then(() => AppProviderTypes_1.makeSuccess(undefined))
            .catch((err) => AppProviderTypes_1.makeError(err.message));
    }
    async changeUserType(userId, type) {
        return this.userRef(this.orgId, userId).set({ type }, { merge: true })
            .then(() => AppProviderTypes_1.makeSuccess(undefined));
    }
    //
    // Helpers
    // ------------------------------------
    userRef(orgId, userId) {
        return this.firestore.collection('org').doc(orgId).collection('user').doc(userId);
    }
    async getUser(userRef) {
        return userRef.get()
            .then(sn => {
            const data = sn.data();
            if (!data) {
                return AppProviderTypes_1.makeError(`No data found for userRef:${userRef}`);
            }
            //Set the default user data here.
            return AppProviderTypes_1.makeSuccess({
                ...User_1.DefaultUser,
                ...data
            });
        })
            .catch((err) => AppProviderTypes_1.makeError(err.message));
    }
}
exports.UserApi = UserApi;
