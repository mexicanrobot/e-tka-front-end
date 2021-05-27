<template>
    <div>
        <v-card>
            <v-card-title>
                Customers
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
                            <v-text-field v-model="editedItem.customerName" label="Customer Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.contactLastName" label="Contact Last Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.contactFirstName" label="Contact First Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.addressLine1" label="Address (Line 1)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.addressLine2" label="Address (Line 2)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.city" label="City"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.state" label="State"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.postalCode" label="Postal Code"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.country" label="Country"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.salesRepEmployeeNumber" label="Sales Rep Employee Number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.creditLimit" label="Credit Limit"></v-text-field>
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
                :items="customers"
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
  name: 'Customers',
  data() {
      return {
          dialog: false,
          customers: [],
          search: '',
          editedIndex: -1,
          headers: [
              { text:'Number',value:'customerNumber'},
              { text:'Name',value:'customerName'},
              { text:'Phone',value:'phone'},
              { text: 'Edit', value: 'actions', sortable: false }
          ],
          editedItem: {
              customerName: '',
              contactLastName: '',
              contactFirstName: '',
              phone: '',
              addressLine1: ''
          },
          emptyItem: {
              customerName: '',
              contactLastName: '',
              contactFirstName: '',
              phone: '',
              addressLine1: ''
          }
      }
  },
  computed: {
      formTitle() {
          return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer'
      }
  },
  methods: {
    fetchCustomers() {
        console.log('fetchCustomers');
        DataService.getCustomers()
        .then(response => {
            this.customers = response.data;
        })
    },
    close() {
        this.dialog = false;
        this.editedItem = Object.assign({},this.emptyItem);
        this.editedIndex = -1;
    },
    save() {
        if(this.editedIndex !== -1) {
            DataService.editCustomer(this.editedItem).then(() => {
                this.fetchCustomers();
            })
        } else {
            DataService.addCustomer(this.editedItem).then(() => {
                this.fetchCustomers();
            })
        }
        this.close();
    },
    editItem(item) {
        this.editedIndex = this.customers.indexOf(item);
        this.editedItem = Object.assign({},item);
        this.dialog = true;
    }
  },
  mounted: function() {
    this.fetchCustomers();
  }
}
</script>

<style scoped>
</style>
