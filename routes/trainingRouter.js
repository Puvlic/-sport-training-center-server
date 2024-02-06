const Router = require('express')
const router = new Router()
const trainingController = require('../controllers/trainingController')
const subscriptionController = require("../controllers/subscriptionController");

router.post('/create-training', trainingController.createTraining)
router.get('/get-one-training/:id', trainingController.getOneTraining)
router.get('/get-all-training', trainingController.getAllTrainings)
router.put('/update-training', trainingController.updateTraining)
router.delete('/delete-training/:id', trainingController.deleteTraining)

module.exports = router