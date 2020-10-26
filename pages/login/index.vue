<template>
  <main class="c-container">
    <div class="l-login">
      <Feedback />
      <Logo class="mb-20" />

      <div class="l-login__box c-form__box">
        <h2 class="o-title center mb-20">
          Acessar área restrita
        </h2>

        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(login)" class="l-login__holder c-form">
            <div class="c-form__row">
              <ul class="c-form__tabs">
                <li :class="{ active: inputedDataType === 'email' }" @click="handleTabChange('email')" class="c-form__tab">
                  Entrar com E-mail
                </li>
                <li :class="{ active: inputedDataType === 'cpf' }" @click="handleTabChange('cpf')" class="c-form__tab">
                  Entrar com CPF
                </li>
              </ul>
            </div>
            <div v-if="inputedDataType === 'cpf'" class="c-form__row">
              <div class="c-form__field">
                <ValidationProvider v-slot="{ errors }" :rules="{ required: inputedDataType === 'cpf', cpf: true }">
                  <label class="c-form__label" for="cpf">CPF</label>

                  <TheMask
                    id="cpf"
                    ref="cpfInput"
                    v-model="userIdentification"
                    :mask="['###.###.###-##']"
                    class="c-form__input orange"
                    placeholder="Informe seu CPF"
                  />

                  <ul class="c-form__errors">
                    <li v-for="error in errors" :key="error" class="c-form__error">
                      {{ error }}
                    </li>
                  </ul>
                </ValidationProvider>
              </div>
            </div>
            <div v-if="inputedDataType === 'email'" class="c-form__row">
              <div class="c-form__field">
                <ValidationProvider v-slot="{ errors }" :rules="{ required: inputedDataType === 'email', email: true }">
                  <label class="c-form__label" for="cpf">Email</label>

                  <input
                    id="email"
                    ref="emailInput"
                    v-model="userIdentification"
                    type="text"
                    class="c-form__input orange"
                    placeholder="Informe seu e-mail"
                  >
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
                <ValidationProvider v-slot="{ errors }" :rules="{ required: true, min: 6 }">
                  <label class="c-form__label" for="password">Senha</label>
                  <input v-model="password" type="password" class="c-form__input orange" placeholder="Senha">
                  <ul class="c-form__errors">
                    <li v-for="error in errors" :key="error" class="c-form__error">
                      {{ error }}
                    </li>
                  </ul>
                </ValidationProvider>
              </div>
            </div>

            <div class="c-form__row">
              <a @click.prevent="resetPassword" class="o-text o-link semi-bold danger">
                Esqueci minha senha
              </a>
            </div>

            <div class="o-button__holder mb-10">
              <button :class="{ 'loading': isLoading }" class="o-button blue wide" type="submit">
                <span>Continuar</span>
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <p class="l-login__helper-text o-text center white">
        Em caso de dúvidas, entre em contato com <a href="mailto:contato@inca.gov.br">contato@inca.gov.br</a>
      </p>
    </div>
    <modal
      :classes="['v--modal', 'c-modal__box']"
      name="send-password-reset"
      adaptive
      width="440"
      height="auto"
    >
      <button @click="abortPasswordReset" class="c-modal__close">
        Fechar
      </button>

      <p class="o-text giant mb-20">
        Recuperação de senha
      </p>
      <p class="o-text giant bold gray mb-5">
        Deseja recuperar sua senha de acesso?
      </p>
      <p class="o-text large gray mb-30">
        Você receberá as instruções por e-mail.
      </p>

      <div class="o-button__holder no-margin">
        <button @click="abortPasswordReset" class="o-button muted">
          <span>Cancelar</span>
        </button>
        <button :class="{ 'loading': isLoading }" @click="navigateToPasswordForgot" class="o-button main">
          <span>Confirmar</span>
        </button>
      </div>
    </modal>
  </main>
</template>

<script>
import Cookies from "js-cookie";
import { TheMask } from "vue-the-mask";
import Logo from "@/components/logo";

export default {
  components: {
    TheMask,
    Logo
  },
  data () {
    return {
      userIdentification: "",
      password: "",
      inputedDataType: "email",
      isLoading: false,
      redirectUrl: null,
      localUser: null,
      errorCounter: 0
    };
  },
  created () {
    this.checkForRedirectParams();

    if (this.isUserAuthenticated()) {
      this.sendUserToNextPage();
    }
  },
  methods: {
    async login () {
      this.isLoading = true;

      try {
        await this.$store.dispatch("authentication/GET_TOKEN", {
          email: this.inputedDataType === "email" ? this.userIdentification : "",
          cpf: this.inputedDataType === "cpf" ? this.userIdentification : "",
          password: this.password
        });

        this.localUser = await this.$store.dispatch("authentication/GET_USER");

        if (this.redirectUrl) {
          this.redirectToSite();
          return false;
        }

        this.redirectToAdmin();
      } catch (error) {
        // @todo: Tratar mensagem de erro de login
        this.$bus.$emit("showFeedback", {
          message: "Informações incorretas, tente novamente",
          category: "danger",
          duration: 15000
        });
        this.isLoading = false;
        this.errorCounter = this.errorCounter + 1;
      }
    },
    isUserAuthenticated () {
      return Cookies.get("incaMembersAccessToken") && Cookies.get("incaCurrentUserData");
    },
    sendUserToNextPage () {
      if (this.redirectUrl) {
        this.redirectToSite();
        return false;
      }

      this.redirectToAdmin();
    },
    redirectToSite () {
      const uid = JSON.parse(Cookies.get("incaCurrentUserData")).id;

      // the generated token, crypted as base64_hash
      const token = window.btoa(`${process.env.SSO_APP_KEY}${uid}`);

      window.location.href = `${process.env.SITE_SSO_URL}?redirect=${this.redirectUrl}&uid=${uid}&token=${token}`;
    },
    redirectToAdmin () {
      this.$router.push("/finder");
    },
    checkForRedirectParams () {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("redirect")) {
        this.redirectUrl = urlParams.get("redirect");
      }
    },
    handleTabChange (type) {
      this.resetValidations();
      this.inputedDataType = type;
      this.userIdentification = "";
      this.password = "";
    },
    resetValidations () {
      requestAnimationFrame(() => {
        if (this.$refs && this.$refs.observer) {
          this.$refs.observer.reset();
        }
      });
    },
    resetPassword () {
      this.$modal.show("send-password-reset");
    },
    navigateToPasswordForgot () {
      this.$router.push("/login/forgot");
    },
    abortPasswordReset () {
      this.$modal.hide("send-password-reset");
    }
  }
};
</script>
