import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { json, useNavigate } from 'react-router-dom';

function Signup({setisloggedin,setpopupshow}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [data, setData] = useState({});

  const navigate = useNavigate();
  const projectId = '8bropwptza4g';
  const baseUrl = 'https://academics.newtonschool.co/api/v1/bookingportals/signup';



  const handleSignup = async () => {

    if (name && email && pass) {
      try {
        var response = await fetch(baseUrl, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            projectID: projectId
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: pass,
            appType: 'bookingportals',
          }),
        })

        response = await response.json();
        console.log(response);


        if (response.status === "success") {
          localStorage.setItem("user", JSON.stringify(response.data.user))
          localStorage.setItem("token", response.token)
          setisloggedin(true)
          setpopupshow('')
        }

        if (response.status === "fail") {
          alert(response.message)
        }
      } catch (error) {
        console.log("something went wrong...!");
      }


    }
    else {
      alert("Enter all filds...")
    }




  }

  return (
    <div className="SIGNUP main fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center z-50">

       <div className='relative shadow-300 bg-slate-700 w-[700px] py-16  rounded-2xl flex flex-col justify-center items-center gap-4'>
          <div className=' absolute top-4 right-4  w-6 h-6 font-extrabold text-white cursor-pointer' onClick={()=>{setpopupshow("")}}><IoClose className='w-full h-full'/></div>
          <input className='w-[50%] h-[30px] px-2 outline-none rounded bg-transparent text-white border-b-[1px]' type="text" placeholder='Enter name' value={name} onChange={(e) => { setName(e.target.value) }} />
          <input className='w-[50%] h-[30px] px-2 outline-none rounded bg-transparent text-white border-b-[1px]'  type="text" placeholder='Enter Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <input className='w-[50%] h-[30px] px-2 outline-none rounded bg-transparent text-white border-b-[1px]'  type="text" placeholder='Enter password' value={pass} onChange={(e) => { setPass(e.target.value) }} />

          <div className='BUTTONS flex justify-between items-center gap-6 mt-12 w-[50%] text-white'>
            <button className='shadow   p-[7px] rounded-lg' onClick={handleSignup}>Signup</button>
            <button className='shadow   p-[7px] rounded-lg' onClick={() => { setpopupshow('signinShow') }}>Sign In Insted</button>
          </div>

       </div>
    </div>
  )
}

export default Signup