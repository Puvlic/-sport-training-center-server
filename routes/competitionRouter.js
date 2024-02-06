const Router = require('express')
const router = new Router()
const competitionController = require('../controllers/competitionController')

router.post(`/create-competition`, competitionController.createCompetition)
router.get(`/get-all-competitions`, competitionController.getAllCompetitions)
router.get(`/get-one-competition/:id`, competitionController.getOneCompetition)
router.put(`/update-competition`, competitionController.updateCompetition)
router.delete(`/delete-competition/:id`, competitionController.deleteCompetition)

module.exports = router