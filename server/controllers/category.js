const Category = require('../models/Category');

// Create endpoint /api/categories for GET
exports.getCategories = function (req, res) {
    Category.getCategories(function(err, categories){
        if (err) {
            res.status(500).json({error: err.message})
        }
        else{
            res.json({categories: categories});
        }
    });
};

// Create endpoint /api/categories for POST
exports.createCategory = function (req, res) {
    const categoryParams = req.body;
    Category.createCategory(categoryParams, function(err, category){
        if (err) {
            res.status(500).json({error: err.message});
        }
        else{
            res.json({category: category});
        }
    });
};

// Create endpoint /api/categories/:id for DELETE
exports.deleteCategory = function (req, res) {
    const categoryId = req.params.id;
    Category.deleteCategory(categoryId, function(err){
        if (err) {
            res.status(500).json({error: err.message});
        }
        else{
            res.json({status: "deleted"});
        }
    });
};