const Spectrum = require('../models/Spectrum');

// Create endpoint /api/spectrums for GET
exports.getSpectrums = function (req, res) {
    Spectrum.getSpectrums(function(err, spectrums){
        if (err) {
            res.status(500).json({error: err.message})
        }
        else{
            res.json({spectrums: spectrums});
        }
    });
};

// Create endpoint /api/spectrums for POST
exports.createSpectrum = function (req, res) {
    const spectrumParams = req.body;

    Spectrum.createSpectrum(spectrumParams, function(err, spectrum){
        if (err) {
            res.status(500).json({error: err.message});
        }
        else{
            res.json({spectrum: spectrum});
        }
    });
};

// Create endpoint /api/spectrums/:id for DELETE
exports.deleteSpectrum = function (req, res) {
    const spectrumId = req.params.id;

    Spectrum.deleteSpectrum(spectrumId, function(err){
        if (err) {
            res.status(500).json({error: err.message});
        }
        else{
            res.json({status: "deleted"});
        }
    });
};