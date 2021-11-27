<template>
    <div class="container">
        <ul>
            <li v-for="(post, index) in myPosts" :key="post" class="card">
                <p class="title">{{post.title}}</p>
                <div class="titleInput" v-show="isChange">
                    <input type="text" v-model="post.title">
                </div>
                <div class="image" v-for="(image, i) in post.image" :key="image"> 
                    <img :src="baseUrl + image" alt=""> 
                    <button class="btn btn-danger del" @click="onDelete(index, i)" v-show="isChange">Delete</button>
                </div>
                <p class="description">{{post.description}}</p>
                <div class="descInput" v-show="isChange">
                    <input type="text" v-model="post.description">
                </div>
                <div v-show="isChange">
                    <select class="form-select" aria-label="Default select example" v-model="selected">
                        <option :value="{value: 'none'}" selected>none</option>
                        <option :value="{value: 'auto'}">Auto</option>
                        <option :value="{value: 'appliances'}">Appliances</option>
                        <option :value="{value: 'laptops'}">Laptops</option>
                    </select>
                </div>
                <p class="author"></p>
                <button type="button" class="btn btn-warning change" @click="changePost">{{butName}}</button>
                <button class="btn btn-success sub" @click="onSubmit(index)" v-show="isChange">Submit</button>
                <button class="btn btn-danger rem" @click="onRemove(index)" v-show="isChange">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            myPosts: [],
            baseUrl: 'http://localhost:5000/',
            image: '',
            isChange: false,
            title: '',
            selected: ''
        }
    },
    mounted() {
        this.$nextTick(async () => {
            try {
                const id = localStorage.getItem('id')
                if (id) {
                    const response = await this.$store.dispatch('Post/getMyPosts', {id})
                    this.myPosts = response
                } 
            } catch (error) {
                return error
            }
        })
    },
    methods: {
        changePost() {
            this.isChange = !this.isChange
        },
        onSubmit(index) {
            let category = ''
            this.selected.value === undefined ? category = 'none' : category = this.selected.value
            const post = new Object({
                title: this.myPosts[index].title,
                description: this.myPosts[index].description,
                ID: this.myPosts[index].ID,
                userId: this.myPosts[index].userId,
                image: this.myPosts[index].image,
                category: category
            })
            this.$store.dispatch('Post/updatePost', post)
        },
        onRemove(index) {
            const post = new Object({
                ID: this.myPosts[index].ID,
            })
            this.myPosts.splice(index, 1)
            this.$store.dispatch('Post/deletePost', post)
        },
        onDelete(index, i) {
            this.myPosts[index].image.splice(i,1)
        }
    },
    computed: {
        butName: function () {
            return this.isChange ? 'unchange' : 'change'
        }
    }
}
</script>

<style scoped>
.image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 300px;
    position: relative;
    left: 280px;
}
img {
    max-width: 100%;
    max-height: 100%;
}
.title {
    position: relative;
    text-align: center;
    font-size: 30px;
}
.description {
    text-align: center;
    font-size: 22px;
    position: relative;
}
.change {
    width: 100px;
    position: relative;
    left: 400px;
    top: 0px;
}
.titleInput {
    position: relative;
    left: 250px;
    
}
input {
    width: 500px;
}
button {
    width: 100px;
}
.sub {
    position: relative;
    left: 550px;
    bottom: 48px;
}
.rem {
    position: relative;
    left: 670px;
    bottom: 87px;
}
.del {
    position: relative;
    left: 100px;
}
.descInput {
    position: relative;
    left: 250px;
}
.form-select {
    width: 200px;
    position: relative;
    left: 300px;
    top: 10px;
}
</style>