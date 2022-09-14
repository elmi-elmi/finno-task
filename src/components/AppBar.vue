<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <v-col class="d-flex flex-column align-center">
        <v-avatar size="100" >
          <img src="@/assets/av.jpg" style="height: 100%;width:auto" >
        </v-avatar>
        <a class="mt-2 grey--text" href="https://github.com/elmi-elmi">elmi-elmi</a>
      </v-col>
      <v-list-item
        v-for="(link, index) in links"
        :key="index"
        router
        :to="{ name: link.to }"
      >
        <v-list-item-action>
          <v-icon> mdi-{{ link.icon }} </v-icon>
        </v-list-item-action>
        <v-list-item-content>{{ link.content }}</v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span class="grey--text"> MyFinnogate</span>TaskApp
      </v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-btn @click="toggleTheme" icon>
        <v-icon>
          {{
            $vuetify.theme.dark
              ? "mdi-white-balance-sunny"
              : "mdi-weather-night"
          }}
        </v-icon>
      </v-btn>
      <v-btn @click="logoutOrIn" icon>
        <v-icon>
          {{ $store.getters["userLoggedIn"] ? "mdi-logout" : "mdi-login" }}
        </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "AppBarComponent",
  data: () => ({
    drawer: null,
    links: [
      { icon: "view-dashboard", content: "Dashboard", to: "dashboard" },
      { icon: "account", content: "Users", to: "users" },
    ],
  }),

  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logoutOrIn() {
      if (this.$store.getters["userLoggedIn"]) this.$store.dispatch("doLogout");
      else this.$router.push("/login");
    },
  },
};
</script>
