<!-- Jake doesn't put col sizes in the component, he lets the page determine sizing -->
<!-- since the form is tied to the active car, when you try to create a new car it will still have the information in the form for the active car, you can workaround this by having an @click that sets the active car to an empty obj. you should also set the active car to an empty string after submit. -->
<!-- scss scoped means that the css styles written in the bottom of a component do not apply to any other page or component. to do a global style, you must put the styling in the main css. -->


<template>
  <div class="card p-3 bg-white elevation-2 selectable selectable-no" :title="car.make">
    <div class="card-body">
      <!--                                         VVV must match the string in router.js -->
      <router-link :to="{ name: 'Car', params: { carId: car.id } }">
        <img class="img-fluid" :src="car.img" alt="">
        <div class="p-2">
          <h4 class="text-center">{{ car.make }} | {{ car.model }} | {{ car.year }}</h4>
          <p>{{ car.description }}</p>
          <p class="text-end text-success m-0">$<b>{{ car.price }}</b></p>
          <!-- <button class="btn btn-danger" @click="deleteCar(car)">Delete Listing</button>
          <button class="btn btn-warning" @click="toggleCarForm(car)">Edit Listing</button> -->
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
// imported for intellisense VVV
import Pop from "../utils/Pop.js";
import { Car } from "../models/Car.js";
import { logger } from "../utils/Logger.js";
import { carsService } from "../services/CarsService.js";

export default {
  props: {
    car: { type: Car, required: true }
  },
  setup() {
    return {
      toggleCarForm(car) {
        carsService.setActiveCar(car)
      },
      async deleteCar(car) {
        try {
          const yes = await Pop.confirm('Do you really want to permanently delete the listing for this car? (this cannot be undone!)')
          if (!yes) { return }
          await carsService.deleteCar(car.id)
        } catch (error) {
          logger.error('[deleting car]', error);
          Pop.error(error);
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
</style>