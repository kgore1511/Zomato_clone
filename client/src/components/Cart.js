import {useSelector} from 'react-redux'
import * as React from 'react';
import {useNavigate} from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import './Cart.css'
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  
    const cartItems=useSelector(state=> state.restaurant.cartItem)
    let totalItems=cartItems.reduce((prev,curr)=>prev+curr.qty,0)
    let totalBill=cartItems.reduce((prev,curr)=>prev+((curr.qty)*(curr.price)),0)
    const redirect=useNavigate()
    const viewItem = (id)=> {
      redirect('/restaurant/'+id)
    }

    const makePayment = async()=>{
      const stripe = await loadStripe('pk_test_51OLKRPSIsh9qapnRU2gOWO5ErRdrHdjHwz3IkKfSkyhTm045WwNkE4e020FsxZMUiphkKAZx1XbEDoi1pAZhH6dv00BhZWB4hr');

      const headers = {
          "Content-Type":"application/json"
      }
      const response = await axios.post("/api/create-checkout-session",{cartItems:cartItems});

      const session = await response.data;
      const result = stripe.redirectToCheckout({
          sessionId:session.id
      });
      
      if(result.error){
          console.log(result.error);
      }
  }

  return (
    <>
    <TableContainer component={Paper}>
    <Table sx={{ maxWidth: '60%' }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Sr no.</TableCell>
          <TableCell align="right">Image</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Qty</TableCell>
          <TableCell align="right">Price (&#8377;)</TableCell>
          <TableCell align="right">Total (&#8377;)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cartItems.map((item,index) => (
          <TableRow 
            key={item._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              
            <TableCell>{index+1}</TableCell>
            <TableCell align="right"><img onClick= {()=>viewItem(item.restaurant_id)} className='cart-image' src={item.image} /></TableCell>
            <TableCell align="right">{item.item_name}</TableCell>
            <TableCell align="right"><RemoveRoundedIcon />&nbsp;  {item.qty}</TableCell>
            <TableCell align="right">&#8377;{item.price}</TableCell>
            <TableCell align="right">&#8377;{item.qty*item.price}</TableCell>
           
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <div className='bill_container'>
   <div className='bill_body'> <h2>Total</h2>
   <div><button onClick={()=>makePayment()}>click to pay</button></div>
   <div className='price'>Subtotal ({totalItems} items):  &#8377;{totalBill}</div>
   </div>
  
  </div></>

  )
}

export default Cart