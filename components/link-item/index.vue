<template>
  <div>
    <p class="o-text medium mt-25 mb-10">
      {{ title }}
    </p>
    <a :href="link" target="_blank" class="o-link o-text large semi-bold info">
      {{ link }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
};
</script>
