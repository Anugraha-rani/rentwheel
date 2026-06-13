 import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaUserCircle, FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { userEditAPI } from "../services/allAPI";


function Profile({ show, setShow,user }) {
  const navigate = useNavigate()
  const[passwordMatch,setPasswordMatch] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   
    
const [showUpdateProfile, setShowUpdateProfile] = useState(false)
    const[dp,setDp] = useState("")
        const[username,setUsername] = useState("")
        const [userDetails,setUserDeatils] = useState({
            username:"",password:"",cPassword:"",picture:"",role:"",id:"",
        })
        const [preview,setPreview] = useState("")
            const[imageFileType,setImageFileType] = useState(false)

            const [existingPicture,setExistingPicture] = useState("")
    

    
    // console.log(userDetails)
    // console.log(existingPicture)



    useEffect(()=>{
            if(sessionStorage.getItem("user")){
            const user = JSON.parse(sessionStorage.getItem("user"))
    setUserDeatils({...userDetails,username:user.username,role:user.role,id:user._id, })
      setExistingPicture(user?.picture)}},[])
    
              useEffect(()=>{
                  if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
                    const user = JSON.parse(sessionStorage.getItem("user"))
                    setDp(user?.picture)
                            setUsername(user?.username)
                        }
                    },[])
                    
const checkPasswordMatch = (data)=>{
  setUserDeatils({...userDetails,cPassword:data})
  userDetails.password==data?setPasswordMatch(true):setPasswordMatch(false)
}

                    const handleFileUpload=(e)=>{
                      console.log(e.target.files[0])
                      const imageFile = e.target.files[0]
                      if(imageFile.type.startsWith("image/")){
                    setUserDeatils({...userDetails,picture:e.target.files[0]})
                     const url = URL.createObjectURL(e.target.files[0])
                      setPreview(url)
                      setImageFileType(true)
                      }else{
                        setImageFileType(false)
                      }
                      
                    }
                    const handleUserUpdate=async()=>{
      const{username,picture,role,id}=userDetails
      if(!username){
         toast.error("Please fill the form completely")
      }else{
       const reqBody = new FormData()
       for(let key in userDetails){
        if(key != 'picture'){
          reqBody.append(key,userDetails[key])
        }else{
          preview?reqBody.append("picture",picture):reqBody.append("picture",existingPicture)
        }
       }
      //  api call
      const result = await userEditAPI(id,reqBody)
      console.log(result)
      if(result.status==200){
        toast.success("User profile updated successfully")
        setTimeout(()=>{
          sessionStorage.clear()
          navigate('/login')
        },2500)
    
      }
      }
    }
    
   
   
  
const modalRef = useRef();





