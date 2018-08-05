const Idea = require('../models/Idea');

// Create endpoint /api/ideas for GET
exports.getIdeaById = function(req, res) {
  const ideaId = req.params.ideaId;

  Idea.getIdeaById(ideaId, function(err, idea) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(idea);
    }
  });
};

// Create endpoint /api/ideas for GET
exports.getIdeas = function(req, res) {
  Idea.getIdeas(function(err, ideas) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(ideas);
    }
  });
};

// Create endpoint /api/ideas/accepted for GET
exports.getAcceptedIdeas = function(req, res) {
  Idea.getAcceptedIdeas(function(err, ideas) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(ideas);
    }
  });
};


// Create endpoint /api/ideas/accepted_from_date/:date for GET
exports.getAcceptedIdeasFromDate = function(req, res) {
  const date = new Date(req.params.date);

  if(isNaN(date.valueOf())){ //check if adate is valid
    res.status(500).json({ error: "Invalid date!" });
  }else{
    let tomorrow = new Date(req.params.date);
    tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1));

    Idea.getAcceptedIdeasFromDateRange(date,tomorrow, function(err, ideas) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(ideas);
      }
    });
  }
};

// Create endpoint /api/ideas/from_date/:date for GET
exports.getIdeasFromDate = function(req, res) {
  const date = new Date(req.params.date);

  if(isNaN(date.valueOf())){ //check if adate is valid
    res.status(500).json({ error: "Invalid date!" });
  }else{
    let tomorrow = new Date(req.params.date);
    tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1));

    Idea.getIdeasFromDateRange(date,tomorrow, function(err, ideas) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(ideas);
      }
    });
  }
};

// Create endpoint /api/ideas/accepted_from_date/:date/limit/:limit/:page for GET
exports.getAcceptedPaginatedIdeasFromDate = function(req, res) {
  const date = new Date(req.params.date);
  const limit = parseInt(req.params.limit);
  const page = parseInt(req.params.page);

  if(isNaN(date.valueOf())){ //check if date is valid
    res.status(500).json({ error: "Invalid date!" });
  }else{

    let tomorrow = new Date(req.params.date);
    tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1));

    Idea.getAcceptedPaginatedIdeasFromDateRange(date, tomorrow, limit, page, function(err, ideas) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(ideas);
      }
    });
  }
};

// Create endpoint /api/ideas/from_date/:date/limit/:limit/:page for GET
exports.getPaginatedIdeasFromDate = function(req, res) {
  const date = new Date(req.params.date);
  const limit = parseInt(req.params.limit);
  const page = parseInt(req.params.page);

  if(isNaN(date.valueOf())){ //check if date is valid
    res.status(500).json({ error: "Invalid date!" });
  }else{

    let tomorrow = new Date(req.params.date);
    tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1));

    Idea.getPaginatedIdeasFromDateRange(date, tomorrow, limit, page, function(err, ideas) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(ideas);
      }
    });
  }
};

// Create endpoint /api/ideas for POST
exports.createIdea = function(req, res) {
  const ideaParams = req.body;

  Idea.createIdea(ideaParams, function(err, idea) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ idea: idea });
    }
  });
};

// Create endpoint /api/ideas/accept/:id for PUT
exports.acceptIdea = function(req, res) {
  const ideaId = req.params.id;
  const accepted = true;

  Idea.changeAccepted(ideaId, accepted, function(err, idea) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ idea: idea });
    }
  });
};

// Create endpoint /api/ideas/reject/:id for PUT
exports.rejectIdea = function(req, res) {
  const ideaId = req.params.id;
  const accepted = false;

  Idea.changeAccepted(ideaId, accepted, function(err, idea) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ idea: idea });
    }
  });
};

// Create endpoint /api/ideas/:id for PUT
exports.editIdea = function(req, res) {
  const ideaId = req.params.id;
  const ideaParams = req.body;

  Idea.editIdea(ideaId, ideaParams, function(err, idea) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ idea: idea });
    }
  });
};

// Create endpoint /api/ideas/:id for DELETE
exports.deleteIdea = function(req, res) {
  const ideaId = req.params.id;

  Idea.deleteIdea(ideaId, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: 'deleted' });
    }
  });
};
