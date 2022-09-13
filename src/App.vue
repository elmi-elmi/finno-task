<template>
  <v-app id="inspire">
    <app-bar></app-bar>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <SnackBar/>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import SnackBarVue from "./components/SnackBar.vue";
import SnackBar from "./components/SnackBar.vue";
export default {
  name: "App",

  components: {
    AppBar,
    SnackBar
  },
  methods: {},
};
</script>
