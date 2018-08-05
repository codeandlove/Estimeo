// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }
});

UserSchema.pre('save', function(cb) {
    const user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) return cb();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return cb(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return cb(err);
            user.password = hash;
            cb();
        });
    });
});

UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.statics.createUser = function(params, cb) {
    const user = new this(params);

    return user
        .save()
        .then(() => cb(null, user))
        .catch(err => cb(err));
};

UserSchema.statics.loginUser = function(params, cb) {

    return this.findOne({ email: params.email })
        .exec()
        .then((user) => {

            // No user found with that username
            if (!user) { return cb(null, {error: {user: 'User not found.'}}); }

            // Make sure the password is correct
            user.verifyPassword(params.password, function(err, isMatch) {
                if (err) {
                    return cb(err);
                }

                // Password did not match
                if (!isMatch) {
                    return cb(null, {error: {password: 'Password did not mach.'}});
                }

                // Success
                return cb(null, user);
            });
        })
        .catch(err => cb(err));

};

//
// UserSchema.statics.deleteUser  = function(userId, currentUserId, cb){
//     const err = new Error();
//     if(userId === currentUserId){
//         err.message = "You cannot delete your user";
//         cb(err);
//     } else {
//         this.findOneAndRemove({_id: userId})
//             .exec()
//             .then((result) => {
//                 if(result){
//                     cb(null, result)
//                 }else{
//                     err.message = "User not found";
//                     cb(err);
//                 }
//             })
//             .catch((err) => cb(err));
//     }
// };

module.exports = mongoose.model('User', UserSchema);