const Project = require('../models/Projects');

// Create endpoint /api/project for GET
exports.getProjectById = function(req, res) {
    const projectId = req.params.projectId;

    Project.getProjectById(projectId, function(err, project) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(project);
        }
    });
};

// Create endpoint /api/projects for GET
exports.getProjects = function(req, res) {
    Project.getProjects(function(err, project) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(project);
        }
    });
};

// Create endpoint /api/project for POST
exports.createProject = function(req, res) {
    const projectParams = req.body;

    Project.createProject(projectParams, function(err, project) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ project: project });
        }
    });
};

exports.saveProject = function(req, res) {
    const projectId = req.params.projectId;
    const projectParams = req.body;

    Project.saveProject(projectId, projectParams, function(err, project) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ project: project });
        }
    });
};

exports.deleteProject = function(req, res) {
    const projectId = req.params.projectId;

    Project.deleteProject(projectId, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ status: 'deleted' });
        }
    });
};