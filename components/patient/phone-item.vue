<template>
  <div :class="{ success: phone.visible }" class="c-card">
    <div class="c-context">
      <label class="c-context__button">
        <input :ref="`phone__checkbox-${phone.id}`" class="c-context__checkbox" type="checkbox">
        <ul class="c-context__menu">
          <li class="c-context__menu-item">
            <button @click="setAsMain" class="c-context__menu-link main">Definir como principal</button>
          </li>
          <li class="c-context__menu-item">
            <button @click="edit" class="c-context__menu-link">Editar</button>
          </li>
          <li class="c-context__menu-item">
            <button @click="remove" class="c-context__menu-link">Excluir</button>
          </li>
        </ul>
      </label>
    </div>

    <p class="o-text large mb-15 inline">
      {{ phone.number | mask(["(##) ####-####", "(##) #####-####"]) }}
    </p>

    <button
      :class="{ active: phone.main && !isLoading }"
      :disabled="isLoading"
      class="o-button__card-tag"
    >
      ★ Principal
    </button>
  </div>
</template>

<script>
export default {
  props: {
    phone: {
      type: Object,
      required: true,
      default: () => {}
    },
    memberId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    };
  },
  computed: {
    phoneNumber () {
      return this.$options.filters.mask(
        this.phone && this.phone.number
          ? this.phone.number
          : "", ["(##) ####-####", "(##) #####-####"]
      );
    }
  },
  methods: {
    edit () {
      this.$refs[`phone__checkbox-${this.phone.id}`].checked = false;
      this.$emit("edit", "phone", "edit", this.phone.id);
    },
    remove () {
      this.$refs[`phone__checkbox-${this.phone.id}`].checked = false;
      this.$emit("remove", {
        type: "phone",
        type_text: "Telefone excluído",
        id: this.phone.id,
        title: "Excluir telefone",
        opening_text: "Você está excluindo o telefone",
        item_text: this.phoneNumber,
        closing_text: "Esta operação não poderá ser desfeita."
      });
    },
    setAsMain () {
      this.$refs[`phone__checkbox-${this.phone.id}`].checked = false;

      if (this.phone.main) {
        return false;
      }

      this.isLoading = true;

      // @todo: Remover $nextTick
      this.$nextTick(async () => {
        try {
          await this.$store.dispatch("members/SET_MAIN_PHONE", {
            id: this.phone?.id,
            member_id: this.memberId
          });

          this.isLoading = false;
          this.$emit("feedback", "Telefone principal definido com sucesso.", "success");
          this.$emit("success");
        } catch (error) {
          // @todo: handle error
          this.$emit("feedback", error[0].message, "danger");
        }
      });
    }
  }
};
</script>
