import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import Deck from '../views/Deck.vue'
import Update from '../views/card/Update.vue'
import Create from '../views/card/Create.vue'

const routes = [
    {
        path: '/',
        component: Homepage,
    },
    {
        path: '/decks/:id',
        name: 'Cards',
        component: Deck
    },
    {
        path: '/decks/:deckId/cards',
        name: 'CreateCard',
        component: Create
    },
    {
        path: '/decks/:deckId/cards/:cardId',
        name: 'Card',
        component: Update
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
export default router