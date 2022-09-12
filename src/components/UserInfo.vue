<template>
  <div>
      {{id}}
      <hr>
      {{firstName}}
      <hr>
      {{lastName}}
      <hr>
      {{avatar}}
      <img :src="avatar" alt="">
      <hr>
      {{email}}
      <hr>
    </div>
</template>

<script>
    export default{
        name:'UserInfo',
        props:[
            'avatar',
            'firstName',
            'lastName',
            'id',
            'email'

        ]
    }
</script>