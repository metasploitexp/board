<template>
<<<<<<< HEAD
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
=======
    <nav>
    <div class="nav-wrapper orange darken-4">
      <router-link class="brand-logo" :to='{name: "all"}'> Board </router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link :to='{name: "all"}'> Объявления </router-link></li>
        <li><router-link :to='{name: "ads"}'> Создать </router-link></li>
        <li><router-link :to="{name: 'user', params: {user}}">Мои объявления</router-link></li>
        <li><router-link :to='{name: "auth"}' @click="logOut">{{login}} </router-link> </li>
      </ul>
    </div>
  </nav>
</template>

<script>
    export default {
        data() {
            return {
                user: this.$store.state.User.id,
            }
        },
        methods: {
            logOut() {
                this.$store.dispatch('User/logOut')
            }
        },
        computed: {
            login: function () {
                console.log('obj:', this.$store.state.User)
                return this.$store.state.User.isAuthenticated ? 'Выход' : 'Вход'
            }
        }
    }
</script>

<style scoped>

>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d
</style>