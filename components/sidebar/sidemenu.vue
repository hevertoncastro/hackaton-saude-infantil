<template>
  <div class="c-menu">
    <ul class="c-menu__holder">
      <li v-if="isAdmin" class="c-menu__item">
        <nuxt-link class="c-menu__link more" to="/new-patient">
          <p class="c-menu__text">
            Novo paciente
          </p>
        </nuxt-link>
      </li>
      <li class="c-menu__item">
        <nuxt-link class="c-menu__link search" to="/finder">
          <p class="c-menu__text">
            Pacientes
          </p>
        </nuxt-link>
      </li>
      <li class="c-menu__item">
        <nuxt-link class="c-menu__link statistical" to="/reports">
          <p class="c-menu__text">
            Relatórios
          </p>
        </nuxt-link>
      </li>
      <li class="c-menu__item">
        <nuxt-link class="c-menu__link brainstorm" to="/brainstorm">
          <p class="c-menu__text">
            Brainstorm
          </p>
        </nuxt-link>
      </li>
      <li class="c-menu__item">
        <nuxt-link class="c-menu__link logoff" to="/login/logout">
          <p class="c-menu__text">
            Sair
          </p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters("authentication", [
      "getCurrentUser"
    ]),
    isAdmin () {
      return this.getCurrentUser?.admin;
    }
  }
};
</script>
