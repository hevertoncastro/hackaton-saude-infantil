<template>
  <main class="c-container">
    <div class="l-login">
      <Feedback />
      <Logo class="mb-20" />

      <div class="l-login__box c-form__box">
        <h2 class="o-title center mb-20">
          Acesso médico
        </h2>

        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(login)" class="l-login__holder c-form">
            <div class="c-form__row">
              <div class="c-form__field">
                <ValidationProvider v-slot="{ errors }" :rules="{ required: true }">
                  <label class="c-form__label" for="cpf">CRM</label>

                  <input
                    id="crm"
                    v-model="crm"
                    type="text"
                    class="c-form__input orange"
                    placeholder="Informe seu CRM"
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
                <span>Continuar</span>
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <p class="l-login__helper-text o-text center white">
        Em caso de dúvidas, entre em contato com <a href="mailto:contato@sisoncoinfanto.org.br">contato@sisoncoinfanto.org.br</a>
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
      crm: "",
      isLoading: false
    };
  },
  methods: {
    login () {
      this.isLoading = true;

      // TODO: Tratar veracidade da url hash
      // e abrir paciente referente ao id
      this.$router.push("/patient/252");
    }
  }
};
</script>
