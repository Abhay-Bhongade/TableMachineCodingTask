import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, API_URL } from "../../Constant/Constant";

const initialState = {
  loading: false,
  tableData: [],
  error: "",
};

export const fetchTableData = createAsyncThunk(
  "table/fetchTableData",
  async () => {
    try {
      const response = await axios.get(API_URL, config);
      return response.data;
    } catch (error) {
      console.error("An error occurred1:", error);
      throw error;
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTableData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchTableData.fulfilled, (state, action) => {
      state.loading = false;
      state.tableData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTableData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { updateRecord, deleteRecord } = tableSlice.actions;

export default tableSlice.reducer;
