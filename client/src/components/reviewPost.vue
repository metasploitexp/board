<template>
    <div class="container">
        <div class="row">
            {{title}}
            <input v-model="title" v-show="isChange">
        </div>
        <div>
            <ul>
                <li v-for="(image, index) in images" :key="image">
                    <div class="image">
                        <img :src="baseUrl + image" alt="">
                    </div>
                     <button class="waves-effect waves-light btn-small grey darken-4"
                        @click="removeImage(index)"
                        v-show="isChange">
                        Remove</button>
                </li>
            </ul>
            <input type="file" class="hidden"
            accept="image/*"
            ref="files"
            multiple
            @click="uploadImage()"
            >
            <i v-show="isChange" class="plus">Upload files: </i>
            <a v-show="isChange" class="btn-floating btn-large waves-effect grey darken-4">
            <i @click="addFiles"><strong class="plus">+</strong></i>
            </a>
        </div>
        <div class="description">
            {{description}}
            <input type="text" v-model="description" v-show="isChange">
        </div>
        <button type="button" 
        class="waves-effect waves-light btn-small brown darken-4"
        @click="changeBtn"
        >
        {{change}}
        </button> &nbsp;
        <button class="waves-effect waves-light btn-small blue darken-4" 
        v-show="isChange"
        @click="submitChange"
        >Accept</button> &nbsp;
        <button class="waves-effect waves-light btn-small red" 
        v-show="isChange"
        @click="deletePost"
        >Delete</button>
        <hr>
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
                images: this.post.image,
                baseUrl: 'http://localhost:5000/',
                isChange: false,
                newPosts: [],
                files: []
            }
        },
        computed: {
            change: function() {
                return this.isChange ? 'unchange' : 'change'
            }
        },
        methods: {
            changeBtn() {
                this.isChange = !this.isChange
            },
            removeImage(index) {
                this.images.splice(index, 1)
            },
            async submitChange() {
                const newPost = {
                    ID: this.post.ID,
                    description: this.description,
                    title: this.title,
                    userId: this.post.userId,
                    images: this.images,
                }
                const response = await this.$axios.post(`/api/posts/reviewPost`, newPost)
                console.log(response.data)
            },
            uploadImage() {
                let uploadFiles = this.$refs.files.files
                for(let i=0; i < uploadFiles.length; i++) {
                    this.files.push(uploadFiles[i])
                }
            },
            addFiles() {
                this.$refs.files.click()
            }, 
            async deletePost() {
                const ID = { ID: this.post.ID }
                const response = await this.$axios.post('/api/posts/deletePost', ID)
                console.log(response.data)
                this.title = this.description = this.images = ''
                this.isChange = false
            }
        }
    }
</script>

<style scoped>
.container {
    margin-top: 50px;   
    display: block;
}
.row {
    font-size: 28px;
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
}
.hidden {
    position: absolute;
    top: -500px;
}
</style>