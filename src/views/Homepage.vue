<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">My Decks</li>
          </ol>
        </nav>
      </div>
    </div>
  </div>

  <div class="text-center m-5" v-if="isLoading">
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
  <div class="list-group w-auto" v-else>
    <div v-for="deck in list" class="list-group-item list-group-item-action d-flex gap-3 py-3 deck" aria-current="true">
      <i class="bi bi-stack rounded-circle flex-shrink-0" style="font-size: 32px" ></i>
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 class="mb-0">{{ deck.name }}</h6>
          <p class="mb-0 opacity-75">{{ deck.description }}</p>
        </div>
        <div class="justify-content-end d-flex gap-4 align-items-center">
          <div class="d-flex gap-3">
            <router-link :to="{name: 'CreateCard', params: {deckId: deck.id}}" role="button" class="btn btn-outline-warning me-2">
              + card
            </router-link>
          </div>
          <small class="text-nowrap">
            <router-link :to="{name: 'Cards', params: {id: deck.id}}" class="link-secondary">{{ deck.count }} Cards</router-link>
          </small>
          <button type="button" class="btn-close" aria-label="Close" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="deleteDeck" :data-deck-id="deck.id"></button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          Are you sure you want to completely remove this deck with all its cards ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="confirmRemoval">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      deckId: null,
    }
  },
  methods: {
    deleteDeck(e) {
      this.deckId = e.target.getAttribute('data-deck-id')
    },
    confirmRemoval() {
      axios
        .delete('/api/decks/' + this.deckId)
        .then(() => {
          document.querySelector('[data-deck-id=\'' + this.deckId + '\']').closest('.deck').remove()
          this.$store.commit('dropDeck', this.deckId)
        })
    }
  },
  created() {
    if (this.$store.state.decks == null) {
      this.$store.commit("refreshDecks")
    }
  },
  computed: {
    list() {
      return this.$store.state.decks
    },
    isLoading() {
      return this.$store.state.isLoading
    }
  }
}
</script>