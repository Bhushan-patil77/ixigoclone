import React, { useEffect, useState } from 'react'
import { CiCreditCard2 } from 'react-icons/ci'
import { DiVim } from 'react-icons/di'
import { FaCheck } from 'react-icons/fa6'
import { IoIosLock } from 'react-icons/io'
import { IoCardSharp } from 'react-icons/io5'
import { MdOutlineEmail } from 'react-icons/md'
import { RotatingLines } from 'react-loader-spinner'
import { Checkmark } from 'react-checkmark'
import ConfettiExplosion from 'react-confetti-explosion'
import { useLocation, useNavigate } from 'react-router-dom'


function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const ticketInfo = location.state;
  const [isPayBtnActivated, setIsPayBtnActivated]=useState(false)
  const [isPaymentSuccessfull, setIsPaymentSuccessfull]=useState('payment not done');
  const [animateCheck, setAnimateCheck]=useState(false)
  const [formShow, setFormShow]=useState(true);
  const [msgShow, setMsgShow]=useState(false)
  const [isExploding, setIsExploding] = useState(false);
  const [paymentFor, setPaymentFor]=useState(ticketInfo.paymentFor)
  const [bookingId, setBookingId]=useState()


 
  console.log(ticketInfo);
  
 
  


   
  const handleFormChange = () =>{

  const formFilds = document.getElementById('paymentForm').querySelectorAll('input[required]');

  const validate = (i) =>{
   const fildtype = i.attributes.fildtype.value;
    if(fildtype === 'email')
    {
       return i.value.includes('@gmail.com') ?  true :  false
    }
    if(fildtype === 'card number')
     {
       return i.value.length === 12 ?  true :  false
     }

     if(fildtype === 'card expiry')
    {
        return true
    }

    if(fildtype === 'card cvc')
    {
        return i.value.length === 3 ?  true :  false
    }
    
  }
  
  let arr = [];

  formFilds.forEach((input)=>{
     
        if(validate(input))
        {
            arr.push(true)
        }
        else
        {
            arr.push(false)
        }
  
  })


  if(arr.includes(false))
    {
      setIsPayBtnActivated(false)
      setIsPaymentSuccessfull('payment not done')
      setAnimateCheck(false)
    }
    else
    {
      setIsPayBtnActivated(true)
    }


  }

  const handleFormSubbmit = (e) =>{
     e.preventDefault();

     setIsPaymentSuccessfull('payment under process')
     
     const timer = setTimeout(()=>{
        setIsPaymentSuccessfull('payment done')

        setTimeout(() => {
            setAnimateCheck(true)
            saveToLocalStorage(ticketInfo);
        }, 200);

        setTimeout(() => {
            hide('paymentForm')
            show('conformationMessage')
            setAnimateCheck(false)
            setTimeout(()=>{
                setAnimateCheck(true)
                setIsExploding(true)

             setTimeout(()=>{
              navigate('/')
             },4000)

            },1000)
        }, 2000);

     },2000)
  }

  const hide = (id) =>{
    if(id==='paymentForm')
    {
        setFormShow(false)
    }

    if(id==='conformationMessage')
    {
        setMsgShow(false)
    }
  }

  const show = (id) =>{
   if(id==='paymentForm')
    {
        setFormShow(true)
    }

    if(id==='conformationMessage')
    {
        setMsgShow(true)
    }
    
  }



  const saveToLocalStorage = (obj) => {

    if (paymentFor === 'hotel') {
  
      if (localStorage.getItem('Hotel Stays')) 
      {
            let flighgtTicketNumber = 0;
            let hotelStays = JSON.parse(localStorage.getItem('Hotel Stays'));
            flighgtTicketNumber = Object.keys(hotelStays).length + 1;


            const isAlreadyBooked = () =>{
              let flag = false;
              const bookingid = ticketInfo.bookingId;
              Object.keys(hotelStays).map((stay)=>{
                  if(hotelStays[stay].bookingId===bookingid)
                    {
                      flag = true;
                    }
              })

              return flag;
            }
             
            console.log(isAlreadyBooked());

            if(isAlreadyBooked())
              {
                confirm('already booked')
                navigate('/')
              }
              else
              {
                hotelStays[`stay${flighgtTicketNumber}`] = obj;
                localStorage.setItem('Hotel Stays', JSON.stringify(hotelStays));
              }

      } 
      else
      {
            const stay0 = {'stay0': obj}
            localStorage.setItem('Hotel Stays' , JSON.stringify(stay0))
      }
  
    
    }

    if (paymentFor === 'flight') {
  
      if (localStorage.getItem('flight tickets')) 
      {
            let flightTicketNumber = 0;
            let flightTickets = JSON.parse(localStorage.getItem('flight tickets'));
            flightTicketNumber = Object.keys(flightTickets).length + 1;


            const isAlreadyBooked = () =>{
              let flag = false;
              const bookingid = ticketInfo.bookingId;
              Object.keys(flightTickets).map((ticket)=>{
                  if(flightTickets[ticket].bookingId===bookingid)
                    {
                      flag = true;
                    }
              })

              return flag;
            }
             
            console.log(isAlreadyBooked());

            if(isAlreadyBooked())
              {
                confirm('already booked')
                navigate('/')
              }
              else
              {
                flightTickets[`flightTicket${flightTicketNumber}`] = obj;
                localStorage.setItem('flight tickets', JSON.stringify(flightTickets));
              }

      } 
      else
      {
            const flightTicket0 = {'flightTicket0': obj}
            localStorage.setItem('flight tickets' , JSON.stringify(flightTicket0))
      }
  
    
    }

    if (paymentFor === 'bus') {
  
      if (localStorage.getItem('bus tickets')) 
      {
        let trainTickets = JSON.parse(localStorage.getItem('bus tickets'));
        let trainTicketNumber = Object.keys(trainTickets).length;


            const isAlreadyBooked = () =>{
              let flag = false;
              const bookingid = ticketInfo.bookingId;
              Object.keys(trainTickets).map((ticket)=>{
                  if(trainTickets[ticket].bookingId===bookingid)
                    {
                      flag = true;
                    }
              })

              return flag;
            }
             
            console.log(isAlreadyBooked());

            if(isAlreadyBooked())
              {
                alert('already booked')
                navigate('/')
              }
              else
              {
                trainTickets[`busTicket${trainTicketNumber}`] = obj;
                localStorage.setItem('bus tickets', JSON.stringify(trainTickets));
              }

      } 
      else
      {
            const busTicket0 = {'busTicket0': obj}
            localStorage.setItem('bus tickets' , JSON.stringify(busTicket0))
      }
  
    
    }

    if(paymentFor === 'train'){
      if (localStorage.getItem('train tickets')) 
        {
          let trainTickets = JSON.parse(localStorage.getItem('train tickets'));
          let trainTicketNumber = Object.keys(trainTickets).length;
  
  
              const isAlreadyBooked = () =>{
                let flag = false;
                const bookingid = ticketInfo.bookingId;
                Object.keys(trainTickets).map((ticket)=>{
                    if(trainTickets[ticket].bookingId===bookingid)
                      {
                        flag = true;
                      }
                })
  
                return flag;
              }
               
              console.log(isAlreadyBooked());
  
              if(isAlreadyBooked())
                {
                  alert('already booked')
                  navigate('/')
                }
                else
                {
                  trainTickets[`trainTicket${trainTicketNumber}`] = obj;
                  localStorage.setItem('train tickets', JSON.stringify(trainTickets));
                }
  
        } 
        else
        {
              const trainTicket0 = {'trainTicket0': obj}
              localStorage.setItem('train tickets' , JSON.stringify(trainTicket0))
        }
    }
  };

  return (
    <div className='bg-slate-200 w-screen h-screen flex justify-center items-center'>

{
      isExploding && <div>
                        <div className='absolute top-0 right-0'><ConfettiExplosion force={1} duration={3000} particleCount={100} width={1600} /></div>
                        <div className='absolute top-0 left-0'><ConfettiExplosion force={1} duration={3000} particleCount={100} width={1600} /></div>

                     </div>
    }

        <div id='conformationMessage' className={`bg-white w-screen h-screen absolute  justify-center items-center scale-0 transition-all duration-500 transform ${msgShow ? 'flex scale-100' : 'scale-0'}`}>
            
            <div className='flex flex-col items-center gap-4'>
                <span className={ `w-[70px] h-[70px] justify-center items-center `}> <p className={`${animateCheck ? 'flex' : 'hidden'}`}><Checkmark /></p> </span>
                <span className={` xl:text-xl tracking-wider font-semibold transition-all duration-500 delay-700 scale-0 ${msgShow ? 'scale-100':'scale-0'}`}>Congratulations</span>
                <span className={`xl:text-xl tracking-wider font-semibold transition-all duration-500 delay-1000 scale-0 ${msgShow ? 'scale-100':'scale-0'}`}>You Successfully Created Your Booking</span>
            </div>

        </div>


        <form id='paymentForm' className={`transition-all absolute duration-300 transform scale-0 ${formShow ? 'flex scale-100' : 'hidden scale-0'}`} onSubmit={(e)=>{handleFormSubbmit(e)}} onChange={()=>{handleFormChange()}}>
       <div className='paymentForm p-4 flex gap-4 justify-center flex-col w-[300px] bg-white rounded-10'>
        
           <span className=' flex gap-2 items-center  bg-gray-100 pl-2 py-1 rounded w-full'> <MdOutlineEmail /> <input className='w-full bg-gray-100 outline-none' type="email"  defaultValue={'Bhushan@gmail.com'}  fildtype={'email'} placeholder='Enter email' required/></span>
            
            <div className="cardDetails flex gap-1 flex-wrap justify-between">
                <span  className=' flex gap-2 items-center  bg-gray-100 pl-2 pr-2 py-1 rounded w-full'><IoCardSharp /><input className='w-full bg-gray-100 outline-none' type="number" defaultValue={121212121212} fildtype='card number' placeholder='Enter card number' required /></span>
                 <span  className=' flex gap-1 items-center  bg-gray-100 pl-2 pr-2 py-1 w-[48%] rounded'> <input className='w-full text-xs bg-gray-100 outline-none'  type="date" defaultValue={12/11/2025} fildtype='card expiry' placeholder='Expiry' required /></span>
                <span  className=' flex gap-1 items-center  bg-gray-100 pl-2 pr-2 py-1 w-[48%] rounded'><input className='bg-gray-100 w-full outline-none' type="number" defaultValue={313} fildtype='card cvc' placeholder='CVC' required/><IoIosLock /></span>
            </div>

            <span className='flex gap-2'><input id='rememberCard' type="checkbox" /><label htmlFor="rememberCard">Remember me</label></span>

            <button disabled={!isPayBtnActivated} className={` flex justify-center items-center h-[40px] bg rounded-md font-extrabold ${isPayBtnActivated ? 'bg-green-300 text-white ': 'bg-gray-100 text-gray-300 cursor-not-allowed border'}`}>{isPaymentSuccessfull==='payment not done' && 'Pay'} {isPaymentSuccessfull==='payment under process' && <div className=''><RotatingLines width='30'/></div>} {isPaymentSuccessfull === 'payment done' && <div className={`text-2xl transition-all duration-500 transform ${animateCheck ? 'scale-125 opacity-100 ':'opacity-0'}`}><FaCheck /></div>}</button>

       </div>
        </form>

    </div>
  )
}

export default Payment