<template>
  <div @mouseover="openTooltip(name)" class="c-tooltip__holder">
    <slot />

    <div :class="{'show': tooltipOpened === name}" @mouseenter="resetTimer" @mouseleave="closeTooltip" class="c-tooltip large">
      <div class="c-tooltip__wrapper">
        <button
          v-clipboard:copy="value"
          @click="closeTooltip"
          type="button"
          class="c-tooltip__content c-tooltip__content--copy"
        >
          Copiar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loaded: false,
      tooltipTimers: [],
      tooltipOpened: ""
    };
  },
  methods: {
    openTooltip (tooltip) {
      this.tooltipOpened = tooltip;

      this.tooltipTimers.push({ id: tooltip,
        function: setTimeout(() => {
          this.closeTooltip();
        }, 800) });
    },
    closeTooltip () {
      this.tooltipTimers.forEach((timer, index) => {
        const id = timer.id;

        if (id === this.tooltipOpened) {
          clearTimeout(timer.function);
          timer.function = null;
          this.tooltipOpened = "";
        }

        if (this.tooltipTimers.indexOf(id)) {
          this.tooltipTimers.splice(index, 1);
        }
      });
    },
    resetTimer () {
      this.tooltipTimers.forEach((timer) => {
        if (timer.id === this.tooltipOpened) {
          clearTimeout(timer.function);
        }
      });
    }
  }
};
</script>
