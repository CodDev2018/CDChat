const User = require('./user.schema')

class UserRepository {
    async find(query) {
        try {
            return await User.find(query).sort('name')
                .limit(20).exec()
        } catch (err) {
            throw new Error("Erro ao buscar usuário: " + err.message)
        }
    }

    async findByName(name) {
        try {
            let query = {}
            if (name) {
                let key = new RegExp(name, 'i')
                query.name = key
            }
            return await this.find(query)
        } catch (err) {
            throw new Error("Erro ao buscar usuário por nome: " + err.message)
        }
    }

    async findByEmail(email) {
        try {
            return await User.findOne({
                email: email
            }).exec()
        } catch (err) {
            throw new Error("Erro ao buscar usuário por email: " + err.message)
        }
    }

    async findById(id) {
        try {
            return await User.findById(id).exec()
        } catch (err) {
            throw new Error("Erro ao buscar usuário por id: " + err.message)
        }
    }

    async save(data) {
        try {
            console.log(data)
            if (!data._id) {
                return await User.create(data)
            } else {
                return await User.findByIdAndUpdate(data._id, data)
            }
        } catch (err) {
            throw new Error("Erro ao salvar usuário: " + err.message)
        }
    }

    async delete(id) {
        try {
            return await User.findByIdAndDelete(id)
        } catch (err) {
            throw new Error("Erro ao excluir usuário: " + err.message)
        }
    }
}

module.exports = new UserRepository()