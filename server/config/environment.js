'use strict';

// Production specific configuration
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0',

    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,

    // Mongo DB connection options
    mongo: {
        uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||
        process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
        'mongodb://<dbuser>:<dbpassword>@ds135812.mlab.com:35812/millions_data',
        options: {
            db: {
                safe: true
            }
        }
    }
};
