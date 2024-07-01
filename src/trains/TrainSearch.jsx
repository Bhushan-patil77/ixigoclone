import React from 'react'
import train from '../assets/train1.png'
import Navbar from '../Navbar'
import { MdOutlineSwapHorizontalCircle } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import BottomRibbon from '../BottomRibbon'
import Login from '../Login'
import Signup from '../Signup'

const TrainSearch = React.memo(()=> {

  let angle = 180;
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const navigate = useNavigate();

  const [swapAngle, setSwapAngle] = useState(0)
  const [from, setFrom] = useState("Nagpur");
  const [to, setTo] = useState("Jaipur");
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [date, setDate] = useState(new Date())
  const [offers, setOffers] = useState()
  const ran = useRef(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') != null);
  const [popupShow, setPopupShow] = useState();

  const obj = {
    from: from,
    to: to,
    date: date,
}


  useEffect(() => {
    if (!ran.current) {
        getOffers();
        ran.current = true;
    }

    getFromCities();
    getToCities()
    console.log(obj);
}, [from, to, date])


  const getOffers = async () => {


    const projectId = '8bropwptza4g';
    const baseUrl = 'https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"RAILS"} ';

    try {
        var response = await fetch(baseUrl, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                projectID: projectId
            }
        })
        response = await response.json();
        if (response.status === "success") {
            setOffers(response.data.offers)
        }
        if (response.status === "fail") {
            alert(response.message)
        }
    } catch (error) {
        console.log(error);
    }



}


const getFromCities = async () => {
    const projectId = '8bropwptza4g';
    const baseUrl = 'https://academics.newtonschool.co/api/v1/bookingportals/airport';
    const endpointUrl = `${baseUrl}?search={"city":"${from}"}`;
    const list = document.getElementById("list1");

    try {
        var response = await fetch(endpointUrl, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                projectID: projectId
            }
        })
        response = await response.json();
        if (response.status === "success") {

            setFromCities(response.data.airports)
        }
        if (response.status === "fail") {
            alert(response.message)
        }
    } catch (error) {
        console.log(error);
    }
}

const getToCities = async () => {
    const projectId = '8bropwptza4g';
    const baseUrl = 'https://academics.newtonschool.co/api/v1/bookingportals/airport';
    const endpointUrl = `${baseUrl}?search={"city":"${to}"}`;
    const list = document.getElementById("list1");

    try {
        var response = await fetch(endpointUrl, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                projectID: projectId
            }
        })
        response = await response.json();
        if (response.status === "success") {

            setToCities(response.data.airports)
        }
        if (response.status === "fail") {
            alert(response.message)
        }
    } catch (error) {
        console.log(error);
    }
}

const hide = (id) => {
    document.getElementById(id).classList.add("hidden");
}

const show = (id) => {
    document.getElementById(id).classList.remove("hidden");
}

const toggleShow = (id) => {
    document.getElementById(id).classList.toggle("hidden");
}

