<template>
    <div>
        <form class="container" @submit.prevent="onSubmit"  enctype="multipart/form-data">
            <input type="text" class="col s6" :placeholder="titleHolder" v-model="title" required>
            <input type="text" class="col s6" :placeholder="descHolder" v-model="description">
            <input type="file"
            ref="files"
            @change="handleFileUpload()"
            multiple
            accept="image/*"
            class="invisible"
            >
            <i class="plus">Upload files: </i>
            <a class="btn-floating btn-large waves-effect orange darken-4">
            <i @click="addFiles"><strong class="plus">+</strong></i>
            </a> &nbsp;
            <div>
                <i class="plus">Choose category: </i>
                <select class="browser-default" v-model="selected">
                    <option :value="{value: 'none'}" >Choose your category</option>
                    <option :value="{value: 'auto'}">Auto</option>
                    <option :value="{value: 'appliances'}">Appliances</option>
                    <option :value="{value: 'laptops'}">Laptops</option>
                </select>
            </div>
            <br>
            <button class="btn orange darken-4" type="submit">Add</button>
        </form>
        <div class="filesListing" v-for="(file, key) in files" :key="file" > 
            {{file.name}}
            <button class="waves-effect waves-light btn-small red accent-4" @click="removeFiles(key)"> Remove </button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                titleHolder: 'Enter title...',
                descHolder: 'Enter description...',
                title: '',
                description: '',
                files: [],
                selected: ''
            }
        },
        methods: {
            async onSubmit() {
                    const fd = new FormData()
                    for(let i = 0; i < this.files.length; i++) {
                        let file = this.files[i]
                        fd.append(`files`, file)
                    }
                    fd.append('title',this.title)
                    fd.append('description',this.description)
                    fd.append('id',this.$store.state.User.id)
                    fd.append('category', this.selected.value)
                    const response = await this.$axios.post('/api/posts/add', fd)
                    console.log('response:', response.data)
                    this.title = this.description = ''
            },
            handleFileUpload() {
                let uploadFiles = this.$refs.files.files
                for(let i = 0; i < uploadFiles.length; i++) {
                    this.files.push(uploadFiles[i])
                }
            },
            addFiles() {
                this.$refs.files.click()  
            },
            removeFiles(key) {
                this.files.splice(key, 1)
            }
        }
    }
</script>

<style scoped>

input {
    color: black;
    width: 500px;
}
.button {
    border-radius: 50%!important;
}
.invisible {
    position: absolute;
    top: -500px;
}
.plus {
    font-size: 24px;
}
.filesListing {
    margin-top: 30px;
}
.browser-default {
    width: 200px;
}
</style>