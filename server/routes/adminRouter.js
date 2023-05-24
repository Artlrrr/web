const Router = require('express')
const router = new Router()
const controller = require('../controllers/adminController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const idMiddleware = require('../middleware/controls/idMiddleware')

router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)
router.get('/users/:id', roleMiddleware(['ADMIN']), idMiddleware, controller.getUserById)
router.post('/cells/create', roleMiddleware(['ADMIN']), controller.createCell)
router.put('/cells/update', roleMiddleware(['ADMIN']), controller.updateCell)
router.delete('/cells/:id', roleMiddleware(['ADMIN']), idMiddleware, controller.deleteCell)

module.exports = router