const {Router} = require('express')
const multer = require('multer')
const Post = require('../models/Post')

const upload = multer({dest: 'uploads/'})

const router = Router()

function Empty(obj) {
    for(key in obj) {
        return false
    }
    return true
}

router.post('/add',
    upload.array('files'),
    async (req, res) => {
       try {
            if (!req.body) {
                return res.status(400).json({message: 'Invalid request...'})
            }
            const filename = new Array()
            for(let i = 0; i < req.files.length; i++) {
                filename.push(req.files[i].filename)
            }
            const options = new Object(req.body)
            options.filename = filename
            const post = new Post(options)
            const newPost = await post.createPost()
            if (!Empty(newPost)) {
                return res.status(200).json(newPost)
            } else {
                return res.status(400).json({message: 'Empty object...'})
            }
       } catch (error) {
           return res.status(500).json({message: error.message})
       }
    }
)

router.get('/all', async (req, res) => {
    try {
        const options = new Object()
        const post = new Post(options)
        const posts = await post.getAll()
        if (!posts) {
            return res.status(400).json({message: 'Model error'})
        } else {
            return res.status(200).json(posts)
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.get('/all/:id', async (req, res) => {
    try {
        const options = {
            id: req.params.id,
        }
        const post = new Post(options)
        const current = await post.currentPost()
        if (current.length) {
            return res.status(200).json(current)
        } else {
            return res.status(400).json({message: 'Post doesnt exist...'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.get('/myPosts/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: 'You need auth before can read posts...'})
        }
        const options = {
            userId: req.params.id
        }
        const post = new Post(options)
        const myPosts = await post.myPosts()
        if (myPosts.length) {
            return res.status(200).json(myPosts)
        } else {
            return res.status(400).json({message: 'This user have not posts...'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.post('/myPosts/update', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({message: 'Empty post!'})
        }
        const options = new Object(req.body)
        const post = new Post(options)
        const response = await post.updatePost()
        if (response === undefined) {
            return res.status(400).json({ message: 'Error update post...'})
        } else {
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.post('/myPosts/delete', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({message: 'Cant delete post...'})
        }
        const options = new Object(req.body)
        const post = new Post(options)
        const response = await post.deletePost()
        if (response === undefined) {
            return res.status(400).json({message: 'Cant delete post...'})
        } else {
            return res.status(200).json({message: 'Post has been deleted!'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.post('/search', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({message: 'input some things...'})
        }
        const options = new Object(req.body)
        const post = new Post(options)
        const posts = await post.search()
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

module.exports = router