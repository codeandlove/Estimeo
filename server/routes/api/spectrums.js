const spectrumController = require('../../controllers/spectrum');
const authController = require('../../controllers/auth');

module.exports = (app) => {
    app.get('/api/spectrums', spectrumController.getSpectrums);
    app.post('/api/spectrums',  authController.isAuthenticated, spectrumController.createSpectrum);
    app.delete('/api/spectrums/:id',  authController.isAuthenticated, spectrumController.deleteSpectrum);
};
