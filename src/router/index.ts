import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/home/HomePage.vue'
import AboutPage from '@/about-us/AboutPage.vue'
import FullstackleGame from '@/fullstackle-game/FullstackleGame.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/about-us',
      name: 'About us',
      component: AboutPage,
    },
    {
      path: '/fullstackle-game',
      name: 'Fullstackle Game',
      component: FullstackleGame,
    },
  ],
})
