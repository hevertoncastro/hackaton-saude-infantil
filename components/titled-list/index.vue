<template>
  <div>
    <p class="o-text medium mt-25 mb-10">
      {{ title }}
    </p>

    <template v-if="values.length > 0">
      <p
        v-for="(value, index) in values"
        :key="index"
        class="o-text large semi-bold gray"
      >
        {{ value }}
      </p>
    </template>
    <p
      v-else
      class="o-text large semi-bold gray"
    >
      ---
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    values: {
      type: Array,
      required: true
    }
  }
};
</script>
