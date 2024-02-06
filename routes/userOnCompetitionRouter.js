const Router = require('express')
const router = new Router()
const userOnCompetitionController = require('../controllers/userOnCompetitionController')

router.post('/add-user-on-competition', userOnCompetitionController.addUser)
router.delete('/remove-user-on-competition', userOnCompetitionController.removeUser)
router.get('/get-user-on-competition/:id', userOnCompetitionController.getUserOnCompetition)

module.exports = router