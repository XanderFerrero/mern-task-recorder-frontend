import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import taskService from "../services/taskService";

const initialState = {
    tasks: [],
    id:1,
    msg:'',
    loading:false,
    success:false,
    reject:false,
    mainTasks:[]
}

export const get = createAsyncThunk('task/get', async(_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.get(token);
    }catch(err){
        const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const post = createAsyncThunk('task/post', async(data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.post(data, token)
    }catch(err){
        const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const taskSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
        add: (state, action) => {
            state.tasks.push({id:state.id, task:action.payload})
            // state.tasks = [{id:state.id, task:action.payload},...state.tasks]
            state.id++;
        },
        del: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id)

        },
        reset: (state) => {
            state.tasks = [],
            state.id = 1,
            state.msg = '',
            state.loading = false,
            state.success = false,
            state.reject = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(get.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.mainTasks = action.payload
            })
            .addCase(get.rejected, (state, action) => {
                state.loading = false;
                state.reject = true;
                state.message = action.payload
            })
            .addCase(post.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(post.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.tasks = []
                state.mainTasks = [...state.mainTasks, ...action.payload]
            })
            .addCase(post.rejected, (state, action) => {
                state.loading = false;
                state.reject = true;
                state.msg = action.payload
            })
    }
})

// idk what i'm doing here....


export const {add, del, reset} = taskSlice.actions
export default taskSlice.reducer

