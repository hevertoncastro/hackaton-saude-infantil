<template>
  <div :class="{ success: address.visible }" class="c-card">
    <div class="c-context">
      <label class="c-context__button">
        <input :ref="`address__checkbox-${address.id}`" class="c-context__checkbox" type="checkbox">
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
      {{ briefAddress }}
    </p>
    <p class="o-text medium gray mb-10">
      {{ address.complement }}{{ address.complement ? ` - ` : '' }}{{ address.neighborhood }}
    </p>
    <p class="o-text medium mb-10">
      {{ address.city }} - {{ address.state_initials }} ({{ address.zipcode | mask("##.###-###") }})
    </p>

    <button
      :class="{ active: address.main && !isLoading }"
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
    address: {
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
    briefAddress () {
      const separator = this.address.number ? ", " : "";
      return `${this.address.address}${separator}${this.address.number || ""}`;
    }
  },
  methods: {
    edit (_data) {
      this.$refs[`address__checkbox-${this.address.id}`].checked = false;
      this.$emit("edit", "address", "edit", this.address.id);
    },
    remove () {
      this.$refs[`address__checkbox-${this.address.id}`].checked = false;
      this.$emit("remove", {
        type: "address",
        type_text: "Endereço excluído",
        id: this.address.id,
        title: "Excluir endereço",
        opening_text: "Você está excluindo o endereço",
        item_text: this.briefAddress,
        closing_text: "Esta operação não poderá ser desfeita."
      });
    },
    setAsMain () {
      this.$refs[`address__checkbox-${this.address.id}`].checked = false;

      if (this.address.main) {
        return false;
      }

      this.isLoading = true;

      // @todo: Remover $nextTick
      this.$nextTick(async () => {
        try {
          await this.$store.dispatch("members/SET_MAIN_ADDRESS", {
            id: this.address?.id,
            member_id: this.memberId
          });

          this.isLoading = false;
          this.$emit("feedback", "Endereço principal definido com sucesso.", "success");
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
