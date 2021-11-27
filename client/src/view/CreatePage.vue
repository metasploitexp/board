<template>
    <form class="container" @submit.prevent="onSubmit">
        <h2>Create Post</h2>
        <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputEmail3" v-model="title">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputPassword3" v-model="description">
            </div>
        </div>
        <fieldset class="row mb-3">
            <div class="col-md-3 files">
                <label for="inputState" class="form-label">Category</label>
                <select id="inputState" class="form-select" v-model="selected">
                    <option :value="{value: 'none'}" selected>none...</option>
                    <option :value="{value: 'auto'}">Auto</option>
                    <option :value="{value: 'appliances'}">Appliances</option>
                    <option :value="{value: 'laptops'}">Laptops</option>
                </select>
                <input type="file"
                ref="files"
                @change="handleFileUpload()"
                multiple
                accept="image/*"
                class="invisible"
                > 
            </div>
        </fieldset>
        <div class="filesListing" v-for="(file, key) in files" :key="file" > 
            {{file.name}}
            <button class="btn btn-danger" @click="removeFiles(key)"> Remove </button>
        </div>
        <button type="button" @click="addFiles" class="btn btn-warning">Add files</button>   &nbsp;
        <button type="submit" class="btn btn-success">Create</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            selected: '',
            files: [],
            title: '',
            description: ''
        }
    },
    methods: {
        onSubmit() {
            const options = new Object({
                title: this.title,
                description: this.description,
                files: this.files,
                category: this.selected.value
            })
            this.$store.dispatch('Post/create', options)
            this.title = this.selected = this.description = ''
            this.files = []
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
.container {
    max-width: 750px;
    position: relative;
    top: 50px;
}
h2 {
    position: relative;
    left: 200px;
    bottom: 30px;
}
.invisible {
    position: absolute;
    top: -500px;
}
.files {
    display: inline-block;
    
}
</style>