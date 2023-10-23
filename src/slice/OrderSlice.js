import { selectClasses } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit'

export const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    orderLine: [],
    selectedOrder: null,
    orderId: 0,
  },
  reducers: {
    addOrder: (state, action) => {
        let newOrder = {...action.payload, orderId: `${action.payload.id} - ${state.orderId}`}
        state.orderLine = [...state.orderLine, newOrder];
        state.orderId += 1;
        state.selectedOrder = newOrder;
    },
    removeLastEntry: (state) => {
      state.orderLine = state.orderLine.slice(0, -1);
    },
    deleteEntry: (state, action) => {
      let deleteIdx = []

      state.orderLine.forEach((order, idx) => {
        if (order.parentId === action.payload.orderId)
          deleteIdx.push(idx);
      })

      deleteIdx.push(state.orderLine.findIndex(order => order.orderId === action.payload.orderId));
      deleteIdx.sort((a,b) => b - a);

      deleteIdx.forEach(idx => {
        state.orderLine.splice(idx, 1);
      });

      state.selectedOrder = state.orderLine[state.orderLine.length - 1]
    },
    resetOrder: (state) => {
      state.orderLine = [];
      state.selectedOrder = null;
      state.orderId = 0;
    },
    updateSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addOrder, removeLastEntry, deleteEntry, resetOrder, updateSelectedOrder } = OrderSlice.actions

export default OrderSlice.reducer