<!-- Jake doesn't put col sizes in the component, he lets the page determine sizing -->
<template>
  <div class="card p-3 bg-white elevation-2">
    <div class="card-body">
      <img class="img-fluid" :src="car.img" alt="">
      <div class="p-2">
        <h4 class="text-center">{{ car.make }} | {{ car.model }} | {{ car.year }}</h4>
        <p>{{ this.description }}</p>
        <p class="text-end text-success m-0">$<b>{{ car.price }}</b></p>
        <button class="btn btn-danger" @click="deleteCar(car)">Delete Listing</button>
        <button class="btn btn-warning" @click="adjustCar(car)">Edit Listing</button>
      </div>
    </div>
  </div>
</template>

<script>
// imported for intellisense VVV
import { Car } from "../Models/Car.js";

export default {
  props: {
    car: {
      type: Car, required: true,
    },
    setup() {
// put delete here
    }
  }
}
</script>

<style>
</style>