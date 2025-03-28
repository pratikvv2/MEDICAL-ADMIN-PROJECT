/* eslint-disable no-unused-vars */
import { COLLECTIONS } from "@/utils/constants";
import { getAllDocsFromCollection } from "@/utils/firebaseFunctions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


/**
 * This whole is not working & not yet used anywhere, 
 * but in future we will correct it if needed or remove if not.
 */

const LOADING = "loading", SUCCESS = "success", FAIL = "failed";

const INITIAL_STATE = {
    allUsers: [],
    allBookings: [],
    status,
    getData: null,
}

export const getAllBookings = createAsyncThunk(
    "users/getAllBookings",
    async () => {
        try {
            const data = await getAllDocsFromCollection(COLLECTIONS.bookings);
            console.log(data);

            return data;

        } catch (error) {
            return error;
        }

    }
)

export const usersDataSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    reducers: {
        triggerGetData: (state, action) => {
            state.getData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBookings.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(getAllBookings.fulfilled, (state, action) => {
                console.log(action);
                state.status = SUCCESS;
                console.log(action);

                state.allBookings = action.payload; // Save the fetched data to receivedMail

            })
            .addCase(getAllBookings.rejected, (state, action) => {
                state.status = FAIL;
            });
    }

})

export const { triggerGetData } = usersDataSlice.actions;

export default usersDataSlice.reducer;