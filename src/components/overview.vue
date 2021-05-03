<template>
  <div class="overview">
    <Fab class="fab" />
  </div>
</template>

<script>
import Fab from "../components/widgets/fab";
export default {
  name: "Overview",
  components: {
    Fab,
  },
};
</script>

<style scoped>
.overview {
  background-color: white;
  border-radius: 20px;
  margin: 6px 6px 6px 0;
}

.fab {
  position: fixed;
  right: 10%;
  bottom: 10%;
}
</style>
