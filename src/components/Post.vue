<template>
  <div class="text-center">
    <paginate name="posts" :list="posts" :per="5" tag="div">
      <div>
      <section v-for="post in paginated('posts')" :key="post.id">
        <router-link :to="'/post/' + post.id" ><h1>{{ post.title }}</h1></router-link>
        <div v-if="post.imageUrl"><img :src="post.imageUrl" class="postImage" width="50" height="50"></div>
        <h3>Created at : {{ post.createdAt }}</h3>
        <hr />
      </section>
      </div>
      <p v-if="onePost">NO POST YET</p>
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
      onePost: false,
    };
  },
  created() {
      this.$http
        .get('http://localhost:3000/api/v1/post/root')
        .then( res => {
          const data = res.data;
          this.posts = data;
          if (data.length == 0){
            this.onePost = true;
          }
        })
  },
  methods: {
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Eczar:wght@500&display=swap');
.page-item.active, .page-link{
  background: linear-gradient(to right, #ff5858, #f857a6) !important ; 
  color:white;
}
h3 {
  font-family: 'Merienda', Helvetica, Arial;
  font-size: 0.8em;
}
h2 {
  font-family: 'Balsamiq Sans', cursive;
}
a:link {
  color: black;
  text-decoration: none;
}
.postImage {
  width: 50px;
  height: 50px;
}
h1 {
  font-family: 'Staatliches', cursive;
}
</style>
