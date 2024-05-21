import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { api } from "./agent";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DETAILS} from "../../constants";

interface RegisterErrorPayload {
  username: string,
  email:string,
  
}


export const login = createAsyncThunk<string, any>('login', async (value, _thunkAPI) => {
  try {
    const res = await api.post('/api/token/', {username: value.username, password: value.password})
    localStorage.setItem(ACCESS_TOKEN, res.data.access)
    localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
    return await api.get('api/user/details')
    .then(response =>
      {localStorage.setItem(USER_DETAILS, JSON.stringify(response.data))
        return response.data
      }
    )
  } catch (error: any) {
      if (error.response?.status === 401) {
        return (  _thunkAPI.rejectWithValue('Incorrect username or password.'))
      }
  }
})


export const register = createAsyncThunk<any, any>('register', async (value, _thunkAPI) => {
  try {
    const res = await api.post('api/user/register',{username:value.username, first_name:value.firstname, email:value.email, password:value.password})
    return res
  } catch (error: any) {
    return _thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getUser = createAsyncThunk<'', any>('getUser', async ( _thunkAPI) => {
  try {
    const res = await api.get('api/user/details')
    return res
  } catch (error: any) {
    return _thunkAPI.rejectWithValue(error.response.data)
  }
})



const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedin: false,
    isLoginLoading:false,
    isRegisterLoading:false,
    isUserDataLoading:false,
    loginData: {},
    registerData:{},
    userData:{},
    isErrorLogin:false,
    registerErrorData:{},
    loginErrorData: '',
    isErrorRegister:false,
    isUserDataError:false
  },
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoginLoading = true;
  });
  builder.addCase(login.fulfilled, (state, action) => {
      state.isLoginLoading = false;
      state.loginData = action.payload
  });
  builder.addCase(login.rejected, (state, action) => {
      state.loginErrorData = String(action.payload)
      state.isLoginLoading = false;
      state.isErrorLogin = true
  });
  
  // Register
  builder.addCase(register.pending, (state) => {
    state.isRegisterLoading = true;
  });
  builder.addCase(register.fulfilled, (state, action) => {
      state.isRegisterLoading = false;
      state.registerData = action.payload
  })
  builder.addCase(register.rejected, (state, action) => {
    state.isRegisterLoading = false;
    state.isErrorRegister = true
    state.registerErrorData = action.payload as RegisterErrorPayload 
  });

  // userData
  builder.addCase(getUser.pending, (state) => {
    state.isUserDataLoading = true;
  });
  builder.addCase(getUser.fulfilled, (state, action) => {
      state.isUserDataLoading = false;
      state.userData = action.payload
  })
  builder.addCase(getUser.rejected, (state) => {
    state.isUserDataLoading = false;
    state.isUserDataError = true

  });
  },
});

export default userSlice.reducer;
