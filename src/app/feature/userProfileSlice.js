import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define an async thunk for fetching profile data
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const refreshToken = Cookies.get('refreshToken'); 
    const response = await axios.get(`http://localhost:8080/api/get-profile-data`,{
        withCredentials: true, 
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });
    console.log(response, "response");
    return response.data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: { data: {}, status: 'idle', error: null },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});


export default profileSlice.reducer;