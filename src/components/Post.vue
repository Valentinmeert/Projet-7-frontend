<template>
  <div class="text-center">
    <paginate name="posts" :list="posts" :per="5" tag="div">
      <div>
      <section v-for="post in paginated('posts')" :key="post.id">
        <router-link :to="'/post/' + post.id" ><h2>{{ post.title }}</h2></router-link>
        <h3>Created at : {{ post.createdAt }}</h3>
        <hr />
      </section>
      </div>
    </paginate>

    <paginate-links
      for="posts"
      :async="true"
      :show-step-links="true"
      :step-links="{
        next: '->',
        prev: '<-',
      }"
      :classes="{
        ul: 'pagination',
        'ul > li': 'page-item',
        'ul > li > a': 'page-link',
      }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      users:[],
      user: {},
      posts: [],
      paginate: ['posts'],
      admin: false,
    };
  },
  created() {
      this.$http
        .get('http://localhost:3000/api/v1/post/root')
        .then(
          (response) => response.json(),
          (error) => console.log(error)
        )
        .then(
          (json) => (this.posts = json),
          (error) => console.log(error)
        )
  },
  methods: {
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');

.page-item.active, .page-link{
  background: linear-gradient(to right, #ff5858, #f857a6) !important ; 
  color:white;
}
h3 {
  font-family: 'Merienda', Helvetica, Arial;
  font-size: 12px;
}
h2 {
  font-family: 'Balsamiq Sans', cursive;
}
a:link {
  color: black;
  text-decoration: none;
}
</style>
