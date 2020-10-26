<template>
  <li class="c-data-table__item">
    <p class="o-text semi-bold medium mb-10">
      {{ title }}
    </p>
    <Clipboard v-if="clipboard && value" :name="`${value}`" :value="value">
      <p
        class="o-text medium gray"
      >
        {{ value || '-' }}
      </p>
    </Clipboard>
    <p
      v-else
      class="o-text medium gray"
    >
      {{ value || '-' }}
    </p>
  </li>
</template>

<script>
import Clipboard from "~/components/clipboard";

export default {
  components: {
    Clipboard
  },
  props: {
    title: {
      type: String,
      required: true,
      default: ""
    },
    value: {
      type: String,
      required: true,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    clipboard: {
      type: Boolean,
      default: true
    }
  }
};
</script>
