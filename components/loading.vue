<template>
  <div :class="{ 'active': loading }" class="loading-page">
    carregando
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true;
    },
    finish () {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  font-size: 0;
  background: repeating-linear-gradient(to right, #F92278 0%, #FAD961 50%, #F92278 100%);
  width: 100%;
  height: 5px;
  background-size: 200% auto;
  background-position: 0 100%;
  animation: gradient 1500ms infinite;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  transform: translateY(-5px);
  transition: transform 250ms ease-in;
}

.loading-page.active {
  transform: translateY(0);
  transition: transform 250ms ease-out;
}

@keyframes gradient {
  0%   { background-position: 0 0; }
  100% { background-position: -200% 0; }
}
</style>
