import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'preguntas',
      component: () => import('../views/PreguntasView.vue'),
    },
  ],
})

export default router
