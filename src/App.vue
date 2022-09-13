<template>
    <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
      <v-list-item
          v-for="(link,index) in links"
          :key="index"
          router
          :to="{name:link.to}"
      >
        <v-list-item-action>
          <v-icon >
            mdi-{{link.icon}}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content
            
        >{{link.content}}</v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
 

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span class="grey--text">
        MyFinogite</span>TaskApp</v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <v-btn @click="toggleTheme" icon>
         <v-icon> {{ $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }} </v-icon>
      </v-btn>
      <v-btn @click="logoutOrIn" icon>
        <v-icon>
        {{$store.getters['userLoggedIn'] ? 'mdi-logout': 'mdi-login'}}
         </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main >
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({ drawer: null
  ,
  links:[
      {icon:'view-dashboard',content:'Dashboard', to:'home'},
      {icon:'account',content:'Users', to:'about'},
    ] }),
  components: {
  },
  methods: {
    toggleTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    logoutOrIn(){
      if(this.$store.getters['userLoggedIn']) this.$store.dispatch('doLogout')
      else this.$router.push('/login')
    }
  
  },

};
</script>
