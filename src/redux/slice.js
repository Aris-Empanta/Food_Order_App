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
       
        addToCart : (state, action) => {
                state.cart.push(action.payload)
        },
        removeOneProduct : (state, action) => {

            let cart = state.cart
            let id = action.payload

            for( let i=0; i < cart.length; i++ ) {
                 if(cart[i].id === id) {
                     cart = cart.slice(0,i).concat(cart.slice(i, cart.length -1))
                 }
                 console.log(cart)
                 break;
            }
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
export const { addToCart, clearCart, removeOneProduct } = cartSlice.actions


//export the reducer generates
export default cartSlice.reducer