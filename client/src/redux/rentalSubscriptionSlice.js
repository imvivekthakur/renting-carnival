import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    user: {},
    profile: "",
};
export const createRentalThunk = createAsyncThunk(
    "rental/create",
    async (data) => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${user.accessToken}`,
            },
        };
        return await Api.post(`rental/create/`, data, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const getAllRentalThunk = createAsyncThunk(
    "rental/getAll",
    async (data) => {
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };
        return await Api.get(`rental/getAll/`, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const rentalSlice = createSlice({
    name: "rental",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(createRentalThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRentalThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.success) {
                    state.isSuccess = true;
                } else {
                    state.isSuccess = false;
                    state.isError = true;
                }
            })
            .addCase(createRentalThunk.rejected, (state) => {
                state.isLoading = true;
                state.isError = true;
            });
    },
});

export default rentalSlice.reducer;
