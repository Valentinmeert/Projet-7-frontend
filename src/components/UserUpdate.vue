<template>
  <article class="col-sm-12 text-center">
    <p>Your new firstname : <input v-model="user.firstName" /></p>
    <p>Your new lastname : <input v-model="user.lastName" /></p>
    <p>Your new email : <input v-model="user.email" /></p>
      <div
        @click="save(user)" class="btn">
          Valider la modification
        </div>
      <router-link :to="'/updatePassword/' + user.id" class="btn">
          Modifier votre mot de passe
        </router-link>
  </article>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.$http
      .get(`http://localhost:3000/api/v1/user/${this.$route.params.id}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
      })

      .then(
        (user) => user.json(),
        (error) => console.log(error)
      )
      .then(
        (json) => (this.user = json),
        (error) => console.log(error)
      );
    this.$http
      .get(
        `http://localhost:3000/api/v1/user/${localStorage.getItem('userId')}`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
        }
      )
      .then((user) => {
        console.log(user.body);
        if (user.body.email === 'admin@admin.admin') {
          this.admin = true;
        }
      }),
      this.$http
        .get('http://localhost:3000/api/v1/post/root')
        .then(
          (response) => response.json(),
          (error) => console.log(error)
        )
        .then(
          (json) => (this.posts = json),
          (error) => console.log(error)
        );
  },

  methods: {
    save(user) {
      this.$http
        .put(
          `http://localhost:3000/api/v1/user/${this.$route.params.id}`,
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          },
          {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
          }
        )
        .then(
          (response) => {
            this.user = response.data;
            window.alert('Votre profil a bien été modifié !');
            this.$router.push('/');
          },
          (response) => {
            console.log('error');
          }
        );
    },
  },
};
</script>

<style>
.btn {
background: linear-gradient(to right, #ff5858, #f857a6);
}
a{
  color:white
}
</style>