if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white w-[95%] max-w-[750px] rounded-xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold">Account</h2>

          <button
            onClick={() => setShow(false)}
            className="text-gray-500 hover:text-black"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-[220px] border-b md:border-b-0 md:border-r bg-gray-50 md:min-h-[450px] p-4">
            <p className="text-sm text-gray-500 mb-4">
              Manage your account info.
            </p>

            <div className="space-y-2">
              <button className="flex items-center gap-2 w-full bg-gray-200 px-3 py-2 rounded-lg text-sm font-medium">
                <FaUserCircle />
                Profile
              </button>

              <button className="flex items-center gap-2 w-full hover:bg-gray-100 px-3 py-2 rounded-lg text-sm">
                <FaShieldAlt />
                Security
              </button>
              </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4 sm:mb-6">
              Profile details
            </h3>

            {/* Profile */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-5">
              <div className="flex items-center gap-4">
                <img width={'40px'} height={'40px'}
                  src={dp==""?"https://as1.ftcdn.net/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg":dp.startsWith("https://lh3.googleusercontent.com")?dp:`${axiosInstance.defaults.baseURL}/uploads/${dp}`}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <p className="font-medium">{user?.username}</p>
                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
  onClick={() => setShowUpdateProfile(true)}
  className="text-sm font-medium text-blue-600 hover:underline"
>
  Update profile
</button>
            </div>
<div className="py-5 border-b">
              <p className="font-medium mb-2">Email address</p>

              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-sm">
                  {user?.email}
                </p>

                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  Primary
                </span>
              </div>

              <button className="mt-4 text-sm font-medium text-blue-600">
                + Add email address
              </button>
            </div>
             
          </div>
        </div>
         </div>


         {/* Update Profile Modal */}
{showUpdateProfile && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white w-[95%] max-w-md rounded-2xl p-6 shadow-xl">
      
      {/* Title */}
      <h2 className="text-lg font-semibold mb-5">
        Update profile
      </h2>

      {/* Upload Section */}
      <div className="flex items-center gap-4 mb-6">
        <label className="cursor-pointer text-sm font-medium text-blue-600 hover:underline" htmlFor="profile">
        <input type="file" hidden id="profile"/>

        {
                      existingPicture==""?
                    <img className="border border-gray-300 z-52"style={{width:'100px', height:'100px',borderRadius:'50%'}} src={preview?preview:"https://www.pngmart.com/files/23/Profile-PNG-Photo.png"} alt="" />
                      : 
                      existingPicture.startsWith("https://lh3.googleusercontent.com")?
                      <img className="border border-gray-300 z-52"style={{width:'100px', height:'100px',borderRadius:'50%'}} src={preview?preview:existingPicture} alt="" />
                      :
                      <img className="border border-gray-300 z-52"style={{width:'100px', height:'100px',borderRadius:'50%'}} src={preview?preview:`${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`} alt="" />
                    }
                    </label>
        
        {/* Avatar */}
        {/* <img
                  src={
                    dp ||
                    "https://as1.ftcdn.net/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                  }
                  alt=""
                  className="w-16 h-16 rounded-full object-cover"
                /> */}

        <div>
          <label className="cursor-pointer text-blue-600">
          Upload
  <input type="file" hidden onChange={handleFileUpload}/>
</label>
<p className="text-xs text-gray-400 mt-1">
            Recommended size 1:1, up to 10MB.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        
        <div className="sm:col-span-2 mb-2">
                <label className="text-sm text-gray-600">
                  Username
                </label>

                <input
                  type="text"
                  value={userDetails.username}
                  onChange={(e) => setUserDeatils({...userDetails,username:e.target.value})}
                  className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Enter username"
                />
  

<div className="relative">
  <label className="text-sm text-gray-600">Password</label>

  <input
    type={showPassword ? "text" : "password"}
    value={userDetails.password}
    onChange={(e) =>
      setUserDeatils({ ...userDetails, password: e.target.value })
    }
    className="w-full mt-1 border rounded-lg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-gray-300"
    placeholder="Enter password"
  />

  <span
    className="absolute right-3 top-9 cursor-pointer text-gray-500"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>
                

<div className="relative mt-4">
  <label className="text-sm text-gray-600">Confirm Password</label>

  <input
    type={showConfirmPassword ? "text" : "password"}
    value={userDetails.cPassword}
    onChange={(e) => checkPasswordMatch(e.target.value)}
    className="w-full mt-1 border rounded-lg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-gray-300"
    placeholder="Confirm password"
  />

  <span
    className="absolute right-3 top-9 cursor-pointer text-gray-500"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </span>

 
  {/* {!passwordMatch && userDetails.cPassword && (
    <p className="text-red-500 text-xs mt-1">
      Passwords do not match
    </p>
  )} */}
</div>
              </div>

        
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowUpdateProfile(false)}
          className="px-4 py-2 text-sm rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button  onClick={handleUserUpdate} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-gray-400">
          Save
        </button>
      </div>
    </div>
  </div>
)}
 <Toaster position="top-center" />
    </div>
   
  )

}

export default Profile;