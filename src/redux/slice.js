import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//The api url to fetch the products data.
const GET_PRODUCTS = "http://localhost:5000/products"

//The initial empty cart state
const initialState = {
  products: [], 
  cart: [],
}

//  The function to fetch all products from our database and set the
// global state accordingly later.
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try{
        const response = await axios.get(GET_PRODUCTS)
        return [...response.data]
    } catch(err) {
        return err.message
    }
})


//The slice for shopping cart
export const cartSlice = createSlice({
    name: 'customer',
          initialState,
    reducers: {
        
        clearProducts: (state) => {
          state.products = []
        },
        addToCart : (state, action) => {
                state.cart.push(action.payload)
        },

        clearCart : (state) => {
          state.cart = []
        },        
    },
    extraReducers(builder) {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         //Setting the global state with the fetched products data array      
         state.products = [...action.payload]       
      })
    }
})

// Action creators are generated for each case reducer function
export const { addToCart, clearCart,  clearProducts } = cartSlice.actions


//export the reducer generates
export default cartSlice.reducer