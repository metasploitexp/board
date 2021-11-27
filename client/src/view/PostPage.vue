<template>
    <div class="container card">
        <h5 class="card-title">{{title}}</h5>
        <div class="image" v-if="image">
            <img :src="baseUrl + image" alt="" class="card-img-top">
        </div>
        <button @click="moveRight" class="btn-right btn btn-secondary">&GT;</button>
        <button @click="moveLeft" class="btn-left btn btn-secondary"> &LT; </button>
        <p class="description">
            {{currentPost.description}}
        </p>
        <div class="author">
            Author: &nbsp; {{login}}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            baseUrl: 'http://localhost:5000/',
            currentPost: '',
            image: '',
            index: 0,
            isChange: false,
            title: '',
            login: ''
        }
    },
    mounted() {
        this.$nextTick(async () => {
            const postId = this.$route.params.id
            const post = await this.$store.dispatch('Post/getPost', {postId: postId})
            this.currentPost = post[0]
            this.image = this.currentPost.image[0]
            this.title = this.currentPost.title
            this.login = post[1].login
        })
    },
    methods: {
        moveRight() {
            this.index != this.currentPost.image.length-1 ? this.index++ : this.index = 0
            this.image = this.currentPost.image[this.index]
        },
        moveLeft() {
            this.index === 0 ? this.index = this.currentPost.image.length-1 : this.index--
            this.image = this.currentPost.image[this.index]
        },
        change() {
            this.isChange = !this.isChange

        }
    }
}
</script>

<style scoped>
.container {
    max-width: 750px;
}
.image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 500px;
    position: relative;
    left: 100px;
}
img {
    max-width: 100%;
    max-height: 100%;
}
.btn-left {
    position: relative;
    width: 50px;
    bottom: 300px;
}
.btn-right {
    position: relative;
    width: 50px;
    bottom: 260px;
    left: 650px;
}
.card-title {
    position: relative;
    font-size: 34px;
    left: 300px;
    top: 50px;
}
.description {
    font-size: 22px;
    position: relative;
    bottom: 150px;
}
.change {
    width: 90px;
    position: relative;
    left: 200px;
}
.input-group {
    position: relative;
    top: 50px;
    max-width: 500px;
    left: 100px;
}
.author {
    text-align: right;
    font-size: 18px;
}
</style>