const focus = (id) => {
    document.getElementById(id).focus();
}




  return (
    
    <div className='relative'>

      <div id='login' className={`${popupShow == 'signinShow' ? 'block' : 'hidden'} relative`}>
        <Login setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow} />
      </div>

      <div id='signup' className={`${popupShow == "signupShow" ? 'block' : 'hidden'} relative`}>
        <Signup setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow} />
      </div>

       
      <div className="main ">

        <div className="sticky top-0 bg-white z-50"><Navbar activeLink={2}/></div>

         <div className="relative border  w-full h-[400px] flex flex-col xl:justify-normal  gap-4 xl:gap-0 ">

          
            <img className='absolute bg-cover bg-center -z-10 hidden  xl:block xl:h-[550px] w-full' src="https://images.ixigo.com/image/upload/misc/f3c5fc0564afd3390b0d7fedfba8e8c2-qsbuo.webp" alt="" />
            <img className='absolute bg-cover bg-center -z-10 xl:hidden h-full w-full' src="https://images.ixigo.com/image/upload/misc/f3c5fc0564afd3390b0d7fedfba8e8c2-qsbuo.webp" alt="" />


            <div className="headingDiv flex justify-center pt-24 hidden xl:flex">
                <div className="imgAndHeading   flex justify-center items-center gap-8">
                  <img className='' src="https://images.ixigo.com/rt-train/pc/img/trainsHome/compareBookWhite.png" alt="" />
                  <p className='text-3xl text-white font-semibold'>Train Ticket Booking</p>
                </div>
            </div>
            
            <p className='xl:hidden text-xl font-semibold flex justify-center pt-4 '>Book Trains</p>


            <div className="searchBarDiv xl:pt-8 xl:px-10 ">

              <div className="searchBarWrapper flex flex-col items-center">

                  <div className="tabsDiv flex gap-16 font-bold tracking-wide hidden xl:flex xl:w-[98%] xl:text-white p-2 pb-0" >
                    <button className='flex flex-col'><link rel="stylesheet" href="" />BOOK TRAINS <span className='w-full  border-2 border-orange-700'></span></button>
                    <button className='flex flex-col'><link rel="stylesheet" href="" />RUNNING STATUS</button>
                    <button className='flex flex-col'><link rel="stylesheet" href="" />PNR STATUS ENQUIRY</button>
                    <button className='flex flex-col'><link rel="stylesheet" href="" />SEARCH BY NAME/NUMBER</button>
                    <button className='flex flex-col'><link rel="stylesheet" href="" />SEARCH BY STATION</button>
                  </div>

                  <div className=" shadow-500 w-[98%] xl:p-6 flex xl:flex-col gap-10 bg-white justify-center  px-4 py-8 rounded-10">

                      <div className="flex xl:flex-row flex-col xl:gap-0.5 gap-2 cursor-pointer">


                          <div className="relative flex xl:gap-0.5  gap-2 flex-1 ">

                              <div className="INPUT FROM bg-charcoal-40 flex items-center relative w-full h-[45px] xl:h-[60px] hover:bg-neutral-subtle-over border-none rounded-l-10">

                                  {/* INPUT TAG FROM */}
                                  <div className="flex  justify-between items-center relative w-full h-full" onClick={() => { show("inputBox1"); hide('inputSpan1'); focus('inputBox1'); hide("trevellersDropdown"); }}>
                                      <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 " >
                                          <div className="flex items-center " >
                                              <div className="flex flex-col">
                                                  <p className=" body-xs text-neutral-400 w-full" >From</p>
                                                  <span id='inputSpan1' className='hidden w-full  xl:text-lg text-sm font-semibold outline-none bg-transparent ' >{from && `${from}`}</span>
                                                  <input type="text" id='inputBox1' className='hidden w-full text-lg font-semibold outline-none bg-transparent' value={from} onClick={() => { show("list1") }} onChange={(e) => { setFrom(e.target.value) }} onFocus={(e) => { e.target.select(); show("list1"); hide("list2"); hide('inputBox2'); show('inputSpan2') }} />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  {/* INPUT TAG FROM */}


                                  {/* INPUT LIST FROM */}
                                  {
                                     <div id='list1' className="hidden overflow-y-scroll absolute top-[61px] bg-white w-[200%] lg:w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20  !animate-none no-scrollbar  Autocompleter_animate__zqRDe">
                                               
                                     <div>
                                         <p className="h6 px-20 pt-15 pb-5 font-medium">
                                             Select Source
                                         </p>
                                     </div>
                                     {
                                         fromCities.map((city, index) => {
                                             const cityCode = city.iata_code;
                                             const cityName = city.city;
                                             const country = city.country;
                                             const airportName = city.name;


                                             return <div key={index} onClick={() => { setFrom(cityName); hide("list1"); hide("inputBox1"); show("inputSpan1"); show('inputBox2'); focus("inputBox2") }}>
                                                 <li className="flex items-center relative hover:bg-primary-over px-20 py-2 gap-4 group list-sm max-w-screen-sm gap-15" >
                                                     
                                                     <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate" >
                                                         <p className="body-md flex group-[.list-lg]:body-lg text-primary" >
                                                             <span className="block truncate text-sm" >
                                                                 {cityName}
                                                             </span>
                                                             <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                                                         </p>
                                                     
                                                     </div>
                                                 </li>
                                                 <div className="border-b border-neutral-100 mx-20" />
                                             </div>
                                         })
                                     }

                                 </div>
                                  }
                                  {/* INPUT LIST FROM*/}

                              </div>

                              <div className=" INPUT TO bg-charcoal-40 flex items-center relative w-full h-[45px] xl:h-[60px] hover:bg-neutral-subtle-over border-none ">

                                  {/* INPUT TAG TO */}
                                  <div className="flex justify-between items-center relative w-full h-full pl-10 " onClick={() => { show("inputBox2"); hide('inputSpan2'); focus('inputBox2'); hide('inputBox1'); show("inputSpan1"); hide("trevellersDropdown"); }} >
                                      <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 " >
                                          <div className="flex items-center " >
                                              <div className="flex flex-col">
                                                  <p className="body-xs text-neutral-400">To</p>
                                                  <span id='inputSpan2' className=' hidden w-full xl:text-lg text-sm  font-semibold outline-none bg-transparent ' >{to && `${to}`}</span>
                                                  <input id='inputBox2' type="text" className=' hidden w-full text-lg font-semibold outline-none bg-transparent ' value={to && to} onChange={(e) => { setTo(e.target.value) }} onFocus={(e) => { e.target.select(); show("list2"); hide('inputSpan2'); hide('list1'); }} />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  {/* INPUT TAG TO */}


                                  {/* INPUT LIST TO */}
                                  <div id='list2' className=" hidden overflow-y-scroll absolute top-[61px] right-0 bg-white w-[200%] lg:w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20 !animate-none no-scrollbar  Autocompleter_animate__zqRDe">
                                           
                                           <div>
                                               <p className="h6 px-20 pt-15 pb-5 font-medium">
                                                   Select Destination
                                               </p>
                                           </div>
                                           {
                                               toCities.map((city, index) => {
                                                   const cityCode = city.iata_code;
                                                   const cityName = city.city;
                                                   const country = city.country;
                                                   const airportName = city.name;

                                                   return <div key={index} onClick={() => { setTo(cityName); show("inputSpan2"); hide("list2"); hide("inputBox2"); document.getElementById("datePicker").focus() }}>
                                                       <li className="flex items-center relative hover:bg-primary-over px-20  gap-4 group list-sm max-w-screen-sm py-2 px-20 ">
                                                        
                                                           <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                                                               <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                                                   <span className="block truncate text-sm">
                                                                       {cityName}
                                                                   </span>
                                                                   <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                                                               </p>
                                                           
                                                           </div>
                                                       </li>
                                                       <div className="border-b border-neutral-100 mx-20" />
                                                   </div>
                                               })
                                           }

                                       </div>
                                  {/* INPUT LIST TO */}

                              </div>

                            

                              <div id='swapBtn' className="SWAP BUTTON absolute w-30 h-30 bg-white text-center rounded-full top-[calc(50%-15px)] left-[calc(50%-15px)] rotate-0 border-none shadow-100 flex justify-center items-center transition duration-400 " onClick={(e) => { let x = from; setFrom(to); setTo(x); e.currentTarget.classList.toggle("rotate-180"); hide("list1"); hide('list2'); hide('inputBox1'); hide('inputBox2'); show('inputSpan1'); show("inputSpan2") }} >
                                  <svg
                                      width="1em"
                                      height="1em"
                                      fontSize="1.5rem"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                      data-testid="SwapIcon"
                                      className="text-subbrand-900 transition-all duration-300 transform rotate-0"
                                      style={{
                                          userSelect: "none",
                                          display: "inline-block",
                                          transform: "rotate(0deg)"
                                      }}
                                  >
                                      <path
                                          fillRule="evenodd"
                                          d="M14.6403 5.2477a.7483.7483 0 0 1 1.0612.0084l4.0871 4.1684a.7555.7555 0 0 1 .1573.8195.7502.7502 0 0 1-.6921.4623H6.8305c-.4145 0-.7504-.3373-.7504-.7533 0-.4161.336-.7534.7504-.7534h10.6317L14.632 6.3131a.7556.7556 0 0 1 .0083-1.0654ZM9.368 18.8148a.7483.7483 0 0 1-1.0611-.0084l-4.087-4.1684a.7555.7555 0 0 1-.1574-.8195.7503.7503 0 0 1 .6921-.4623H17.178c.4144 0 .7503.3373.7503.7533 0 .4161-.3359.7534-.7503.7534H6.5463l2.8301 2.8865a.7555.7555 0 0 1-.0083 1.0654Z"
                                          clipRule="evenodd"
                                      />
                                  </svg>
                              </div>
                            

                          </div>

                          <div className=" DATE PICKER AND RETURN flex xl:rounded-none rounded-10 items-center justify-between border-none relative w-[320px] gap-0.5 overflow-visible calendarInput">

                              {/* DATE PICKER */}
                              <div className=" DATE PICKER bg-charcoal-40 hover:bg-neutral-subtle-over w-full xl:rounded-none rounded-10" onClick={() => { focus("datePicker"); hide("list1"); hide("list2"); hide('inputBox1'); hide('inputBox2'); show('inputSpan1'); show('inputSpan2'); }}>
                                  <div className="flex justify-between items-center relative w-full h-[45px] xl:h-[60px] justify-center border-b-4 lg:min-h-[60px] border-transparent">
                                      <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                                          <div className="flex items-center ">
                                              <div className="flex flex-col" >
                                                  <p className="body-xs text-neutral-400">Departure</p>
                                                  <div id='datePickerDiv' className='' ><DatePicker id='datePicker' className='h6 max-w-[190px] truncate xl:text-lg text-sm xl:text-primary font-medium font-medium outline-none bg-transparent' value={`${weekDays[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`} selected={date} onChange={(d) => { setDate(d); hide("datePicker") }} formatDate="DD/MM/YYY" minDate={new Date()} /></div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              {/* DATE PICKER */}





                          </div>

                      

                          {/* SEARCH BUTTON */}
                          <button id='searchBtn' className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-5 rounded-10 xl:h-[60px] h-[45px] button-lg py-[13px] px-15  rounded xl:rounded-l-none xl:rounded-r-10 text-2xl xl:w-[160px] pl-[25px] " onClick={()=>{obj.from && obj.to != undefined ? (from===to? alert("Source and destination cannot be same") : (navigate("/TrainResults" , {state: obj}))): alert("All fields are required")}}>
                              Search
                              <svg
                                  width="1em"
                                  height="1em"
                                  fontSize="1.5rem"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  data-testid="ChevronRightIcon"
                                  className="w-6 h-6 ml-10 SearchForm_animateSearchBtn__btzyf transition duration-700 translate-x-4 translate-x-0 searchButttonArrowAnimation"
                                  style={{ userSelect: "none", display: "inline-block" }}
                              >
                                  <path
                                      fillRule="evenodd"
                                      d="M8.7125 6.2293c.2905-.2983.77-.3066 1.0708-.0187l5.4854 5.2494A.7474.7474 0 0 1 15.5 12a.7474.7474 0 0 1-.2313.54l-5.4854 5.2494c-.3009.2879-.7803.2796-1.0708-.0187a.7459.7459 0 0 1 .0188-1.0613L13.6524 12 8.7313 7.2906a.746.746 0 0 1-.0188-1.0614Z"
                                      clipRule="evenodd"
                                  />
                              </svg>
                          </button>
                          {/* SEARCH BUTTON */}


                      </div>

                      <div className="border-none pb-0 pl-0 pt-10 hidden xl:block ">

                          <div className=" relative bg-transparent gap-2  border rounded-10 flex justify-center  flex-col p-2">

                          <img className='absolute -z-10 bg-cover bg-center' src={train} alt="" />

                            <div className="checkBoxAndHeading flex justify-center gap-4 bg-transparent">
                              <span className='text-xl'><input className='w-4 h-4' id='refundcheckbox' type="checkbox" /> <label htmlFor="refundcheckbox"></label></span>
                              <span className='font-semibold text-xl'>Get a full train fare refund</span>
                            </div>

                            <div className="banifits flex gap-8 justify-center items-center bg-transparent">
                            <p>₹0 cancellation fee</p>
                            <p className='font-extrabold text-2xl'>.</p>
                            <p>Instant full train fare refunds</p>
                            <p className='font-extrabold text-2xl'>.</p>
                            <p>24*7 premium customer support</p>
                            <p className='font-extrabold text-2xl'>.</p>
                            <p>No documentation required</p>
                            </div>

                          </div>
                      </div>

                  </div>

              </div>

            </div>

            </div>

            <div className=" OFFERS-MAIN-CONTAINER  xl:pb-0 xl:mx-4 mx-1 xl:mt-44  ">
                <div className="flex flex-col my-30 gap-4 xl:my-0 xl:py-30 xl:gap-2 ">
                    <h2 className="pl-2 xl:pl-0 xl:pb-10 font-bold flex xl:justify-center text-lg xl:text-4xl">
                        Offers For You
                    </h2>
                    <div className="relative w-full my-auto mx-0  ">
                        <button className="flex order-1 mx-5 bg-transparent focus:outline-none absolute top-[40%] left-0 xl:left-2  flex order-2 mx-5 bg-transparent focus:outline-none cursor-pointer" onClick={(e) => { document.getElementById('offersOuterDiv').scrollLeft += document.getElementById('offersOuterDiv').clientWidth }}> <div className="xl:w-8 xl:h-8 bg-white rounded-full flex justify-center items-center text-blue-500 shadow-500 z-20 mb-15 mr-10"> <MdKeyboardArrowLeft className='text-3xl' /> </div> </button>
                        <div id='offersOuterDiv' className=" overflow-x-scroll h-[350px] transition-all ease-in-out duration-300 scroll-smooth no-scrollbar " style={{}} onScroll={(e) => { document.getElementById('scd').style.transform = `translateX(${Math.round(((e.nativeEvent.target.scrollLeft + 1384) / 6400) * 100) - 21.625}px)`; console.log(((e.nativeEvent.target.scrollLeft) / 6400 * 100)); }}  >
                            <div id='offersScrollableDiv' className="flex flex-row justify-between  flex-grow  gap-20">

                                {
                                    offers && offers.map((offer, index) => {
                                        return <div id={`offerCard${index}`} key={index} className=" offerCard relative group transition duration-1000 shrink-0 last:mr-20 xl:first:ml-4 xl:first:ml-0 xl:last:mr-0 xl:rounded-20 xl:transition-all xl:duration-300 xl:ease-in xl:hover:shadow-100 xl:hover:duration-300 xl:hover:ease-out h-[310px]" style={{ scrollSnapAlign: "center" }} >
                                            <a href="https://www.ixigo.com/offers/winter-airlines-sale/" target="_blank">
                                                <img alt="AIRLINE SALE WEB NEW ALLIANCE" title="AIRLINE SALE WEB NEW ALLIANCE" loading="lazy" width={295} height={180} className="w-[300px] h-[180px] rounded-t-[20px]" style={{ color: "transparent" }} src={offer.heroUrl} />
                                            </a>
                                            <div className='absolute  h-[130px] rounded-b-[20px]   p-2 shadow'>
                                                <span className='font-bold  '>{offer.pTl}</span>
                                                <span className=' text-sm '> {offer.pTx}</span>
                                            </div>

                                            <div className="hidden group-hover:block group-hover:bottom-4  absolute -bottom-10 right-6"><button className='border px-4 rounded'>{offer.ctaText}</button></div>


                                        </div>
                                    })
                                }

                            </div>
                        </div>
                        <button className="flex order-1  bg-transparent focus:outline-none absolute top-[40%]  right-0 flex order-2  bg-transparent focus:outline-none cursor-pointer" onClick={() => { document.getElementById("offersOuterDiv").scrollLeft -= document.getElementById('offersOuterDiv').clientWidth }}> <div className="xl:w-8 xl:h-8 bg-white rounded-full flex justify-center items-center text-blue-500 shadow-500 z-20 mb-15 mr-10"> <MdKeyboardArrowRight className='text-3xl' /> </div> </button>

                        <div className="flex justify-center ">
                            <div id='' className="flex gap-10 border border-black  rounded-xl w-[100px] h-10  mt-4 p-0 order-4 ">
                                <div id='scd' className=' flex '>

                                    <div id='bottomScrollerStrip' className={`w-[20px]  rounded-full cursor-pointer  shrink-0 bg-blue-600`} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="BENIFITS-DIV flex flex-col justify-center items-center p-20 bg-[#f2f2f2] hidden xl:flex ">

              <div className="headings flex flex-col justify-center items-center mt-6"> <span className='text-3xl tracking-wide font-bold'>IRCTC Train Ticket Booking on ixigo</span>  <span className='flex items-center gap-4 text-xl mt-6'><p>IRCTC Authorised Partner</p> <img src="https://images.ixigo.com/image/upload/f_auto/train/760e6e3b2f500e9c0a6436e330240cf8-rodkb.png" alt="" width={60}/></span></div>
             
              <div className="content flex justify-center gap-28 mt-8 px-28 flex-nowrap">
                <div className="contentLeft flex flex-col gap-10">
                   <div className="flex items-center text-2xl py-20 px-4 gap-4 font-bold"> <img src="https://images.ixigo.com/image/upload/f_auto/train/ecb835b55223186c49d55750b422ed10-oscpe.png" width={70} alt="" /> <span>₹0 Payment Gateway Fee on Payments via UPI</span> </div>
                   <div className="flex items-center text-2xl py-20 px-4 gap-4 font-bold"> <img src="https://images.ixigo.com/image/upload/f_auto/train/a21427142a38e7331574b034aa4a687a-lwpxr.png" width={70} alt="" /> <span>Instant Refund on Indian Railway Reservation Cancellation</span> </div>
                </div>
                <div className="contentRight flex flex-col gap-10">
                   <div className="flex items-center text-2xl py-20 px-4 gap-4 font-bold"> <img src="https://images.ixigo.com/image/upload/f_auto/801ca10aa0964d95bdcd76df1573b5e1-hlzsy.png" width={70} alt="" /> <span>ixigo Assured: Free Cancellation of Train Tickets</span> </div>
                   <div className="flex items-center text-2xl py-20 px-4 gap-4 font-bold"> <img src="https://images.ixigo.com/image/upload/f_auto/train/d522fcf3866c18b343060ab3cb49b3b1-xnmqx.png" width={70} alt="" /> <span>24*7 Support for IRCTC Train Ticket Booking</span> </div>
                </div>
                
              </div>

              <span className='w-[85%] border border-gray-300'></span>

              <div className="flex gap-36 food mt-6 mb-9">
                <div className='flex items-center gap-6'> <img src="https://images.ixigo.com/rt-train/mobi/img/trainHome/eCateringWithBg.png" width={80} alt="" /> <span> <p className='font-bold text-xl'>Book meals for train journey</p> <p>Get food delivered at your seat</p></span></div>
                <div className='flex justify-center items-center gap-7'> <button className='border border-[#ec5b24] py-1 px-3 text-[#ec5b24] rounded-md font-semibold '>VIEW MY FOOD ORDERS</button> <button className='text-white bg-[#ec5b24] border-none py-1 px-3 rounded-md'>ORDER NOW</button></div>
              </div>
            </div>




        <div className="promisesDiv"></div>

      </div>

      <BottomRibbon setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow}/>
    </div>

  )
})

export default TrainSearch