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

export const getAllBlogThunk = createAsyncThunk(
  "blog/getAll",
  async (data) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    return await Api.get(`blog/getAll/`, config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }
);

export const getSingleBlogThunk = createAsyncThunk(
  "blog/getSingle",
  async (data) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const id = data.dbId;
    return await Api.get(`blog/getSingle/?dbId=${id}`, config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }
);
export const deleteBlogThunk = createAsyncThunk(
  "blog/delete/:id",
  async (data) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const id = data.dbId;
    return await Api.delete(`blog/delete/${id}`, config)
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