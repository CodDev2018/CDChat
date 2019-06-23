const Channel = require('./channel.schema')
const UserRepository = require('./user.repository')

class ChannelRepository {
    async find(key) {
        try {
            let query = {}
            if (key) query.name = new RegExp(key, 'i')
            return await Channel.find(query).populate({
                path: 'admin'
            }).sort('name').limit(20).exec()
        } catch (err) {
            throw new Error("Erro ao buscar canal: " + err.message)
        }
    }

    async findByName(name) {
        try {
            let query = {
                name: name
            }
            return await Channel.findOne(query, {
                history: {
                    $slice: 0
                }
            }).populate({
                path: 'admin'
            }).exec()
        } catch (err) {
            throw new Error("Erro ao buscar canal por nome: " + err.message)
        }
    }

    async findHistoryByName(name, page) {
        try {
            let query = {
                name: name
            }
            let inicio = 20 * page
            let fim = 20
            let channel = await Channel.findOne(query, {
                history: {
                    $slice: [inicio, fim]
                }
            }).populate({
                path: 'history.user'
            }).exec()

            return channel.history
        } catch (err) {
            throw new Error("Erro ao buscar histórico do canal pelo nome do canal: " + err.message)
        }
    }

    async findById(id) {
        try {
            return await Channel.findById(id).exec()
        } catch (err) {
            throw new Error("Erro ao buscar canal por id: " + err.message)
        }
    }

    async save(data) {
        try {
            if (!data._id) {
                return await Channel.create(data)
            } else {
                return await Channel.findByIdAndUpdate(data._id, data)
            }
        } catch (err) {
            throw new Error("Erro ao salvar canal: " + err.message)
        }
    }

    async delete(channelName, userId) {
        try {
            let channel = await this.findByName(channelName)
            if (channel.admin.toString() != userId) {
                throw new Error("Apenas o administrador pode excluir o próprio canal.")
            }
            return await channel.remove()
        } catch (err) {
            throw new Error("Erro ao excluir canal: " + err.message)
        }
    }

    async addMessage(channelName, senderId, message) {
        try {
            let sender = await UserRepository.findById(senderId)
            let channel = await Channel.findOne({
                name: channelName
            })
            let newMessage = {
                user: sender,
                message: message,
                dateTime: new Date()
            }

            channel.history.unshift(newMessage)
            await channel.save()
            return newMessage
        } catch (err) {
            throw new Error("Erro ao adicionar nova mensagem ao canal: " + err.message)
        }
    }
}

module.exports = new ChannelRepository()