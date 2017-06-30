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
    registered: Date,
    latitude: Number,
    longitude: Number
});

// Include all string fields in the index, use the '$**' wildcard
// UserSchema.index({'name': 'text'});

// Create an index to support text search on, say, name and profile.something
// UserSchema.index({name: 'text', 'profile.something': 'text'});

module.exports = mongoose.model('User', UserSchema);
