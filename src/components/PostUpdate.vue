<template>
  <article class="col-sm-12">
    <h1><input v-model="post.title" /></h1>
    <p><input v-model="post.content" /></p>

    <nav aria-label="breadcrumb">
      <router-link :to="'/'" class="btn btn-primary"> Home </router-link>
      <router-link :to="'/'">
        <button @click="save(post)" class="btn btn-primary">
          Valider la modification
        </button></router-link
      >
    </nav>
  </article>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  created() {
    this.$http
      .get(`http://localhost:3000/api/v1/post/${this.$route.params.id}`)
      .then(
        (post) => post.json(),
        (error) => console.log(error)
      )
      .then(
        (json) => (this.post = json),
        (error) => console.log(error)
      );
  },
  methods: {
    save(post) {
      this.$http
        .put(`http://localhost:3000/api/v1/post/${post.id}`, {
          title: post.title,
          content: post.content,
        })
        .then(
          (response) => {
            this.post = response.data;
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
</style>
