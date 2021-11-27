const db = require('../modules/connection')

class Post {
    constructor(options) {
        this.options = options
    }
    async createPost() {
        try {
            const files = JSON.stringify(this.options.filename)
            const cat = await db.query(`SELECT * FROM category WHERE category="${this.options.category}"`)
            const categoryId = cat[0].ID
            await db.query(`INSERT INTO adds SET userId="${this.options.id}", title="${this.options.title}", 
            description="${this.options.description}", image=?, category="${categoryId}"`, [files])
            const post = this.options
            return post
        } catch (error) {
            return {} = new Object()
        }
    }
    async getAll() {
        try {
            const posts = await db.query(`SELECT * FROM adds`)
            for(let i = 0; i < posts.length; i++) {
                posts[i].image = JSON.parse(posts[i].image)
            }
            return posts
        } catch (error) {
            return false
        }
    }
    async currentPost() {
        try {
            const post = await db.query(`SELECT * FROM adds WHERE ID="${this.options.id}"`)
            post[0].image = JSON.parse(post[0].image)
            const user = await db.query(`SELECT login FROM login WHERE ID="${post[0].userId}"`)
            if (post.length) {
                post.push(user[0])
            }
            return post
        } catch (error) {
            return [] = new Array()
        }
    }
    async myPosts() {
        try {
            const posts = await db.query(`SELECT * FROM adds WHERE userId="${this.options.userId}"`)
            for(let i = 0; i < posts.length; i++) {
                posts[i].image = JSON.parse(posts[i].image)
            }
            if (posts.length) {
                return posts
            } else {
                return [] = new Array()
            }
        } catch (error) {
            return [] = new Array()
        }
    }
    async updatePost() {
        try {
            const cat = await db.query(`SELECT ID FROM category WHERE category="${this.options.category}"`)
            const files = JSON.stringify(this.options.filename)
            const post = await db.query(`UPDATE adds SET userId="${this.options.userId}", 
                                        title="${this.options.title}", description="${this.options.description}", 
                                        category="${cat[0].ID}",
                                        image=? WHERE ID="${this.options.ID}"`, [files])
            return post
        } catch (error) {
            return [] = new Array()
        }
    }
    async deletePost() {
        try {
            const response = await db.query(`DELETE FROM adds WHERE ID="${this.options.ID}"`)
            return response
        } catch (error) {
            return {} = new Object()
        }
    }
    async search() {
        try {
            const category = await db.query(`SELECT ID FROM category WHERE category="${this.options.selector}"`)
            const post = await db.query(`SELECT * FROM adds WHERE category="${category[0].ID}" AND 
                                        (title LIKE "%${this.options.input}%" OR description LIKE "%${this.options.input}%")`)
            for (let i = 0; i < post.length; i++) {
                post[i].image = JSON.parse(post[i].image)
            }
            return post
        } catch (error) {
            return undefined
        }
    }
}

module.exports = Post