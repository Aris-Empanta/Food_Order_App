import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { serverHost } from '../variables/variables'

//The api url to fetch the products data.
const GET_PRODUCTS = serverHost + "products"

//The initial empty cart state
const initialState = {
  products: [], 
  cart: [],
  finalCart: [],
  cartSubmitted: false,
  gotVerificationCode: false,
  customerName: "", 
  email: "",
  comments: "",
  customerIsRegistered: false,
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
        decreaseByOne : (state, action) => {

            let cart = state.cart
            let id = action.payload
            let index = cart.findIndex(item => item.id === id)

            //Decreasing the amount of a specific product on cart by 1.
            let newCart = cart.slice(0, index).concat(cart.slice(index + 1, cart.length))
            //The updated cart
            state.cart = [...newCart]          
        },
        removeProduct : (state, action) => {

            let id = action.payload
            let cart = state.cart

            let newCart = cart.filter( item => item.id !== id)

            state.cart = [...newCart]
        },
        clearCart : (state) => {
          state.cart = []
        },
        submitCart : (state, action ) => {

            state.cartSubmitted = action.payload
        },
        setFinalCart : (state, action) => {

            state.finalCart = action.payload
        },
        setCustomerName : (state, action) => {

            state.customerName = action.payload
        },
        setEmail : (state, action) => {
                state.email = action.payload
        },
        verifyPurchase : (state, action) => {

            state.gotVerificationCode = action.payload
        },
        setComments : (state, action) => {

            state.comments = action.payload
        },
        checkCustomerRegistered: (state, action) => {

            state.customerIsRegistered= action.payload
        }
    },
    extraReducers(builder) {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         //Setting the global state with the fetched products data array      
         state.products = [...action.payload]       
      })
    }
})

// Action creators are generated for each case reducer function
export const { addToCart, 
               clearCart, 
               decreaseByOne, 
               removeProduct, 
               submitCart,
               setFinalCart,
               setEmail,
               setCustomerName,
               verifyPurchase,
               setComments,
               checkCustomerRegistered } = cartSlice.actions


//export the reducer generates
export default cartSlice.reducer