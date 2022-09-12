<template>
    <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
    </v-navigation-drawer>
 

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <v-btn @click="toggleTheme" icon>
      <v-icon> {{ $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }} </v-icon>
    </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({ drawer: null }),
  components: {
  },
  methods: {
    toggleTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  
  },

};
</script>
