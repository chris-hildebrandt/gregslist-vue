<template>
  <div class="cars-page">
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="c in cars" :key="c.id">

            <CarCard :car="c" />

        </div>
      </div>
    </div>
    <button class="btn btn-fab" title="Add Car" data-bs-toggle="modal" data-bs-target="#car-form" @click="setActiveCar()"><i class="mdi mdi-plus f-18 text-white"></i></button>
  </div>
  <Modal id="car-form">
    <!-- VV this goes in the modal "slot" -->
    <CarForm />
  </Modal>
</template>

<script>
import { carsService } from "../services/CarsService.js"
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import Pop from "../utils/Pop.js"

export default {
  setup() {
    async function getCars() {
      try {
        await carsService.getCars();
      }
      catch (error) {
        logger.error("[get cars]", error)
        Pop.error(error)
      }
    }
    onMounted(() => {
      getCars()
    })
    return {
      cars: computed(() => AppState.cars),
      setActiveCar() {
        carsService.setActiveCar({})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-fab {
  position: fixed;
  border-radius: 50%;
  bottom: 3rem;
  right: 2rem;
}
</style>