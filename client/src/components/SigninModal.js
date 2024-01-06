
  import react, { useRef,useState } from 'react';
  import Box from '@mui/material/Box';
  import Button from '@mui/material/Button';
  import Typography from '@mui/material/Typography';
  import TextField from '@mui/material/TextField';
  import Modal from '@mui/material/Modal';
  import { signinUser } from '../store/userSlice';
  import { useDispatch } from 'react-redux';
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
  
  export default function SigninModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
  
    const dispatch=useDispatch()
    const submit=()=> {
     dispatch(signinUser({email,password}))
    }
  
    return (
      <div>
        <Button onClick={handleOpen}>SignIn</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Sign In
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 7 }}>
              {password}
             <div><TextField type='email' id="email" label="Email" className='fields' onChange={(e)=>setEmail(e.target.value)} variant="outlined" /></div>
             <div><TextField type='password' label='Password' className='fields' onChange={(e)=>setPassword(e.target.value)} variant="outlined" /></div>
             <div><Button className='signup_button' onClick={()=>submit()} style={{backgroundColor:'gray',color:'white'}}>Sign In</Button></div>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
  
