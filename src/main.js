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
            decks: null,
            cards: [],
            isLoading: false
        }
    },
    mutations: {
        refreshDecks (state) {
            this.commit('loading', true);

            axios
              .get('/api/decks')
              .then(response => {
                  state.decks = response.data
                  this.commit('loading', false);
              })
        },
        refreshCards (state, payload) {
            this.commit('loading', true);

            axios
                .all([
                    axios.get('/api/decks/' + payload.deckId),
                    axios.get('/api/decks/' + payload.deckId + '/cards')
                ])
                .then(
                    axios.spread((...responses) => {
                        state.deck = responses[0].data
                        state.cards = responses[1].data

                    this.commit('loading', false)})
                )
        },
        dropDeck(state, id) {
            state.decks = state.decks.filter(deck => deck.id !== parseInt(id));
        },
        dropCard(state, id) {
            state.cards = state.cards.filter(card => card.id !== parseInt(id));
        },
        loading(state, isLoading) {
            console.log({isLoading})
            state.isLoading = isLoading;
        }
    }
})

createApp(App).use(router).use(store).mount('#app')
