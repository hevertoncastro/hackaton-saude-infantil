<template>
  <div class="c-full-search">
    <input
      ref="fullSearch"
      @keyup="searchMembers"
      v-model="search"
      type="text"
      class="c-full-search__input"
      placeholder="Pesquise pelo nome, cidade ou número do SUS"
    >
    <button
      :class="{ abort: search.length > 0 }"
      @click="handleSubmitButton"
      class="c-full-search__button"
    >
      Buscar
    </button>
    <div v-if="members.length > 0" class="c-full-search__results">
      <ul ref="membersList" class="c-full-search__list">
        <li
          :class="{ active: activeItem === index }"
          v-for="(member, index) in members"
          :key="member.id"
          @mouseover="activeItem = index"
          :id="`member-${index}`"
          class="c-full-search__list-item"
        >
          <a
            @click.prevent="openMemberProfile(member.id)"
            :href="`patient/${member.id}`"
            class="c-full-search__list-link"
          >
            {{ member.label }}
          </a>
        </li>
      </ul>
    </div>
    <div v-else class="c-full-search__results">
      <ul class="c-full-search__list">
        <li
          v-if="emptyList"
          class="c-full-search__list-item"
        >
          <p class="c-full-search__list-text">
            {{ emptyFeedbackText }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const MIN_SEARCH_LENGTH = 3;
const SCROLL_OFFSET = 125;

export default {
  name: "FullSearch",
  data () {
    return {
      search: "",
      members: [],
      activeItem: 0,
      emptyList: false,
      emptyFeedbackText: "Nenhum paciente encontrado para esta busca."
    };
  },
  computed: {
    ...mapGetters("members", [
      "getSearchableMembers"
    ])
  },
  watch: {
    members (oldValue, newValue) {
      this.emptyList = false;

      if (oldValue.length !== newValue.length) {
        this.activeItem = 0;
        this.scrollList();
      }

      if (this.members.length === 0 && this.search.length >= MIN_SEARCH_LENGTH) {
        this.emptyList = true;
      }
    }
  },
  created () {
    this.fetchSearchableMembers();
  },
  mounted () {
    this.$refs.fullSearch.focus();
  },
  methods: {
    async fetchSearchableMembers () {
      await this.$store.dispatch("members/FETCH_SEARCHABLE_MEMBERS");
    },
    searchMembers (evt) {
      const input = evt.target.value;

      if (evt.key === "Escape") {
        this.reset();
        return false;
      }

      if (input.length < MIN_SEARCH_LENGTH) {
        this.members = [];
        this.activeItem = -1;
        return false;
      }

      if (evt.key === "ArrowUp" || evt.key === "ArrowDown") {
        this.handleArrowsKeys(evt);
      }

      if (evt.key === "Enter") {
        this.openMemberProfile();
      }

      const search = this.formatSearch(input);

      this.members = this.getSearchableMembers?.filter((member) => {
        return member.name.includes(search);
      });
    },
    formatSearch (search) {
      return search
        .normalize("NFD")
        .replace(/[\u0300-\u036F]/g, "")
        .toLowerCase();
    },
    handleSubmitButton (evt) {
      evt.stopPropagation();
      evt.preventDefault();

      if (this.search.length > 0) {
        this.reset();
      }
    },
    handleArrowsKeys (evt) {
      this.moveCursorToTheEnd();

      if (evt.key === "ArrowUp") {
        this.handleUpArrow();
      }
      if (evt.key === "ArrowDown") {
        this.handleDownArrow();
      }
    },
    handleUpArrow () {
      if (this.activeItem <= 0) {
        return false;
      }
      this.activeItem = this.activeItem - 1;
      this.scrollList();
    },
    handleDownArrow () {
      if (this.activeItem >= this.members.length - 1) {
        return false;
      }
      this.activeItem = this.activeItem + 1;
      this.scrollList();
    },
    scrollList () {
      const currentElement = document.getElementById(`member-${this.activeItem}`);

      if (currentElement) {
        this.$refs.membersList.scroll(0, currentElement.offsetTop - SCROLL_OFFSET);
      }
    },
    moveCursorToTheEnd () {
      this.$refs.fullSearch.focus();
      const val = this.$refs.fullSearch.value;
      this.$refs.fullSearch.value = "";
      this.$refs.fullSearch.value = val;
    },
    reset () {
      this.search = "";
      this.members = [];
      this.emptyList = false;
      this.$refs.fullSearch.focus();
    },
    openMemberProfile (id) {
      const current = id || this.members[this.activeItem].id;

      if (this.activeItem >= 0 && !!current) {
        this.$router.push(`patient/${current}`);
      }
    }
  }
};
</script>
