import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {}, // Initialize as an empty object
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {}; // Clear user details to an empty object
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails, clearUser } = userSlice.actions

export default userSlice;
