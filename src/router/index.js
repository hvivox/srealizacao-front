import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CadastroView from '../views/CadastroView.vue'
import Login from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'
import middleware from '../service/middleware'



const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [


    {
      path: '/',
      name: 'home',
      beforeEnter: middleware.guardMyroute,
      component: HomeView
    },
    {
      path: "/login",
      name: 'login',
      component: Login,
      // beforeEnter: Guard.redirectIfAuthenticated
    },

    {
      path: '/lista',
      name: 'lista',
      beforeEnter: middleware.guardMyroute,
      component: () => import('../views/ListaView.vue'),
    },


    {
      path: "/lista/cadastro/",
      name: 'cadastrarFolha',
      beforeEnter: middleware.guardMyroute,
      component: CadastroView
    },

    {
      path: "/lista/cadastro/:id",
      name: 'editarFolha',
      beforeEnter: middleware.guardMyroute,
      component: CadastroView
    },

    { path: '/:pathMatch(.*)*', name: 'not-found', beforeEnter: middleware.guardMyroute, component: NotFound },
    // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
    { path: '/:pathMatch(.*)', name: 'bad-not-found', beforeEnter: middleware.guardMyroute, component: NotFound },
  ]
});



export default router

