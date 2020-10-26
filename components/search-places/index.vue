<template>
  <div class="c-full-search">
    <input
      ref="searchPlaces"
      @keyup="searchPlaces"
      v-model="search"
      type="text"
      class="c-full-search__input"
      placeholder="Pesquise pelo nome ou número do CNES"
    >
    <button
      :class="{ abort: search.length > 0 }"
      @click="handleSubmitButton"
      class="c-full-search__button"
    >
      Buscar
    </button>
    <div v-if="places.length > 0" class="c-full-search__results">
      <ul ref="placesList" class="c-full-search__list">
        <li
          :class="{ active: activeItem === index }"
          v-for="(place, index) in places"
          :key="place.id"
          @mouseover="activeItem = index"
          :id="`place-${index}`"
          class="c-full-search__list-item"
        >
          <a
            @click.prevent="setSelectedPlace(place.id)"
            :href="`new-patient/${place.id}`"
            class="c-full-search__list-link"
          >
            {{ place.label }}
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
      places: [],
      activeItem: 0,
      emptyList: false,
      emptyFeedbackText: "Nenhuma instituição encontrada para esta busca."
    };
  },
  computed: {
    ...mapGetters("members", [
      "getSearchablePlaces"
    ])
  },
  watch: {
    places (oldValue, newValue) {
      this.emptyList = false;

      if (oldValue.length !== newValue.length) {
        this.activeItem = 0;
        this.scrollList();
      }

      if (this.places.length === 0 && this.search.length >= MIN_SEARCH_LENGTH) {
        this.emptyList = true;
      }
    }
  },
  created () {
    this.fetchSearchablePlaces();
  },
  mounted () {
    this.$refs.searchPlaces.focus();
  },
  methods: {
    async fetchSearchablePlaces () {
      await this.$store.dispatch("members/FETCH_SEARCHABLE_PLACES");
    },
    searchPlaces (evt) {
      const input = evt.target.value;

      if (evt.key === "Escape") {
        this.reset();
        return false;
      }

      if (input.length < MIN_SEARCH_LENGTH) {
        this.places = [];
        this.activeItem = -1;
        return false;
      }

      if (evt.key === "ArrowUp" || evt.key === "ArrowDown") {
        this.handleArrowsKeys(evt);
      }

      if (evt.key === "Enter") {
        this.setSelectedPlace();
      }

      const search = this.formatSearch(input);

      this.places = this.getSearchablePlaces?.filter((place) => {
        return place.name.includes(search);
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
      if (this.activeItem >= this.places.length - 1) {
        return false;
      }
      this.activeItem = this.activeItem + 1;
      this.scrollList();
    },
    scrollList () {
      const currentElement = document.getElementById(`place-${this.activeItem}`);

      if (currentElement) {
        this.$refs.placesList.scroll(0, currentElement.offsetTop - SCROLL_OFFSET);
      }
    },
    moveCursorToTheEnd () {
      this.$refs.searchPlaces.focus();
      const val = this.$refs.searchPlaces.value;
      this.$refs.searchPlaces.value = "";
      this.$refs.searchPlaces.value = val;
    },
    reset () {
      this.search = "";
      this.places = [];
      this.emptyList = false;
      this.$refs.searchPlaces.focus();
    },
    setSelectedPlace (id) {
      const current = id || this.places[this.activeItem].id;

      if (this.activeItem >= 0 && !!current) {
        this.$store.commit("members/SET_SELECTED_PLACE", current);
        this.reset();
      }
    }
  }
};
</script>
