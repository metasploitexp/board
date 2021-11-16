const {Router, application} = require('express')
const db = require('../modules/connection')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()

router.post('/register',
[
    check('email', 'Некорректный email').isEmail(),
    check('login', 'Некорректный login').exists(),
    check('password', 'Некорректный password').isLength({min:6})
],

async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({message: 'Ничего не пришло'})
        }
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: 'Некорректные данные при входе в систему', error: error.array()})
        }
        const {email, login, password} = req.body
        const emCandidate = await db.query(`SELECT * FROM login WHERE email="${email}"`)
        const logCandidate = await db.query(`SELECT * FROM login WHERE login="${login}"`)
        
        if (emCandidate.length || logCandidate.length) {
            return res.status(400).json({ message: 'Такой пользователь уже существует'})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        await db.query(`INSERT INTO login SET email="${email}", login="${login}", password="${hashedPassword}"`)
        res.status(200).json({message: 'Пользователь создан'})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.post('/login',
[
    check('login', 'Wrong login').exists(),
    check('password',"Wrong password").exists()
],
async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Ничего не пришло'})
        }
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ message: 'Некорректные данные при входе в систему', error: error.array()})
        }
        const {login, password} = req.body
        const candidate = await db.query(`SELECT * FROM login WHERE login="${login}"`)
        if (!candidate.length) {
            res.status(400).json({message: 'Такого пользователя не существует...'})
        }
        const isMatch = await bcrypt.compare(password, candidate[0].password)
        if (!isMatch) {
            return res.status(400).json({message: 'Не верный пароль!'})
        }
        const token = jwt.sign(
            {userId: candidate[0].id},
            config.get('jwtSecret')
        )
        res.status(200).json({token, userId: candidate[0].ID})
    } catch (e) {
        res.json({message: 'Что-то пошло не так'})
    }
})


module.exports = router