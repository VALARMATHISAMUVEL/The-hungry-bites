import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.card.info.id === newItem.card.info.id
      );

      if (index >= 0) {
        // Item exists, increase quantity
        state.cartItems[index].quantity =
          (state.cartItems[index].quantity || 1) + 1;
      } else {
        // New item, add with quantity 1
        state.cartItems.push({ ...newItem, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload.card.info.id;
      state.cartItems = state.cartItems.filter(
        (item) => item.card.info.id !== itemId
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    updateItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item?.id === itemId
      );

      if (itemIndex !== -1) {
        if (newQuantity > 0) {
          state.cartItems[itemIndex].quantity = newQuantity;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload.card.info.id;
      const index = state.cartItems.findIndex(
        (item) => item.card.info.id === itemId
      );

      if (index >= 0) {
        if ((state.cartItems[index].quantity || 1) > 1) {
          state.cartItems[index].quantity -= 1;
        } else {
          // Set quantity to 0 instead of removing
          state.cartItems[index].quantity = 0;
        }
      }
    },

    clearCart: (state) => {
      state.cartItems.length = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  updateItemQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
