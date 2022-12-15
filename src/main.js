import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import { createStore } from 'vuex'

import './assets/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import axios from "axios";

const store = createStore({
    state() {
        return {
            decks: [],
            cards: []
        }
    },
    mutations: {
        refreshDecks (state) {
            axios
              .get('/api/decks')
              .then(response => (state.decks = response.data))
        }
    }
})

createApp(App).use(router).use(store).mount('#app')
