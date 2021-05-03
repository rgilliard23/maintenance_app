<template>
  <div class="card">
    <div>Ronald</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  width: 350px;
  margin: 20px 0;
  border-radius: 42px;
  box-shadow: 2px 2px 22px rgba(0, 0, 0, 0.2);
  transition: 0.3s box-shadow, 0.3s margin-top ease-in-out;
}
.card:hover {
  box-shadow: 2px 12px 32px rgba(0, 0, 0, 0.5);
  margin-top: 30px;
  cursor: pointer;
}
</style>
