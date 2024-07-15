import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem('wishlistData')) || [],
  fetchStatus: false,
};

const wishlistSlice = createSlice({
  name: 'wishlistData',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      // Check if item already exists in wishlist to avoid duplicates
      if (!state.data.includes(action.payload)) {
        state.data.push(action.payload); // Mutating state here
        localStorage.setItem('wishlistData', JSON.stringify(state.data)); // Update localStorage
      }
    },
    removeFromWishlist: (state, action) => {
      state.data = state.data.filter(item => item !== action.payload); // Mutating state here
      localStorage.setItem('wishlistData', JSON.stringify(state.data)); // Update localStorage
     
    },
    clearWishlist: (state) => {
      state.data = []; // Mutating state here
      localStorage.removeItem('wishlistData'); // Remove from localStorage
    },
    fetchAllWishlist: (state, action) => {
      state.fetchStatus = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, fetchAllWishlist } = wishlistSlice.actions;

// Selector to get wishlist items from state
export const selectWishlistItems = (state) => state.wishlistData.data;

export default wishlistSlice;
