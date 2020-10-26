<template>
  <ul class="c-form__errors">
    <li v-for="error in errors" :key="error" class="c-form__error">
      {{ error }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true,
      default: () => {}
    }
  }
};
</script>
