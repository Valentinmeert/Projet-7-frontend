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
    <div>
    <label for="avatar">Choose a profile picture:</label>
<input type="file" @change="onFileChange($event)"
      id="avatar" name="avatar"
      accept="image/png, image/jpeg">
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
      file: '',
    };
  },
  methods: {
    createPost() {
      if (!this.title) return;
      if (!this.content) return;
      const data = new FormData();
      data.append("title", this.title);
      data.append("content", this.content);
      if(this.file){
        data.append("file", this.file);
      }
      const { title, content, file} = this;
      this.$http
        .post('http://localhost:3000/api/v1/post', 
        data,
        {
          headers: { 
            authorization: 'Bearer ' + localStorage.getItem('jwt'),
            "Content-Type":`multipart/form-data; boundary=${data._boundary}`
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
    onFileChange(event){
      this.file=event.target.files[0]
  }
  },
  
};
</script>
