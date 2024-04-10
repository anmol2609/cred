import {current,createAction,createAsyncThunk, createSlice,buildCreateSlice, asyncThunkCreator} from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type';
import axios, {isCancel, AxiosError} from 'axios';
export const getAllUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('http://localhost:4000/api/get-all-user')
    return response.data
  })
  export const addUser = createAsyncThunk('users/addUser', async (data) => {
    const response = await axios.post('http://localhost:4000/api/registration',data)
    return response.data
  })
export const userSlice =createSlice({
    name:'user',
    initialState :{
        users:[],
        isLoading:true,
        error:null
    },
    reducers:{
        deleteUser(state, action){
            var data = [...current(state).users]
             function  delArrObjbyProperty(arry,val){
                console.log(arry,val)
                for(var  i=0;i<arry.length;i++){
                    if(arry[i]["_id"] === val ){
                        arry.splice(i,1)
                    }
                }
                return arry
            }
            var newData =  delArrObjbyProperty(data,action.payload)
            state.users = [...newData]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state,action) => {

             state.isLoading = true
          })
          builder.addCase(getAllUsers.fulfilled, (state, action) => {
            
           state.isLoading= false
           state.users = action.payload
          })
          builder.addCase(addUser.fulfilled, (state, action) => {
            state.users.push(action.payload)
           })
      }
    
})
export const {deleteUser} = userSlice.actions;

export default userSlice.reducer;
