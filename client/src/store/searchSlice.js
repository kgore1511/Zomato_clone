import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
export const searchAll=createAsyncThunk('searchAll', async(temp) => {
     const searchKeys=temp.split(' ')
    const res=await axios.post('/search',{key:searchKeys})
    const data=res.data
    return data
})


const searchSlice =createSlice({
    name: 'searchSlice',
    initialState: {
        searchAllData :[],
        searchAllError: false,
        searchAllLoading:false
    },

    extraReducers:(builder)=> {
        builder.addCase(searchAll.pending, (state)=> {
              state.searchAllLoading=true
        });
        builder.addCase(searchAll.rejected,(state,action)=> {
             state.searchAllLoading=false;
             state.searchAllError=true;
        });
        builder.addCase(searchAll.fulfilled,(state,action) => {
             state.searchAllData=action.payload;
             state.searchAllLoading=false;
             state.searchAllError=false
        })

    }

   /* extraReducers :(builder)=> {
        builder.addCase(searchAll.pending, (state) => {
            state.searchAllLoading=true
        }),

        builder.addCase(searchAll.fulfilled, (state) => {
            state.searchAllLoading=true
        })

        
       
    }*/
})

export default searchSlice.reducer