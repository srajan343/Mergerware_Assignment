import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';


const Users = new Mongo.Collection('users');


const ROLES = ['admin', 'borrower', 'lender'];


const STATUSES = ['pending', 'approved', 'paid'];


Template.body.helpers({
    users() {
        return Users.find();
    },
});


Template.body.events({
    'submit .register-form' (event) {
        event.preventDefault();
        const email = event.target.email.value;
        const role = event.target.role.value;

        // Validate email and role
        if (email && ROLES.includes(role)) {
            Users.insert({ email, role, status: STATUSES[0] });
            event.target.email.value = '';
        }
    },

    'submit .loan-form' (event) {
        event.preventDefault();
        const userId = event.target.userId.value;

        // Validate user ID
        if (userId && Users.findOne(userId)) {
            Users.update(userId, { $set: { status: STATUSES[1] } });
        }
    },

    'submit .payment-form' (event) {
        event.preventDefault();
        const userId = event.target.userId.value;

        // Validate user ID
        if (userId && Users.findOne(userId)) {
            Users.update(userId, { $set: { status: STATUSES[2] } });
        }
    },
});