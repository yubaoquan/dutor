import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/home-view.vue';
import RootLayout from '../views/root-layout/index.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
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
          component: () => import('../views/dutor/index.vue'),
          meta: {
            title: 'route.dutor',
          },
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('../views/blog-view/home/index.vue'),
          meta: {
            title: 'route.blog',
          },
          children: [
            {
              path: 'public-blogs',
              name: 'public-blogs',
              meta: {
                title: 'blog.publicBlogsList',
              },
              component: () => import('../views/blog-view/public-blogs-list.vue'),
            },
            {
              path: 'private-blogs',
              name: 'private-blogs',
              meta: {
                title: 'blog.privateBlogsList',
              },
              component: () => import('../views/blog-view/private-blogs-list.vue'),
            },
          ],
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
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
