<template>
<div class="text-center">
  <article class="col-sm-12">
    <h1>{{ post.title }}</h1>
    <h2>{{ post.content }}</h2>
    <h3>By: {{postUser.firstName}} {{postUser.lastName}}</h3>
    <div>
      <img :src="post.imageUrl" alt="" class="postImg">
    </div>
    <p v-if="disliked"><img @click="like()"   src="../assets/thumb.png" alt="" width="50" height="50">{{likes}}</p>
    <p v-else><img @click="unlike()"  src="../assets/thumbgreen.png" alt="" width="50" height="50">{{likes}}</p>
  </article>
  <router-link :to="'/'">
          <div class="btn" @click="destroy(post)" v-if="admin">
            Supprimer le post
          </div>
        </router-link>
        <router-link :to="'/update/' + post.id" v-if="admin">
          <div class="btn">Modifier le post</div>
        </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      react:[],
      postUser: {},
      likes: '',
      disliked: '', 
      admin: false,
    };
  },
  created() {
    this.$http
      .get(`http://localhost:3000/api/v1/post/${this.$route.params.id}`)
      .then(res => {
        const data = res.data;
        this.post = data;
        console.log(data);
      })
      this.$http
      .get(`http://localhost:3000/api/v1/post/${this.$route.params.id}/react`)
      .then((data)=>
      {
        this.likes = Object.keys(data.data).length;
      })
      if(!localStorage.getItem(`${this.$route.params.id}`)){
        this.disliked = true;
      } else {
        this.disliked = false;
      }
      this.$http
      .get(`http://localhost:3000/api/v1/post/root/${this.$route.params.id}`)
.then((data)=>
      {
        this.postUser = data.body;
      }),
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
      })
  },
  methods: {
    like(){
      this.$http
      .post(
        `http://localhost:3000/api/v1/post/${this.$route.params.id}/react`,
        {
          type: "like",
        },
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
        })
        .then(
          (response) => {
            this.disliked = false;
            console.log(response);
            localStorage.setItem(`reactId`,response.body.id)
            localStorage.setItem(`${this.$route.params.id}` , 'liked')
            location.reload();
          },
          (response) => {
            console.log(response);
          }
        );
    },
        unlike(){
      this.$http
      .delete(
        `http://localhost:3000/api/v1/post/${this.$route.params.id}/react/` + localStorage.getItem('reactId'),
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
        })
        .then(
          (response) => {
            localStorage.removeItem(`${this.$route.params.id}`)
            location.reload();
          },
          (response) => {
            console.log(response);
          }
        );
    },
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
    }
  }
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
.btn {
  background: linear-gradient(to right, #ff5858, #f857a6) !important ; 
  color:white;
}
</style>
