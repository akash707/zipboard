import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';

Resolutions = new Mongo.Collection('resolution');



Router.route('/register', function () {
 this.render('register');
});

Router.route('/login', function () {
 this.render('login');
});

Router.route('/home', function () {
if (Meteor.user()) {
 this.render('detail');
}
else {
  Router.go('/login');
}
});



Template.detail.helpers({
resolutions:function()
{
  return Resolutions.find({});
}
});


Template.detail.events({
'submit .new-user':function(event)
{
  event.preventDefault();

var title=event.target.title.value;
  var currentUser = Meteor.user().emails[0].address;
Resolutions.insert({
title:title,
createdAt: new Date(),
createdBy:currentUser
});

event.target.title.value="";

return false;

}

}
);


Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email =event.target.email.value;
        var password = event.target.password.value;

        Accounts.createUser({
            email: email,
            password: password
        });

        Router.go('login');
    }
});


Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        Meteor.loginWithPassword(email, password,function(error){
          if(error){
              console.log(error.reason);
          } else {
              Router.go("/home");
          }
});
    }
});
