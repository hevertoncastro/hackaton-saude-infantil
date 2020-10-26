require("dotenv").config();

export default {
  mode: "spa",
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_description || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },
  router: {
    base: process.env.ASSETS_URL,
    linkActiveClass: "active"
  },
  /*
  ** Customize the progress-bar color
  */
  loading: "@/components/loading.vue",
  /*
  ** Global CSS
  */
  css: [
    // SCSS file in the project
    "@/assets/scss/app.scss"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/bus",
    "~/plugins/vue-js-modal",
    "~/plugins/vee-validate",
    "~/plugins/global-components",
    "~/plugins/filters",
    "~/plugins/vue-clipboard2",
    "~/plugins/vue-select",
    "~/plugins/vue-infinite-loading"
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/dotenv"
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
};
