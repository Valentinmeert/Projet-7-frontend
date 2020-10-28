<template>
  <div class="text-center">
    <div
      class="card m-auto"
      style="width: 18rem;"
    >
      <div class="card-body">
        <h5 class="card-title">
          Your Profil
        </h5>
        <p class="card-text" /><h2>{{ user.lastName }}</h2>
        <h2>{{ user.firstName }}</h2>
        <h3>{{ user.email }}</h3>
        </p>
        <router-link :to="`/user/${user.id}/update/`">
          <div class="btn">
            Modifier le profil
          </div>
        </router-link>
        <div
          class="btn"
          @click="destroyUser(user)"
        >
          Supprimer le profil
        </div>
        <router-link
          v-if="admin"
          :to="'/createUser'"
        >
          <div class="btn">
            Creer un User
          </div>
        </router-link>
      </div>
    </div>
    <div class="col-sm-12">
      <h1>Your posts</h1>
      <hr>
      <paginate
        name="posts"
        :list="posts"
        :per="10"
        tag="div"
      >
        <section v-for="post in paginated('posts')">
          <router-link :to="'/post/' + post.id">
            <h2>{{ post.title }}</h2>
          </router-link>
          <h3>Created at : {{ post.createdAt }}</h3>
          <router-link :to="'/'">
            <div
              class="btn "
              @click="destroyPost(post)"
            >
              Supprimer le post
            </div>
          </router-link>
          <router-link :to="'/updatePost/' + post.id">
            <div class="btn ">
              Modifier le post
            </div>
          </router-link>
          <hr>
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
        `http://localhost:3000/api/v1/user/${sessionStorage.getItem('userId')}`,
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
        },
      )
      .then((res) => {
        const { data } = res;
        this.user = data;
        if (res.data.email === 'admin@admin.admin') {
          this.admin = true;
        }
      });
    this.$http
      .get(
        `http://localhost:3000/api/v1/user/${sessionStorage.getItem('userId')}/post`,
        {
          headers: { authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
        },
      )
      .then(
        (response) => response.json(),
      )
      .then(
        (json) => (this.posts = json),
      );
  },
  methods: {
    destroyUser() {
      this.$http
        .delete(`http://localhost:3000/api/v1/user/${sessionStorage.getItem('userId')}`, {
          headers: { authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
        })
        .then((data) => {
          sessionStorage.clear();
          this.$router.push('/');
          window.alert('Votre compte a bien été supprimé !');
        });
    },
    destroyPost(post) {
      this.$http
        .delete(`http://localhost:3000/api/v1/post/${post.id}`, {
          headers: { authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
        })
        .then(
          (response) => response.json(),
        )
        .then(
          (json) => (this.posts = json),
        )
        .then(
          () => location.reload(),
        );
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Eczar:wght@500&display=swap');

.page-item.active,
.page-link {
  background: linear-gradient(to right, #ff5858, #f857a6) !important;
  color: white;
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
  background: linear-gradient(to right, #ff5858, #f857a6) !important;
  color: white;
}

h1 {
  font-family: 'Staatliches', cursive;
}
</style>
