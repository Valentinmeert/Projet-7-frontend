<template>
  <article class="col-sm-12">
    <h1>{{ post.title }}</h1>
    <h2>{{ post.content }}</h2>
    <p><img  src="../assets/thumb.png" alt="" width="50" height="50">{{likes}}</p>
      <div class="btn btn-dark" @click="like()"  v-if="unliked">
            Like
          </div>
      <div class="btn btn-dark" @click="unlike()" v-else >
            Unlike
          </div>

  </article>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      react:[],
      likes: '',
      unliked: '', 
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
      )
      this.$http
      .get(`http://localhost:3000/api/v1/post/${this.$route.params.id}/react`)
      .then((data)=>
      {
        this.likes = Object.keys(data.data).length;
      })
      if(!localStorage.getItem(`${this.$route.params.id}`)){
        this.unliked = true;
      } else {
        this.unliked = false;
      }

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
            this.unliked = false;
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
