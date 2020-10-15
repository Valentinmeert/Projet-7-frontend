<template>
  <nav class="navbar navbar-expand-lg justify-content-between py-5">
    <a class="navbar-brand" href="/">
      <!-- <img
        src="/frontend/img/icon.png"
        width="200"
        height="200"
        class="d-inline-block align-top"
        alt=""
      /> -->
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/signup" class="btn btn-outline-light" type="button"
            >Signup</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login" class="btn btn-outline-light" type="button"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :to="'/login'"
            class="btn btn-outline-light"
            type="button"
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
      user:{},
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
  background-color: rgb(51, 119, 255);
}
</style>
