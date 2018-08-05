const Tasks = require('../models/Tasks');
const Project = require('../models/Projects');

// Create endpoint /api/task for GET
exports.getTaskById = function(req, res) {
    const taskId = req.params.taskId;

    Tasks.getTaskById(taskId, function(err, task) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(task);
        }
    });
};

// Create endpoint /api/tasks for GET
exports.getTasks = function(req, res) {
    Tasks.getTasks(function(err, task) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(task);
        }
    });
};

// Create endpoint /api/task for POST
exports.createTask = function(req, res) {
    const taskParams = req.body;

    Tasks.createTask(taskParams, function(err, task) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ task: task });
        }
    });
};

exports.saveTask = function(req, res) {
    const taskId = req.params.taskId;
    const taskParams = req.body;

    Tasks.saveTask(taskId, taskParams, function(err, task) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ task: task });
        }
    });
};

exports.deleteTask = function(req, res) {
    const taskId = req.params.taskId;

    Tasks.deleteTask(taskId, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ status: 'deleted' });
        }
    });
};

exports.getProjectTasks = function(req, res) {
    const projectId = req.params.projectId;

    let tasks = [];

    Project.getProjectById(projectId, function(err, project) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            project.rows.filter(function(row) {
                if(row.type === 'task') {
                    tasks = [...tasks, row._id];
                }
            });
        }
    }).then(() => {
        Tasks.getProjectTasks(tasks, function(err, tasks) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(tasks);
            }
        });
    });
};