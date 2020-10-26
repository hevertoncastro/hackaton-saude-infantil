<template>
  <div :class="holderClass" class="o-toggle">
    <input
      :name="name"
      :id="id"
      :checked="active"
      :disabled="disabled"
      @change="$emit('update:active', !active)"
      class="o-toggle__checkbox"
      type="checkbox"
      aria-hidden="true"
      hidden
    >

    <label :for="id" class="o-toggle__label">
      <span class="toggle-track" />
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: () => {
        return "toggle-" + Math.random().toString(36).substr(2, 9);
      }
    },
    label: {
      type: String,
      default: ""
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    holderClass: {
      type: String,
      default: ""
    }
  }
};
</script>
