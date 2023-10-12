import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import { apiSlice } from '../slices/apiSlice'
const store = configureStore({
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware ),
    reducer: {
        // name of state: state
        'auth': authSlice,
        [apiSlice.reducerPath] : apiSlice.reducer
    }


})
export default store