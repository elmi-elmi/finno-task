<template>
  <div class="about" >
    <ul v-for="(user, i) in users" :key="user.id">
      <router-link :to="{name:'user', params:{user, id:user.id}}">{{user.first_name}}</router-link>
 
    </ul>
  </div>
</template>

<script>
  import UserInfo from '@/components/UserInfo.vue';
export default{
  name:'Users',
  components:{UserInfo},
  data(){return{users:{}}},
  created(){
      this.fetchUsers();
  },
  methods:{
    fetchUsers(){
      this.$store.dispatch('fetchUsersList')
      .then(()=>{
        const {data} = this.$store.state.usersList;
        this.users = data
        console.log(data)

      })
    }
  }
}
</script>
