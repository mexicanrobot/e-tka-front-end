<template>
    <div>
        <v-card>
            <v-card-title>
                Products
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
                            <v-text-field v-model="editedItem.productName" label="Product Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.productLine" label="Product Line"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.productScale" label="Scale"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.productVendor" label="Vendor"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.productDescription" label="Description"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.quantityInStock" label="Stock"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.buyPrice" label="Price"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.MSRP" label="MSRP"></v-text-field>
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
                :items="products"
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
  name: 'Products',
  data() {
      return {
          dialog: false,
          products: [],
          search: '',
          editedIndex: -1,
          headers: [
              { text:'Name',value:'productName'},
              { text:'Product Line',value:'productLine'},
              { text:'Stock',value:'quantityInStock'},
              { text:'Price',value:'buyPrice'},
              { text:'MSRP',value:'MSRP'},
              { text: 'Edit', value: 'actions', sortable: false }
          ],
          editedItem: {
              productName: '',
              productLine: '',
              quantityInStock: '',
              buyPrice: '',
              MSRP: ''
          },
          emptyItem: {
              productName: '',
              productLine: '',
              quantityInStock: '',
              buyPrice: '',
              MSRP: ''
          }
      }
  },
  computed: {
      formTitle() {
          return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
      }
  },
  methods: {
    fetchProducts() {
        DataService.getProducts()
        .then(response => {
            this.products = response.data;
        })
    },
    close() {
        this.dialog = false;
        this.editedItem = Object.assign({},this.emptyItem);
        this.editedIndex = -1;
    },
    save() {
        if(this.editedIndex !== -1) {
            DataService.editProduct(this.editedItem).then(() => {
                this.fetchProducts();
            })
        } else {
            DataService.addProduct(this.editedItem).then(() => {
                this.fetchProducts();
            })
        }
        this.close();
    },
    editItem(item) {
        this.editedIndex = this.products.indexOf(item);
        this.editedItem = Object.assign({},item);
        this.dialog = true;
    }
  },
  mounted: function() {
    this.fetchProducts();
  }
}
</script>

<style scoped>
</style>
