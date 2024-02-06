import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    user: {},
    profile: "",
};
export const createCoupenThunk = createAsyncThunk(
    "coupen/create",
    async (data) => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${user.accessToken}`,
            },
        };
        return await Api.post(`coupen/create/`, data, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const getAllCoupenThunk = createAsyncThunk(
    "coupen/getAll",
    async (data) => {
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };
        return await Api.get(`coupen/getAll/`, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const coupenSlice = createSlice({
    name: "coupen",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(createCoupenThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupenThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.success) {
                    state.isSuccess = true;
                } else {
                    state.isSuccess = false;
                    state.isError = true;
                }
            })
            .addCase(createCoupenThunk.rejected, (state) => {
                state.isLoading = true;
                state.isError = true;
            });
    },
});




export default coupenSlice.reducer;