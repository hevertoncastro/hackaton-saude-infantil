<template>
  <main class="c-container">
    <div class="l-login">
      <Feedback />
      <h1 class="l-login__title o-title large">
        Área restrita
      </h1>
      <div class="l-login__box c-form__box">
        <h2 class="o-title center mb-5">
          Redefinir senha
        </h2>
        <p class="o-text large gray center mb-20">
          Mínimo de 8 caracteres
        </p>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createPassword)" class="l-login__holder c-form">
            <div class="c-form__row">
              <div class="c-form__field">
                <ValidationProvider v-slot="{ errors }" :rules="{ required: true, min: 8 }" vid="password">
                  <input v-model="formPassword" type="password" class="c-form__input orange" placeholder="Senha">
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
                <ValidationProvider v-slot="{ errors }" :rules="{ required: true, min: 8, confirmed:'password' }">
                  <input v-model="formPasswordConfirmation" type="password" class="c-form__input orange" placeholder="Repetir senha">
                  <ul class="c-form__errors">
                    <li v-for="error in errors" :key="error" class="c-form__error">
                      {{ error }}
                    </li>
                  </ul>
                </ValidationProvider>
              </div>
            </div>
            <div class="o-button__holder mb-10">
              <button :class="{ 'loading': isLoading }" class="o-button blue wide" type="submit">
                <span>Salvar</span>
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </main>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data () {
    return {
      formEmail: null,
      formDocument: null,
      formToken: null,
      formPassword: null,
      formPasswordConfirmation: null,
      isLoading: false
    };
  },
  computed: {
    urlParams () {
      const params = {};

      window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        params[key] = value;
      });

      return params;
    }
  },
  async fetch ({ store }) {
    await store.dispatch("project/GET_PROJECT_DATA");
  },
  mounted () {
    Cookies.remove("incaMembersAccessToken");
  },
  methods: {
    async createPassword () {
      const params = this.urlParams;
      const data = {};

      data.token = params.token;
      data.password = this.formPassword;
      data.password_confirmation = this.formPasswordConfirmation;

      if (params.email) {
        data.email = decodeURIComponent(params.email);
      }

      if (params.document) {
        data.document = decodeURIComponent(params.document);
      }

      this.isLoading = true;

      try {
        await this.$store.dispatch("authentication/SEND_NEW_PASSWORD", data);

        this.$bus.$emit("showFeedback", {
          message: "Senha criada com sucesso."
        });

        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } catch (error) {
        this.$bus.$emit("showFeedback", {
          message: error.message,
          category: "danger"
        });
        this.isLoading = false;
      }
    }
  }
};
</script>
