
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Lists from './pages/Lists'
import CarDetails from './pages/CarDetails'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import MyBooking from './pages/MyBooking'
import Footer from './components/Footer'
import Auth from './components/Auth'
import AdminDashboard from './pages/AdminDashboard'
import Profile from './pages/Profile'
import AddCar from './pages/AddCar'
import ListCar from './pages/ListCar'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentFail from './components/paymentFail'
import Payment from './pages/Payment'





function App() {
  

  return (
    <>
    
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path='/lists' element={<Lists/>}/>
          <Route path='/details/:id' element={<CarDetails/>}/>
           <Route path='/contact' element={<Contact/>}/>
            <Route path='/blog' element={<Blog/>}/>
             <Route path='/bookings' element={<MyBooking/>}/>
             <Route path='/login' element={<Auth/>}/>
             <Route path='/register' element={<Auth insideRegister/>}/>
             <Route path='/admin' element={<AdminDashboard/>}/>
            <Route path='/profile/:id' element={<Profile/>}/>

            <Route path='/addcar' element={<AddCar/>}/>
            <Route path='/listcar' element={<ListCar/>}/>
            <Route path='/success' element={<PaymentSuccess/>}/>
            <Route path='/fail' element={<PaymentFail/>}/>
            <Route path='/payment' element={<Payment/>}/>






      </Routes>
      <Footer/>
    </>
  )
}

export default App
