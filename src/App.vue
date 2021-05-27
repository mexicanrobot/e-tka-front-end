<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="text-sm-h4">Crudly</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn class="mr-2" @click="$router.push('customers')">
        Customers
      </v-btn>
      <v-btn class="mr-2" @click="$router.push('products')">
        Products
      </v-btn>
      <v-btn class="mr-2" @click="$router.push('orders')">
        Orders
      </v-btn>
    </v-app-bar>

    <v-main class="pl-2 pr-2">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({}),
};
</script>

<style scoped>
</style>