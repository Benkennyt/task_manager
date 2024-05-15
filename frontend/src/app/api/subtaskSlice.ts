import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./agent";


export const deleteSubtask = createAsyncThunk<any, string>('deleteSubtask', async (id, _thunkAPI) => {
    try {
     return await api.delete(`api/subtasks/delete/${id}/`)
    } catch (error: any) {
       console.log(error)
    }
})

export const updateSubtask = createAsyncThunk<any, any>('updateSubtask', async (value, _thunkAPI) => {
  try {
   return await api.put(`api/task/${value.taskID}/subtasks/edit/${value.id}/`, {status: value.status, name: value.name})
  } catch (error: any) {
     console.log(error)
  }
})



const subtaskSlice = createSlice({
  name: "subtasks",
  initialState: {
   isLoading: {
    isGetSubtaskLoading: false,
    isCreateSubtaskLoading: false,
    isDeleteSubtaskLoading:false,
    isUpdateSubtaskLoading:false
   },
   isError: { 
    isGetSubtaskError: false,
    isCreateSubtaskError: false,
    isDeleteSubtaskError: false,
    isUpdateSubtaskError: false,
  },
   data: {
    subtaskData:{},
    deleteSubtaskData:{},
    updateSubtaskData:{},

   },
  },
  reducers: {},
  extraReducers: (builder) => {

  // deleteSubtask
  builder.addCase(deleteSubtask.pending, (state) => {
    state.isLoading.isDeleteSubtaskLoading = true;
  });
  builder.addCase(deleteSubtask.fulfilled, (state, action) => {
    state.isLoading.isDeleteSubtaskLoading =false;
    state.data.deleteSubtaskData = action.payload
  });
  builder.addCase(deleteSubtask.rejected, (state) => {
  state.isLoading.isDeleteSubtaskLoading = false;
  state.isError.isDeleteSubtaskError = true
  });

  // updateSubtask
  builder.addCase(updateSubtask.pending, (state) => {
    state.isLoading.isUpdateSubtaskLoading = true;
  });
  builder.addCase(updateSubtask.fulfilled, (state, action) => {
    state.isLoading.isDeleteSubtaskLoading =false;
    state.data.updateSubtaskData = action.payload
  });
  builder.addCase(updateSubtask.rejected, (state) => {
  state.isLoading.isUpdateSubtaskLoading = false;
  state.isError.isUpdateSubtaskError = true
  });
  }
});

export default subtaskSlice.reducer;