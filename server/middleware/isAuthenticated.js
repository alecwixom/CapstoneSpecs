require('dotenv').config()
//requires the dotenv ^
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')
// Assigns the headerToken ^
        if (!headerToken) {
            // if the headerToken does not exist it will log an error
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            console.log(jwt.decode(headerToken));
            token = jwt.verify(headerToken, SECRET)
            //verify's the token
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            //if no token it will also log an error
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}