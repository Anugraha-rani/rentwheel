import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logos.png'
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { FaGear } from 'react-icons/fa6';
import Profile from '../pages/Profile';
import axiosInstance from '../api/axiosInstance';
import MyBooking from '../pages/MyBooking';
import { FaCar } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";




function Header() {
  const navigate = useNavigate()
  const[token,setToken] = useState("")
  const [dp,setDp] = useState("")
  const[userId,setUserId] = useState("")
  const[dropDown,setDropDown] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const[username,setUsername] = useState("")
  const [searchText, setSearchText] = useState("");
 
  const [menuOpened,setMenuOpened] = useState()
  const[active,setActive] = useState(false)
  const[search,setSearch] = useState(false)
  const location =useLocation()
  const isHomePage = location.pathname.endsWith('/')
  const [role, setRole] = useState("")
  
  

  const vehSearch=()=>{
    setSearch(!search)
  }

  const navLinkClass = (path) =>
    `text-lg font-bold ${
      location.pathname === path
        ? "underline underline-offset-7 decoration-4 decoration-blue-700"
        : ""
    }`;

    useEffect(()=>{
       if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
        const userToken = sessionStorage.getItem("token")
        const user = JSON.parse(sessionStorage.getItem("user"))
        setToken(userToken)
        setDp(user.picture)
        setUserId(user._id)
        setUsername(user.username)
        setRole(user.role)
       }
    },[token])

const handleLogout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  setToken("");
  setDp("");
  setUserId("");
  setUsername("");
  setRole("");

  setDropDown(false);
  toast.success("Successfully logged out")
  navigate("/")
}



  return (
    <>
    <section className=' px-1 shadow-lg'>
      <div>
<div className='flex items-center justify-center flex-between px-10'>
  {/* logo */}
  <div className='flex flex-1'>
    <Link to={'/'}>
    <img width={'70px'} height={'70px'} src={logo} alt="logo" />
    </Link>
  </div>
  {/* navlinks */}
  <div className='hidden lg:flex gap-4 items-center '>
    <Link className={`${navLinkClass("/")} text-lg font-bold  `}   to={'/'}>Home</Link>
    <Link className={`${navLinkClass("/lists")} text-lg font-bold  `}   to={'/lists'}>Lists</Link>
    <Link className={`${navLinkClass("/blog")} text-lg font-bold  `}  to={'/blog'}>Blog</Link>
    <Link className={`${navLinkClass("/contact")} text-lg font-bold  `} to={'/contact'}>Contact</Link>
  </div>

  {role === "admin" && (
    <Link
      className={`${navLinkClass("/dashboard")} text-lg font-bold ms-3`}
      to='/admin'
    >
      Dashboard
    </Link>
  )}

  <div className='flex sm:flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8'>
    
    {location.pathname==='/lists' && (
    <div className='relative hidden xl:flex items-center' >
    <div className={`transition-all duration-300 ease-in-out ring-1 ring-slate-900/10 bg-white rounded-full overflow-hidden ${
      search ? "w-[266px] opacity-100 px-4 py-2":
      "w-11 opacity-0 px-0 py-0"
    }`}>
      <input value={searchText}
  onChange={(e) => {
    setSearchText(e.target.value);

    navigate("/lists", {
      state: { search: e.target.value }
    });
  }} className='w-full  text-sm outline-none pr-10 placeholder:text-gray-400' type="text" placeholder='Type here...' />
    </div>
    <div className='absolute right-0 ring-1 ring-slate-900/10 bg-white p-[8px] rounded-full cursor-pointer z-10  '>
      <button className='' onClick={vehSearch}><FaSearch /></button>
    </div>
    
    </div>
    )}
    

     


{/* login link */}
{!token ?

    <Link to={'/login'} className='bg-black p-2 text-white rounded-md'>Login</Link>
    :
    <div>
      {/* profile icon */}

      <button onClick={()=>setDropDown(!dropDown)} className='shadow-sm rounded-full ms-5 p-1 hover:bg-gray-100'>
        <img width={'40px'} height={'40px'} style={{borderRadius:'50%' }} src={dp==""?"https://as1.ftcdn.net/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg":dp.startsWith("https://lh3.googleusercontent.com")?dp:`${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="" />
      </button>

      {/* dropdown menu */}
      { dropDown&&
      <div className='bg-white absolute right-0 z-10 mt-2 w-40 shadow rounded ring-1 ring-black/5 p-2 focus:outline-hidden'>
{/* profile link */}
<button
  onClick={() => {
    setShowAccountModal(true)
    setDropDown(false)
  }}
  className='flex items-center text-gray-600 text-sm px-1 py-2 w-full'
>
  <FaGear className='me-1' />
  Manage Account
</button>
{/* my bookings */}
<Link to='/bookings' className='flex items-center text-gray-600 text-sm px-1 py-2 w-full'><FaCar  className='me-1'/>My Bookings</Link>
{/* logout button */}
<button onClick={handleLogout} className='flex items-center  text-gray-600 text-sm px-1 py-2'><FaPowerOff className='me-1'/>Logout</button>
      </div>
}

    </div>
  
}

 



    {/* toggle menu */}

    <button onClick={()=>setMenuOpened(!menuOpened)} className='lg:hidden cursor-pointer text-xl'>
      {menuOpened?
      <IoClose />:<IoMenu />}</button>

{/* nav links */}
    
    <div className={`${menuOpened?"flex":"hidden"} flex-col top-20 shadow-md absolute p-4 gap-4 lg:hidden z-50 py-6 bg-white`}>
    <Link  className='font-bold text-lg ' to={'/'}>Home</Link>
    <Link   className=' text-lg font-bold  ' to={'/lists'}>Lists</Link>
    <Link   className=' text-lg font-bold  ' to={'/blog'}>Blog</Link>
    <Link   className=' text-lg font-bold  ' to={'/contact'}>Contact</Link>
  </div>
    
  </div>
</div>
      </div>
      <Profile
  show={showAccountModal}
  setShow={setShowAccountModal}
  dp={dp}
  user={JSON.parse(sessionStorage.getItem("user"))}
/>
    </section>
    <Toaster position="top-center" />
    </>
  )
}

export default Header