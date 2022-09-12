<template>
  <v-row class=" mt-2">
    <v-col class="d-flex justify-center aling-center">
        <v-card min-width="600" :loading="isLoading" >
    <v-list three-line>
      <template v-for="(item, index) in users" :kry="item.id" >
        <v-subheader
          v-if="index===0"
          :key="header"
          v-text="header"
        ></v-subheader>
        <v-divider v-if="index!==0"
        ></v-divider>
        <v-list-item
        router
        :to="{name:'user', params:{id:item.id}}"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.last_name + ' ' + item.first_name"></v-list-item-title>
            <v-list-item-subtitle v-html="item.email"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
  </v-col>
  </v-row>
</template>

<script>
  import UserInfo from '@/components/UserInfo.vue';
export default{
  name:'Users',
  components:{UserInfo},
  data(){return{users:{},header:'Users', isLoading:true}},
  created(){
      this.fetchUsers();
  },
  methods:{
    fetchUsers(){
      this.$store.dispatch('fetchUsersList')
      .then(()=>{
        const {data} = this.$store.state.usersList;
        this.users = data
        this.isLoading= false;
        console.log(data)

      })
    }
  }
}
</script>
