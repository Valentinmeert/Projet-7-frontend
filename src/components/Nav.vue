<template>
  <nav class="navbar navbar-expand-lg navbar-dark ">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExample08"
      aria-controls="navbarsExample08"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <a
      class="navbar-brand"
      href="/"
    >
      <img
        src="../assets/icon-left-font-monochrome-white.svg"
        alt=""
        width="100"
        height="100"
      >
    </a>
    <div
      id="navbarsExample08"
      class="collapse navbar-collapse justify-content-md-center"
    >
      <ul class="navbar-nav">
        <li
          v-if="connected"
          class="nav-item active"
        >
          <router-link
            to="/"
            class="nav-link"
          >
            Home
          </router-link>
        </li>
        <li
          v-if="connected"
          class="nav-item active"
        >
          <router-link
            :to="'/user/' + user"
            class="nav-link"
          >
            My Profil
          </router-link>
        </li>
        <li
          v-if="connected"
          class="nav-item active"
        >
          <router-link
            to="/create"
            class="nav-link"
          >
            Create Post
          </router-link>
        </li>
        <li
          v-if="disconnected"
          class="nav-item active"
        >
          <router-link
            to="/signup"
            class="nav-link"
          >
            Signup
          </router-link>
        </li>
        <li
          v-if="disconnected"
          class="nav-item active"
        >
          <router-link
            to="/login"
            class="nav-link"
          >
            Login
          </router-link>
        </li>
        <li
          v-if="connected"
          class="nav-item active"
        >
          <router-link
            :to="'/login'"
            class="nav-link"
          >
            <div @click="disconnect()">
              Logout
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Nav',
  data() {
    return {
      user: sessionStorage.getItem('userId'),
      connected: false,
      disconnected: true,
    };
  },

  created() {
    if (sessionStorage.getItem('userId')) {
      this.connected = true;
      this.disconnected = false;
    }
  },
  methods: {
    disconnect() {
      location.reload();
      sessionStorage.clear();
      this.$router.push('/login');
    },
  },
};

</script>
<style>
nav {
  margin-top: 0;
  margin-bottom: 30px;
  background: linear-gradient(to right, #ff5858, #f857a6);
}
</style>
