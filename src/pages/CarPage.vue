<!-- you can't access the car by props here, the client may have navagated directly to this page and so they never picked up data from the homepage to carry over. but we do have a carId in the url -->
<template>
  <div class="car-page" v-if="car">
    <div class="my-3" :title="car.make">
        <img class="img-fluid" :src="car.img" alt="">
        <div class="p-2">
          <h4 class="text-center">{{ car.make }} | {{ car.model }} | {{ car.year }}</h4>
          <p>{{ car.description }}</p>
          <p class="text-end text-success m-0">$<b>{{ car.price }}</b></p>
          <button class="btn btn-danger" @click="deleteCar(car)">Delete Listing</button>
          <button class="btn btn-warning" @click="toggleCarForm(car)">Edit Listing</button>
        </div>
    </div>
    <Modal id="car-form">
      <CarForm />
    </Modal>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
import { carsService } from "../services/CarsService.js"
import { logger } from "../utils/Logger.js"
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState.js"
import { useRoute } from "vue-router"
import Pop from "../utils/Pop.js"
import { onMounted } from "vue"

export default {
  setup(){
    const route = useRoute()

    async function getCarById(){
      try {
        //                                       VV this is the magic string that must match the one used on the router page
      await carsService.getCarById(route.params.carId)
      } catch (error) {
      logger.error('[Getting Car by ID]', error);
      Pop.error(error);
      }
      return
    }
  }
}
</script>

<style ang="scss" scoped>
</style>