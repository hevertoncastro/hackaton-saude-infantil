<template>
  <modal
    :name="name"
    :classes="['v--modal', 'c-modal__box']"
    width="440"
    height="auto"
    adaptive
  >
    <button @click="abortRemoveItem" :disabled="isLoading" class="c-modal__close">
      Fechar
    </button>

    <p v-if="data.title" class="o-text giant mb-20">
      {{ data.title }}
    </p>
    <p v-if="data.opening_text" class="o-text medium gray mb-5">
      {{ data.opening_text }}
    </p>
    <p v-if="data.item_text" class="o-text giant bold gray mb-5">
      {{ data.item_text }}
    </p>
    <p v-if="data.closing_text" class="o-text medium gray mb-30">
      {{ data.closing_text }}
    </p>

    <div class="o-button__holder no-margin">
      <button
        @click="abortRemoveItem"
        :disabled="isLoading"
        class="o-button muted"
      >
        <span>Cancelar</span>
      </button>
      <button
        @click="confirmRemoveItem"
        :class="{ 'loading': isLoading }"
        class="o-button main"
      >
        <span>Excluir</span>
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: "remove-item-modal"
    },
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      isLoading: false
    };
  },
  watch: {
    data () {
      this.isLoading = false;
    }
  },
  methods: {
    confirmRemoveItem () {
      this.isLoading = true;
      this.$emit("confirm");
    },
    abortRemoveItem () {
      this.$emit("abort");
    }
  }
};
</script>
