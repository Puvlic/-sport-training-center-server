const Router = require('express')
const router = new Router()
const organizerController = require('../controllers/organizerController')

router.post(`/create-organizer`, organizerController.createOrganizer)
router.get(`/get-all-organizers`, organizerController.getAllOrganizers)
router.get(`/get-one-organizer/:id`, organizerController.getOneOrganizer)
router.put(`/update-organizer`, organizerController.updateOrganizer)
router.delete(`/delete-organizer/:id`, organizerController.deleteOrganizer)

module.exports = router