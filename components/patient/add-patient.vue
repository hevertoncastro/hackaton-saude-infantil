<template>
  <div class="c-form__holder loaded">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }" class="c-form__wrap">
      <form @submit.prevent="handleSubmit(save)" class="c-form">
        <div class="s-content__title">
          <button @click.prevent="closeForm" class="s-content__button top back-arrow">
            Voltar
          </button>
          <h2 class="o-title pl-45 mb-30">
            Dados do paciente
          </h2>
        </div>

        <div class="c-form__row">
          <div class="c-form__field">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true }" mode="lazy">
              <label for="name" class="c-form__label">Instituição*</label>
              <input id="name" :value="getSelectedPlace" class="c-form__input" disabled>
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
        </div>

        <div class="c-form__row">
          <div class="c-form__field">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true }" mode="lazy">
              <label for="name" class="c-form__label">Nome completo*</label>
              <input id="name" v-model="name" class="c-form__input" placeholder="Digite o nome completo do paciente">
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
        </div>

        <div class="c-form__row">
          <div class="c-form__field medium">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true }" mode="lazy">
              <label for="sus" class="c-form__label">Nome do SUS*</label>
              <input id="sus" v-model="sus" v-mask="['### #### #### ####']" class="c-form__input" placeholder="000 0000 0000 0000">
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
          <div class="c-form__field medium">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true, cpf: true }" mode="lazy">
              <label for="cpf" class="c-form__label">CPF*</label>
              <input id="cpf" v-model="cpf" v-mask="['###.###.###-##']" class="c-form__input" placeholder="000.000.000-00">
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
        </div>

        <div class="c-form__row">
          <div class="c-form__field medium">
            <label class="c-form__label" for="gender">
              Gênero*
            </label>

            <multiselect
              id="gender"
              v-model="gender"
              :options="genderOptions"
              :searchable="false"
              :allow-empty="false"
              label="name"
              track-by="id"
              placeholder="Selecione"
              select-label=""
              selected-label="✓"
              deselect-label=""
            />
          </div>
          <div class="c-form__field medium">
            <label class="c-form__label" for="breed">
              Cor*
            </label>

            <multiselect
              id="breed"
              v-model="breed"
              :options="breedOptions"
              :searchable="false"
              :allow-empty="false"
              label="name"
              track-by="id"
              placeholder="Selecione"
              select-label=""
              selected-label="✓"
              deselect-label=""
            />
          </div>
        </div>

        <div class="c-form__row">
          <div class="c-form__field">
            <ValidationProvider v-slot="{ errors }" :rules="{ required: true, shortDate: true }" mode="lazy">
              <label for="birthdate" class="c-form__label">Data de nascimento*</label>
              <input id="birthdate" v-model="birthdate" v-mask="['##/##/####']" class="c-form__input" placeholder="DD/MM/AAAA">
              <field-error :errors="errors" />
            </ValidationProvider>
          </div>
        </div>

        <div class="c-form__row">
          <div class="c-form__field mt-10 mb-10">
            <toggle :active.sync="visible" label="Autoriza uso dos dados em estudos científicos." />
          </div>
        </div>

        <hr class="o-divider mt-20 mb-20">

        <!-- Additional data -->
        <div class="c-accordion mt-30">
          <input id="form_more_info" class="c-accordion__checkbox" type="checkbox">
          <label class="c-accordion__label" for="form_more_info">
            <span class="c-accordion__item-text o-text large bold">
              Outras informações
            </span>
          </label>

          <div class="c-accordion__content mt-15">
            <div class="c-form__row">
              <div class="c-form__field">
                <ValidationProvider v-slot="{ errors }" :rules="{ max: 200 }" mode="lazy">
                  <label for="responsable" class="c-form__label">
                    Nome dos responsáveis <span class="o-text warning semi-bold">(certidão de nascimento)</span>
                  </label>
                  <textarea id="responsable" v-model="responsable" rows="4" class="c-form__textarea" />
                  <field-error :errors="errors" />
                </ValidationProvider>
              </div>
            </div>
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
import { mapGetters } from "vuex";
import { mask } from "vue-the-mask";
import Multiselect from "vue-multiselect";
import "~/node_modules/vue-multiselect/dist/vue-multiselect.min.css";
import FieldError from "~/components/form/field-error";
import Toggle from "~/components/toggle";

export default {
  components: {
    Multiselect,
    FieldError,
    Toggle
  },
  directives: { mask },
  data () {
    return {
      institution: "",
      name: "",
      sus: "",
      cpf: "",
      birthdate: "",

      gender: null,
      genderOptions: [
        {
          id: 1,
          name: "Feminino"
        },
        {
          id: 2,
          name: "Masculino"
        },
        {
          id: 3,
          name: "Outros"
        }
      ],
      breed: null,
      breedOptions: [
        {
          id: 1,
          name: "Branco"
        },
        {
          id: 2,
          name: "Preto"
        },
        {
          id: 3,
          name: "Pardo"
        },
        {
          id: 4,
          name: "Amarelo"
        },
        {
          id: 5,
          name: "Indígena"
        }
      ],
      responsable: "",

      visible: true,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters("members", [
      "getMember",
      "getSelectedPlace"
    ])
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
    },
    resetValidations () {
      requestAnimationFrame(() => {
        if (this.$refs && this.$refs.observer) {
          this.$refs.observer.reset();
        }
      });
    },
    save () {
      this.isLoading = true;
      this.$router.push("patient/252");
      // TODO: Implementar cadastro de usuário
    }
  }
};
</script>
