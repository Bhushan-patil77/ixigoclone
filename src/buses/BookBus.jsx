import React, { useEffect, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoIosArrowUp } from 'react-icons/io'
import { MdEmail } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

const BookBus = React.memo(() => {

  const navigate = useNavigate();
  const location = useLocation();
  const selection = location.state;
  // const [selection, setSelection]=useState(location.state)
  const[busDetails, setBusDetials]=useState();
  const [travellers, setTravellers]=useState({})
  const [continueBtnActive, setContinueBtnActive]=useState(false)

  
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const date = new Date(selection.travelInfo.date)





  useEffect(() => {
    getBusDetails();
  }, [])



  const generateBookingId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let bookingId = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      bookingId += characters[randomIndex];
    }
    return bookingId;
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    let passanger = 0;
    let newTravellers = {};
  
    selection.seats.forEach((seat) => {
      const name = e.target[passanger++].value;
      const age = e.target[passanger++].value;
      const gender = e.target[passanger++].value;
      const seatObj = { name, age, gender };
      newTravellers[seat] = seatObj;
    });
  
    const mobileNumber = e.target[passanger++].value;
    const email = e.target[passanger++].value;
    const contactDetails = { mobile: mobileNumber, email: email };
    newTravellers.contactDetails = contactDetails;
  
    const assuredBenifits = e.target[passanger++].checked;
    newTravellers.assuredBenifitsTaken = assuredBenifits;
  
    const insurence = e.target[passanger++].checked;
    newTravellers.insurenceTaken = insurence;
  
    setTravellers(newTravellers);
  
      const bookingId = generateBookingId();
      navigate('/Payment', { state: { bookingId, busInfo: busDetails, tripInfo: selection, 'passangers': newTravellers, paymentFor: 'bus' } });

  };
  



