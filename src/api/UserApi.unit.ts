import 'mocha';
import * as assert from 'assert';


describe('User Api', function() {

  describe('favourites', function() {
    it('addFavouriteResource adds a favourite resource');
    it('removeFavouriteResource removes a favourite resource');
    it('getFavouriteResources gets the favourite resources');
  });

  describe('recents', function() {
    it('getRecentResources gets the most recent resources');
    it('addRecentResource adds a recent resource');
  });

  describe('changeUserStatus', function() {
    it('approves a user');
    it('rejects a user');
  });

  describe('change user priveleges ')
});