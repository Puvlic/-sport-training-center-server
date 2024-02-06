const Router = require('express')
const router = new Router()
const gymController = require('../controllers/gymController')

router.post('/gym/create', gymController.createGym)
router.get('/gym/get_all', gymController.getAllGym)
router.get('/gym/get_one/:id', gymController.getOneGym)
router.put('/gym/update', gymController.updateGym)
router.delete('/gym/delete/:id', gymController.deleteGym)

module.exports = router