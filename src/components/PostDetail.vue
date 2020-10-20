<template>
  <article class="col-sm-12">
    <h1>{{ post.title }}</h1>
    <h2>{{ post.content }}</h2>
    <h3>By: {{postUser.firstName}} {{postUser.lastName}}</h3>
    <div>
      <img :src="post.imageUrl" alt="" class="postImg">
    </div>
    <p><img  src="../assets/thumb.png" alt="" width="50" height="50">{{likes}}</p>
      <div class="btn btn-dark" @click="like()"  v-if="disliked">
            Like
          </div>
      <div class="btn btn-dark" @click="unlike()" v-else >
            Dislike
          </div>

  </article>
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
    }
  }
};
</script>

<style>
</style>
