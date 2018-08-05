const User = require('../models/User');

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err){
            res.send(err);
        } else {
            res.json(users);
        }
    });
};

// Create endpoint /api/users for DELETE
exports.deleteUser = function(req, res) {
    const userId = req.params.user_id;
    const currentUserId = req.user.id;

    User.deleteUser(userId, currentUserId, function(err, result) {
        if (err) {
            res.status(500).send({error: err.message});
        } else {
            res.json({message: 'User deleted!', result: result});
        }
    })
};

// Create endpoint /api/user for POST
exports.createUser = function(req, res) {

    const userParams = {...req.body, verified: false};

    User.createUser(userParams, function(err) {
        if (err){
            res.send(err);
        } else {
            res.json({ message: 'User created!' });
        }
    });
};

// Create endpoint /api/user/login for GET
exports.loginUser = function(req, res) {

    const userParams = req.body;

    User.loginUser(userParams, function(err, user) {
        if (err){
            res.send(err);
        } else {
            res.json(user);
        }
    });
};