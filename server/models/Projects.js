const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    rows: []
});

ProjectSchema.plugin(mongoosePaginate);

ProjectSchema.statics.getProjectById = function(projectId, cb) {
    return this.findById(projectId)
        // .populate('title')
        // .populate('tasks')
        .exec()
        .then(project => cb(null, project))
        .catch(err => cb(err));
};

ProjectSchema.statics.getProjects = function(cb) {
    return this.find()
        .sort('-created')
        // .populate('title')
        // .populate('tasks')
        .exec()
        .then(project => cb(null, project))
        .catch(err => cb(err));
};

ProjectSchema.statics.createProject = function(params, cb) {
    const project = new this(params);

    return project
        .save()
        .then(() => cb(null, project))
        .catch(err => cb(err));
};

ProjectSchema.statics.saveProject = function(projectId, params, cb) {

    this.findOneAndUpdate({ _id: projectId }, params, { new: true })
        // .populate('politicalSpectrum')
        // .populate('categories')
        .exec()
        .then(result => {
            if (!result) {
                e.message = 'Invalid id';
                e.stack = '';
                throw e;
            }
            cb(null, result);
        })
        .catch(err => cb(err));
};


ProjectSchema.statics.deleteProject = function(projectId, cb) {

    this.findOneAndRemove({ _id: projectId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

module.exports = mongoose.model('Project', ProjectSchema);
