import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./agent";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DETAILS} from "../../constants";


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


export const register = createAsyncThunk<void, any>('register', async (value, _thunkAPI) => {
  try {
    return await api.post('api/user/register',{username:value.username, first_name:value.firstname, email:value.email, password:value.password})
  } catch (error: any) {
    return console.log(error)
  }
})




const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedin: false,
    isLoginLoading:false,
    isRegisterLoading:false,
    loginData: {},
    registerData:{},
    isErrorLogin:false,
    loginErrorData: '',
    isErrorRegister:false,
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
  builder.addCase(register.fulfilled, (state) => {
      state.isRegisterLoading = false;
  })
  builder.addCase(register.rejected, (state) => {
    state.isRegisterLoading = false;
    state.isErrorRegister = true
  });
  },
});

export default userSlice.reducer;
