<!-- you can't access the car by props here, the client may have navagated directly to this page and so they never picked up data from the homepage to carry over. but we do have a carId in the url -->
<template>
  
</template>

<script>
import { carsService } from "../Services/CarsService.js";
export default {
  setup(){
    const route = useRoute()

    async function getCarById(){
      try {
        //                                       VV this is the magic string that must match the one used on the router page
      await carsService.getCarById(route.params.carId)
      } catch (error) {
      logger.error('[]', error);
      Pop.error(error);
      }
      return
    }
  }
}
</script>

<style>

</style>