import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    user: {},
    profile: "",
};
export const createTestimonialThunk = createAsyncThunk(
    "testimonial/create",
    async (data) => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${user.accessToken}`,
            },
        };
        return await Api.post(`testimonial/create/`, data, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const getAllTestimonialThunk = createAsyncThunk(
    "testimonial/getAll",
    async (data) => {
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };
        return await Api.get(`testimonial/getAll/`, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const productSlice = createSlice({
    name: "testimonial",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(createTestimonialThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTestimonialThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.success) {
                    state.isSuccess = true;
                } else {
                    state.isSuccess = false;
                    state.isError = true;
                }
            })
            .addCase(createTestimonialThunk.rejected, (state) => {
                state.isLoading = true;
                state.isError = true;
            });
    },
});

export default productSlice.reducer;
