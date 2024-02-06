const Router = require('express')
const router = new Router()
const usersOnTrainingController = require('../controllers/usersOnTrainingController')


router.post('/add-user', usersOnTrainingController.addUserOnTraining)
router.get('/get-user-trainings-by-user-id/:id', usersOnTrainingController.getUserTrainingsSubscribes)
router.get('/get-user-trainings/:id', usersOnTrainingController.getUserTrainings)
router.delete('/remove-user', usersOnTrainingController.removeUserOnTraining)

module.exports = router