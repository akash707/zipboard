import { Meteor } from 'meteor/meteor';

export const Resolutions = new Mongo.Collection('resolution');



Meteor.startup(() => {
  // code to run on server at startup
});
