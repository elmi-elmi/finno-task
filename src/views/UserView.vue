<template>
  <v-card
    :loading="isLoading"
    class="mx-auto mt-10"
    max-width="400"
    min-height="20"
  >
    <user-info
      v-if="user"
      :firstName="user.first_name"
      :lastName="user.last_name"
      :avatar="user.avatar"
      :id="user.id"
      :email="user.email"
    ></user-info>
  </v-card>
</template>

<script>
    /**
 * user page
 * show all info about a user
 *
 * @author Shahrokh elmi
 */
import UserInfo from "@/components/UserInfo.vue";
export default {
  name: "UserView",
  data() {
    return { user: null, isLoading: true };
  },
  components: { UserInfo },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (!this.$store.state.usersList?.data) {
        //if user does not navigate from UsersView
        this.$store
          .dispatch("fetchUsersList")
          .then(this.getUser)
          .catch((e) => {
            if (e.code === "ERR_NETWORK")
              this.$router.push({ name: "networkError" });
            else
              this.$router.push({
                name: "404Resource",
                params: { resource: this.$route.params.id },
              });
          });
      } else {
        this.getUser();
      }
    },
    getUser() {
      const users = this.$store.state.usersList.data;
      this.user = users.filter((u) => u.id == this.$route.params.id)[0];
      this.isLoading = false;
      if(!this.user) throw Error()
    },
  },
};
</script>
