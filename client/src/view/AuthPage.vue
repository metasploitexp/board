<template>
    <form action="" class="container" @submit.prevent="onSubmit">
         <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">login</label>
            <input type="login" class="form-control" 
            placeholder="login" v-model="login" required> <br>
            <label for="exampleFormControlInput1" class="form-label">password</label>
            <input type="password" class="form-control" 
            placeholder="password" v-model="password" required>
        </div> <br>
        <button type="submit" class="btn btn-success">Accept</button> &nbsp;
        <button type="button" class="btn btn-secondary" @click="redirect">Sign up</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            login: '',
            password: '',
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('User/logIn', {
                login: this.login,
                password: this.password
            })
            this.login = this.password = ''
        },
        redirect() {
            this.$router.push({name: 'register', query: {redirect: '/register'}})
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
</style>