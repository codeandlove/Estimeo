const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
});

CategorySchema.statics.getCategories = function (cb) {
    this.find()
        .exec()
        .then((categories) => cb(null, categories))
        .catch((err) => cb(err));
};

CategorySchema.statics.createCategory = function (categoryParams, cb) {
    const category = new this(categoryParams);

    category.save()
        .then((categoryObj) => cb(null, categoryObj))
        .catch((err) => cb(err));

};

CategorySchema.statics.deleteCategory = function (categoryId, cb) {
    this.findOneAndRemove({ _id: categoryId })
        .exec()
        .then(() => cb())
        .catch((err) => cb(err));
};

module.exports = mongoose.model('Category', CategorySchema);
