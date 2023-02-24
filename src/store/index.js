

import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlicer from "./cart-slice";



const store = configureStore({
    reducer: {ui: uiSlice.reducer, cart: cartSlicer.reducer}
})

export default store;