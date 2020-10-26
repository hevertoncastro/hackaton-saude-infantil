<template>
  <main
    :class="{
      'c-container--is-covered': isSideFormVisible,
      'opened-menu': getOpenedMenu,
    }"
    class="c-container"
  >
    <sidebar />
    <section class="s-content" data-page-content>
      <custom-header title="Área restrita" />
      <feedback />

      <div class="s-content__holder">
        <h2 class="o-title large mt-40 mb-30 center">
          Brainstorm
        </h2>

        <div class="mt-40">
          <ul class="c-dashboard-menu">
            <li class="c-dashboard-menu__item full c-card success">
              <nuxt-link class="c-dashboard-menu__link go" to="/">
                Masculino, 7 anos, atendido em UBS, com febre e dor óssea há 3 semanas.
              </nuxt-link>
              <div class="c-dashboard-menu__icons">
                <a href="#" class="o-button no-padding left green icon audio">5 em discussão</a>
                <a href="#" class="o-button no-padding left gray icon message">17 mensagens</a>
              </div>
              <button class="o-button main bordered small mt-10 mb-5">
                <span>Participar da discussão</span>
              </button>
            </li>
            <li class="c-dashboard-menu__item full c-card success">
              <nuxt-link class="c-dashboard-menu__link go" to="/">
                Mesa redonda: Retinoblastoma, novas tendências de tratamento.
              </nuxt-link>
              <div class="c-dashboard-menu__icons">
                <a href="#" class="o-button no-padding left green icon audio">3 em discussão</a>
                <a href="#" class="o-button no-padding left gray icon message">7 mensagens</a>
              </div>
              <button class="o-button main bordered small mt-20 mb-5">
                <span>Participar da discussão</span>
              </button>
            </li>
            <li class="c-dashboard-menu__item full c-card success">
              <nuxt-link class="c-dashboard-menu__link go" to="/">
                Feminino, 4 anos, tumor de Wilms sem redução ao uso de Estretimab.
              </nuxt-link>
              <div class="c-dashboard-menu__icons">
                <a href="#" class="o-button no-padding left green icon audio">2 em discussão</a>
                <a href="#" class="o-button no-padding left gray icon message">7 mensagens</a>
              </div>
              <button class="o-button main bordered small mt-20 mb-5">
                <span>Participar da discussão</span>
              </button>
            </li>
            <li class="c-dashboard-menu__item full c-card success">
              <nuxt-link class="c-dashboard-menu__link go" to="/">
                Leucemia mieloide aguda, feminino, 5 anos.
              </nuxt-link>
              <div class="c-dashboard-menu__icons">
                <a href="#" class="o-button no-padding left gray icon message">6 mensagens</a>
              </div>
              <button class="o-button main bordered small mt-20 mb-5">
                <span>Participar da discussão</span>
              </button>
            </li>
            <li class="c-dashboard-menu__item full c-card success">
              <nuxt-link class="c-dashboard-menu__link go" to="/">
                Tumores do sistema nervoso central, masculino, 9 anos.
              </nuxt-link>
              <div class="c-dashboard-menu__icons">
                <a href="#" class="o-button no-padding left gray icon message">5 mensagens</a>
              </div>
              <button class="o-button main bordered small mt-20 mb-5">
                <span>Participar da discussão</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import CustomHeader from "@/components/custom-header";
import Sidebar from "@/components/sidebar/sidebar";
import checkMenu from "@/mixins/check-menu";

export default {
  middleware: "authenticated",
  components: {
    CustomHeader,
    Sidebar
  },
  mixins: [checkMenu],
  computed: {
    ...mapGetters("system", [
      "getOpenedMenu"
    ])
  }
};
</script>
