import { configureStore } from '@reduxjs/toolkit';

import OrderSlice from './slice/OrderSlice';
import MenuSlice from './slice/MenuSlice';

export default configureStore({
  reducer: {
    order: OrderSlice,
    menu: MenuSlice,
  },
})