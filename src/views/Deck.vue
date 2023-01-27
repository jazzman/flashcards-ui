<template>

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

<!--    <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" name="circular"></loader>-->
<!--  <img src="https://media.giphy.com/media/QCwrk1jxSWzz4grp0x/giphy.gif" alt="">-->
<!--  <div >-->
<!--    <img :src="loader" alt="">-->
<!--  </div>-->
<!--  <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>-->
  <div v-if="isLoading">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    <div>Loading...</div>
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
          <button type="button" class="btn-close" aria-label="Close" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="deleteDeck" data-card-id="{{ card.id }}"></button>
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

    // (async () => {
    //   if (this.$store.state.deck == null || this.$store.state.deck.id !== parseInt(this.$route.params.id)) {
    //
    //     const deck = await axios.get('/api/decks/' + this.$route.params.id)
    //
    //     this.$store.commit('refreshCards', {
    //       deckId: this.$route.params.id
    //     })
    //
    //     if (deck.data) {
    //       this.$store.state.deck = deck.data
    //     }
    //   }
    // })();
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
    deleteDeck(e) {
      this.cardId = e.target.getAttribute('data-card-id')
    },
    confirmRemoval(e) {
      document.querySelector('[data-card-id=\'' + this.cardId + '\']').closest('.card').remove();
    }
  }
}

</script>

<style scoped>
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ddd;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>