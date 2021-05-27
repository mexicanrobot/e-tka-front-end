import Vue from 'vue';
import Router from 'vue-router';
import Orders from './components/Orders.vue'
import Products from './components/Products.vue'
import Customers from './components/Customers.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/orders",
            name: 'Orders',
            component: Orders
        },
        {
            path: "/products",
            name: 'Products',
            component: Products
        },
        {
            path: "/customers",
            name: 'Customers',
            component: Customers
        },
        {
            path: "*",
            redirect: "/orders"
        }
    ]
});