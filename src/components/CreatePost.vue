<template>
  <div class="text-center">
    <form
      class="form-text"
      @submit.prevent.stop="createPost"
    >
      <label for="title">Title</label>
      <textarea
        v-model="title"
        autofocus
        minlength="1"
        maxlength="40"
        type="text"
        name="title"
        required
        class="form-control"
        placeholder="Ajouter un titre"
      />
      <small
        id="passwordHelpBlockTitle"
        class="form-text text-muted"
      >
        Your title must be 1-40 characters long
      </small>
      <label for="content">Content</label>
      <textarea
        v-model="content"
        minlength="1"
        maxlength="40"
        type="text"
        name="content"
        required
        class="form-control"
        placeholder="Ajouter un contenu"
      />
      <small
        id="passwordHelpBlockContent"
        class="form-text text-muted"
      >
        Your content must be 1-400 characters long
      </small>
      <div class="form-group">
        <label for="file">Lien image</label>
        <input
          id="file"
          type="file"
          name="image"
          @change="uploadImage"
        >
      </div>
      <input
        class="btn btn-lg btn-block"
        type="submit"
        value="Create Post"
      >
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
      const { title, content, selectedFile } = this;

      const fd = new FormData();
      fd.append('title', this.title);
      fd.append('content', this.content);
      if (this.selectedFile) {
        fd.set('image', this.selectedFile, this.selectedFile.name);
      }
      this.$http
        .post('http://localhost:3000/api/v1/post', fd,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: `Bearer ${sessionStorage.getItem('jwt')}`,

            },
          })
        .then(
          () => {
            window.alert('Votre post a bien été posté !');
            this.$router.push('/');
          },
        );
    },
    uploadImage(evt) {
      this.selectedFile = event.target.files[0];
    },
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
  background: linear-gradient(to right, #ff5858, #f857a6) !important;
  color: white;
}
</style>
