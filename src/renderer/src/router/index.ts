import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/home-view.vue';
import RootLayout from '../views/root-layout.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RootLayout,
      meta: {
        title: 'route.home',
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
            title: 'route.dutor',
          },
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('../views/blog-view/index.vue'),
          meta: {
            title: 'route.blog',
          },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/about-view.vue'),
          meta: {
            title: 'route.about',
          },
        },
      ],
    },
  ],
});

export default router;
