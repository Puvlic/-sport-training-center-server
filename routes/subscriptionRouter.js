const Router = require('express')
const router = new Router()
const subscriptionController = require('../controllers/subscriptionController')

router.post('/create_subscription', subscriptionController.createSubscription)
router.get('/get_one_subscription/:id', subscriptionController.getOneSubscription)
router.get('/get-all-subscriptions', subscriptionController.getAllSubscriptions)
router.put('/update-subscription', subscriptionController.updateSubscription)
router.delete('/delete-subscription', subscriptionController.deleteSubscription)

module.exports = router