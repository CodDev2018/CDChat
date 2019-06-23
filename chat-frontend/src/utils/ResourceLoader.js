export default {
    async getResouce(path, method, data, headers) {
        try {
            method = !method ? 'GET' : method

            let options = {
                method: method,
                headers: {
                    'Content-type': 'application/json'
                }
            }

            if (data) {
                if (method !== 'GET') {
                    options.body = JSON.stringify(data)
                } else {
                    path += '?' + Object.keys(data)
                        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                        .join('&')
                }
            }

            if (headers) Object.assign(options.headers, headers)

            let response = await fetch('http://127.0.0.1:3030/api' + path, options)
            if (response.status != 200) {
                let err = await response.json()
                throw new Error(err.message)
            }
            return await response.json()
        } catch (err) {
            throw err
        }
    },

    async getProtectedResouce(path, method, data, headers) {
        try {
            let newHeaders = {
                'x-access-token': JSON.parse(sessionStorage.user).token
            }
            if (headers) newHeaders = Object.assign(newHeaders, headers)
            return await this.getResouce(path, method, data, newHeaders)
        } catch (err) {
            throw err
        }
    }
}