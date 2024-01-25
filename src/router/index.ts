import { createRouter, createWebHistory } from 'vue-router'
import CharactersListing from '@/components/CharactersListing.vue'
import EditCharacter from '@/components/EditCharacter.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CharactersListing
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditCharacter
    },
  ]
})

export default router
