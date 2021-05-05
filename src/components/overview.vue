<template>
  <div class="overview">
    <SendReport />
    <Fab class="fab" />
  </div>
</template>

<script>
import Fab from "../components/widgets/fab";
import SendReport from "../components/modals/sendReport";
export default {
  name: "Overview",
  components: {
    Fab,
    SendReport,
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
