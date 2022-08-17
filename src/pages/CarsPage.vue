<template>
<div class="cars-page">cars page is up</div>
<div class="">
  <div class="">
    <div class="">
      <div class="">
        <CarCard/>
      </div>
    </div>
  </div>
</div>
<Modal>
  <!-- write carform, and modal -->
</Modal>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { Pop } from "../utils/Pop.js"
import { carsService } from "../Services/CarsService.js"
import { AppState } from "../AppState.js"
import CarCard from "../components/CarCard.vue"

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
    components: { CarCard }
}
</script>

<style>
</style>