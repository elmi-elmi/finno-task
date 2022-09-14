<template>
    <v-footer
      padless
      width="100%"
      :shaped="true"
      class="mx-auto"
    >
      <v-card
        width="100%"
        flat
        tile
        class=" text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
   
  
        <v-divider></v-divider>
  
      </v-card>
    </v-footer>
  </template>

<script>
    export default {
      data: () => ({
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      }),
    }
  </script>