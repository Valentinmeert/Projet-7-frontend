<template>
<div class="text-center">
  <form @submit.prevent.stop="createPost" class="form-text">
      <label for="title">Title</label>
      <textarea
        v-model="title"
        type="text"
        name="title"
        required
        class="form-control"
        placeholder="Ajouter un titre"
      />
      <label for="content">Content</label>
      <textarea
        v-model="content"
        type="text"
        name="content"
        required
        class="form-control"
        placeholder="Ajouter un contenu"
      />
    <div class="form-group">
        <label for="file">Lien image</label>
        <input
          type="file"
          id="file"
          name="image"
          @change="uploadImage"
        />
      </div>
    <input class="btn btn-lg btn-block" type="submit" value="Create Post" />
  </form>
  </div>
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
      const { title, content, selectedFile} = this;
      let fd = new FormData();
                fd.append('title', this.title);
                fd.append('content', this.content);
                fd.set('image', this.selectedFile, this.selectedFile.name);
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
<style>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  -ms-flex-align: center;
  /* align-items: center; */
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-text {
  width: 100%;
  max-width: 430px;
  padding: 15px;
  margin: auto;
}
.form-text .checkbox {
  font-weight: 400;
}
.form-text .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-text .form-control:focus {
  z-index: 2;
}
.form-text input[type='text'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-text input[type='text'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.btn {
  background: linear-gradient(to right, #ff5858, #f857a6) !important ; 
  color:white;
}
</style>
