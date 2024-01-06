import './Navbar.css'
import Zomato_logo from '../img/Zomato_logo.png'
import location_logo from '../img/location_logo.png'
import search_logo from '../img/search_logo.png'
import Modal from './Modal'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDetectClickOutside } from 'react-detect-click-outside';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SigninModal from './SigninModal'
import  {searchAll}  from '../store/searchSlice'
import { logoutUser } from '../store/userSlice'
export const Navbar=() => {
    const {searchAllLoading,searchAllData,searchAllError} = useSelector(state=> state.search)
    const [searchDropdownVisibility,setSearchDropdownVisibility]=useState(false)
    const [setModalState,modalState] = useState(false)
    const dispatch=useDispatch()

    const logout=()=> {
        dispatch(logoutUser())
    }

    const change= (e)=> {
       const key=e.target.value
        dispatch(searchAll(key))
        if(key.length>0) setSearchDropdownVisibility(true)
        else setSearchDropdownVisibility(false)
    }

    const openModal=()=> {
        setModalState(true);
    }

    const closeDropdown=()=> {
        setSearchDropdownVisibility(false)
    }
    const ref = useDetectClickOutside({ onTriggered: closeDropdown });
   

    const {signinUserLoading,signinUserError,userInfo}=useSelector(state=>state.user)


    return (
        <div>
            {
                signinUserLoading?<div>Loading...</div>:
                signinUserError?<div>Some error occur try after some time</div>:
       userInfo&&<div className='Navbar'>

      
        
       <Link to='/'> <img className='logo' src={Zomato_logo}></img></Link>
      
        <div className='container'>
        <img className='location_logo' src={location_logo}></img>
            <select className='location' name='location'>
                <option value='Ujjain'>Ujjain</option>
                <option value='Indore'>Indore</option>
                <option value='Dewas'>Dewas</option>
                <option value='Bhopal'>Bhopal</option>
                <option value='Gwalior'>Gwalior</option>
            </select>
            <img className='search_logo' src={search_logo} />
            
           <input className='searchBar' placeholder='Search...' onChange={(e)=> change(e)} type='text' />

           {searchDropdownVisibility && <div className='search_dropdown' id='search_dropdown' ref={ref}>
        {searchAllLoading ? <div>loading...</div>:
        searchAllError? <div>Something went wrong try after sometime...</div>:
        searchAllData.length==0? <div>No results found</div>:
            searchAllData.map(item => 
                <div>
    {item.name?<div className='dropdown_list'>
        <img className='search_image' src={item.image} />{item.name}</div> :
    <div className='dropdown_list'>
        <img className='search_image' src={item.image} />{item.item_name}</div>}
    </div>
    )
}</div>
}
            
        </div>
            
       
        { userInfo.accessToken
        ? <AccountCircleIcon/>:
        <div className='links'>
            <div className='link' ><Modal/></div>
            <div className='link'><SigninModal/></div>
            
        </div>
}
<Link to='/cart'><ProductionQuantityLimitsIcon/></Link>
        </div>
}

<button onClick={()=>logout()}>Logout</button>
        </div>
    )
}