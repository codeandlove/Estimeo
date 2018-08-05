const mongoose = require('mongoose');

const SpectrumSchema = new mongoose.Schema({
    slug: {
        type: String,
        unique: true,
        required: true
    },
    value: Number,
    example:  {
        type: String,
        required: true
    }
});

SpectrumSchema.statics.getSpectrums = function (cb) {
    this.find()
        .sort({ value: 1 })
        .exec()
        .then((spectrums) => cb(null, spectrums))
        .catch((err) => cb(err));
};

SpectrumSchema.statics.createSpectrum = function (spectrumParams, cb) {
    const spectrum = new this(spectrumParams);

    spectrum.save()
        .then((spectrumObj) => cb(null, spectrumObj))
        .catch((err) => cb(err));

};

SpectrumSchema.statics.deleteSpectrum = function (spectrumId, cb) {
    this.findOneAndRemove({ _id: spectrumId })
        .exec()
        .then(() => cb())
        .catch((err) => cb(err));
};


module.exports = mongoose.model('Spectrum', SpectrumSchema);
