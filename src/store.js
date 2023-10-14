import { configureStore } from '@reduxjs/toolkit';

import OrderSlice from './slice/OrderSlice';

export default configureStore({
  reducer: {
    order: OrderSlice
  },
})