const Router = require('express')
const router = new Router()
const trainingCampLeadersController = require('../controllers/trainingCampLeadersController')

router.post('/training-camp-leaders/create', trainingCampLeadersController.addTrainingCampLeader)
router.get('/training-camp-leaders/get-all', trainingCampLeadersController.getAllTrainingCampLeaders)
router.get('/training-camp-leaders/get-one', trainingCampLeadersController.getOneTrainingCampLeader)
router.get('/training-camp-members/get-members/:id', trainingCampLeadersController.getTrainingCampMembers)
router.delete('/training-camp-leaders/delete', trainingCampLeadersController.deleteTrainingCampLeader)

module.exports = router