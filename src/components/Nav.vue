<template>
  <nav class="navbar navbar-expand-lg navbar-dark ">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
      <a class="navbar-brand" href="/">
<img  src="../assets/icon-left-font-monochrome-white.svg" alt="" width="100" height="100">
    </a>
    <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link to="/" class="nav-link" 
            >Home</router-link
          >
        </li>
        <li class="nav-item active">
          <router-link to="/signup" class="nav-link" 
            >Signup</router-link
          >
        </li>
        <li class="nav-item active">
          <router-link to="/login" class="nav-link" 
            >Login</router-link
          >
        </li>
        <li class="nav-item active">
          <router-link
            :to="'/user/' + user"
            class="nav-link" 
            
            >My Profil</router-link
          >
        </li>
        <li class="nav-item active" >
          <router-link to="/create" class="nav-link" 
            >Create Post</router-link
          >
        </li>
        <li class="nav-item active">
          <router-link
            :to="'/login'"
            class="nav-link"
          >
            <div @click="disconect()">Logout</div>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Nav',
  data(){
    return {
      user: localStorage.getItem('userId'),
    };
  },
  

  methods: {
    disconect() {
      localStorage.clear().then(next());
    },
  },
};

</script>
<style>
nav {
  margin-top: 0px;
  margin-bottom: 30px;
  background: linear-gradient(to right, #ff5858, #f857a6);
}
</style>
