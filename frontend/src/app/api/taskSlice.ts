import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./agent";


export const getTasks = createAsyncThunk<any, any>('getTasks', async (values, _thunkAPI) => {
   return await api.get(`api/board/tasks/${values}/`)
})

export const getTask1 = createAsyncThunk<any, any>('getTask1', async (values, _thunkAPI) => {
   return await api.get(`api/task/${values}/`)
})

export const deleteTask = createAsyncThunk<any, any>('deleteTask', async (values, _thunkAPI) => {
  return await api.delete(`api/board/${values.boardID}/tasks/delete/${values.taskID}/`)
})

export const createTask = createAsyncThunk<any, any>('createTask', async (values, _thunkAPI) => {
     const res = await api.post(`api/board/tasks/${values.boardID}/`, {name: values.name, description: values.description, status: values.status})
     if (res.status === 201) {
      const list = values.subtaskList
      for (let i = 0; i < list.length; i++) {
        await api.post(`api/board/task/subtasks/${res.data.id}/`, {name: list[i].subtask, status:values.status2})
      }
      console.log(values.subtaskList)
     }
     return res

})

export const updateTask = createAsyncThunk<any, any>('updateTask', async (values, _thunkAPI) => {
   return await api.put(`api/board/${values.boardID}/tasks/edit/${values.taskID}/`, { name: values.name, description: values.description, status: values.status})

})



const taskSlice = createSlice({
  name: "tasks",
  initialState: {
   isLoading: {
    isGetTaskLoading1: false,
    isGetTasksLoading: false,
    isCreateTaskLoading: false,
    isDeleteTaskLoading:false,
    isUpdateTaskLoading:false,
   },
   isError: { 
    isGetTaskError1: false,
    isGetTasksError: false,
    isCreateTaskError: false,
    isDeleteTaskError: false,
    isUpdateTaskError: false,
  },
   data: {
    tasksData:{},
    taskData1:{},
    createTaskData:{},
    deleteTaskData:{},
    updateTaskData:{},

   },
  },
  reducers: {},
  extraReducers: (builder) => {
    // getTasks
    builder.addCase(getTask1.pending, (state) => {
      state.isLoading.isGetTaskLoading1 = true;
  });
    builder.addCase(getTask1.fulfilled, (state, action) => {
        state.isLoading.isGetTaskLoading1 =false;
        state.data.taskData1 = action.payload
    });
    builder.addCase(getTask1.rejected, (state) => {
      state.isLoading.isGetTaskLoading1 = false;
      state.isError.isGetTaskError1 = true
    });

    // getTasks
    builder.addCase(getTasks.pending, (state) => {
        state.isLoading.isGetTasksLoading = true;
    });
  builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading.isGetTasksLoading =false;
      state.data.tasksData = action.payload
  });
  builder.addCase(getTasks.rejected, (state) => {
    state.isLoading.isGetTasksLoading = false;
    state.isError.isGetTasksError = true
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
    state.isLoading.isUpdateTaskLoading =false;
    state.data.updateTaskData = action.payload
  });
  builder.addCase(updateTask.rejected, (state) => {
  state.isLoading.isUpdateTaskLoading = false;
  state.isError.isUpdateTaskError = true
  });
  }
});

export default taskSlice.reducer;