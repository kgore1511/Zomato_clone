import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {useCookies } from "react-cookie";

export const addRestaurant=createAsyncThunk("addRestaurant",async(temp) => {
    const res= await axios.post('/api/restaurant/addRestaurant',{...temp});

    const data=await res.data;
    return data;
})

export const addMenu=createAsyncThunk("addMenu",async(temp) => {
    const res= await axios.post('/api/restaurant/addMenu',{...temp});

    const data=await res.data;
    return data;
})

export const getDeliveryRestaurants=createAsyncThunk("getDeliveryRestaurants",async(category) => {
    const res= await axios.get('/api/restaurant/getAllRestaurants');        

    const data=await res.data;
    return data;
})

export const getRestaurantDetail=createAsyncThunk("getRestaurantDetail",async(productId) => {
    console.log("Hurr")
    const res= await axios.get('/api/restaurant/detail/'+productId);

    const data=await res.data;
    return data;
})

const restaurantSlice=createSlice({
    name:"restaurant",
    initialState:{
        restaurantMessage: "",
        isLoading: false,
        isError: false,
        deliveryRestaurantisLoading: false,
        deliveryRestaurantisError: false,
        deliveryRestaurantData: [],
        restaurantDetailisLoading:false,
        restaurantDetailisError:false,
        restaurantDetailData: {},
        restaurantMenu:[],
        addMenuLoading:false,
        addMenuError: false,
        addMenuMessage:"",
        cartItem: JSON.parse(localStorage.getItem("cartInfo")) || []
    },

    reducers: {
        addToCart: (state, action) => {
            localStorage.removeItem('cartInfo')
            const newItem=action.payload;
            const isItemInCart=state.cartItem.find((item)=> item._id == newItem._id)
            if(isItemInCart) {
                
                
                state.cartItem=state.cartItem.map((item)=> 
                
                    item._id==newItem._id ? 
                    {...item,qty: item.qty+1}:
                    item
                )
            
            localStorage.setItem("cartInfo",JSON.stringify(state.cartItem))
               
            }
            else {
            state.cartItem=[...state.cartItem,action.payload]
            localStorage.setItem("cartInfo",JSON.stringify(state.cartItem))
            }
        },
        removeFromCart: (state, action) => {
            state.cartItem = state.cartItem.filter((item,index)=>
                item._id!=action.payload
            )
        },
    

        decrementFromCart: (state, action) => {
        state.cartItem = state.cartItem.map((item,index)=> 
            item._id==action.payload ?{...item,qty:item.qty-1} :{...item}
        
        )
    }

},

   
    extraReducers:(builder)=> {
        builder.addCase(addRestaurant.pending, (state)=> {
            state.isLoading=true
        });
        builder.addCase(addRestaurant.rejected,(state,action)=> {
            state.isLoading=false;
            state.isError=true;
        });
        builder.addCase(addRestaurant.fulfilled,(state,action) => {
            state.restaurantInfo=action.payload;
            state.isLoading=false;
        })

        builder.addCase(getDeliveryRestaurants.pending, (state)=> {
            state.deliveryRestaurantisLoading=true;
        })
        builder.addCase(getDeliveryRestaurants.rejected, (state,action) => {
            state.deliveryRestaurantisError=true;
            state.deliveryRestaurantisLoading=false;
        })
        builder.addCase(getDeliveryRestaurants.fulfilled, (state,action) => {
            state.deliveryRestaurantData=action.payload
            state.deliveryRestaurantisLoading=false
        })

        builder.addCase(getRestaurantDetail.pending,(state)=> {
            console.log("loading")
            state.restaurantDetailisLoading=true
        })
        builder.addCase(getRestaurantDetail.rejected,(state,action)=> {
            state.restaurantDetailisError=true;
            state.restaurantDetailisLoading=false;
        })
        builder.addCase(getRestaurantDetail.fulfilled,(state,action)=> {
            state.restaurantDetailData=action.payload.detail
            state.restaurantMenu=action.payload.menu
            state.restaurantDetailisLoading=false
            state.restaurantDetailisError=false
        })

        builder.addCase(addMenu.pending,(state)=> {
            state.addMenuLoading=true;
        })
        builder.addCase(addMenu.rejected,(state,action)=> {
            state.addMenuError=true;
        })
        builder.addCase(addMenu.fulfilled,(state,action)=> {
            state.addMenuMessage=action.payload
            state.addMenuError=false
            state.addMenuLoading=false
        })
    }
})
export const {addToCart, removeFromCart, decrementFromCart} = restaurantSlice.actions

export default restaurantSlice.reducer