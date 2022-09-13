<template>
    <div>
        <h1>Not Found View</h1> 
        <p v-if="$route.params.resource">
              user id  {{$route.params.resource}} not found
        </p>
        <router-link to="/">back to home</router-link>
    </div>
</template>