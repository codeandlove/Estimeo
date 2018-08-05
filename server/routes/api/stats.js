const Spectrum = require('../../models/Spectrum');
const Category = require('../../models/Category');
const Idea = require('../../models/Idea');

module.exports = app => {
  app.get('/api/stats', async (req, res) => {
    const spectrum = await Spectrum.aggregate([
      {
        $lookup: {
          from: 'ideas',
          localField: '_id',
          foreignField: 'politicalSpectrum',
          as: 'ideas'
        }
      },
      {
        $project: {
          _id: 1,
          example: 1,
          value: 1,
          ideas: {
            $size: '$ideas'
          }
        }
      }
    ]).sort({ value: 1 }).exec();
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'ideas',
          localField: '_id',
          foreignField: 'categories',
          as: 'ideas'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          ideas: {
            $size: '$ideas'
          }
        }
      }
    ]).exec();
    const ideaCount = await Idea.count((err, count) => {
      return count;
    });
    res.json({
      spectrum: spectrum,
      categories: categories,
      ideas: ideaCount
    });
  });
};
