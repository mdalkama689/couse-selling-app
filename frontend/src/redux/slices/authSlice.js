import axiosInstance from "@/config/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  userDetails: localStorage.getItem("userDetails") || {},
  role: localStorage.getItem('role') ||  ''
};

const signUpAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const response = await axiosInstance.post(`/${data[0]}/signup`, data[1]);

    return response.data;
  } catch (error) {
    console.log("error : ", error?.response?.data?.error);

    return error?.response?.data?.error
  }
});

const signInAccount = createAsyncThunk('/auth/signin', async (data) => {
    try {
        const response = await axiosInstance.post(`/${data[0]}/signin`, data[1])

        return response.data 
    } catch (error) {
        console.log("error : ", error?.response?.data?.error);

        return error?.response?.data?.error
    }
})

const logOutAccount = createAsyncThunk('/auth/logout', async (data) => {

  try {
      await axiosInstance.post(`/${data}/logout`)

  
  } catch (error) {
      console.log("error : ", error?.response?.data?.error);

      return error?.response?.data?.error
  }
})
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(signInAccount.fulfilled, (state, action) => {
        
        state.isLoggedIn = true
        state.userDetails = action.payload.user 
        state.role = action.payload.user.role
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('userDetails', JSON.stringify(action.payload.user))
        localStorage.setItem('role', action.payload.user.role)
    })

    .addCase(logOutAccount.fulfilled, (state, action) => {
      state.isLoggedIn = false 
      state.userDetails = {}
      state.role = ""
      localStorage.clear()
    })
  },
});

export default authSlice.reducer;

export { signUpAccount, signInAccount, logOutAccount };
