<<<<<<< HEAD
const {Router} = require('express')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')

const router = Router()

function Empty(obj) {
    for(key in obj) {
        return false
    }
    return true
}

router.post('/register',
[
    check('email', 'Wrong email adress!').exists().isEmail(),
    check('login', 'Wrong login!').exists(),
    check('password', 'Wrong password!').isLength({min: 6})
],
async (req, res) => {
try {
    if (!req.body) {
        res.status(400).json({message: 'Invalid body...'})
    }
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.status(400).json({message: error.array()})
    }
    const options = {
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    }
    const user = new User(options)
    const newUser = await user.register()
    if (!Empty(newUser)) {
        return res.status(200).json({message: 'User has been created!'})
    } else {
        return res.status(400).json({message: 'Such user already exists...'})
    }
} catch (error) {
    return res.status(500).json({message: error.message})
}
})

router.post('/logIn',
[
    check('login', 'Enter your login...').exists(),
    check('password', 'Min length is 6 symbols...').isLength({min: 6})
=======
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
>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d
],
async (req, res) => {
    try {
        if (!req.body) {
<<<<<<< HEAD
            return res.status(400).json({message: 'Enter data...'})
        }
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({message: error.array()})
        }
        const options = {
            login: req.body.login,
            password: req.body.password
        }
        const user = new User(options)
        const newUser = await user.logIn()
        if (!Empty(newUser)) {
            return res.status(200).json(newUser)
        } else {
            return res.status(400).json({message: 'User is not exist!'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
)
=======
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

>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d

module.exports = router