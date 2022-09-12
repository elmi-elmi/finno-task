<template>
         <user-info 
      :firstName="user.first_name" 
      :lastName="user.last_name"
       :avatar="user.avatar"
       :id="user.id"
       :email="user.email"
       ></user-info>
</template>

<script>
    import UserInfo from '@/components/UserInfo.vue';
    export default{
        name:'UserView',
        props:['user'],
        components:{UserInfo}

    }
</script>