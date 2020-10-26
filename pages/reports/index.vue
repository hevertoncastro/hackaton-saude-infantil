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
          Relatórios e insights
        </h2>

        <div class="mt-40">
          <ul class="c-dashboard-menu">
            <li class="c-dashboard-menu__item full c-card success">
              <nuxt-link class="c-dashboard-menu__link go mr-20" to="/">
                Apenas 8% das leucemias linfoide aguda são diagnosticadas em estadiamento inicial da doença.
              </nuxt-link>
            </li>
            <li class="c-dashboard-menu__item full c-card success">
              <nuxt-link class="c-dashboard-menu__link go mr-20" to="/">
                40% dos pacientes diagnosticados em estágio SNC3 positivo da leucemia Linfoide aguda não responderam a quimioterápicos.
              </nuxt-link>
            </li>
            <li class="c-dashboard-menu__item full c-card success">
              <nuxt-link class="c-dashboard-menu__link go mr-20" to="/">
                80% dos tumores de Wilms diagnosticados em Estádio IV foram a óbitos em 2 anos.
              </nuxt-link>
            </li>
            <li class="c-dashboard-menu__item full c-card success">
              <nuxt-link class="c-dashboard-menu__link go mr-20" to="/">
                40% dos pacientes com linfoma de hodgkin em uso do medicamento Girutanab não apresentaram complicações como neutropenia febril.
              </nuxt-link>
            </li>
            <li class="c-dashboard-menu__item full c-card success">
              <nuxt-link class="c-dashboard-menu__link go mr-20" to="/">
                20% das crianças diagnosticadas com Leucemia linfoide aguda apresentaram como sintomas iniciais  dor óssea difusa e sudorese noturna.
              </nuxt-link>
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
