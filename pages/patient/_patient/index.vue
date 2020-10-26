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
        <!-- Share profile -->
        <div v-if="!isMedicalAccess" class="c-card c-share-profile__holder">
          <button class="c-share-profile__close">
            Fechar
          </button>

          <div class="o-feedback success large">
            <p class="o-feedback__text mt-20">
              Paciente cadastrado. Compartilhe!
            </p>
          </div>

          <div class="c-share-profile">
            <div class="c-share-profile__item">
              <div class="c-share-profile__icon send" />
              <div class="c-share-profile__action">
                <button class="o-button success">
                  <span>Enviar acesso</span>
                </button>
              </div>
            </div>
            <div class="c-share-profile__item">
              <div class="c-share-profile__icon qrcode" />
              <div class="c-share-profile__action">
                <button class="o-button success">
                  <span>Gerar QR Code</span>
                </button>
              </div>
            </div>
            <div class="c-share-profile__item">
              <div class="c-share-profile__icon time" />
              <div class="c-share-profile__action">
                <multiselect
                  id="categories"
                  v-model="shareExpire"
                  :options="shareExpireOptions"
                  :searchable="false"
                  :allow-empty="false"
                  label="name"
                  track-by="name"
                  placeholder="Selecione as opções"
                  select-label=""
                  selected-label="✓"
                  deselect-label=""
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Name and profile complete percent -->
        <div v-if="getMember.name" class="c-card mt-40 mb-40">
          <PercentCircle :amount="getProfileCompletePercent" />
          <h1 class="c-card__title--large">
            {{ getMember.name }}
          </h1>
        </div>

        <!-- Forms data -->
        <ul class="c-dashboard-menu mt-40">
          <li :class="{ success: getClinicFilled, danger: !getClinicFilled }" class="c-dashboard-menu__item c-card">
            <nuxt-link :to="`${$nuxt.$route.path}/forms/clinic`" class="c-dashboard-menu__link clinic">
              Dados clínicos
            </nuxt-link>
          </li>
          <li :class="{ success: getExamsFilled, danger: !getExamsFilled }" class="c-dashboard-menu__item c-card">
            <nuxt-link :to="`${$nuxt.$route.path}/forms/exams`" class="c-dashboard-menu__link exams">
              Exames
            </nuxt-link>
          </li>
          <li class="c-dashboard-menu__item c-card danger">
            <a href="#" class="c-dashboard-menu__link staging">
              Estadiamento
              <p class="o-text small semi-bold gray ml-5">
                (Consenso de Toronto)
              </p>
            </a>
          </li>
          <li class="c-dashboard-menu__item c-card danger">
            <a href="#" class="c-dashboard-menu__link diagnosis">
              Diagnóstico
            </a>
          </li>
          <li class="c-dashboard-menu__item c-card danger">
            <a href="#" class="c-dashboard-menu__link therapeutic">
              Conduta terapêutica
            </a>
          </li>
          <li class="c-dashboard-menu__item c-card danger">
            <a href="#" class="c-dashboard-menu__link accompaniment">
              Acompanhamento
            </a>
          </li>
          <li class="c-dashboard-menu__item c-card danger">
            <a href="#" class="c-dashboard-menu__link complications">
              Intercorrências
            </a>
          </li>
          <li class="c-dashboard-menu__item c-card danger">
            <a href="#" class="c-dashboard-menu__link discharge">
              Alta
            </a>
          </li>
        </ul>

        <div class="c-card__header mt-20">
          <h3 class="c-card__header-title">
            Dados pessoais
          </h3>
        </div>
        <div class="c-card">
          <button v-if="!isLoading" @click="openSideForm('personal', 'edit')" class="c-card__button edit">
            Editar
          </button>

          <!-- Initial data -->
          <ul class="c-data-table mt-15">
            <data-table-item
              :value="birthdate"
              title="Data de nascimento"
            />
            <data-table-item
              title="Número do SUS"
              value="734 5678 2368 7532"
            />
          </ul>

          <titled-list
            :values="[
              'Maria Aparecida Gonçalves Souza',
              'Antonio Carlos Gonçalves'
            ]"
            title="Nome dos responsáveis em certidão de nascimento"
          />

          <!-- Additional data -->
          <div class="c-accordion mt-30">
            <input id="more_info" class="c-accordion__checkbox" type="checkbox">
            <label class="c-accordion__label" for="more_info">
              <span class="c-accordion__item-text o-text large bold">
                Mais informações
              </span>
            </label>

            <div class="c-accordion__content mt-15">
              <ul class="c-data-table">
                <data-table-item
                  :value="memberCPF"
                  title="CPF"
                />
                <data-table-item
                  :value="getMember.gender"
                  title="Gênero"
                />
                <data-table-item
                  title="Cor"
                  value="Branco"
                />
              </ul>

              <hr class="o-divider mt-35">

              <p class="o-text large semi-bold mt-25 mb-15 inline">
                Autoriza que os dados sejam utilizados em estudos científicos e está ciente que pode desistir a qualquer momento.
              </p>
            </div>
          </div>
        </div>

        <div class="c-card__header mt-30">
          <h3 class="c-card__header-title">
            E-mail
          </h3>
        </div>
        <div v-if="getMember.user && getMember.user.email" class="c-card success">
          <div class="c-context">
            <label class="c-context__button">
              <ul class="c-context__menu">
                <li class="c-context__menu-item">
                  <a @click.prevent="" href="/edit" class="c-context__menu-link">Editar</a>
                </li>
              </ul>
            </label>
          </div>

          <p class="o-text large mb-15 inline">
            {{ getMember.user.email }}
          </p>
          <a :href="`mailto:${getMember.user.email}`" class="o-button no-padding left danger icon message">Enviar e-mail</a>
        </div>

        <!-- Phones -->
        <div class="c-card__header mt-30">
          <h3 class="c-card__header-title">
            Telefones
          </h3>

          <button @click="openSideForm('phone', 'add')" class="o-button add-button">
            <span>Adicionar</span>
          </button>
        </div>
        <div v-if="getMember.phones && getMember.phones.length > 0">
          <phone-item
            v-for="phone in getMember.phones"
            :key="phone.id"
            :phone="phone"
            :member-id="patientId"
            @edit="openSideForm"
            @remove="removeItem"
            @feedback="showFeedback"
            @success="fetchMemberData"
          />
        </div>
        <div v-else>
          <empty-item
            message="Nenhum telefone cadastrado."
          />
        </div>

        <!-- Addresses -->
        <div class="c-card__header mt-30">
          <h3 class="c-card__header-title">
            Endereços
          </h3>
          <button @click="openSideForm('address', 'add')" class="o-button add-button">
            <span>Adicionar</span>
          </button>
        </div>

        <div v-if="getMember.addresses && getMember.addresses.length > 0">
          <address-item
            v-for="address in getMember.addresses"
            :key="address.id"
            :address="address"
            :member-id="patientId"
            @edit="openSideForm"
            @remove="removeItem"
            @feedback="showFeedback"
            @success="fetchMemberData"
          />
        </div>
        <div v-else>
          <empty-item
            message="Nenhum endereço cadastrado."
          />
        </div>
      </div>

      <div
        :class="{
          'c-form__container--is-active': isSideFormVisible,
          'opened-menu': getOpenedMenu
        }"
        class="c-form__container"
      >
        <personal-form
          v-show="currentFormOpened === 'personal'"
          :mode="currentFormMode"
          :id="patientId"
          :member-id="patientId"
          @close="closeSideForm"
          @feedback="showFeedback"
          @success="fetchMemberData"
          @removed="itemRemoved"
        />
        <phone-form
          v-show="currentFormOpened === 'phone'"
          :mode="currentFormMode"
          :id="currentFormId"
          :member-id="patientId"
          @close="closeSideForm"
          @feedback="showFeedback"
          @success="fetchMemberData"
          @removed="itemRemoved"
        />
        <address-form
          v-show="currentFormOpened === 'address'"
          :mode="currentFormMode"
          :id="currentFormId"
          :member-id="patientId"
          @close="closeSideForm"
          @feedback="showFeedback"
          @success="fetchMemberData"
          @removed="itemRemoved"
        />
      </div>
    </section>

    <remove-item-modal
      :data="removeItemData"
      @confirm="confirmRemoveItem"
      @abort="abortRemoveItem"
      name="remove-item-modal"
    />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import Multiselect from "vue-multiselect";
