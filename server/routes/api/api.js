const apiController = require('../../controllers/api');
const authController = require('../../controllers/auth');

module.exports = (app) => {
    app.get('/api', apiController.testApiConnection);
};
