<template>
<div class="text-center">
  <article class="form-text text-center">
    <label for="firstName">First Name :</label>
    <input 
    pattern="[a-zA-Z -]{1,20}" 
    v-model="user.firstName" 
    required
    type="text"
    name="firstName"
    class="form-control"/>
    <label for="lastName">Last Name :</label>
    <input 
    v-model="user.lastName" 
    pattern="[a-zA-Z -]{1,20}"
    required
    type="text"
    name="lastName"
    class="form-control"/>
    <label for="lastName">Email :</label>
    <input 
    v-model="user.email"
    pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,25}"
    required
    type="text"
    name="email"
    class="form-control"/>
    </article>
      <div
        @click="save(user)" class="btn">
          Valider la modification
        </div>
      <router-link :to="'/updatePassword/' + user.id" class="btn">
          Modifier votre mot de passe
        </router-link>
  
  </div>
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
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  -ms-flex-align: center;
  align-items: center;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-text {
  width: 100%;
  max-width: 430px;
  padding: 15px;
  margin: auto;
}
.form-text .checkbox {
  font-weight: 400;
}
.form-text .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-text .form-control:focus {
  z-index: 2;
}

.form-text input[type='text'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.btn {
  background: linear-gradient(to right, #ff5858, #f857a6) !important ; 
  color:white;
}
</style>