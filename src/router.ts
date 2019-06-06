import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home/Home.vue';
import GlobalHeader from "@/components/organisms/GlobalHeader/GlobalHeader.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        globalHeader: GlobalHeader
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import(/* webpackChunkName: "about" */ './pages/About/About.vue'),
        globalHeader: GlobalHeader
      }
    },
    {
      path: '/style-guide',
      name: 'styleguide',
      components: {
        default: () => import('./pages/StyleGuide/StyleGuide.vue'),
        globalHeader: GlobalHeader
      },
      props: {
        globalHeader: {
          hideViewTabs: true
        }
      }
    }
  ],
});
