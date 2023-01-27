<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <router-link to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-stack me-2" viewBox="0 0 16 16">
            <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z"/>
            <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z"/>
          </svg>
          FlashCards
        </router-link>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
<!--          <li><a href="#" class="nav-link px-2">Features</a></li>-->
<!--          <li><a href="#" class="nav-link px-2">Pricing</a></li>-->
<!--          <li><a href="#" class="nav-link px-2">FAQs</a></li>-->
<!--          <li><a href="#" class="nav-link px-2">About</a></li>-->
        </ul>

<!--        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">-->
<!--          <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search">-->
<!--        </form>-->

        <div class="text-end">
<!--          <button type="button" class="btn btn-outline-light me-2">Login</button>-->
<!--          <button type="button" class="btn btn-warning">Sign-up</button>-->
          <router-link to="/" custom v-slot="{ href, navigate }">
            <a :href="href" @click="onCreateDeckClick($event, navigate)" class="btn btn-warning">+ Deck</a>
          </router-link>

        </div>
      </div>
    </div>
  </header>

  <div class="modal fade" id="createDeckModal" tabindex="-1" aria-labelledby="createDeckModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create a New Deck</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
<!--        <form @submit="saveServerSideDeck" class="needs-validation" novalidate>-->
        <form @submit.prevent="saveDeck" class="needs-validation" novalidate>
          <div class="modal-body">
            <div class="mb-3">
              <input v-model="fields.name" type="text" class="form-control" id="validation-name" placeholder="Deck Name" required>
              <div id="validation-name-error" class="invalid-feedback">Deck name is required</div>
            </div>
            <div class="mb-3">
              <textarea v-model="fields.description" type="text" class="form-control" id="validation-name" placeholder="Deck Description"></textarea>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" v-model="fields.isPrivate" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
              <label class="form-check-label" for="flexSwitchCheckChecked">Private</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button class="btn btn-primary">Create</button>
<!--            <button type="submit" class="btn btn-primary">Create</button>-->
<!--            <button @click="saveDeck" data-bs-dismiss="modal"  class="btn btn-primary">Create</button>-->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap'
import axios from 'axios'

export default {
  data() {
    return {
      fields: {
        name: null,
        description: null,
        isPrivate: true
      },
      deck: null,
      modal: null
    }
  },
  methods: {
    onCreateDeckClick(event, navigate) {
      this.modal = new bootstrap.Modal(document.getElementById('createDeckModal'), {})
      this.modal.show()
      navigate(event)
    },
    saveDeck(e) {
      const form = document.querySelectorAll('.needs-validation')[0];

      if (!form.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        axios
          .post('/api/decks', {
            'name': this.fields.name,
            'description': this.fields.description,
            'isPrivate': this.fields.isPrivate
          })
          .then(response => {
            this.deck = response.data
            this.$store.commit("refreshDecks")
            this.fields.name = null
            this.fields.description = null
            this.modal.hide()
          })
          .catch(error => {
            Object.entries(error.response.data.errors).forEach(([key, value]) => {
              document.getElementById('validation-' + key).classList.add('is-invalid')
              document.getElementById('validation-' + key + '-error').textContent = value
            })
          })
      }

      form.classList.add('was-validated')
    },
  },
}
</script>