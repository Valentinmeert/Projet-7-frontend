<template>
  <article class="text-center form-text">
    <label for="title">Title</label>
    <p>
      <textarea
        v-model="post.title"
        required
        type="text"
        name="title"
        class="form-control"
      />
    </p>
    <label for="content">Content</label>
    <p>
      <textarea
        v-model="post.content"
        type="text"
        name="content"
        required
        class="form-control"
      />
    </p>
    <div class="form-group">
      <label for="file">Lien image</label>
      <input
        id="file"
        type="file"
        name="image"
        @change="uploadImage"
      >
    </div>
    <div
      class="btn"
      @click="save(post)"
    >
      Valider la modification
      <router-link :to="'/'" />
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      selectedFile: '',
    };
  },
  created() {
    this.$http
      .get(`http://localhost:3000/api/v1/post/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
        })
      .then(
        (post) => post.json(),
      )
      .then(
        (json) => (this.post = json),
      );
  },
  methods: {
    save(post) {
      const fd = new FormData();
      fd.append('title', post.title);
      fd.append('content', post.content);
      if (this.selectedFile) {
        fd.append('image', this.selectedFile, this.selectedFile.name);
      }
      this.$http
        .put(`http://localhost:3000/api/v1/post/${post.id}`, fd,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: `Bearer ${sessionStorage.getItem('jwt')}`,

            },
          })
        .then(
          (response) => {
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
