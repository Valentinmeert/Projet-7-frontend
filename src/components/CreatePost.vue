<template>
  <form @submit.prevent.stop="createPost">
    <div class="col-4">
      <label for="title">Title</label>
      <textarea
        v-model="title"
        type="text"
        name="title"
        required
        class="form-control"
        placeholder="Ajouter un titre"
      />
    </div>
    <div class="col-4">
      <label for="content">Content</label>
      <textarea
        v-model="content"
        type="text"
        name="content"
        required
        class="form-control"
        placeholder="Ajouter un contenu"
      />
    </div>
    <input type="submit" value="createPost" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      
    };
  },
  methods: {
    createPost() {
      if (!this.title) return;
      if (!this.content) return;
      const { title, content} = this;
      this.$http
        .post('http://localhost:3000/api/v1/post', {
        title,
        content,
        },
        {
          headers: { 
            authorization: 'Bearer ' + localStorage.getItem('jwt')
          }
        })
        .then(
          (response) => {
            this.$router.push('/');
          },
          (response) => {
            console.log(response);
          }
        );
    },
  },
  
};
</script>
