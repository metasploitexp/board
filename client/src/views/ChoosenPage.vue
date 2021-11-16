<template>
    <div class="container">
        <div class="title">{{title}}</div> 
        <div class="image" v-if="imgName">
            <img :src="baseUrl + imgName" alt="">
        </div>
        <button @click="moveLeft" class="btn-left btn-floating btn-large waves-effect waves-light amber darken-4"> &LT; </button>
        <button @click="moveRight" class="btn-right btn-floating btn-large waves-effect waves-light amber darken-4">&GT;</button>
        <div class="desc">
            {{description}}
        </div>
        <div class="author">
            Автор: {{author}}
        </div>
    </div> 
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                post: '',
                baseUrl: 'http://localhost:5000/',
                imgName: '',
                title: '',
                description: '',
                author: '',
                index: 0
            }
        },
        mounted() {
            this.$nextTick(async () => {
                const response = await this.$axios.get(`/api/posts/post/${this.id}`)
                this.post = response.data.ads
                this.imgName = this.post[0].image[0]
                this.title = this.post[0].title
                this.description = this.post[0].description
                this.author = this.post[1].login
            })
        },
        methods: {
            moveRight() {
                this.index != this.post[0].image.length-1 ? this.index++ : this.index = 0
                this.imgName = this.post[0].image[this.index]
            },
            moveLeft() {
                this.index === 0 ? this.index = this.post[0].image.length-1 : this.index--
                this.imgName = this.post[0].image[this.index]
            }
        }
    }
</script>

<style scoped>
.title {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 28px;
    margin-left: 300px;
    margin-top: 50px;
}
img {
    max-width: 100%;
    max-height: 100%;
}
.image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
    width: 400px;
    margin-left: 250px;
    margin-top: 20px;
}
.desc {
    font-size: 22px;
}
.author {
    font-size: 20px;
    margin-left: 100px;
    margin-top: 50px;
}
.btn-right {
    position: relative;
    left: 680px;
    bottom: 220px;
}
.btn-left {
    position: relative;
    left: 100px;
    bottom: 220px;
}
</style>