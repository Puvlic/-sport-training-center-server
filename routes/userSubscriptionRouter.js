const Router = require('express')
const router = new Router()
const userSubscriptionController = require('../controllers/userSubscriptionController')

router.post('/user-subscription/create', userSubscriptionController.createUserSubscription)
router.get('/user-subscription/get-all', userSubscriptionController.getUserSubscriptions)
router.put('/user-subscription/update', userSubscriptionController.updateUserSubscription)
router.delete('/user-subscription/delete/:id', userSubscriptionController.deleteUserSubscription)

module.exports = router