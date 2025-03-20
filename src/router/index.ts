import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/home/HomePage.vue'
import AboutPage from '@/views/about-us/AboutPage.vue'
import FullstackleGame from '@/views/fullstackle-game/FullstackleGame.vue'
import LeaderBoard from '@/views/leaderboard/LeaderBoard.vue'
import FindErminGame from '@/views/find-ermin/FindErminGame.vue'

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
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: LeaderBoard,
    },
    {
      path: '/find-ermin',
      name: 'Find Ermin',
      component: FindErminGame,
    },
  ],
})
