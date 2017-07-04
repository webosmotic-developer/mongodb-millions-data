'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    isActive: {type: Boolean, index: true},
    balance: {type: Number, index: true},
    picture: {type: String, index: true},
    age: {type: Number, index: true},
    eyeColor: {type: String, index: true},
    name: {type: String, index: true},
    gender: {type: String, index: true},
    company: {type: String, index: true},
    email: {type: String, index: true},
    phone: {type: String, index: true},
    address: {type: String, index: true},
    about: {type: String, index: true},
    registered: {type: Date, default: Date.now(), index: true},
    latitude: {type: Number, index: true},
    longitude: {type: Number, index: true}
}, {collection: 'Users'});

// Include all string fields in the index
// UserSchema.index({
//     isActive: 1, balance: 1, picture: 1, age: 1, eyeColor: 1,
//     gender: 1, company: 1, email: 1, phone: 1, address: 1,
//     about: 1, registered: 1, latitude: 1, longitude: 1
// }, {unique: true});

// Create an index to support text search on, say, name and profile.something
// UserSchema.index({name: 'text', 'profile.something': 'text'});

module.exports = mongoose.model('Users', UserSchema);
