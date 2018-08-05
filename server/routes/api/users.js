const userController = require('../../controllers/user');
const authController = require('../../controllers/auth');

module.exports = (app) => {
    // app.get('/api/users',  authController.isAuthenticated, userController.getUsers);
    // app.post('/api/users', authController.isAuthenticated, userController.postUsers);
    // app.delete('/api/users/:user_id', authController.isAuthenticated, userController.deleteUser);

    // Create new user
    app.post('/api/user', userController.createUser);

    // Login user
    app.post('/api/login', userController.loginUser);
};
