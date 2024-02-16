import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    user: {},
    profile: "",
};
export const createCategoryThunk = createAsyncThunk(
    "category/create",
    async (data) => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${user.accessToken}`,
            },
        };
        return await Api.post(`category/create/`, data, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const getAllCategoryThunk = createAsyncThunk(
    "category/getAll",
    async (data) => {
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };
        return await Api.get(`category/getAll/`, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(creatCategoryThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(creatCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.success) {
                    state.isSuccess = true;
                } else {
                    state.isSuccess = false;
                    state.isError = true;
                }
            })
            .addCase(creatCategoryThunk.rejected, (state) => {
                state.isLoading = true;
                state.isError = true;
            });
    },
});




export default categorySlice.reducer;