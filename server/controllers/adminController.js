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


class adminController {
    async getUsers(req, res) {
        try {          
            const users = await User.find()
            console.log(users)

            res.json({users})
        } catch(e) {returnError(e, res, 400, 'Внутренняя ошибка сервера')}
    }

    async getUserById(req, res) {
        try {          
            const user = await User.findById(req.params.id)
            const orders = await Order.find({owner_id:{$eq:user._id}})
            res.json({user,orders})
        } catch(e) {returnError(e, res, 400, 'Внутренняя ошибка сервера')}
    }

    async createCell(req, res) {
        try {
            //console.log('createItem', req.body)
            const cell = new Cell(req.body.cell)
            cell.save()
            res.json({cell})
        } catch(e) {returnError(e, res, 400, 'Внутренняя ошибка сервера')}
    }

    async updateCell(req, res) {
        try {
            const cell = await Cell.findByIdAndUpdate(req.body.cell._id,
                {
                    ...req.body.cell
                },
                {
                    new:true
                }
            )
            res.json({cell})
        } catch(e) {returnError(e, res, 400, 'Внутренняя ошибка сервера')}
    }

    async deleteCell(req, res) {
        try {
            const cell = await Cell.findById(req.params.id)
            if (!cell) {
                res.status(400).json({error:{message:'Ячейка не найден'}})
            }
            await Cell.findByIdAndDelete(req.params.id)
            res.json(cell)
        } catch (e) {returnError(e, res)}
    }
}
module.exports = new adminController()