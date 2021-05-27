<template>
    <div>
        <v-card>
            <v-card-title>
                Orders
                <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mt-3 mr-2"
                    v-bind="attrs"
                    v-on="on"
                >
                    New Item
                </v-btn>
                </template>
                <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.orderDate" label="Order Date"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.requiredDate" label="Required Date"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.shippedDate" label="Shipped Date"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.comments" label="Comments"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.customerNumber" label="Customer Number"></v-text-field>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card-text>
    
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                    >
                    Cancel
                    </v-btn>
                    <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    >
                    Save
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="orders"
                :search="search"
            >
                <template v-slot:item.actions="{ item }">
                    <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                    >
                    mdi-pencil
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import DataService from '../services/DataService';
export default {
  name: 'Orders',
  data() {
      return {
          dialog: false,
          orders: [],
          search: '',
          editedIndex: -1,
          headers: [
              { text:'Number',value:'orderNumber'},
              { text:'Date',value:'orderDate'},
              { text:'Required Date',value:'requiredDate'},
              { text:'Shipped Date',value:'shippedDate'},
              { text:'Status',value:'status'},
              { text:'Comments',value:'comments'},
              { text:'Customer Number',value:'customerNumber'},
              { text:'Edit', value: 'actions', sortable: false }
          ],
          editedItem: {
            orderNumber: '',
            orderDate: '',
            requiredDate: '',
            shippedDate: '',
            status: '',
            comments: '',
            customerNumber: ''
          },
          emptyItem: {
            orderNumber: '',
            orderDate: '',
            requiredDate: '',
            shippedDate: '',
            status: '',
            comments: '',
            customerNumber: ''
          }
      }
  },
  computed: {
      formTitle() {
          return this.editedIndex === -1 ? 'New Order' : 'Edit Order'
      }
  },
  methods: {
    fetchOrders() {
        DataService.getOrders()
        .then(response => {
            this.orders = response.data;
        })
    },
    close() {
        this.dialog = false;
        this.editedItem = Object.assign({},this.emptyItem);
        this.editedIndex = -1;
    },
    save() {
        if(this.editedIndex !== -1) {
            DataService.editOrder(this.editedItem).then(() => {
                this.fetchOrders();
            })
        } else {
            DataService.addOrder(this.editedItem).then(() => {
                this.fetchOrders();
            })
        }
        this.close();
    },
    editItem(item) {
        this.editedIndex = this.orders.indexOf(item);
        this.editedItem = Object.assign({},item);
        this.dialog = true;
    }
  },
  mounted: function() {
    this.fetchOrders();
  }
}
</script>

<style scoped>
</style>
