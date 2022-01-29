<template>
  <div>
      <Dialog v-bind:visible ="showModal"></Dialog>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {

    setup(){
        let showModal = ref(false)
    }

}
</script>

<style>

</style>