import { configureStore } from '@reduxjs/toolkit'
import usersDataSlice from './usersDataSlice'

export const store = configureStore({
    reducer: {
        users: usersDataSlice
    }
})