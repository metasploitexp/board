<template>
    <div class="container">
        <ul>
            <li v-for="post in posts" :key="post">
                <reviewPost v-bind:post="post" />
            </li>
        </ul>
    </div>
</template>

<script>

    import reviewPost from '../components/reviewPost.vue'
    export default {
        components: {
            reviewPost
        },
        data() {
            return {
                userId: this.$route.params.user,
                posts: [],
                post: ''
            }
        },
        mounted() {
            this.$nextTick(async () => {
                const response = await this.$axios.get(`/api/posts/myPost/${this.userId}`)
                this.posts = response.data.ads
            })
        }
    }
    
</script>