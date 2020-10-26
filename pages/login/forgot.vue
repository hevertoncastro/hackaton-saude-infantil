<template>
  <main class="c-container">
    <div class="l-login">
      <Feedback />
      <Logo class="mb-20" />

      <div class="l-login__box c-form__box">
        <h2 class="o-title center mb-20">
          Recuperação de senha
        </h2>

        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(sendRecoverEmail)" class="l-login__holder c-form">
            <div class="c-form__row">
              <div class="c-form__field">
                <ValidationProvider v-slot="{ errors }" :rules="{ required: true, email: true }">
                  <label class="c-form__label" for="email">Digite seu e-mail</label>

                  <input
                    id="email"
                    ref="emailInput"
                    v-model="recoverEmail"
                    type="text"
                    class="c-form__input orange"
                    placeholder="Digite seu e-mail"
                  >
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
                <span>Receber e-mail</span>
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <p class="l-login__helper-text o-text center white">
        Em caso de dúvidas, entre em contato com <a href="mailto:contato@inca.gov.br">contato@inca.gov.br</a>
      </p>
    </div>
  </main>
</template>

<script>
import Logo from "@/components/logo";

export default {
  components: {
    Logo
  },
  data () {
    return {
      recoverEmail: "",
      isLoading: false
    };
  },
  methods: {
    async sendRecoverEmail () {
      this.isLoading = true;

      try {
        await this.$store.dispatch("authentication/FORGOT_PASSWORD", {
          email: this.recoverEmail
        });

        this.$bus.$emit("showFeedback", {
          message: "E-mail de recuperação enviado com sucesso. Confira sua caixa de entrada ou spam.",
          category: "success",
          duration: 15000
        });

        this.recoverEmail = "";
        this.isLoading = false;
        this.resetValidations();
      } catch (error) {
        this.$bus.$emit("showFeedback", {
          message: "E-mail não encontrado, entre em contato com contato@inca.gov.br",
          category: "danger",
          duration: 15000
        });
        this.isLoading = false;
      }
    },
    resetValidations () {
      requestAnimationFrame(() => {
        if (this.$refs && this.$refs.observer) {
          this.$refs.observer.reset();
        }
      });
    }
  }
};
</script>
