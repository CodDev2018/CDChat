const ChannelRepository = require('../models/channel.repository')
const UserRepository = require('../models/user.repository')
const moment = require('moment')

class ChannelController {
    constructor(io) {
        this.io = io
    }

    async create(req, res, next) {
        try {
            let admin = await UserRepository.findById(req.body.userId)
            let channel = await ChannelRepository.save({
                name: req.body.name,
                admin: admin
            })
            return res.status(200).json({
                status: "success",
                message: "Canal criado com sucesso!",
                data: {
                    name: channel.name,
                    admin: admin.name
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async list(req, res, next) {
        try {
            let channels = await ChannelRepository.find(req.query.key)
            return res.status(200).json({
                status: "success",
                message: `${channels.length} canais encontrados.`,
                data: channels.map(channel => {
                    return {
                        name: channel.name,
                        admin: channel.admin.name,
                    }
                })
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async view(req, res, next) {
        try {
            let channel = await ChannelRepository.findByName(req.params.name)
            return res.status(200).json({
                status: "success",
                message: `Canal encontrado`,
                data: {
                    name: channel.name,
                    admin: {
                        name: channel.admin.name,
                        email: channel.admin.email
                    }
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async history(req, res, next) {
        try {
            let history = await ChannelRepository.findHistoryByName(req.params.name, req.params.page)
            let data = history.map(msg => {
                let user = msg.user;
                return {
                    id: msg._id,
                    user: {
                        name: user.name,
                        email: user.email
                    },
                    message: msg.message,
                    dataTime: moment(msg.dataTime).format()
                }
            }).reverse()

            return res.status(200).json({
                status: "success",
                message: `Mensagens do canal encontradas`,
                data: data
            })
        } catch (err) {
            next(err)
        }
    }

    async send(req, res, next) {
        try {
            let message = await ChannelRepository.addMessage(req.params.name, req.body.userId, req.body.message)
            this.io.emit('channel '+req.params.name, message)
            return res.status(200).json({
                status: "success",
                message: `Mensagens enviada com sucesso`,
                data: null
            })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = (io) => new ChannelController(io)