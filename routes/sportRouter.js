const Router = require('express')
const router = new Router()
const sportController = require('../controllers/sportController')

router.post('/sport/create', sportController.createSport)
router.get('/sport/get_all', sportController.getAllSports)
router.get('/sport/get_one/:id', sportController.getOneSport)
router.put('/sport/update', sportController.updateSport)
router.delete('/sport/delete/:id', sportController.deleteSport)

module.exports = router