import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  user: {},
  profile: "",
};
export const creatBlogThunk = createAsyncThunk(
  "blog/create",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    return await Api.post(`blog/create/`, data, config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(creatBlogThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatBlogThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(creatBlogThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});



export default blogSlice.reducer;