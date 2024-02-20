import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    user: {},
    profile: "",
};
export const createPackageThunk = createAsyncThunk(
    "package/create",
    async (data) => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${user.accessToken}`,
            },
        };
        return await Api.post(`package/create/`, data, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const getAllPackageThunk = createAsyncThunk(
    "package/getAll",
    async (data) => {
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };
        return await Api.get(`package/getAll/`, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const packageSlice = createSlice({
    name: "package",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(createPackageThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPackageThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.success) {
                    state.isSuccess = true;
                } else {
                    state.isSuccess = false;
                    state.isError = true;
                }
            })
            .addCase(createPackageThunk.rejected, (state) => {
                state.isLoading = true;
                state.isError = true;
            });
    },
});

export default packageSlice.reducer;
