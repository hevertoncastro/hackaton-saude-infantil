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
            {{ modeText }} endereço
          </h2>
        </div>

        <div class="c-form__row">
          <div class="c-form__field">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true, min: 8 }" mode="lazy">
              <label class="c-form__label" for="zipcode">CEP*</label>
              <input ref="zipcode" v-model="zipcode" v-mask="'##.###-###'" @blur="fetchZipCode" class="c-form__input">
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
        </div>
        <div class="c-form__row">
          <div class="c-form__field large">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true }" mode="lazy">
              <label class="c-form__label" for="address">Endereço*</label>
              <input id="address" v-model="address" class="c-form__input">
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
          <div class="c-form__field small">
            <label class="c-form__label" for="number">Número*</label>
            <input id="number" ref="number" v-model="number" class="c-form__input">
          </div>
        </div>

        <div class="c-form__row">
          <div class="c-form__field medium">
            <label class="c-form__label" for="complement">Complemento</label>
            <input id="complement" v-model="complement" class="c-form__input">
          </div>
          <div class="c-form__field medium">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true }" mode="lazy">
              <label class="c-form__label" for="neighborhood">Bairro*</label>
              <input id="neighborhood" v-model="neighborhood" class="c-form__input">
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
        </div>

        <div class="c-form__row">
          <div class="c-form__field medium">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true }" mode="lazy">
              <label class="c-form__label" for="city">Cidade*</label>
              <input id="city" v-model="city" class="c-form__input">
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
          <div class="c-form__field medium">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true }" mode="lazy">
              <label class="c-form__label" for="state_initials">Estado*</label>
              <div class="c-form__select">
                <select id="state_initials" v-model="state_initials" name="state_initials">
                  <option value="" selected disabled>
                    Selecionar
                  </option>
                  <option value="AC">
                    Acre
                  </option>
                  <option value="AL">
                    Alagoas
                  </option>
                  <option value="AM">
                    Amazonas
                  </option>
                  <option value="AP">
                    Amapá
                  </option>
                  <option value="BA">
                    Bahia
                  </option>
                  <option value="CE">
                    Ceará
                  </option>
                  <option value="DF">
                    Distrito Federal
                  </option>
                  <option value="ES">
                    Espírito Santo
                  </option>
                  <option value="GO">
                    Goiás
                  </option>
                  <option value="MA">
                    Maranhão
                  </option>
                  <option value="MG">
                    Minas Gerais
                  </option>
                  <option value="MS">
                    Mato Grosso do Sul
                  </option>
                  <option value="MT">
                    Mato Grosso
                  </option>
                  <option value="PA">
                    Pará
                  </option>
                  <option value="PB">
                    Paraíba
                  </option>
                  <option value="PE">
                    Pernambuco
                  </option>
                  <option value="PI">
                    Piauí
                  </option>
                  <option value="PR">
                    Paraná
                  </option>
                  <option value="RJ">
                    Rio de Janeiro
                  </option>
                  <option value="RN">
                    Rio Grande do Norte
                  </option>
                  <option value="RO">
                    Rondônia
                  </option>
                  <option value="RR">
                    Roraima
                  </option>
                  <option value="RS">
                    Rio Grande do Sul
                  </option>
                  <option value="SC">
                    Santa Catarina
                  </option>
                  <option value="SE">
                    Sergipe
                  </option>
                  <option value="SP">
                    São Paulo
                  </option>
                  <option value="TO">
                    Tocantins
                  </option>
                </select>
              </div>
              <ul class="c-form__errors">
                <li v-for="error in errors" :key="error" class="c-form__error">
                  {{ error }}
                </li>
              </ul>
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
                  <option value="Residencial">
                    Residencial
                  </option>
                  <option value="Hospital">
                    Hospital
                  </option>
                </select>
              </div>
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
        </div>

        <div class="c-form__row">
          <div class="c-form__field mt-10 mb-10">
            <toggle :active.sync="visible" label="Mostrar endereço no site." />
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
      zipcode: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state_initials: "",
      visible: false,
      main: false,
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
    this.$parent.$on("update-address", this.fetchData);
    this.$parent.$on("delete-address", this.delete);
  },
  methods: {
    closeForm () {
      this.resetForm();
      this.$emit("close");
    },
    resetForm () {
      this.type = "";
      this.zipcode = "";
      this.address = "";
      this.number = "";
      this.complement = "";
      this.neighborhood = "";
      this.city = "";
      this.state_initials = "";
      this.visible = false;
      this.main = false;
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
          await this.$store.dispatch("members/UPDATE_MEMBER_ADDRESS", {
            id: this.id,
            member_id: this.memberId,
            type: this.type,
            zipcode: this.zipcode,
            address: this.address,
            number: this.number,
            complement: this.complement,
            neighborhood: this.neighborhood,
            city: this.city,
            state_initials: this.state_initials,
            visible: this.visible,
            main: this.main
          });

          this.isLoading = false;
          this.resetForm();
          this.$emit("close");
          this.$emit("feedback", "Endereço atualizado com sucesso.", "success");
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
          await this.$store.dispatch("members/CREATE_MEMBER_ADDRESS", {
            member_id: this.memberId,
            type: this.type,
            zipcode: this.zipcode,
            address: this.address,
            number: this.number,
            complement: this.complement,
            neighborhood: this.neighborhood,
            city: this.city,
            state_initials: this.state_initials,
            visible: this.visible,
            main: false
          });

          this.isLoading = false;
          this.resetForm();
          this.$emit("close");
          this.$emit("feedback", "Endereço cadastrado com sucesso.", "success");
          this.$emit("success");
        } catch (error) {
          // @todo: handle error
          this.$emit("feedback", error[0].message, "danger");
        }
      });
    },
    async delete (item, member) {
      try {
        await this.$store.dispatch("members/DELETE_MEMBER_ADDRESS", {
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
            const address = await this.$store.dispatch("members/GET_MEMBER_ADDRESS", {
              id: this.id,
              memberId: this.memberId
            });

            this.type = address.type;
            this.zipcode = address.zipcode;
            this.address = address.address;
            this.number = address.number;
            this.complement = address.complement;
            this.neighborhood = address.neighborhood;
            this.city = address.city;
            this.state_initials = address.state_initials;
            this.visible = address.visible;

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
    },
    async fetchZipCode () {
      try {
        const fetchedAddress = await this.$store.dispatch("members/FETCH_ZIPCODE", this.zipcode);

        if (!fetchedAddress.erro) {
          this.address = fetchedAddress.logradouro;
          this.neighborhood = fetchedAddress.bairro;
          this.city = fetchedAddress.localidade;
          this.state_initials = fetchedAddress.uf;

          // @todo: Remover $nextTick
          this.$nextTick(() => this.$refs.number.focus());
        } else {
          this.$bus.$emit("showFeedback", {
            message: "CEP não encontrado.",
            category: "warning"
          });
        }
      } catch (error) {
        this.$bus.$emit("showFeedback", {
          message: error,
          category: "warning"
        });
      }
    }
  }
};
</script>
