<template>
    <div class="container">
        <div class="findPost">
            <input type="text" placeholder="enter a text" v-model="input">
            <select class="browser-default" v-model="selected">
                <option :value="{value: '1'}">none</option>
                <option :value="{value: '2'}">auto</option>
                <option :value="{value: '3'}">appliances</option>
                <option :value="{value: '4'}">laptops</option>
            </select>
            <button type="button" class=" accept waves-effect waves-light btn-small grey darken-4" @click="submitFind">Accept</button>
            <p v-show="isChange" class="havent">Нет объявлений</p>
        </div>
        <ul>
            <li v-for="post in newPosts" :key="post">
                <post v-bind:post="post" />
            </li>
        </ul>
    </div>
</template>

<script>
    import post from '../components/post.vue'
    export default {
        components: {
            post
        },
        data() {
            return {
                title: '',
                description: '',
                posts: '',
                baseUrl: 'http://localhost:5000/',
                images: [],
                imageName: '',
                post: '',
                selected: '',
                newPosts: [],
                input: '',
                isChange: false
            }
        },
        methods: {
            async submitFind() {
                const category = {select: this.selected.value, input: this.input}
                const response = await this.$axios.post('/api/posts/category', category)
                this.newPosts = response.data.posts
                this.isChange = false
                if (response.data.posts.length == 0 && this.selected.value == 1 && !this.input) {
                    this.newPosts = this.posts
                } else if (this.newPosts.length == 0) {
                    this.isChange = true
                }
                this.input = this.selected.value = ''
            }
        },
        mounted() {
            this.$nextTick(async () => {
                const response = await this.$axios.post('/api/posts/all')
                this.posts = response.data.ads
                this.newPosts = this.posts
            })
        },
    }
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
.container {
   display: block;
   max-width: 750px;
   margin: auto;
   text-decoration: none;
   color: black!important;
   text-shadow: 1px 1px 2px black;
}
button {
    font-size: 28px;
}
.accept {
    font-size: 18px;
}
.browser-default {
    width: 200px;
}
.havent {
    position: relative;
    top: 100px;
    font-size: 30px;
}
</style>