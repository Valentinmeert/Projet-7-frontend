<template>
  <form @submit.prevent.stop="login">
    <div>
      <label for="newPassword">newPassword</label>
      <input v-model="newPassword" type="password" name="newPassword" required />
    </div>
        <div>
      <label for="confirmNewPassword">confirmNewPassword</label>
      <input v-model="confirmNewPassword" type="password" name="confirmNewPassword" required />
    </div>
    <input type="submit" value="login" />
  </form>
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
      if (this.newPassword != this.confirmNewPassword) return;
      const { newPassword , confirmNewPassword } = this;
      this.$http
        .put(`http://localhost:3000/api/v1/user/${this.$route.params.id}/password`, {
          password: newPassword,
        },
        {
          headers: { authorization: 'Bearer ' + sessionStorage.getItem('jwt') }
        })
        .then((data) => {
          sessionStorage.clear();
          this.$router.push('/');
          window.alert('Votre mot de passe a bien été modifié !');
          
        });
    },
  },
};
</script>

<style>
</style>