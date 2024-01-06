import logo from './logo.svg';
import {Navbar} from './components/Navbar'
import {Profile} from './components/Profile'
import {Restaurant} from './components/Restaurant'
import Cart from './components/Cart';
import RestaurantDetail from './components/RestaurantDetail';
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer1'
import  AddRestaurantMenu  from  './components/AddRestaurantMenu'
import { useSelector } from 'react-redux';
function App() {
  const user=useSelector(state=>state.user.userInfo)
  console.log('user is ',user)
  return (
    <BrowserRouter className="App">
     <Navbar/>
     <Footer/>
     {user==undefined || user?.userType==false &&
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/restaurant/:id' element={<RestaurantDetail/>} />
      <Route path='/addRestaurant' element={<Restaurant/>} />
      <Route path='/addMenu' element={<AddRestaurantMenu/>} />
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/cart' element={<Cart/>}/>
     </Routes>
}
     </BrowserRouter>
    
  );
}

export default App;
