<template>
  <div>
    <v-img class="white--text align-end" height="200px" :src="avatar">
      <v-card-title>{{ firstName }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0"> Id: {{ id }} </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>
        <v-icon class="mr-2">mdi-account</v-icon>

        {{ firstName }} {{ lastName }}
      </div>

      <div>
        <v-icon class="mr-2">mdi-email</v-icon>
        {{ email }}
      </div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: ["avatar", "firstName", "lastName", "id", "email"],
};
</script>
