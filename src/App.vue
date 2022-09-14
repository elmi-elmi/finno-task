<template>
  <v-app id="inspire">
    <app-bar v-if="$store.getters['userLoggedIn']" ></app-bar>
    
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <AppFooter/>
    <SnackBar/>
  </v-app>
</template>

<script>
  /**
 * App.vue of MyFinnogateTaskApp
 *
 * @author Shahrokh elmi
 */
import AppBar from "./components/AppBar.vue";
import SnackBar from "./components/SnackBar.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  name: "App",

  components: {
    AppBar,
    SnackBar,
    AppFooter,
},
  methods: {},
};
</script>
