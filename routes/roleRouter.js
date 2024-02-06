const Router = require('express')
const router = new Router()
const roleController = require('../controllers/roleController')

router.post('/role/create', roleController.createRole)
router.get('/role/get-one/:id', roleController.getOneRole)
router.get('/role/get-all', roleController.getAllRoles)
router.delete('/role/delete/:id', roleController.deleteRole)

module.exports = router