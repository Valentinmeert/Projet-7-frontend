<template>
  <div class="text-center">
    <form
      class="form-updatePassword"
      @submit.prevent.stop="login"
    >
      <label for="newPassword" />
      <input
        id="newPassword"
        v-model="newPassword"
        type="password"
        name="newPassword"
        class="form-control"
        pattern=".{8,}"
        placeholder="New password"
        required
        autofocus
      >
      <div>
        <label for="confirmNewPassword" />
        <input
          v-model="confirmNewPassword"
          pattern=".{8,}"
          type="password"
          name="confirmNewPassword"
          required
          placeholder="Confirm your new password"
          class="form-control"
        >
      </div>
      <input
        class="btn btn-lg btn-block"
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
      newPassword: '',
      confirmNewPassword: '',
    };
  },
  methods: {
    login() {
      if (!this.newPassword) return;
      if (!this.confirmNewPassword) return;
      if (this.newPassword !== this.confirmNewPassword) return;
      const { newPassword, confirmNewPassword } = this;
      this.$http
        .put(`http://localhost:3000/api/v1/user/${this.$route.params.id}/password`, {
          password: newPassword,
        },
        {
          headers: { authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
        })
        .then(() => {
          sessionStorage.clear();
          this.$router.push('/');
          window.alert('Votre mot de passe a bien été modifié !');
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

.form-updatePassword {
  width: 100%;
  max-width: 430px;
  padding: 15px;
  margin: auto;
}

.form-updatePassword .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-updatePassword .form-control:focus {
  z-index: 2;
}

.form-updatePassword input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.btn {
  background: linear-gradient(to right, #ff5858, #f857a6) !important;
  color: white;
}
</style>
