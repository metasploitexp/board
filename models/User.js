const db = require('../modules/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

class User {
    constructor(options) {
        this.email = options.email
        this.login = options.login
        this.password = options.password
    }
    async register() {
        try {
            const candidate = await db.query(`SELECT * FROM login WHERE email = '${this.email}' OR login = '${this.login}'`)
            if (candidate.length) {
                return {} = new Object() 
            }
            const hashedPassword = await bcrypt.hash(this.password, 12)
            await db.query(`INSERT INTO login SET email="${this.email}", login="${this.login}", password="${hashedPassword}"`)
            return {email:this.email, password: hashedPassword, login: this.login}
        } catch (error) {
            return {message: error.message}
        }
    }
    async logIn() {
        try {
            const candidate = await db.query(`SELECT * FROM login WHERE login="${this.login}"`)
            if (!candidate.length) {
               return {} = new Object()
            }
            const isMatch = await bcrypt.compare(this.password, candidate[0].password)
            if (!isMatch) {
                return {} = new Object()
            }
            const token = jwt.sign({
                userId: candidate[0].ID,
            }, config.get('jwtSecret'))
            return {userId: candidate[0].ID, token}
        } catch (error) {
            return {message: error.message}
        }
    }
}

module.exports = User