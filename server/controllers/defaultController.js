const User = require('../models/User.js')
const Role = require('../models/Role.js')
const Order = require('../models/Order.js')
const Cell = require('../models/Cell.js')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('../config.js')
const {Schema} = require('mongoose')
const returnError =  require('../helpers/errorHelper.js')

class defaultController {

    async getCells(req, res) {
        try {
            const cells = await Cell.find()
            console.log(cells)
            res.json({cells})
        } catch(e) {returnError(e, res, 400, 'Внутренняя ошибка сервера')}
    }

    async getCellById(req, res) {
        try {
            const cell = await Cell.findById(req.params.id)
            if(!cell) {
                return res.status(400).json({error:{message:'Товар не найден'}})
            }
            res.json({cell})
        } catch(e) {returnError(e, res, 400, 'Внутренняя ошибка сервера')}
    }

    async createOrder(req, res) {
        try {
            const user_data = req.user
            console.log('user_data: ', user_data)          
            const user = await User.findById(user_data.id)
            if(!user) {
                res.status(400).json({error:{message:'Пользователь не найден'}})
            } 
            console.log('req.body.cells: ', req.body.cells) 
            const order = new Order({
                owner_id: user_data.id,
                order_items: req.body.cells
            })
            order.markModified('order_items')
            console.log('order: ', order)
            order.save()
            res.json({order})
        } catch(e) {returnError(e, res, 400, 'Внутренняя ошибка сервера')}
    }

    async MyOrders(req, res) {
        try {
            const user_data = req.user
            console.log(user_data)          
            const user = await User.findById(user_data.id)
            if(!user) {
                res.status(400).json({error:{message:'Пользователь не найден'}})
            }
            const orders = await Order.find({owner_id:{$eq:user._id}})
            res.json({user,orders})
        } catch(e) {returnError(e, res, 400, 'Внутренняя ошибка сервера')}
    }
}
module.exports = new defaultController()