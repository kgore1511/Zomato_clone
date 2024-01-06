import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk("signupapi", async (temp) => {
  const res = await axios.post('/api/auth/signup',{...temp});
  const data = await res.data;
  return data;
});

export const signinUser = createAsyncThunk("signinapi", async (temp) => {
  const res = await axios.post('/api/auth/signin',{...temp});
  const data = await res.data;
  return data;
});

export const userSlice = createSlice({
  name: "counter",
  initialState: {
    signupUserLoading: false,
    signupUserError: false,
    signinUserLoading:false,
    signinError:false,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  },
  reducers : {
    logoutUser: (state,action) => {
      localStorage.removeItem('userInfo')
      state.userInfo=""
      state.signinUserLoading=false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.signupUserLoading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.signupUserLoading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo',JSON.stringify(action.payload))
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.signupUserError = true;    
    });

    builder.addCase(signinUser.pending, (state) => {
      
      state.signinUserLoading = true;
    });
    builder.addCase(signinUser.fulfilled, (state, action) => {
     
      state.signinUserLoading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo',JSON.stringify(action.payload))
    });
    builder.addCase(signinUser.rejected, (state, action) => {
      state.signinError = true;
      state.signinUserLoading=false
    });
  }
});

export default userSlice.reducer;
export const {logoutUser} = userSlice.actions
