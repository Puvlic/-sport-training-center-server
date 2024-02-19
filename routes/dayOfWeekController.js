const Router = require('express')
const router = new Router()
const dayOfWeekController = require('../controllers/dayOfWeekController')

router.get('/gym/get_all', dayOfWeekController.getAllDays)
router.get('/gym/get_one/:id', dayOfWeekController.getOneDay)

module.exports = router