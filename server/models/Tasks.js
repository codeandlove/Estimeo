const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const TasksSchema = new Schema({
    title: {
        type: String
    },
    hours: {
        type: Number,
        required: true
    },
    desc: {
        type: String
    },
    qa: {
      type: String  
    },
    created: {
        type: Date,
        default: Date.now
    }
});

TasksSchema.plugin(mongoosePaginate);

TasksSchema.statics.getTaskById = function(taskId, cb) {
    return this.findById(taskId)
    // .populate('title')
    // .populate('tasks')
        .exec()
        .then(task => cb(null, task))
        .catch(err => cb(err));
};

TasksSchema.statics.getTasks = function(cb) {
    return this.find()
        .sort('-created')
        // .populate('title')
        // .populate('tasks')
        .exec()
        .then(task => cb(null, task))
        .catch(err => cb(err));
};

TasksSchema.statics.createTask = function(params, cb) {
    const task = new this(params);

    return task
        .save()
        .then(() => cb(null, task))
        .catch(err => cb(err));
};

TasksSchema.statics.saveTask = function(taskId, params, cb) {

    this.findOneAndUpdate({ _id: taskId }, params, { new: true })
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


TasksSchema.statics.deleteTask = function(taskId, cb) {

    this.findOneAndRemove({ _id: taskId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

TasksSchema.statics.getProjectTasks = function(ids, cb) {

    return this.find()
        .where('_id')
        .in(ids)
        .exec()
        .then(tasks => cb(null, tasks))
        .catch(err => cb(err));
};

module.exports = mongoose.model('Tasks', TasksSchema);
