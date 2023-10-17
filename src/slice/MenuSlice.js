import { createSlice } from '@reduxjs/toolkit'

export const MenuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuList: {},
  },
  reducers: {
    updateMenuList: (state, action) => {
        state.menuList = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateMenuList } = MenuSlice.actions

export default MenuSlice.reducer