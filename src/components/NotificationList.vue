<template>
  <div class="notification-list">
    <notfication-message />
  </div>
</template>

<script>
import NotficationMessage from "./NotificationMessage";
export default {
  components: {
    NotficationMessage,
  },
};
</script>

<style scoped>
.notification-list {
  position: fixed;
  bottom: 0;
  margin-right: 15px;
  z-index: 1;
  right: 0;
  width: 320px;
}
</style>
