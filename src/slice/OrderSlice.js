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
    removeLastEntry: (state) => {
      state.orderLine = state.orderLine.slice(0, -1);
    },
    deleteEntry: (state, action) => {
      state.orderLine.splice(action.payload, 1);
    },
    resetOrder: (state) => {
      state.orderLine = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addOrder, removeLastEntry, deleteEntry, resetOrder } = OrderSlice.actions

export default OrderSlice.reducer