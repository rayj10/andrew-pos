import { createSlice } from '@reduxjs/toolkit'

export const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    orderLine: [],
  },
  reducers: {
    addOrder: (state, action) => {
        state.orderLine = [...state.orderLine, action.payload];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addOrder } = OrderSlice.actions

export default OrderSlice.reducer