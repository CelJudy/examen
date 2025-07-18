import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'preguntas',
      component: () => import('../views/PreguntasView.vue'),
    },
    {
      path: '/respuestas',
      name: 'respuestas',
      component: () => import('../views/RespuestasView.vue'),
    },
  ],
})

export default router
