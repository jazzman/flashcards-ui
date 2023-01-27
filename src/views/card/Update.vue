<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">My Decks</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link :to="{name: 'Cards', params: {id: 1}}" v-if="deck">{{ deck.name }}</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Update Card</li>
          </ol>
        </nav>
      </div>
    </div>
  </div>

  <div class="container mb-4">
    <div class="row">
      <div class="col">
        <h2>Question</h2>
        <div v-if="card">
          <QuillEditor v-model:content="card.question" contentType="html" toolbar="essential" theme="snow"/>
        </div>
      </div>
      <div class="col">
        <h2>Answer</h2>
        <div v-if="card">
          <QuillEditor v-model:content="card.answer" contentType="html" toolbar="essential" theme="snow"/>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="justify-content-center d-flex gap-2 align-items-center">
      <router-link :to="{name: 'Cards', params: {id: 1}}" class="btn btn-secondary" role="button">Cancel</router-link>
      <router-link :to="{name: 'Cards', params: {id: 1}}" custom v-slot="{ href, navigate }">
        <a :href="href" @click="onSaveClick($event, navigate)" class="btn btn-warning" role="button">Save</a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from "axios";

export default {
  data() {
    return {
      deck: null,
      card: null
    }
  },
  async created() {
    if (this.$store.state.deck == null || this.$store.state.deck.id !== parseInt(this.$route.params.deckId)) {
      const response = await axios.get('/api/decks/' + this.$route.params.deckId)

      if (response.data) {
        this.$store.state.deck = response.data
      }
    }

    const card = await axios.get('/api/decks/' + this.$route.params.deckId + '/cards/' + this.$route.params.cardId);

    if (card.data) {
      this.card = card.data
    }
  },
  computed: {
    deck() {
      return this.$store.state.deck
    }
  },
  methods: {
    onSaveClick(event, navigate) {
    }
  },
  components: {
    QuillEditor
  }
}
</script>
