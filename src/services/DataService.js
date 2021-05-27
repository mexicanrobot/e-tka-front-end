import httpClient from '../axios';

class DataService {
    getOrders() {
        return httpClient.get('/orders');
    }

    editOrder(order) {
        return httpClient.put('/orders',order);
    }

    addOrder(order) {
        return httpClient.post('/orders',order);
    }

    getProducts() {
        return httpClient.get('/products');
    }

    editProduct(product) {
        return httpClient.put('/products',product);
    }

    addProduct(product) {
        return httpClient.post('/products',product);
    }

    getCustomers() {
        return httpClient.get('/customers');
    }

    editCustomer(customer) {
        return httpClient.put('/customers',customer);
    }

    addCustomer(customer) {
        return httpClient.post('/customers',customer);
    }
}

export default new DataService();