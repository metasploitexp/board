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
],
async (req, res) => {
    try {
        if (!req.body) {
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

module.exports = router