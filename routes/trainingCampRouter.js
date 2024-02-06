const Router = require('express')
const router = new Router()
const trainingCampController = require('../controllers/trainingCampController')

router.post('/training-camp/create', trainingCampController.createTrainingCamp)
router.get('/training-camp/get-one/:id', trainingCampController.getOneTrainingCamp)
router.get('/training-camp/get-all', trainingCampController.getAllTrainingCamps)
router.get('/training-camp/get-by-year-and-month', trainingCampController.getTrainingCampsByYearAndMonth)
router.put('/training-camp/update', trainingCampController.updateTrainingCamp)
router.delete('/training-camp/delete/:id', trainingCampController.deleteTrainingCamp)
router.get('/training-camp/get-by-id/:id', trainingCampController.getTrainingCampsByUserId)

module.exports = router