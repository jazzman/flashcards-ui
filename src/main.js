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
            deck: null,
            decks: [],
            cards: [],
            isLoading: false
        }
    },
    mutations: {
        refreshDecks (state) {
            axios
              .get('/api/decks')
              .then(response => (state.decks = response.data))
        },
        refreshCards (state, payload) {
            const instance = axios.create();

            instance.interceptors.request.use(request => {
                console.log("Before request");
                store.commit('loading', true);
                return request;
            });

            instance.interceptors.response.use(response => {
                console.log("After response");
                store.commit('loading', false);
                return response;
            });

            axios
                .all([
                    axios.get('/api/decks/' + payload.deckId),
                    instance.get('/api/decks/' + payload.deckId + '/cards')
                ])
                .then(
                    axios.spread((...responses) => {
                        state.deck = responses[0].data
                        state.cards = responses[1].data
                    })
                )
        },
        loading(state, isLoading) {
            console.log({isLoading})

            state.isLoading = isLoading;
        }
    }
})

createApp(App).use(router).use(store).mount('#app')
