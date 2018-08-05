const tasksController = require('../../controllers/tasks');
const authController = require('../../controllers/auth');

module.exports = app => {

    // Get task by id
    app.get('/api/task/:taskId', tasksController.getTaskById);

    // Save task by id
    app.put('/api/task/save/:taskId', tasksController.saveTask);

    // Delete task by id
    app.put('/api/task/delete/:taskId', tasksController.deleteTask);

    // Get all tasks
    app.get('/api/tasks', tasksController.getTasks);

    // Create new task
    app.post('/api/task', tasksController.createTask);

    // Get current tasks
    app.get('/api/project/:projectId/tasks', tasksController.getProjectTasks);
};
