<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">My Decks</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">OCP Java SE 17 Developer (1Z0-829)</li>
          </ol>

        </nav>
      </div>
      <div class="col text-end" >
        <router-link :to="{name: 'CreateCard', params: {deckId: 1}}" class="link-warning">+ card</router-link>
      </div>
    </div>
  </div>


  <div class="list-group w-auto">
    <div class="list-group-item list-group-item-action d-flex gap-3 py-3 bg-success bg-opacity-10 border-success card" aria-current="true">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 class="mb-0">What Predicate interface is used for?</h6>
          <p class="mb-0 opacity-75">It test a parameter and returns boolean result</p>
        </div>
        <div class="justify-content-end d-flex gap-4 align-items-center">
          <small class="text-nowrap">54 reviews</small>
          <router-link :to="{name: 'Card', params: {deckId: 1, cardId: 1}}" class="opacity-90 link-secondary" type="button">
            <Pencil/>
          </router-link>
          <button type="button" class="btn-close" aria-label="Close" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="deleteDeck" data-card-id="1"></button>
        </div>
      </div>
    </div>
    <div class="list-group-item list-group-item-action d-flex gap-3 py-3 bg-info bg-opacity-10 border-info card" aria-current="true">
      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 class="mb-0">In what case lambda can be passed as a method parameter?</h6>
          <p class="mb-0 opacity-75">If method expects interface with a single method as a parameter</p>
        </div>
        <div class="justify-content-end d-flex gap-4 align-items-center">
          <small class="text-nowrap">73 reviews</small>
          <router-link :to="{name: 'Card', params: {deckId: 1, cardId: 2}}" class="opacity-90 link-secondary" type="button">
            <Pencil/>
          </router-link>
          <button type="button" class="btn-close" aria-label="Close" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="deleteDeck" data-card-id="2"></button>
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
export default {
  name: "Cards",
  components: {Pencil},
  data() {
    return {
      cardId: null
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

</style>