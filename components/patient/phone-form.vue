<template>
  <div :class="{ loaded: isContentReady }" class="c-form__holder">
    <span v-if="!isContentReady" class="o-loader large" />
    <ValidationObserver ref="observer" v-else v-slot="{ handleSubmit }" class="c-form__wrap">
      <form @submit.prevent="handleSubmit(save)" class="c-form">
        <div class="s-content__title">
          <button @click.prevent="closeForm" class="s-content__button top back-arrow">
            Voltar
          </button>
          <h2 class="o-title pl-45 mb-30">
            {{ modeText }} telefone
          </h2>
        </div>

        <div class="c-form__row">
          <div class="c-form__field">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true, min: 14 }" mode="lazy">
              <label class="c-form__label" for="number">Telefone*</label>
              <input id="number" v-model="number" v-mask="['(##) ####-####', '(##) #####-####']" class="c-form__input">
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
        </div>
        <div class="c-form__row">
          <div class="c-form__field">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true }" mode="lazy">
              <label class="c-form__label" for="type">Tipo*</label>
              <div class="c-form__select">
                <select id="type" v-model="type" name="type">
                  <option value="" selected disabled>
                    Selecionar
                  </option>
                  <option value="Consultório">
                    Consultório
                  </option>
                  <option value="Residência">
                    Residência
                  </option>
                  <option value="Celular">
                    Celular
                  </option>
                </select>
              </div>
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
        </div>

        <div class="c-form__row">
          <div class="c-form__field mt-10 mb-10">
            <toggle :active.sync="visible" label="Mostrar telefone no site." />
          </div>
        </div>

        <div class="o-button__holder">
          <button @click.prevent="closeForm" :disabled="isLoading" class="o-button muted mr-10">
            <span>Cancelar</span>
          </button>
          <button :class="{ 'loading': isLoading }" class="o-button main">
            <span>Salvar</span>
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import FieldError from "~/components/form/field-error";
import Toggle from "~/components/toggle";

export default {
  components: {
    FieldError,
    Toggle
  },
  directives: { mask },
  props: {
    id: {
      type: String,
      required: true
    },
    memberId: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true,
      default: "add"
    }
  },
  data () {
    return {
      type: "",
      number: "",
      visible: false,
      isContentReady: false,
      isLoading: false
    };
  },
  computed: {
    modeText () {
      return this.mode === "add" ? "Adicionar" : "Editar";
    }
  },
  created () {
    this.$parent.$on("update-phone", this.fetchData);
    this.$parent.$on("delete-phone", this.delete);
  },
  methods: {
    closeForm () {
      this.resetForm();
      this.$emit("close");
    },
    resetForm () {
      this.type = "";
      this.number = "";
      this.visible = false;
      this.resetValidations();
      this.isLoading = false;
      this.isContentReady = false;
    },
    resetValidations () {
      requestAnimationFrame(() => {
        if (this.$refs && this.$refs.observer) {
          this.$refs.observer.reset();
        }
      });
    },
    save () {
      // @todo: Remover $nextTick
      this.$nextTick(() => {
        if (this.mode === "edit") {
          this.update();
        } else if (this.mode === "add") {
          this.add();
        }
      });
    },
    update () {
      this.isLoading = true;
      // @todo: Remover $nextTick
      this.$nextTick(async () => {
        try {
          await this.$store.dispatch("members/UPDATE_MEMBER_PHONE", {
            id: this.id,
            member_id: this.memberId,
            type: this.type,
            number: this.number,
            visible: this.visible
          });

          this.isLoading = false;
          this.resetForm();
          this.$emit("close");
          this.$emit("feedback", "Telefone atualizado com sucesso.", "success");
          this.$emit("success");
        } catch (error) {
          // @todo: handle error
          this.$emit("feedback", error[0].message, "danger");
        }
      });
    },
    add () {
      this.isLoading = true;
      // @todo: Remover $nextTick
      this.$nextTick(async () => {
        try {
          await this.$store.dispatch("members/CREATE_MEMBER_PHONE", {
            member_id: this.memberId,
            type: this.type,
            number: this.number,
            visible: this.visible
          });

          this.isLoading = false;
          this.resetForm();
          this.$emit("close");
          this.$emit("feedback", "Telefone cadastrado com sucesso.", "success");
          this.$emit("success");
        } catch (error) {
          // @todo: handle error
          this.$emit("feedback", error[0].message, "danger");
        }
      });
    },
    async delete (item, member) {
      try {
        await this.$store.dispatch("members/DELETE_MEMBER_PHONE", {
          id: item.id,
          member_id: member
        });

        this.$emit("removed");
      } catch (error) {
        // @todo: handle error
      }
    },
    fetchData () {
      // @todo: Remover $nextTick
      this.$nextTick(async () => {
        if (this.mode === "edit") {
          try {
            const phone = await this.$store.dispatch("members/GET_MEMBER_PHONE", {
              id: this.id,
              memberId: this.memberId
            });

            this.type = phone.type;
            this.number = phone.number;
            this.visible = phone.visible;

            this.isContentReady = true;
          } catch {
            // @todo: handle error
            // this.$router.push('/login')
            // this.isLoading = false;
          }
        } else if (this.mode === "add") {
          this.isContentReady = true;
          // @todo: add mode
        }
      });
    }
  }
};
</script>
