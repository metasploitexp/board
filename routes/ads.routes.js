const {Router, application} = require('express')
const db = require('../modules/connection')
const multer = require('multer')

const upload = multer({dest: 'uploads/'})

const router = Router()

router.post('/add',
upload.array('files'),
async (req, res) => {
   try {
    if (!req.body) {
        return res.status(400).json({message: 'Ничего не пришло....'})
    }
    const {title, description, id, category} = req.body
    const filename = []
    for(let i = 0; i < req.files.length; i++) {
        filename.push(req.files[i].filename)
    }
    const files = JSON.stringify(filename)
    const cat = await db.query(`SELECT * FROM category WHERE category="${category}"`)
    const categoryId = cat[0].ID
    const error = await db.query(`INSERT INTO adds SET userId="${id}",
                                title="${title}", 
                                description="${description}", 
                                image=?, category="${categoryId}"`,[files])
    res.status(200).json({message: 'Объявление создано'})
   } catch (error) {
       return res.status(500).json({message: 'Что-то пошло не так...'})
   }
})

router.post('/all', async(req, res) => {
    const ads = await db.query(`SELECT * FROM adds`)
    for(let i = 0; i < ads.length; i++) {
        ads[i].image = JSON.parse(ads[i].image)
    }
    res.status(200).json({ads: ads})
})

router.get('/post/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: 'Nothing to use...'})
        }
        const id = req.params.id
        const ads = await db.query(`SELECT * FROM adds WHERE ID ="${id}"`)
        const userId = ads[0].userId
        const login = await db.query(`SELECT login FROM login WHERE ID="${userId}"`)
        ads[0].image = JSON.parse(ads[0].image)
        ads.push(login[0])
        res.status(200).json({ads})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.get('/myPost/:user', async (req, res) => {
    try {
        if (!req.params.user) {
            return res.status(400).json({message: 'Need a user...'})
        }
        const userId = req.params.user
        const ads = await db.query(`SELECT * FROM adds WHERE userId ="${userId}"`)
        for(let i = 0; i < ads.length; i++) {
            ads[i].image = JSON.parse(ads[i].image)
        }
        res.status(200).json({ads})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.post('/reviewPost', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Не удается изменить, попробуйте еще...'})
        }
        const {ID, userId, title, description, images} = req.body
        const files = JSON.stringify(images)
        const post = await db.query(`UPDATE adds SET userId="${userId}",
                                    title="${title}", 
                                    description="${description}",
                                    image=? WHERE ID="${ID}"`,[files])
        res.status(200).json({message: 'Объявление обновлено!'})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.post('/deletePost', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Ничего не найдено...'})
        }
        const ID = req.body.ID
        await db.query(`DELETE FROM adds WHERE ID="${ID}"`)
        res.status(200).json({message:'Объявление удалено!'})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.post('/category', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({message: 'Выбирете категорию...'})
        }
        const {select, input} = req.body
        const posts = await db.query(`SELECT * FROM adds
                                    WHERE category = '${select}'
                                    AND (title LIKE "%${input}%" OR description LIKE "%${input}")`)
        for(let i = 0; i < posts.length; i++) {
            posts[i].image = JSON.parse(posts[i].image)
        }
        res.status(200).json({posts})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

module.exports = router