<template>
<div>
  <div class="card" style="width: 500px">
    <div class="card-body">
      <h5 class="card-title">Your Profil</h5>
      <p class="card-text">
        <h2>{{ user.lastName }}</h2>
        <h2>{{ user.firstName }}</h2>
        <h3>{{ user.email }}</h3>
      </p>
      <router-link :to="'/updateUser/' + user.id">
        <div class="btn btn-primary">Modifier le profil</div>
      </router-link>
        <div class="btn btn-primary" @click="destroy(user)">Supprimer le profil</div>
    </div>
  </div>
<div class="col-sm-12">
    <paginate name="posts" :list="posts" :per="10" tag="div">
      <section v-for="post in paginated('posts')">
        <h2>{{ post.title }}</h2>
        <h3>Created at : {{ post.createdAt }}</h3>
        <router-link :to="'/post/' + post.id" class="btn btn-primary">
          Voir le post
        </router-link>
        <router-link :to="'/'">
          <div class="btn btn-primary" @click="destroy(post)">
            Supprimer le post
          </div>
        </router-link>
        <router-link :to="'/update/' + post.id">
          <div class="btn btn-primary">Modifier le post</div>
        </router-link>
        <hr />
      </section>
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
  </div>
</template>



<script>
export default {
  data() {
    return {
      user: {},
      posts: [],
      paginate: ['posts'],
    };
  },
  created() {
    console.log(localStorage.getItem('jwt'));
    this.$http
      .get(
        `http://localhost:3000/api/v1/user/${localStorage.getItem('userId')}`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
        }
      )
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
        `http://localhost:3000/api/v1/user/${localStorage.getItem('userId')}/post`,
        {
          headers: { authorization: 'Bearer ' + localStorage.getItem('jwt') },
        }
      )
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
      destroy() {
      this.$http
        .delete(`http://localhost:3000/api/v1/user/${localStorage.getItem('userId')}` , {
          headers: { authorization: 'Bearer ' + localStorage.getItem('jwt') }
        })
        .then((data) => {
          localStorage.clear();
          this.$router.push('/');
          window.alert('Votre compte a bien été supprimé !');
        });
    }
  }
};
</script>

