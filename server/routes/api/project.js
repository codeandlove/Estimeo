const projectController = require('../../controllers/project');
const authController = require('../../controllers/auth');

module.exports = app => {
    app.get('/api/project/:projectId', projectController.getProjectById);

    app.put('/api/project/save/:projectId', projectController.saveProject);

    app.delete('/api/project/delete/:projectId', projectController.deleteProject);

    app.get('/api/projects', projectController.getProjects);

    app.post('/api/project', projectController.createProject);

};
