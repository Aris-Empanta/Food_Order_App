import { createSlice } from '@reduxjs/toolkit'

//The initial empty cart state
const initialState = {
  value: [],
}

//The slice for shopping cart
export const cartSlice = createSlice({
    name: 'cart',
          initialState,
    reducers: {
        addToCart : (state, action) => {
                state.value.push(action.payload)
        }
    }
})

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions

//export the reducer generates
export default cartSlice.reducer