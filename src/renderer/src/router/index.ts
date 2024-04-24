import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/home-view.vue';
import RootLayout from '../views/root-layout.vue';

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
          component: () => import('../views/dutor-view.vue'),
          meta: {
            title: 'route.dutor',
          },
        },
        {
          path: 'common',
          name: 'common-blogs',
          component: () => import('../views/blog-view/common-page.vue'),
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('../views/blog-view/index.vue'),
          meta: {
            title: 'route.blog',
          },
          children: [
            {
              path: 'common',
              name: 'common-blogs',
              meta: {
                title: 'blog.commonBlogs',
              },
              component: () => import('../views/blog-view/common-page.vue'),
            },
            {
              // TODO: 改成弹窗
              path: 'register',
              name: 'blog-register',
              meta: {
                title: 'blog.userRegister',
              },
              component: () => import('../views/blog-view/register-page.vue'),
            },
            {
              // TODO: 改成弹窗
              path: 'login',
              name: 'blog-login',
              meta: {
                title: 'blog.userLogin',
              },
              component: () => import('../views/blog-view/login-page.vue'),
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
  ],
});

export default router;
