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
              <router-link :to="{name: 'Cards', params: {id: 1}}">OCP Java SE 17 Developer (1Z0-829)</router-link>
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
            <QuillEditor v-model:content="question" contentType="html" toolbar="essential" theme="snow" />
          </div>
      </div>
      <div class="col">
        <h2>Answer</h2>
          <div>
            <QuillEditor v-model:content="answer" contentType="html" toolbar="essential" theme="snow" />
          </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="justify-content-center d-flex gap-2 align-items-center">
      <router-link to="/" custom v-slot="{ href, navigate }">
        <a @click="$router.back()" class="btn btn-secondary" role="button">Cancel</a>
      </router-link>
      <router-link :to="{name: 'Cards', params: {id: 1}}" custom v-slot="{ href, navigate }">
        <a :href="href" @click="onSaveClick($event, navigate)" class="btn btn-warning" role="button">Save</a>
      </router-link>
      <router-link :to="{name: 'CreateCard', params: {deckId: 1}}" custom v-slot="{ href, navigate }">
        <a :href="href" @click="onSaveAndNewClick($event, navigate)" class="btn btn-success" role="button">Save and Create One More</a>
      </router-link>
    </div>
  </div>

</template>

<script>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';

  export default {
    data() {
      return {
        question: null,
        answer: null
      }
    },
    methods: {
      onSaveClick(event, navigate) {
      },
      onSaveAndNewClick(event, navigate) {
      }
    },
    components: {
      QuillEditor
    }
  }
</script>