import AddressForm from "@/components/patient/address-form";
import AddressItem from "@/components/patient/address-item";
import CustomHeader from "@/components/custom-header";
import DataTableItem from "@/components/data-table-item";
import EmptyItem from "@/components/empty-item";
import PhoneForm from "@/components/patient/phone-form";
import PhoneItem from "@/components/patient/phone-item";
import RemoveItemModal from "@/components/patient/remove-item-modal";
import Sidebar from "@/components/sidebar/sidebar";
import TitledList from "@/components/titled-list";
import PercentCircle from "@/components/percent-circle";
import checkMenu from "@/mixins/check-menu";

export default {
  middleware: "authenticated",
  components: {
    AddressForm,
    AddressItem,
    CustomHeader,
    DataTableItem,
    EmptyItem,
    PhoneForm,
    PhoneItem,
    RemoveItemModal,
    Sidebar,
    TitledList,
    PercentCircle,
    Multiselect
  },
  mixins: [checkMenu],
  data () {
    return {
      patientId: null,
      isSideFormVisible: false,
      currentFormOpened: null,
      currentFormMode: "",
      currentFormId: "",
      removeItemData: {},
      shareExpire: {
        id: 1,
        name: "Expirar em 1 hora"
      },
      shareExpireOptions: [
        {
          id: 1,
          name: "Expirar em 1 hora"
        },
        {
          id: 2,
          name: "Expirar em 2 horas"
        },
        {
          id: 3,
          name: "Expirar em 1 dia"
        },
        {
          id: 4,
          name: "Expirar em 1 semana"
        },
        {
          id: 5,
          name: "Não expirar"
        }
      ],
      isMedicalAccess: false,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters("system", [
      "getOpenedMenu"
    ]),
    ...mapGetters("members", [
      "getMember",
      "getProfileCompletePercent",
      "getClinicFilled",
      "getExamsFilled"
    ]),
    birthdate () {
      if (!this.getMember.birthdate) {
        return "";
      }

      return `${this.$options.filters.ShortDate(
        this.getMember.birthdate
      )} (${this.$options.filters.YearsSince(
        this.getMember.birthdate
      )})`;
    },
    memberCPF () {
      return this.$options.filters.mask(
        this.getMember && this.getMember.user
          ? this.getMember.cpf
          : "", ["###.###.###-##"]
      );
    }
  },
  async fetch () {
    this.isLoading = true;
    await this.fetchMemberData();
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from?.path === "/login/medical") {
        vm.isMedicalAccess = true;
      }
    });
  },
  methods: {
    openSideForm (category, mode, id) {
      this.currentFormOpened = category;
      this.currentFormMode = mode;
      this.currentFormId = id ? id.toString() : "";
      this.isSideFormVisible = !this.isSideFormVisible;
      this.$emit(`update-${category}`);
    },
    closeSideForm () {
      this.isSideFormVisible = false;
      this.currentFormMode = "";
      this.currentFormOpened = "";
      this.currentFormId = "";
    },
    removeItem (data) {
      this.removeItemData = data;
      this.$modal.show("remove-item-modal");
    },
    abortRemoveItem () {
      this.resetRemoveItemModalData();
      this.$modal.hide("remove-item-modal");
    },
    confirmRemoveItem () {
      this.$emit(`delete-${this.removeItemData.type}`, this.removeItemData, this.patientId);
    },
    itemRemoved () {
      this.$bus.$emit("showFeedback", {
        message: `${this.removeItemData.type_text} com sucesso.`
      });

      this.$modal.hide("remove-item-modal");
      this.fetchMemberData();
    },
    resetRemoveItemModalData () {
      this.removeItemData = {};
    },
    showFeedback (message, category) {
      this.$bus.$emit("showFeedback", {
        message,
        category
      });
    },
    async fetchMemberData () {
      this.isLoading = true;
      this.patientId = this.$route.params.patient || null;

      if (!this.patientId) {
        this.$router.push("/finder");
        return false;
      }

      try {
        await this.$store.dispatch("members/GET_MEMBER", {
          memberId: this.patientId
        });

        this.isLoading = false;
      } catch {
        // @todo: handle error
        this.isLoading = false;
      }
    }
  }
};
</script>
