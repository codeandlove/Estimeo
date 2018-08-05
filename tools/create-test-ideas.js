const argv = require('optimist').argv;
const mongoose = require('mongoose');
const config = require('../config/config');
const Spectrum = require('../server/models/Spectrum');
const Category = require('../server/models/Category');
const Idea = require('../server/models/Idea');

const loremIpsum = require('lorem-ipsum');

//

mongoose.connect(config.db, { useMongoClient: true });
mongoose.Promise = global.Promise;

//

const ideasToCreate = argv.generate || 120;

async function createTestIdeas() {
  const spectrum = await Spectrum.find().exec();
  const categories = await Category.find().exec();
  const today = new Date().getTime();
  for (i = 1; i <= ideasToCreate; i++) {
    let randomSpectrum =
      spectrum[Math.floor(Math.random() * spectrum.length)]['_id'];
    let randomCategory =
      categories[Math.floor(Math.random() * categories.length)]['_id'];
    let randomCount = 10 + Math.floor(Math.random() * 15);
    let randomDate = today - 1000 * 60 * 60 * 24 * randomCount;
    let ideaData = {
      politicalSpectrum: randomSpectrum,
      categories: [randomCategory],
      text: loremIpsum({
        count: randomCount,
        units: 'words'
      }),
      accepted: true,
      created: new Date(randomDate)
    };
    const idea = await new Idea(ideaData).save();
    console.log('Idea #' + i + ' added');
  }
  await process.exit();
}

createTestIdeas();
