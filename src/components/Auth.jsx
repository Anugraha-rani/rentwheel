
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import { googleLoginAPI, loginUserAPI, registerUserAPI } from '../services/allAPI';
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";



function Auth({insideRegister}) {
    const navigate = useNavigate()
    const [togglePasswordType,setTogglePasswordType] = useState(false)
    const getValidationSchema = (insideRegister) =>
  Yup.object({
    ...(insideRegister && {
      username: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Username is required"),
    }),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
  initialValues: {
    username: "",
    email: "",
    password: "",
  },
  validationSchema: getValidationSchema(insideRegister),
  onSubmit: (values,{resetForm}) => {
    if (insideRegister) {
      console.log( values);
      handleRegister(values)
    } else {
      console.log( values);
      handleLogin(values)
    }
    resetForm()
  },
});


  const handleRegister= async(userData)=>{
     
    const result = await registerUserAPI(userData);

    if (result.status === 201) {
      toast.success("Register successful... Please login!");
      
    }else {
    toast.error("User already exists...Please login!!!")
  }
    navigate("/login");

    
  }

  const handleLogin=async(userData)=>{
       const result = await loginUserAPI(userData)
       console.log(result)
       if(result.status==200){
        toast.success("Login successful!!!")
        sessionStorage.setItem("token",result.data.token)
         sessionStorage.setItem("user",JSON.stringify(result.data.user))
         if(result.data.user.role=="admin"){
          navigate('/admin')
         }else{
          navigate('/')
         }
       }else {
        toast.error("Invalid email/password")
       }
  }

const handleGooogleLogin=async(credentialResponse)=>{
console.log("Inside handleGoogleLogin")
console.log(credentialResponse);
const {email,name,picture} = jwtDecode(credentialResponse.credential)
console.log(email,name,picture)

const result = await googleLoginAPI({username:name,email,password:"googlePassword",picture})
if(result.status==200){
  toast.success("Login successful")
  sessionStorage.setItem("token",result.data.token)
  sessionStorage.setItem("user",JSON.stringify(result.data.user))
  setTimeout(()=>{
    if(result.data.user.role=="admin"){
      navigate('/admin') 
    }else{
       navigate('/')
    }
  },2500)
}

}

  

  return (
    <>
    
    <div className='w-full min-h-screen flex justify-center items-center '>
        <div className='p-10'>
        <div style={{width:'400px'}} className='p-5 bg-gray-100 flex justify-center items-center flex-col my-5'>
         <div style={{width:'80px',height:'80px',borderRadius:'50%'}} className='border mb-5 flex justify-center items-center'>
          <FaUser className='text-3xl'/>
         </div>
         <h1 className='text-2xl'>{insideRegister?"Register":"Login"}</h1>
          

           <form className='my-5 w-full' onSubmit={formik.handleSubmit}>
           {
            insideRegister&&
            <>
            <input type="text" name='username' value={formik.values.username} onChange={formik.handleChange} className='bg-white p-2 w-full rounded my-5 text-black ' placeholder='Username'/>
            { formik.errors.username && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.username}
        </p>
      )}
           </>
           }
           {/* email */}
         
           <input type="text" name='email' value={formik.values.email}  onChange={formik.handleChange}  placeholder='E Mail' className='bg-white p-2 w-full rounded my-5 text-black ' />
           
           { formik.errors.email && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.email}
        </p>
           )}
        
          
           {/* password */}
           <div className='flex items-center'>
           <input name='password' value={formik.values.password} onChange={formik.handleChange} type={togglePasswordType?"text":"password"} placeholder='Password' className='bg-white p-2 w-full rounded my-5 text-black ' />
           {togglePasswordType?
           <FaEyeSlash onClick={()=>setTogglePasswordType(!togglePasswordType)} className='text-gray-500 cursor-pointer' style={{marginTop:'-20p',marginLeft:'-30px'}}/>
           :
        <FaEye onClick={()=>setTogglePasswordType(!togglePasswordType)} className='text-gray-500 cursor-pointer' style={{marginTop:'-20p',marginLeft:'-30px'}}/>

        }
        </div>
         { formik.errors.password && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.password}
        </p>
         )}
        
        {/* fogot password */}
        <div className='flex justify-between mb-5'>
            <p className='text-xs text-orange-300'>* Never share your password with others.</p>
            {
                !insideRegister &&
                <button className='text-xs underline '>Forgot Password</button>
            }

        </div>
        {/* login/register btn */}
        <div className='text-center'>
   {
    insideRegister ?
    <button type='submit' className='bg-green-700 p-2 w-full rounded'>Register</button>
    :
    <button type='submit'  className='bg-green-700 p-2 w-full rounded'>Login</button>
   }
        </div>
        {/* google authentication */}
        {!insideRegister&&
        <div className='my-5 text-center'>
            <p>----------------or----------------</p>
            <div className='mt-2 flex justify-center items-center w-full'>
          <GoogleLogin
  onSuccess={credentialResponse => {
    handleGooogleLogin(credentialResponse)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
            </div>
        </div>
}
{/* new/already exist user */}
<div className='my-5 text-center'>
{
    insideRegister?
       <p className='text-blue-500'>Existing User? <Link to={'/login'} className='underline ms-5'>Login</Link></p>

    :
    <p className='text-blue-500'>New User? <Link to={'/register'} className='underline ms-5'>Register</Link></p>
}
</div>
           </form> 
        </div>

        </div>
        </div>
        {/* toast */}
        <Toaster position="top-center" />
      </>
  )
}

export default Auth