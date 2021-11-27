<template>
    <div class="container">
        <div class="mb-3">
            <input type="text" class="form-control" v-model="searchInput">
            <select class="form-select" aria-label="Default select example" v-model="selection">
                <option :value="{value: 'none'}" selected>none</option>
                <option :value="{value: 'auto'}">Auto</option>
                <option :value="{value: 'appliances'}">Appliances</option>
                <option :value="{value: 'laptops'}">Laptops</option>
            </select>
            <button class="btn btn-success" @click="searchPost">Accept</button>
        </div>
        <ul class="">
            <li class="list-group" v-for="post in posts" :key="post">
                <post :post="post" />
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
            posts: [],
            selection: '',
            searchInput: ''
        }
    },
    
    mounted() {
        this.$nextTick(async () => {
            const response = await this.$axios.get('/api/post/all')
            this.posts = response.data
        })
    },
    methods: {
        async searchPost() {
            try {
                let selector = new String()
                this.selection.value === undefined ? selector = 'none' : selector = this.selection.value
                const params = new Object({
                    selector: selector,
                    input: this.searchInput
                })
                const response = await this.$store.dispatch('Post/searchPost', params)
                this.posts = response
                this.searchInput = ''
            } catch (error) {
                return error
            }
        }
    }
}
</script>

<style scoped>
.container {
    text-decoration: none;
    max-width: 750px;
}
.form-select {
    width: 150px;
}
.form-control {
    width: 600px;
}
</style>