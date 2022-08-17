<template>
  <div class="cars-page">
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="c in cars" :key="c.id">

            <CarCard :car="c" />

        </div>
      </div>
    </div>
  </div>
  <Modal>
    <!-- VV this goes in the modal "slot" -->
    <CarForm />
  </Modal>
</template>

<script>
import { carsService } from "../Services/CarsService.js"
import { computed, onMounted } from "@vue/runtime-core"
import CarCard from "../components/CarCard.vue"
import CarForm from "../components/CarForm.vue"
import { AppState } from "../AppState.js"
import Pop from "../utils/Pop.js"

export default {
  setup() {
    async function getCars() {
      try {
        await carsService.getCars();
      }
      catch (error) {
        logger.error("[]", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getCars();
    });
    return {
      cars: computed(() => AppState.cars)
    };
  },
  components: { CarCard, CarForm }
}
</script>

<style>
</style>