// Load required packages
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/User');

passport.use(new BasicStrategy(
    function(userid, password, callback) {
        User.findOne({ username: userid }, function (err, user) {
            if (err) { return callback(err); }

            // No user found with that username
            if (!user) { return callback(null, false); }

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) { return callback(err); }

                // Password did not match
                if (!isMatch) { return callback(null, false); }

                // Success
                return callback(null, user);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });