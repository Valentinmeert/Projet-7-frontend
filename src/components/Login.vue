<template>
  <div class="text-center">
    <form
      class="form-signin"
      @submit.prevent.stop="login"
    >
      <img
        class="mb-4"
        src="../assets/icon.png"
        alt=""
        width="72"
        height="72"
      >
      <h1 class="h3 mb-3 font-weight-normal">
        Please sign in
      </h1>
      <label
        for="inputEmail"
        class="sr-only"
      >Email</label>
      <input
        id="inputEmail"
        v-model="email"
        pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,25}"
        type="email"
        name="email"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      >
      <div>
        <label
          for="inputPassword"
          class="sr-only"
        >Password</label>
        <input
          id="inputPassword"
          v-model="password"
          pattern=".{8,}"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        >
      </div>
      <input
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        value="Login"
      >
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (!this.email) return;
      if (!this.password) return;
      const { email, password } = this;
      this.$http
        .post('http://localhost:3000/api/v1/user/login', {
          email,
          password,
        })
        .then((data) => {
          sessionStorage.clear();
          sessionStorage.setItem('jwt', data.body.token);
          sessionStorage.setItem('userId', data.body.userId);
          window.alert('Bienvenue');
          document.location.href = '/';
        });
    },
  },
};
</script>
<style>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  -ms-flex-align: center;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
