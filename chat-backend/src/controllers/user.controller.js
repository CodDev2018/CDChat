const UserRepository = require('../models/user.repository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    async create(req, res, next) {
        try {
            let user = await UserRepository.save({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            })
            return res.json({
                status: "success",
                message: "Usuário criado com sucesso!",
                data: {
                    name: user.name,
                    email: user.email
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async authenticate(req, res, next) {
        try {
            let user = await UserRepository.findByEmail(req.body.email)
            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "Email não encontrado!",
                    data: null
                })
            }
            let passwordIsValid = await bcrypt.compare(req.body.password, user.password)
            if (!passwordIsValid) {
                return res.status(404).json({
                    status: "error",
                    message: "Senha não confere!",
                    data: null
                })
            }

            const token = jwt.sign({
                    id: user._id
                },
                process.env.SECRET, {
                    expiresIn: '1d'
                }
            )

            return res.status(200).json({
                status: "success",
                message: "Usuário autenticado com sucesso!",
                data: {
                    user: {
                        name: user.name,
                        email: user.email,
                    },
                    token: token
                }
            })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new UserController()