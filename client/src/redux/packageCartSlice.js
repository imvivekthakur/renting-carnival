import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    packageCart: [],
};

export const addToPackageCartThunk = createAsyncThunk("packageCart/add", async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
        },
    };

    return await Api.post(`packageCart/add`, data, config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });
});

export const removeFromPackageCartThunk = createAsyncThunk(
    "packageCart/remove",
    async (data) => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            },
        };

        return await Api.post(`packageCart/remove`, data, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const getPackageCartThunk = createAsyncThunk("packageCart/get", async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
        },
    };

    return await Api.get(`packageCart/get`, config)
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            return err.response;
        });
});

export const deletePackageCartThunk = createAsyncThunk(
    "packageCart/delete",
    async (data) => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            },
        };

        return await Api.post(`packageCart/delete`, data, config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }
);

export const packageCartSlice = createSlice({
    name: "packageCart",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // add from packageCart

            .addCase(addToPackageCartThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToPackageCartThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.success) {
                    state.isSuccess = true;
                    state.packageCart = action.payload.data.packageCart.items;
                } else {
                    state.isSuccess = false;
                    state.isError = true;
                }
            })
            .addCase(addToPackageCartThunk.rejected, (state) => {
                state.isLoading = true;
                state.isError = true;
            })

            // remove from packageCart

            .addCase(removeFromPackageCartThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFromPackageCartThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.success) {
                    state.packageCart = action.payload.data.packageCart.items;
                    state.isSuccess = true;
                } else {
                    state.isSuccess = false;
                    state.isError = true;
                }
            })
            .addCase(removeFromPackageCartThunk.rejected, (state) => {
                state.isLoading = true;
                state.isError = true;
            })

            // get packageCart

            .addCase(getPackageCartThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPackageCartThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.success) {
                    state.isSuccess = true;
                    state.packageCart = action.payload.data.packageCart;
                } else {
                    state.isSuccess = false;
                    state.isError = true;
                }
            })
            .addCase(getPackageCartThunk.rejected, (state) => {
                state.isLoading = true;
                state.isError = true;
            })

            // delete product
            .addCase(deletePackageCartThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePackageCartThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.success) {
                    state.packageCart = action.payload.data.packageCart.items;
                    state.isSuccess = true;
                } else {
                    state.isSuccess = false;
                    state.isError = true;
                }
            })
            .addCase(deletePackageCartThunk.rejected, (state) => {
                state.isLoading = true;
                state.isError = true;
            });
    },
});

export default packageCartSlice.reducer;
