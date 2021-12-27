<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <p class="name">Board</p> &nbsp;
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <router-link :to="{name: 'all'}" class="nav-link active">
                Объявления </router-link>
                <router-link :to="{name: 'create'}" class="nav-link active">
                Создать </router-link>
                <router-link :to="{name: 'myPosts'}" class="nav-link active">
                Мои объявления </router-link>
                </div>
            </div>
            <button class="btn btn-outline-success" type="button" @click="logOut">{{login}}</button>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('User/logOut')
        }
    },
    computed: {
        login: function () {
            return this.$store.state.User.isAuthenticated ? 'log Out' : 'Log In'
        }
    }
}
</script>

<style scoped>
nav {
    background-color: #000;

}
.name {
    color: #fff;
    font-size: 30px;
    position: relative;
    top: 5px;
}
</style>