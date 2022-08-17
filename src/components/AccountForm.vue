<template>
  <form @submit.prevent="handleSubmit"></form>
</template>

<script>
import { watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState.js"
import { Pop } from "../utils/Pop.js"
import { accountService } from "../services/AccountService.js"

export default {
  setup(){

    const editable = ref({})

    watchEffect(()=>{
      if(!AppState.account) { return }
      editable.value = { ...AppState.account }
    })

    return{
      editable,
      handleSubmit() {
        try {
          accountService.editAccount(editable.value)
          // create "editAccount in the account service"
        } catch (error) {
        logger.error('[]', error);
        Pop.error(error);
        }
      }
    }
  }
}
</script>

<!-- <style lang="scss" scoped>

</style>

<template>
  
</template>

<script>
export default {
  setup(){
    return{}
  }
}
</script>

<style lang="scss" scoped>

</style> -->