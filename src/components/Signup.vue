<template>
<div class="text-center">
  <form class="form-signin" @submit.prevent.stop="signup">
    <img
        class="mb-4"
        src="../assets/icon.png"
        alt=""
        width="72"
        height="72"
      />
    <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
      <label for="inputFirstName" class="sr-only">First Name</label>
      <input v-model="firstName" type="text" name="firstName" id="inputFirstName"
        class="form-control"
        placeholder="First Name"
        required
        autofocus/>
    <div>
      <label for="inputLastName" class="sr-only">Last Name</label>
        <input 
        v-model="lastName" 
        type="text" 
        name="lastName" 
        id="inputLastName"
        class="form-control"
        placeholder="Last Name"
        required/>
    </div>
    <div>
      <label for="inputEmail" class="sr-only">Email</label>
      <input
        v-model="email"
        type="email"
        name="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        
      />
    </div>
    <div>
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          v-model="password"
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>
    <input class="btn btn-lg btn-primary btn-block" type="submit" value="Signup" />
  </form>
</div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    signup() {
      if (!this.firstName) return;
      if (!this.lastName) return;
      if (!this.email) return;
      if (!this.password) return;
      const { firstName, lastName, email, password } = this;
      this.$http
        .post('http://localhost:3000/api/v1/user/signup', {
          firstName,
          lastName,
          email,
          password,
        })
        .then((data) => {
          localStorage.setItem('jwt', data.body.token);
          localStorage.setItem('userId', data.body.userId);
        });
    },
  },
};
</script>
