<template>
  <div class="col-sm-12">
    <paginate name="posts" :list="posts" :per="5" tag="div">
      <div >
      <section v-for="post in paginated('posts')" :key="post.id">
        <h2>{{ post.title }}</h2>
        <h3>Created at : {{ post.createdAt }}</h3>
        <router-link :to="'/post/' + post.id" class="btn btn-dark">
          Voir le post
        </router-link>
        <router-link :to="'/'">
          <div class="btn btn-success" @click="destroy(post)" v-if="admin">
            Supprimer le post
          </div>
        </router-link>
        <router-link :to="'/update/' + post.id" v-if="admin">
          <div class="btn btn-success">Modifier le post</div>
        </router-link>
        <hr />
      </section>
      </div>
    </paginate>

    <paginate-links
      for="posts"
      :async="true"
      :show-step-links="true"
      :step-links="{
        next: 'Suivant',
        prev: 'Précédent',
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
        )
  },
  methods: {
    destroy(post) {
      this.$http
        .delete(`http://localhost:3000/api/v1/post/${post.id}`)
        .then(
          (response) => response.json(),
          (error) => console.log(error)
        )
        .then(
          (json) => (this.posts = json),
          (error) => console.log(error)
        )
        .then(
          () => location.reload(),
          (error) => console.log(error)
        );
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');

.page-item.active, .page-link{
  background-color: #343A40 !important ; 
}
h3 {
  font-family: 'Merienda', Helvetica, Arial;
  font-size: 12px;
}
h2 {
  font-family: 'Balsamiq Sans', cursive;
}
</style>
