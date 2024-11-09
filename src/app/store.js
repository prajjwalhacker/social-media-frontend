import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from '../app/feature/userProfileSlice';

const store = configureStore({
    reducer: {
        userProfile: userProfileSlice
    }
})

export default store;