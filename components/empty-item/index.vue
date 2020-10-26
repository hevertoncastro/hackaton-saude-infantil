<template>
  <div class="c-card">
    <p class="o-text large gray mt-15 mb-15 inline">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: "Nenhum item encontrado."
    }
  }
};
</script>
