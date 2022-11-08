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
        <div>
          <QuillEditor v-model:content="question" contentType="html" toolbar="essential" theme="snow">
            {{ question }}
          </QuillEditor>
        </div>
      </div>
      <div class="col">
        <h2>Answer</h2>
        <div>
          <QuillEditor v-model:content="answer" contentType="html" toolbar="essential" theme="snow">
            {{ answer }}
          </QuillEditor>
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

export default {
  data() {
    return {
      question: "What Predicate interface is used for?",
      answer: "It test a parameter and returns boolean result"
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
