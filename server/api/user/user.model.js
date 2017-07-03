'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    isActive: Boolean,
    balance: Number,
    picture: String,
    age: Number,
    eyeColor: String,
    name: {type: String, index: true},
    gender: String,
    company: String,
    email: String,
    phone: String,
    address: String,
    about: String,
    registered: {type: Date, default: Date.now()},
    latitude: Number,
    longitude: Number
}, {collection: 'Users'});

// Include all string fields in the index
UserSchema.index({
    isActive: 1, balance: 1, picture: 1, age: 1, eyeColor: 1,
    gender: 1, company: 1, email: 1, phone: 1, address: 1,
    about: 1, registered: 1, latitude: 1, longitude: 1
}, {unique: true});

// Create an index to support text search on, say, name and profile.something
// UserSchema.index({name: 'text', 'profile.something': 'text'});

module.exports = mongoose.model('Users', UserSchema);
