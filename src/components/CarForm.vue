<template>
  <!-- TODO put a v-model in for every input! -->
  <form @submit.prevent="handleSubmit()" class="car-form">
    <h3 class="text-primary">List Your Car</h3>
    <div class="row p-3">
      <div class="col-4">
        <label class="form-label" for="make">Make</label>
        <input class="form-control" type="text" minlength="5" id="make" name="make" v-model="editable.make">
      </div>
      <div class="col-4">
        <label class="form-label" for="model">Model</label>
        <input class="form-control" type="text" id="model" name="model" v-model="editable.model">
      </div>
      <div class="col-4">
        <label class="form-label" for="year">Year</label>
        <input class="form-control" type="number" id="year" name="year" v-model="editable.year">
      </div>
      <label class="form-label" for="price">Price</label>
      <input class="form-control" type="number" min="500" id="price" name="price" v-model="editable.price">
      <label class="form-label" for="img">Image</label>
      <input class="form-control" type="text" id="img" name="img" v-model="editable.img">
      <label class="form-label" for="description">Description</label>
      <textarea class="w-100 form-control" name="description" id="description" rows="5"
        v-model="editable.description"></textarea>
      <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light" data-bs-dismiss="modal">Submit</button>
    </div>
  </form>
</template>

<script>
import Pop from "../utils/Pop.js"
import { ref } from "@vue/reactivity"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { carsService } from "../services/CarsService.js"

export default {
  setup() {

    //               VVVVVV            whenever you create or edit you need a ref!
    const editable = ref({})

    //   VVVV this is a vue listener
    watchEffect(() => {
      if (!AppState.activeCar) { return }
      // this format prevents the edit from putting invalid info on the object
      // you could just do editable.value = AppState.activeCar but this is not a good practice
      editable.value = { ...AppState.activeCar }
    })

    return {
      editable,

      async handleSubmit() {
        try {
          if (editable.value.id) {
            carsService.editCar(editable.value)
          } else {
            carsService.createCar(editable.value)
          }
          editable.value = {}
        } catch (error) {
          logger.error('[creating or editing car]', error);
          Pop.error(error);
        }
      }
    }
  }
}
</script>

<style>
</style>