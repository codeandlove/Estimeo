const categoryController = require('../../controllers/category');
const authController = require('../../controllers/auth');

module.exports = (app) => {
    app.get('/api/categories', categoryController.getCategories);
    app.post('/api/categories',  authController.isAuthenticated, categoryController.createCategory);
    app.delete('/api/categories/:id',  authController.isAuthenticated, categoryController.deleteCategory);
};
