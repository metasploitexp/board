<template>
    <div class="container card">
        <div class="image">
            <img :src="baseUrl + image" alt="" class="card-img-top">
        </div>
        <button @click="moveRight" class="btn-right btn btn-secondary">&GT;</button>
        <button @click="moveLeft" class="btn-left btn btn-secondary"> &LT; </button>
        <h5 class="card-title">{{title}}</h5>
        <router-link :to="{name: 'id', params: {id}}"><h5 class="btn btn-info link">About</h5> </router-link>
    </div>
</template>

<script>
export default {
    props: {
        post: Object
    },
    data() {
        return {
            title: this.post.title,
            description: this.post.description,
            id: this.post.ID,
            image: this.post.image[0],
            baseUrl: 'http://localhost:5000/',
            index: 0
        }
    },
    methods: {
        moveRight() {
            this.index != this.post.image.length-1 ? this.index++ : this.index = 0
            this.image = this.post.image[this.index]
        },
        moveLeft() {
            this.index === 0 ? this.index = this.post.image.length-1 : this.index--
            this.image = this.post.image[this.index]
        }
    }
}
</script>

<style scoped>
.container {
    text-decoration: none;
}
.image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    position: relative;
    left: 150px;
}
img {
    max-width: 100%;
    max-height: 100%;
}
.card-title {
    position: relative;
    text-align: center;
    font-size: 28px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    bottom: 100px;
}
.link {
    position: relative;
    left: 280px;
    bottom: 70px;;
}
.btn-left {
    width: 50px;
    position: relative;
    bottom: 250px;
}
.btn-right {
    width: 50px;
    position: relative;
    bottom: 210px;
    left: 620px;
}
</style>