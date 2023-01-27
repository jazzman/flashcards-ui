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
              <router-link :to="{name: 'Cards', params: {id: deck.id}}" v-if="deck">{{ deck.name }}</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Create a New Card</li>
          </ol>
        </nav>
      </div>
    </div>
  </div>

  <div class="container mb-4">
    <div class="row">
      <div class="col">
        <h2>Question</h2>
          <div>
            <QuillEditor v-model:content="card.question" contentType="html" toolbar="essential" theme="snow" />
          </div>
      </div>
      <div class="col">
        <h2>Answer</h2>
          <div>
            <QuillEditor v-model:content="card.answer" contentType="html" toolbar="essential" theme="snow" />
          </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="justify-content-center d-flex gap-2 align-items-center">
      <router-link to="/" custom v-slot="{ href, navigate }">
        <a @click="$router.back()" class="btn btn-secondary" role="button">Cancel</a>
      </router-link>
      <router-link :to="{name: 'Cards', params: {id: $route.params.deckId}}" custom v-slot="{ href, navigate }">
        <a :href="href" @click="onSaveClick($event, navigate)" class="btn btn-warning" role="button">Save</a>
      </router-link>
      <router-link :to="{name: 'CreateCard', params: {deckId: $route.params.deckId}}" custom v-slot="{ href, navigate }">
        <a :href="href" @click="onSaveAndNewClick($event, navigate)" class="btn btn-success" role="button">Save and Create One More</a>
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
        card: {
          question: null,
          answer: null
        }
      }
    },
    async created() {
      if (this.$store.state.deck == null || this.$store.state.deck.id !== parseInt(this.$route.params.deckId)) {
        const response = await axios.get('/api/decks/' + this.$route.params.deckId)

        if (response.data) {
          this.$store.state.deck = response.data
        }
      }
    },
    methods: {
      onSaveClick(event, navigate) {
        axios.post('/api/decks/' + this.$route.params.deckId + '/cards', this.card)
      },
      onSaveAndNewClick(event, navigate) {
        axios.post('/api/decks/' + this.$route.params.deckId + '/cards', this.card)
        this.$route.push('Create')
      }
    },
    computed: {
      deck() {
        return this.$store.state.deck
      }
    },
    components: {
      QuillEditor
    }
  }
</script>

