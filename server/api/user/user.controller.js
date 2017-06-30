'use strict';

var _ = require('lodash');
var User = require('./user.model');
var data = require('./data');

// Get list of users
exports.index = function (req, res) {
    var limit = req.query.limit ? parseInt(req.query.limit) : 1000;
    var page = req.query.page ? parseInt(req.query.page) : 1;
    // var search = req.query.search ? {$text: {$search: req.query.search}} : {};
    var search = req.query.search ? {name: new RegExp(req.query.search)} : {};
    var sort = req.query.sort ? req.query.sort : 'name';
    var order = req.query.order ? parseInt(req.query.order) : 1; // 1 for ascending order and  -1 for descending
    var querySort = {};
    querySort[sort] = parseInt(order);

    User.find(search, {}, {limit: limit, skip: limit * (page > 0 ? page - 1 : 0)})
        .sort(querySort)
        .lean()
        .exec(function (err, users) {
            if (err) {
                return handleError(res, err);
            }
            User.count({}, function (err, count) {
                return res.status(200).json({totDocument: count, users: users});
            });
        });
};

// Get a single user
exports.show = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.status(404).send('Not Found');
        }
        return res.json(user);
    });
};

// Creates a new user in the DB.
exports.create = function (req, res) {
    User.create(req.body, function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(user);
    });
};

// insert 10000 data.
// exports.create = function (req, res) {
//     var mock = data.mock(), len = mock.length;
//     // set this to whatever number of items you can process at once
//     var chunk = 100;
//     var intIndex = 0;
//     function fnDoChunk() {
//         var cnt = chunk;
//         while (cnt-- && intIndex < len) {
//             // process array[index] here
//             ++intIndex;
//             User.create(mock[intIndex], function (err, user) {
//                 if (err) {
//                     return handleError(res, err);
//                 }
//                 if (intIndex === len) {
//                     return res.status(201).json(user);
//                 }
//             });
//         }
//         if (intIndex < len) {
//             // set Timeout for async iteration
//             setTimeout(fnDoChunk, intIndex);
//         }
//     }
//     fnDoChunk();
// };

// Updates an existing user in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(user, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(user);
        });
    });
};

// Deletes a user from the DB.
exports.destroy = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.status(404).send('Not Found');
        }
        user.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}
