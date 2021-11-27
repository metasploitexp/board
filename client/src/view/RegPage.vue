<template>
    <form action="" class="container" @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control"  
            placeholder="email" v-model="email" required>
            <label for="exampleFormControlInput1" class="form-label">login</label>
            <input type="login" class="form-control" 
            placeholder="login" v-model="login" required>
            <label for="exampleFormControlInput1" class="form-label">password</label>
            <input type="password" class="form-control" 
            placeholder="password" v-model="password" required>
            <label for="exampleFormControlInput1" class="form-label">repeat password</label>
            <input type="password" class="form-control"  
            placeholder="repeat" v-model="repeat" required>
        </div>
        <button type="submit" class="btn btn-success">Accept</button> &nbsp;
        <button type="button" class="btn btn-secondary" @click="redirect">Log In</button>
    </form>
</template>

<script>
    export default {
       data() {
           return {
                email: '',
                login: '',
                password: '',
                repeat: '',
           }
       },
       methods: {
           onSubmit() {
               if (this.password === this.repeat) {
                   this.$store.dispatch('User/register', {
                        email: this.email,
                        login: this.login,
                        password: this.password
                    })
               } else {
                   console.log('Wrong repeat password!')
               }
               this.email = this.login = this.password = this.repeat = ''
           },
           redirect() {
                this.$router.push({name: 'auth', query: {redirect: '/auth'}})
            }
       }
    }
</script>

<style scoped>
.container{
    max-width: 750px;
    position: relative;
    top: 50px;
}
</style>