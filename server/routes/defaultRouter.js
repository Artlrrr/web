const Router = require('express')
const router = new Router()
const controller = require('../controllers/defaultController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const idMiddleware = require('../middleware/controls/idMiddleware')

router.get('/cells', controller.getCells)
router.get('/cells/:id', idMiddleware, controller.getCellById)
router.get('/myorders', authMiddleware, controller.MyOrders)
router.post('/createorder', authMiddleware, controller.createOrder)

module.exports = router