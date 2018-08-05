const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

const IdeaSchema = new Schema({
  politicalSpectrum: {
    type: Schema.Types.ObjectId,
    ref: 'Spectrum',
    required: true
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  text: {
    type: String,
    required: true
  },
  location: {
    city: {
      type: String
    },
    country_code: {
      type: String
    },
    country_name: {
      type: String
    },
    ip: {
      type: String
    },
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
    metro_code: {
      type: Number
    },
    region_code: {
      type: String
    },
    region_name: {
      type: String
    },
    time_zone: {
      type: String
    },
    zip_code: {
      type: String
    }
  },
  accepted: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

IdeaSchema.plugin(mongoosePaginate);

IdeaSchema.statics.getIdeaById = function(ideaId, cb) {
  return this.findById(ideaId)
    .populate('politicalSpectrum')
    .populate('categories')
    .exec()
    .then(idea => cb(null, idea))
    .catch(err => cb(err));
};

IdeaSchema.statics.getIdeas = function(cb) {
  return this.find()
    .sort('-created')
    .populate('politicalSpectrum')
    .populate('categories')
    .exec()
    .then(idea => cb(null, idea))
    .catch(err => cb(err));
};

IdeaSchema.statics.getAcceptedIdeas = function(cb) {
  return this.find({ accepted: true  })
    .sort('-created')
    .populate('politicalSpectrum')
    .populate('categories')
    .exec()
    .then(idea => cb(null, idea))
    .catch(err => cb(err));
};

IdeaSchema.statics.getAcceptedIdeasFromDateRange = function(fromDate,toDate, cb) {
  return this.find({ accepted: true , created: { '$gt' : fromDate, '$lt': toDate}})
    .sort('-created')
    .populate('politicalSpectrum')
    .populate('categories')
    .exec()
    .then(idea => cb(null, idea))
    .catch(err => cb(err));
};

IdeaSchema.statics.getIdeasFromDateRange = function(fromDate,toDate, cb) {
  return this.find({ created: { '$gt' : fromDate, '$lt': toDate}})
    .sort('-created')
    .populate('politicalSpectrum')
    .populate('categories')
    .exec()
    .then(idea => cb(null, idea))
    .catch(err => cb(err));
};

IdeaSchema.statics.getPaginatedIdeasFromDateRange = function(fromDate,toDate, limit, page, cb) {
  var options = {
    page: page,
    limit: limit,
    sort: '-created',
    populate: 'politicalSpectrum categories'
  };

  return this.paginate({ created: { '$gt' : fromDate, '$lt': toDate}}, options)
    .then(result => cb(null, result))
    .catch(err => cb(err));
};

IdeaSchema.statics.getAcceptedPaginatedIdeasFromDateRange = function(fromDate,toDate, limit, page, cb) {
  var options = {
    page: page,
    limit: limit,
    sort: '-created',
    populate: 'politicalSpectrum categories'
  };

  return this.paginate({ accepted: true, created: { '$gt' : fromDate, '$lt': toDate}}, options)
    .then(result => cb(null, result))
    .catch(err => cb(err));
};

IdeaSchema.statics.createIdea = function(params, cb) {
  const idea = new this(params);

  return idea
    .save()
    .then(() => cb(null, idea))
    .catch(err => cb(err));
};

IdeaSchema.statics.changeAccepted = function(ideaId, accepted, cb) {
  var e = Error();
  return this.findOneAndUpdate(
    { _id: ideaId },
    { accepted: accepted },
    { new: true }
  )
    .populate('politicalSpectrum')
    .populate('categories')
    .exec()
    .then(result => {
      if (!result) {
        e.message = 'Invalid id';
        e.stack = '';
        throw e;
      }
      cb(null, result);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        e.message = 'Invalid id';
        e.stack = '';
        cb(e);
      } else {
        cb(err);
      }
    });
};

IdeaSchema.statics.editIdea = function(ideaId, params, cb) {
  //accepted parameter cannot be updated in this request. To change it use accept method
  delete params.accepted;
  this.findOneAndUpdate({ _id: ideaId }, params, { new: true })
    .populate('politicalSpectrum')
    .populate('categories')
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

IdeaSchema.statics.deleteIdea = function(ideaId, cb) {
  this.findOneAndRemove({ _id: ideaId })
    .exec()
    .then(() => cb())
    .catch(err => cb(err));
};

module.exports = mongoose.model('Idea', IdeaSchema);