const handleFormChange = (e)=>{

  let allInputs =document.getElementById('myform').querySelectorAll('input[required]')
  
  let allFilled = true;

  allInputs.forEach((input)=>{
     
    if(input.type === 'checkbox')
      {
        if (!input.checked) {
          allFilled = false;
        }
      }
      else
      {
        if(input.value=='')
          {
            allFilled=false;
          }
      }

  
  })

  if(allFilled==false)
    {
      setContinueBtnActive(false)
    }
    else
    {
      setContinueBtnActive(true)
    }
}





  const getBusDetails = async () => {

    const url = `https://academics.newtonschool.co/api/v1/bookingportals/bus/${selection.busID}`
    const projectId = '8bropwptza4g';


    try {
      var response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          projectID: projectId
        }

      })

      response = await response.json();
      if (response.message === "success") {
        const data = response.data;
        setBusDetials(data);
      }
      if (response.status === "fail") {
        alert(response.message)

      }
    } catch (error) {
      console.log(error);
    }

  }

  


  return (
    <div className=' flex justify-center bg-gray-100 overflow-y-scroll no-scrollbar w-screen max-h-screen  '>

      <div className='flex  justify-between w-full xl:w-[83.334%]  pt-4 pb-8 border h-full' >

        <div className="leftContainer flex flex-col gap-3 w-full xl:w-[63.829%]">

          <form id='myform' className='flex flex-col gap-4' onChange={(e)=>{handleFormChange(e)}} onSubmit={(e)=>{handleFormSubmit(e)}}>

                {
                  busDetails && <div className="tripDetails flex flex-col bg-white rounded-lg px-4 pt-3 pb-2 divide-y-2 divide-dashed">
                                  <div className="upper flex flex-col gap-1 pb-2">
                                    <div className="tripDetailHeadingAndArrow flex justify-between"> <span className='flex justify-center items-center gap-2'> <FaCircleCheck className='text-green-500'/> Trip Details</span> <span><IoIosArrowUp className='text-orange-500'/></span> </div>
                                    <div className="busInfo xl:flex justify-between">
                                      <div className="busname flex flex-col"> <p className='text-gray-400 text-sm'>Bus Partner</p> <span className='font-semibold'>{busDetails.name}</span> <p className='text-gray-400 text-sm'>Bus Type</p> <span className='font-semibold'>{busDetails.type} Sleeper(2 + 1)</span></div>
                                      <div className="seatinfo flex flex-col"> <p className='text-gray-400 text-sm'>Seat No</p> <span className='font-semibold'>{selection.seats.join(", ")}</span></div>
                                    </div>
                                  </div>
                                  <div className="lower flex justify-between  pt-2">
                                    <div className="boardingInfo flex flex-col gap-2 w-[40%] xl:w-[300px]  "> <p className='font-semibold'>Boarding</p> <p className='text-sm font-semibold'>{date.getDay()} {month[date.getMonth()]} {date.getFullYear()}, <span className='font-bold'>{busDetails.departureTime}</span> </p> <p className='text-gray-500 xl:text-base font-semibold text-xs'>{selection.boarding_point}</p></div>
                                    <div className="travelduration flex justify-center items-center "><div className='w-1 h-1 bg-slate-400 rounded-full' /> <div className='w-1 xl:w-4 border-[1px] border-dashed' /> <span className='border flex justify-center items-center w-[50px] px-1 py-1 text-[10px] font-bold rounded-md'>10:30 H</span> <div className='w-1 xl:w-4 border-[1px] border-dashed' /> <div className='w-1 h-1 bg-slate-400 rounded-full' /></div>
                                    <div className="droppintInfo flex flex-col gap-2 items-end w-[40%] xl:w-[300px]  "> <p className='font-semibold'>Dropping</p> <p className='text-sm font-semibold'>{date.getDay()} {month[date.getMonth()]} {date.getFullYear()}, <span className='font-bold'>{busDetails.arrivalTime}</span> </p> <p className='text-gray-500 xl:text-base font-semibold text-xs text-end'>{selection.dropping_point}</p> </div>
                                  </div>
                                </div>
                }

                  <div className="passengerDetails flex flex-col gap-4 bg-white p-4 rounded-lg ">

                    <div className="nameAgeGenderForm flex flex-col gap-4">

                        <span className='passangersDetaislHeading text-xl font-semibold'>Passenger Details</span>
                      

                            <div className='flex flex-col gap-4'>

                              {
                                selection.seats.map((seat,index)=>{
                                  return  <div key={index} className='passenger'>
                                                <span className='flex gap-1'>Add Passenger for : <p className='text-orange-600'>{seat}</p></span>
                                                <div className='flex gap-2'>
                                                    <input className='bg-gray-100 outline-none px-2 py-2 rounded-lg text-[16px] w-[50%] h-[40px] capitalize' type="text" placeholder='Name' defaultValue={'Bhushan'} required/>
                                                    <input className='bg-gray-100 outline-none px-2 py-2 rounded-lg text-[16px] w-[80px] h-[40px]' type="number" placeholder='Age' defaultValue={30} required/> 
                                                    <div className="gender  flex  ">
                                                       <select className='bg-gray-100 rounded-lg px-2 outline-none ' name="gender" id="">
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                       </select>
                                                    </div>
                                                </div>
                                          </div>
                                })
                              }
                              

                            </div>

                        

                    </div>

                    <div className="contactDetails flex flex-col gap-4">

                        <div className=' flex flex-col'>
                          <span className='passangersDetaislHeading text-xl font-semibold'>Contact Details</span> 
                          <span className='text-sm text-gray-400'>Get bus updates and ticket details via WhatsApp and Email.</span>
                        </div>
                        
                                  <div className='flex xl:flex-row flex-col gap-2'>
                                      <span className='bg-gray-100 px-2 py-2 rounded-lg text-[16px] w-[70%] xl:w-[40%] h-[40px] flex items-center gap-2'> +91<input className='bg-gray-100 outline-none w-[80%]' type="tel" placeholder='Enter Mobile Number' defaultValue={9834832178} required/></span>
                                      <span className='bg-gray-100 px-2 py-2 rounded-lg text-[16px] w-[70%] xl:w-[40%] h-[40px] flex items-center gap-2'> <MdEmail /><input className='bg-gray-100 outline-none w-[80%]' type="email" placeholder='Enter Email Address' defaultValue={'Bhushan@gmail.com'} required/> </span>
                                  </div>
                        

                    </div>
                    

                  </div>

                  <div className="benifits p-4 flex flex-col gap-2 bg-white rounded-lg">
                   
                    <div className="checkbox flex gap-2"><input type="checkbox" /> <p className='font-semibold'>Get Assured Benefit in Rs.99.00</p></div>
                    <div className="benifitCards flex flex-col xl:flex-row gap-3">
                      <div className="benifit1 font-semibold bg-[#e3f1ff] py-2 px-3 rounded-md flex flex-row xl:flex-col justify-between"><p className='text-[#144876]'>Bus cancelled?</p> <p className='text-gray-400'>150% Refund</p></div>
                      <div className="benifit1 font-semibold bg-[#e3f1ff] py-2 px-3 rounded-md flex flex-row xl:flex-col justify-between"><p className='text-[#144876]'>Bad quality service?</p> <p className='text-gray-400'>Upto 100% refund</p></div>
                      <div className="benifit1 font-semibold bg-[#e3f1ff] py-2 px-3 rounded-md flex flex-row xl:flex-col justify-between"><p className='text-[#144876]'>Bus delayed?</p> <p className='text-gray-400'>Upto 100% refund</p></div>
                      <div className="benifit1 font-semibold bg-[#e3f1ff] py-2 px-3 rounded-md flex flex-row xl:flex-col justify-between"><p className='text-[#144876]'>Changed your plans?</p> <p className='text-gray-400'>100% refund</p></div>
                    </div>
                    <div className="knowMore text-orange-700">Know More</div>
                  </div>

                  <div className="insurance bg-white p-4 flex flex-col gap-2 rounded-lg">
                    <div className="heading "><p className='font-semibold text-lg'>Travel Insurance</p> <p className='text-gray-400'>Secure your Trip with Travel Insurance for just ₹ 10 per person</p></div>
                    <div className="checkbox flex gap-2  items-center"> <input type="checkbox" /><span className=''><img src="https://static.abhibus.com/img/insurance//ic_insurance_acko.png" alt="" width={70} height={30}/></span></div>
                    <div className="knowMore text-orange-700">Know More</div>
                  </div>

                  <div className="clickAndConfirmButton  ">
                    <span className='flex  gap-2 pl-2'> <input type="checkbox" required/> <p> Yes and I accept the <span className='text-orange-600'> Terms and conditions</span></p></span>
                    <button  className={`w-full flex justify-center items-center py-3 mt-2 font-semibold rounded-lg ${continueBtnActive? `bg-red-500 text-white cursor-pointer`:`bg-gray-200 text-gray-400 cursor-not-allowed `}`}  >Continue to Pay ₹ 1989</button>
                  </div>

          </form>


        </div>

        <div className="rightContainer hidden xl:block w-[32.541%] ">
         {
           busDetails &&    <div className="fareDetails bg-white w-full flex flex-col p-4 gap-1 rounded-10 text-sm text-gray-400 sticky top-2"> 
                              <span className='font-semibold text-xl text-black'>Fare Details</span>
                              <span className='flex justify-between'> <p>Total Fare (inclusive)</p> <p>₹2835.00</p></span>
                              <span className='flex justify-between'> <p>Base Fare</p> <p>+ ₹{selection.seats.length * busDetails.fare}</p></span>
                              <span className='flex justify-between'> <p>Bus Partner GST</p> <p>+ ₹135.00</p></span>
                              <span className='flex justify-between'> <p>Assured Charge</p> <p>₹139.00</p></span>
                              <div className='w-full border-b pt-1'></div>
                              <div className='pt-1 flex justify-between text-black text-[16.5px] font-semibold '><p>Total Amount To Be Paid</p> <p>₹ {selection.seats.length * busDetails.fare}.00</p></div>
                            </div>
         }
        </div>

      </div>

    </div>
  )
})

export default BookBus