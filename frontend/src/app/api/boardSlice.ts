import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./agent";


export const getBoards = createAsyncThunk<any>('getBoards', async () => {
  try {
   return await api.get("api/boards/")
  } catch (error: any) {
     console.log(error)
  }
})

export const deleteBoard = createAsyncThunk<any, string>('deleteBoard', async (id, _thunkAPI) => {
    try {
     return await api.delete(`api/boards/delete/${id}/`)
    } catch (error: any) {
       console.log(error)
    }
})

export const createBoard = createAsyncThunk<any, any>('createBoard', async (values, _thunkAPI) => {
    try {
     return await api.post("api/boards/", values)
    } catch (error: any) {
       console.log(error)
    }
})

export const updateBoard = createAsyncThunk<any, any>('updateBoard', async (values, _thunkAPI) => {
  try {
    
   return await api.put(`api/boards/edit/${values.id}/`, values)
  // console.log({...values.columns.columnsObj})
  } catch (error: any) {
     console.log(error)
  }
})



const boardSlice = createSlice({
  name: "boards",
  initialState: {
   isLoading: {
    isGetBoardLoading: false,
    isCreateBoardLoading: false,
    isDeleteBoardLoading:false,
    isUpdateBoardLoading:false
   },
   isError: { 
    isGetBoardError: false,
    isCreateBoardError: false,
    isDeleteBoardError: false,
    isUpdateBoardError: false,
  },
   data: {
    boardData:{},
    createBoardData:{},
    deleteBoardData:{},
    updateBoardData:{},

   },
  },
  reducers: {},
  extraReducers: (builder) => {
    // getBoards
    builder.addCase(getBoards.pending, (state) => {
        state.isLoading.isGetBoardLoading = true;
    });
  builder.addCase(getBoards.fulfilled, (state, action) => {
      state.isLoading.isGetBoardLoading =false;
      state.data.boardData = action.payload
  });
  builder.addCase(getBoards.rejected, (state) => {
    state.isLoading.isGetBoardLoading = false;
    state.isError.isGetBoardError = true
  });

  // createBoard
  builder.addCase(createBoard.pending, (state) => {
    state.isLoading.isCreateBoardLoading = true;
  });
  builder.addCase(createBoard.fulfilled, (state, action) => {
    state.isLoading.isCreateBoardLoading =false;
    state.data.createBoardData = action.payload
  });
  builder.addCase(createBoard.rejected, (state) => {
  state.isLoading.isCreateBoardLoading = false;
  state.isError.isCreateBoardError = true
  });

  // deleteBoard
  builder.addCase(deleteBoard.pending, (state) => {
    state.isLoading.isDeleteBoardLoading = true;
  });
  builder.addCase(deleteBoard.fulfilled, (state, action) => {
    state.isLoading.isDeleteBoardLoading =false;
    state.data.deleteBoardData = action.payload
  });
  builder.addCase(deleteBoard.rejected, (state) => {
  state.isLoading.isDeleteBoardLoading = false;
  state.isError.isDeleteBoardError = true
  });

  // updateBoard
  builder.addCase(updateBoard.pending, (state) => {
    state.isLoading.isUpdateBoardLoading = true;
  });
  builder.addCase(updateBoard.fulfilled, (state, action) => {
    state.isLoading.isUpdateBoardLoading =false;
    state.data.updateBoardData = action.payload
  });
  builder.addCase(updateBoard.rejected, (state) => {
  state.isLoading.isUpdateBoardLoading = false;
  state.isError.isUpdateBoardError = true
  });
  }
});

export default boardSlice.reducer;