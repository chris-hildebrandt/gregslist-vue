<template>
<div class="cars-page">cars page is up</div>
<div class="container">
  <div class="row">
    <div class="col-md-4" v-for="c in cars" :key="c.id">
      <div class="">
        <CarCard :car="c" />
      </div>
    </div>
  </div>
</div>
<Modal>
  <CarForm/>
</Modal>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import Pop from "../utils/Pop.js"
import { carsService } from "../Services/CarsService.js"
import { AppState } from "../AppState.js"
import CarCard from "../components/CarCard.vue"
import CarForm from "../components/CarForm.vue"

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