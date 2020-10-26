import Vue from 'vue';
import VueResource from 'vue-resource';
import VuePaginate from 'vue-paginate';
import VueRouter from 'vue-router';
import App from './App.vue';
import PostDetail from './components/PostDetail.vue';
import Post from './components/Post.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import PostUpdate from './components/PostUpdate.vue';
import User from './components/User.vue';
import CreatePost from './components/CreatePost.vue';
import UserUpdate from './components/UserUpdate.vue';
import UpdatePassword from './components/UpdatePassword.vue';
import CreateUserAsAdmin from './components/CreateUserAsAdmin.vue';

Vue.use(VueResource);
Vue.use(VuePaginate);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Post,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/create',
    component: CreatePost,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/post/:id/',
    component: PostDetail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user/:id/',
    component: User,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/signup',
    component: Signup,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/updatePost/:id/',
    component: PostUpdate,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/updateUser/:id',
    component: UserUpdate,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/updatePassword/:id',
    component: UpdatePassword,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/createUser',
    component: CreateUserAsAdmin,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) return next();
  if (sessionStorage.getItem('jwt') !== null) return next();
  next({
    path: '/login',
    params: {
      nextUrl: to.fullPath,
    },
  });
});

// INIT APP
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});
