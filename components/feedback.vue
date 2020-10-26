<template>
  <div
    :class="{
      'danger': category === 'danger',
      'warning': category === 'warning',
      'success': category === 'success',
      'c-feedback--is-visible': visible
    }"
    @click="hide"
    class="c-feedback"
  >
    <p class="c-feedback__text o-text large white">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Feedback",
  data: () => ({
    visible: false,
    message: "",
    category: "success",
    timer: null
  }),
  created () {
    this.$bus.$on("showFeedback", (data) => {
      this.visible = false;
      this.category = "success";

      if (data.message) {
        this.message = data.message;
      }
      if (data.category) {
        this.category = data.category;
      }

      this.show(data.duration);
    });
  },
  methods: {
    show (customDuration = 3000) {
      this.visible = true;

      this.timer = setTimeout(() => {
        this.hide();
      }, customDuration);
    },
    hide () {
      this.visible = false;
      clearTimeout(this.timer);
    }
  }
};
</script>
