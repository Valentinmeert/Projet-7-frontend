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
    <div class="form-group">
        <label for="file">Lien image</label>
        <input
          type="file"
          id="file"
          name="image"
          @change="uploadImage"
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
    selectedFile: null,
      
    };
  },
  methods: {
    createPost() {
      if (!this.title) return;
      if (!this.content) return;
      const { title, content, file} = this;
      let fd = new FormData();
                fd.append('title', this.title);
                fd.append('content', this.content);
                fd.append('image', this.selectedFile);
                console.log("test",fd.get('image'));
      this.$http
        .post('http://localhost:3000/api/v1/post', fd ,
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            authorization: 'Bearer ' + localStorage.getItem('jwt'),
            
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
    uploadImage(evt) {
this.selectedFile = event.target.files[0];
console.log(event.target.files[0]);
        }
  },
  
};
</script>
