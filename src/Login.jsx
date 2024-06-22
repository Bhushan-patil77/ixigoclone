import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Login({setisloggedin,setpopupshow}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const projectId = '8bropwptza4g';
  const baseUrl = 'https://academics.newtonschool.co/api/v1/bookingportals/login';

  const setloginStatus = () =>{
    setisloggedin(true)
    setpopupshow('')
  }

  const handleLogin = async () => {
    try {

          var response = await fetch(baseUrl, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              projectID: projectId
            },
            body: JSON.stringify({
              email: email,
              password: pass,
              appType: 'bookingportals',
            }),
          })

          response = await response.json();

         if (response.status === "success")
         {
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("token", response.token)
            setloginStatus();
          }

          if (response.status === "fail") {
            alert(response.message)
          }

    }
    catch (error) 
    {

          console.log(error.message);

    }

  }
  return (
    <div className="LOGIN main fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center z-50">

      <div className='relative shadow-300 bg-slate-700 w-[700px] py-16 rounded-2xl flex flex-col justify-center items-center gap-4'>
      <div className=' absolute top-4 right-4  w-6 h-6 font-extrabold text-white cursor-pointer' onClick={()=>{setpopupshow(false)}}><IoClose className='w-full h-full'/></div>
      <input className='w-[50%] h-[30px] px-2 outline-none rounded bg-transparent text-white border-b-[1px]' type="email" placeholder='Enter email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
      <input className='w-[50%] h-[30px] px-2 outline-none rounded bg-transparent text-white border-b-[1px]' type="text" placeholder='Enter password' value={pass} onChange={(e) => { setPass(e.target.value) }} />

      <div className='BUTTONS flex justify-between items-center gap-6  mt-12 w-[50%] text-white'>
        <button className='shadow   p-[7px] rounded-lg' onClick={handleLogin}>Login</button>
        <button className='shadow   p-[7px] rounded-lg' onClick={() => {setpopupshow('signupShow') }}>Signup Insted</button>
      </div>

    </div>
  </div>
  )
}

export default Login