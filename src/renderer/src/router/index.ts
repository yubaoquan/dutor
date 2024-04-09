import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RootLayout from '../views/root-layout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RootLayout,
      meta: {
        title: 'Home',
      },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'dutor',
          name: 'dutor',
          component: () => import('../views/dutor-view.vue'),
          meta: {
            title: '文件查重',
          },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
