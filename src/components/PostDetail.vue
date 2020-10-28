<template>
  <div class="text-center">
    <article class="col-sm-12 w-50 m-auto">
      <h1>{{ post.title }}</h1>
      <hr>
      <h2>{{ post.content }}</h2>
      <hr>
      <div v-if="post.imageUrl">
        <img
          :src="post.imageUrl"
          alt=""
          class="postImg"
        >
      </div>
      <hr>
      <h3>By: {{ postUser.firstName }} {{ postUser.lastName }}</h3>
      <hr>
      <p v-if="disliked">
        <img
          src="../assets/thumb.png"
          alt=""
          width="50"
          height="50"
          @click="like()"
        >{{ likes }}
      </p>
      <p v-else>
        <img
          src="../assets/thumbgreen.png"
          alt=""
          width="50"
          height="50"
          @click="unlike()"
        >{{ likes }}
      </p>
    </article>
    <router-link :to="'/'">
      <div
        v-if="admin"
        class="btn"
        @click="destroy(post)"
      >
        Supprimer le post
      </div>
    </router-link>
    <router-link
      v-if="admin"
      :to="'/updatePost/' + post.id"
    >
      <div class="btn">
        Modifier le post
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      react: [],
      postUser: {},
      likes: '',
      disliked: '',
      admin: false,
    };
  },
  created() {
    this.$http
      .get(`http://localhost:3000/api/v1/post/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
        })
      .then((res) => {
        const { data } = res;
        this.post = data;
      });

    this.$http
      .get(`http://localhost:3000/api/v1/post/${this.$route.params.id}/react`,
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
        })
      .then((data) => {
        this.likes = Object.keys(data.data).length;
      });
    if (!localStorage.getItem(`${this.$route.params.id}`)) {
      this.disliked = true;
    } else {
      this.disliked = false;
    }

    this.$http
      .get(`http://localhost:3000/api/v1/post/root/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
        })
      .then((data) => {
        this.postUser = data.body;
      });

    this.$http
      .get(
        `http://localhost:3000/api/v1/user/${sessionStorage.getItem('userId')}`,
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
        },
      )
      .then((user) => {
        if (user.body.email === 'admin@admin.admin') {
          this.admin = true;
        }
      });
  },
  methods: {
    like() {
      this.$http
        .post(
          `http://localhost:3000/api/v1/post/${this.$route.params.id}/react`,
          {
            type: 'like',
          },
          {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
          },
        )
        .then(
          (response) => {
            this.disliked = false;
            localStorage.setItem('reactId', response.body.id);
            localStorage.setItem(`${this.$route.params.id}`, 'liked');
            location.reload();
          },
        );
    },
    unlike() {
      this.$http
        .delete(
          `http://localhost:3000/api/v1/post/${this.$route.params.id}/react/${localStorage.getItem('reactId')}`,
          {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
          },
        )
        .then(
          () => {
            localStorage.removeItem(`${this.$route.params.id}`);
            location.reload();
          },
        );
    },
    destroy(post) {
      this.$http
        .delete(`http://localhost:3000/api/v1/post/${post.id}`,
          {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
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
  font-size: 1em;
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

.postImg {
  width: 200px;
  height: 200px;
}
</style>
