<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    text: null,
    timeout: 2000,
  }),
  computed: {
    snackBarContent(newValue) {
      if (!newValue) return;
      return this.$store.state.snackContent;
    },
  },
  watch: {
    snackBarContent(neee) {
      console.log("newww", neee);
      this.text = this.$store.state.snackContent;
      this.snackbar = true;
      setTimeout(() => {
        this.$store.commit("SET_SNACK_CONTENT", null);
      }, 2000);
    },
  },
};
</script>
