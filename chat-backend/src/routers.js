const express = require('express')
const router = express.Router()
const ValidateUser = require('./middlewares/validate_user.middleware')
const UserController = require('./controllers/user.controller')

module.exports = function (io) {
    const ChannelController = require('./controllers/channel.controller')(io)

    router.post('/register', UserController.create)
    router.post('/authenticate', UserController.authenticate)

    router.post('/channels', ValidateUser, ChannelController.create)
    router.get('/channels', ValidateUser, ChannelController.list)
    router.get('/channels/:name', ValidateUser, ChannelController.view)
    router.get('/channels/:name/history/:page', ValidateUser, ChannelController.history)
    router.post('/channels/:name', ValidateUser, ChannelController.send.bind(ChannelController))

    return router
}