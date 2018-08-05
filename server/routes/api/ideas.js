const ideaController = require('../../controllers/idea');
const authController = require('../../controllers/auth');

module.exports = app => {
  app.get('/api/idea/:ideaId', ideaController.getIdeaById);

  app.get('/api/ideas', ideaController.getIdeas);

  app.get('/api/ideas/accepted_from_date/:date', ideaController.getAcceptedIdeasFromDate);

  app.get('/api/ideas/from_date/:date', ideaController.getIdeasFromDate);

  app.get('/api/ideas/from_date/:date/limit/:limit/:page', ideaController.getPaginatedIdeasFromDate);

  app.get('/api/ideas/accepted_from_date/:date/limit/:limit/:page', ideaController.getAcceptedPaginatedIdeasFromDate);

  app.get('/api/ideas/accepted', ideaController.getAcceptedIdeas);

  app.post('/api/ideas', ideaController.createIdea);

  app.put(
    '/api/ideas/accept/:id',
    authController.isAuthenticated,
    ideaController.acceptIdea
  );

  app.put(
    '/api/ideas/reject/:id',
    authController.isAuthenticated,
    ideaController.rejectIdea
  );

  app.put(
    '/api/ideas/:id',
    authController.isAuthenticated,
    ideaController.editIdea
  );

  app.delete(
    '/api/ideas/:id',
    authController.isAuthenticated,
    ideaController.deleteIdea
  );
};
