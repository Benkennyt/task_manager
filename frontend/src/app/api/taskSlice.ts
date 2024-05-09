import { boardID1 } from './../models/board';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./agent";


export const getTasks = createAsyncThunk<any, any>('getTasks', async (value, _thunkAPI) => {
  try {
   return await api.get(`api/tasks/${value.boardID}/`)
  } catch (error: any) {
     console.log(error)
  }
})

export const deleteTask = createAsyncThunk<any, string>('deleteTask', async (id, _thunkAPI) => {
    try {
     return await api.delete(`api/tasks/delete/${id}/`)
    } catch (error: any) {
       console.log(error)
    }
})

export const createTask = createAsyncThunk<any, any>('createTask', async (value, _thunkAPI) => {
    try {
     return await api.post(`api/tasks/${value.boardID}/`, {name: value.name, description: value.description, status: value.status})
    } catch (error: any) {
       console.log(error)
    }
})

export const updateTask = createAsyncThunk<any, any>('updateTask', async (value, _thunkAPI) => {
  try {
   return await api.put(`api/tasks/edit/${value.id}/`, {name: value.name})
  } catch (error: any) {
     console.log(error)
  }
})



const taskSlice = createSlice({
  name: "tasks",
  initialState: {
   isLoading: {
    isGetTaskLoading: false,
    isCreateTaskLoading: false,
    isDeleteTaskLoading:false,
    isUpdateTaskLoading:false
   },
   isError: { 
    isGetTaskError: false,
    isCreateTaskError: false,
    isDeleteTaskError: false,
    isUpdateTaskError: false,
  },
   data: {
    taskData:{},
    createTaskData:{},
    deleteTaskData:{},
    updateTaskData:{},

   },
  },
  reducers: {},
  extraReducers: (builder) => {
    // getTasks
    builder.addCase(getTasks.pending, (state) => {
        state.isLoading.isGetTaskLoading = true;
    });
  builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading.isGetTaskLoading =false;
      state.data.taskData = action.payload
  });
  builder.addCase(getTasks.rejected, (state) => {
    state.isLoading.isGetTaskLoading = false;
    state.isError.isGetTaskError = true
  });

  // createTask
  builder.addCase(createTask.pending, (state) => {
    state.isLoading.isCreateTaskLoading = true;
  });
  builder.addCase(createTask.fulfilled, (state, action) => {
    state.isLoading.isCreateTaskLoading =false;
    state.data.createTaskData = action.payload
  });
  builder.addCase(createTask.rejected, (state) => {
  state.isLoading.isCreateTaskLoading = false;
  state.isError.isCreateTaskError = true
  });

  // deleteTask
  builder.addCase(deleteTask.pending, (state) => {
    state.isLoading.isDeleteTaskLoading = true;
  });
  builder.addCase(deleteTask.fulfilled, (state, action) => {
    state.isLoading.isDeleteTaskLoading =false;
    state.data.deleteTaskData = action.payload
  });
  builder.addCase(deleteTask.rejected, (state) => {
  state.isLoading.isDeleteTaskLoading = false;
  state.isError.isDeleteTaskError = true
  });

  // updateTask
  builder.addCase(updateTask.pending, (state) => {
    state.isLoading.isUpdateTaskLoading = true;
  });
  builder.addCase(updateTask.fulfilled, (state, action) => {
    state.isLoading.isDeleteTaskLoading =false;
    state.data.updateTaskData = action.payload
  });
  builder.addCase(updateTask.rejected, (state) => {
  state.isLoading.isUpdateTaskLoading = false;
  state.isError.isUpdateTaskError = true
  });
  }
});

export default taskSlice.reducer;