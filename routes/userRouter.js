const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')


router.put('/user-update', userController.updateUser)
router.post('/registration',
    check('username','Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен иметь больше 4 и меньше 30 символов').isLength({min:4, max:30}),
    userController.registration)
router.get('/get-user/:id', userController.getUser)
router.post('/login', userController.login)

module.exports = router