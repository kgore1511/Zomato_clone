import react, { useRef,useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { signupUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import './signup.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name,setName]=useState("");
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("");
  const [email,setEmail]=useState("")
  const [mobile,setMobile]=useState("")

  const dispatch=useDispatch()
  
  const submit=()=> {
    let userType=document.getElementById('userType').checked
   dispatch(signupUser({email,password,name,mobile,userType}))
   handleClose()
  }

  const user=useSelector(state=>state.user)

  console.log(user)

  return (
    <div>
      <Button onClick={handleOpen}>Signup</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Sign up
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 7 }}>
           <div ><TextField type='text' className='fields' onChange={(e)=>setName(e.target.value)} label="Full Name" variant="outlined" /></div>
           <div><TextField type='email' id="email" label="Email" className='fields' onChange={(e)=>setEmail(e.target.value)} variant="outlined" /></div>
           <div><TextField type='tel' label='Mobile Number' className='fields' onChange={(e)=>setMobile(e.target.value)} variant="outlined" /></div>
           <div><TextField type='password' label='Password' className='fields' onChange={(e)=>setPassword(e.target.value)} variant="outlined" /></div>
           <div><TextField type='password' label='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} className='fields' variant="outlined" /></div>
           <div><input id= 'userType' value='true' type='checkbox'/ > click only if you want to register as a bussines partner (Register your restaurant)</div>
           <div><Button className='signup_button' onClick={()=>submit()} style={{backgroundColor:'gray',color:'white'}}>Create Account</Button></div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
