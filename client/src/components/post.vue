<template>
    <div>
        <router-link :to="{name: 'id', params: {id}}"><h5>{{title}}</h5></router-link>
        <br>
        <div class="image">
            <img :src="baseUrl + image" alt="" >
        </div>
        <button @click="moveRight" class="btn-right btn-floating btn-large waves-effect waves-light amber darken-4">&GT;</button>
        <button @click="moveLeft" class="btn-left btn-floating btn-large waves-effect waves-light amber darken-4"> &LT; </button>
        <hr>
    </div>
</template>

<script>
    export default {
        props: {
            post: Object,
        },
        data () {
            return {
                title: this.post.title,
                description: this.post.description,
                image: this.post.image[0],
                baseUrl: 'http://localhost:5000/',
                index: 0,
                id: this.post.ID
            }
        },
        methods: {
            moveRight() {
                if (this.index != this.post.image.length-1) {
                    this.index++
                } else {
                    this.index = 0
                }
                this.image = this.post.image[this.index]
            },
            moveLeft() {
                if (this.index === 0) {
                    this.index = this.post.image.length-1
                } else {
                    this.index--
                }
                this.image = this.post.image[this.index]
            },
        }
    }
</script>

<style scoped>
button {
    font-size: 30px;
}
img {
    max-width: 100%;
    max-height: 100%;
}
.image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
    margin-left: 250px;
}
.btn-right {
    position: relative;
    left: 500px;
    bottom: 120px;
}
.btn-left {
    position: relative;
    left: 100px;
    bottom: 120px;
}
h5 {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    margin-right: 50px;
}
.about {
    font-size: 18px;
    left: 190px;
}

</style>