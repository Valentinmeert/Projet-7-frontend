<template>
  <article class="col-sm-12">
    <h1>Your new firstname : {{user.firstName}}</h1>
    <p>Your new lastname : {{user.lastName}}</p>
    <p>Your new email : {{user.email}}</p>
      <router-link :to="'/'" class="btn"> Home </router-link>
      <router-link :to="'/'"
        @click="save(user)" class="btn">
          Valider la modification
        </router-link>
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
          `http://localhost:3000/api/v1/user/${user.id}`,
          {
            firstName: user.firstName,
            lastName: user.lastName,
          },
          {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
          }
        )
        .then(
          (response) => {
            this.user = response.data;
            window.alert('Votre profil a bien été modifié !');
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