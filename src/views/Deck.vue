<template xmlns="http://www.w3.org/1999/html">

  <div class="container">
    <div class="row">
      <div class="col">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">My Decks</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page" v-if="deck">{{ deck.name }}</li>
          </ol>

        </nav>
      </div>
      <div class="col text-end" >
        <router-link :to="{name: 'CreateCard', params: {deckId: $route.params.id}}" class="link-warning">+ card</router-link>
      </div>
    </div>
  </div>

  <div class="text-center m-5" v-if="isLoading">
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
  <div class="list-group w-auto" v-else>
    <div v-for="card in cards" class="list-group-item list-group-item-action d-flex gap-3 py-3 bg-success bg-opacity-10 border-success card" aria-current="true">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 class="mb-0" v-html="card.question"></h6>
          <p class="mb-0 opacity-75" v-html="card.answer"></p>
        </div>
        <div class="justify-content-end d-flex gap-4 align-items-center">
          <small class="text-nowrap">54 reviews</small>
          <router-link :to="{name: 'Card', params: {deckId: card.deckId, cardId: card.id}}" class="opacity-90 link-secondary" type="button">
            <Pencil/>
          </router-link>
          <button type="button" class="btn-close" aria-label="Close" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="deleteCard" :data-card-id=card.id></button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-body">
          Are you sure you want to completely remove this card ?
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
import Pencil from "@/components/icons/Pencil.vue";
import axios from "axios";

export default {
  name: "Cards",
  components: {Pencil},
  data() {
    return {
      cardId: null,
    }
  },
  created() {
    if (this.$store.state.deck == null || this.$store.state.deck.id !== parseInt(this.$route.params.id)) {
      this.$store.commit('refreshCards', {
        deckId: this.$route.params.id
      })
    }
  },
  computed: {
    deck() {
      return this.$store.state.deck
    },
    cards() {
      return this.$store.state.cards
    },
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  methods: {
    deleteCard(e) {
      this.cardId = e.target.getAttribute('data-card-id')
    },
    confirmRemoval() {
      axios
          .delete('/api/decks/' + this.$store.state.deck.id + '/cards/' + this.cardId)
          .then(() => {
            document.querySelector('[data-card-id=\'' + this.cardId + '\']').closest('.card').remove();
            this.$store.commit('dropCard', this.cardId)
          })
    }
  }
}

</script>

<style scoped>
</style>