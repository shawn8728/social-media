import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CreatePost from '../views/CreatePost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
        path: '/createpost',
        name: 'CreatePost',
        component: CreatePost
    }
  ]
})

// router.beforeEach((to, from, next) => {
//     const publicPages = ['/login', '/register', '/'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');

//     if (authRequired && !loggedIn) {
//         return next('/login');
//     }

//     next();
// });

export default router
