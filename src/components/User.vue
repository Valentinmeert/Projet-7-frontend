<template>
<div class="text-center">
  <div class="card " style="width: 500px ">
    <div class="card-body">
      <h5 class="card-title">Your Profil</h5>
      <p class="card-text">
        <h2>{{ user.lastName }}</h2>
        <h2>{{ user.firstName }}</h2>
        <h3>{{ user.email }}</h3>
      </p>
      <router-link :to="'/updateUser/' + user.id">
        <div class="btn">
          Modifier le profil
        </div>
      </router-link>
        <div class="btn" @click="destroyUser(user)">
          Supprimer le profil
        </div>
        <router-link :to="'/createUser'" v-if="admin">
          <div class="btn">
          Creer un User
          </div>
        </router-link>
    </div>
  </div>
<div class="col-sm-12">
  <h1>Your posts</h1>
  <hr />
    <paginate name="posts" :list="posts" :per="10" tag="div">
      <section v-for="post in paginated('posts')">
        <router-link :to="'/post/' + post.id" ><h2>{{ post.title }}</h2></router-link>
        <h3>Created at : {{ post.createdAt }}</h3>
        <router-link :to="'/post/' + post.id" class="btn ">
          Voir le post
        </router-link>
        <router-link :to="'/'">
          <div class="btn " @click="destroyPost(post)">
            Supprimer le post
          </div>
        </router-link>
        <router-link :to="'/updatePost/' + post.id">
          <div class="btn ">Modifier le post</div>
        </router-link>
        <hr />
      </section>
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
  </div>
</template>



<script>
export default {
  data() {
    return {
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
      .then((res) => {
        const data = res.data;
        this.user = data;
        if (res.data.email === 'admin@admin.admin') {
          this.admin = true;
        }
        }
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
      destroyUser() {
      this.$http
        .delete(`http://localhost:3000/api/v1/user/${localStorage.getItem('userId')}` , {
          headers: { authorization: 'Bearer ' + localStorage.getItem('jwt') }
        })
        .then((data) => {
          localStorage.clear();
          this.$router.push('/');
          window.alert('Votre compte a bien été supprimé !');
        });
    },
    destroyPost(post) {
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
    }
  }
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
  font-size: 12px;
}
h2 {
  font-family: 'Eczar', serif;
}
a:link {
  color: black;
  text-decoration: none;
}
.btn {
  background: linear-gradient(to right, #ff5858, #f857a6) !important ; 
  color:white;
}
h1 {
  font-family: 'Staatliches', cursive;
}
</style>

