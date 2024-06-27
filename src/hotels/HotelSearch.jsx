import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import hotelBG from '../assets/hotelBG.jpeg'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import BottomRibbon from '../BottomRibbon';
import Login from '../Login';
import Signup from '../Signup';


const HotelSearch = React.memo(() => {
  const navigate = useNavigate();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const [offers, setOffers] = useState()
  const [destination, setDestination] = useState('');
  const [destinationCities, setdestinationCities] = useState([])
  const [date, setDate] = useState(new Date())
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [childrens, setChildrens] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') != null);
  const [popupShow, setPopupShow] = useState();


  const obj = {
    'destination': destination,
    'checkIn': checkIn,
    'checkOut': checkOut,
    'rooms': rooms,
    'adults': adults,
    'childrens': childrens,
  }


  useEffect(()=>{
    getOffers()
  },[])

  useEffect(() => {
    getDestinations()
    setCheckOut(new Date(checkOut.setDate(checkIn.getDate() + 1)))
  }, [destination, checkIn])

  const getDestinations = async () => {
    const projectId = '8bropwptza4g';
    const baseUrl = 'https://academics.newtonschool.co/api/v1/bookingportals/airport';
    const endpointUrl = `${baseUrl}?search={"city":"${destination}"}`;
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
        setdestinationCities(response.data.airports)
      }
      if (response.status === "fail") {
        alert(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getOffers = async () => {


    const projectId = '8bropwptza4g';
    const baseUrl = 'https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"HOTELS"} ';

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






    <>
    
      <Navbar activeLink={1} />

      <div id='login' className={`${popupShow == 'signinShow' ? 'block' : 'hidden'} relative`}>
        <Login setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow} />
      </div>

      <div id='signup' className={`${popupShow == "signupShow" ? 'block' : 'hidden'} relative`}>
        <Signup setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow} />
      </div>

      <div className={`searchBarContainer bg-center bg-cover h-[470px] w-screen `} style={{ backgroundImage: `url(${hotelBG})` }}>


        <div className="searchBarDiv xl:pt-28 px-10 ">

          <div className='flex justify-center py-6'><span className='text-4xl font-semibold text-white '>Book Hotels</span></div>


          <div className="SEARCHBAR-RELATIVE-CONTAINER flex justify-center items-start w-[100%] mt-6 z-40  ">

            <div className="shadow-500 w-[98%] xl:w-[96%] p-20 flex flex-col gap-10 rounded-20 bg-white  ">



              {/* SEARCHBAR START */}
              <div className="flex flex-col xl:flex-row gap-0.5 cursor-pointer xl:h-[60px] ">


                <div className="relative flex gap-0.5 flex-1  ">

                  <div className="INPUT DESTINATION bg-charcoal-40 flex items-center relative h-[45px] w-full rounded-10 xl:h-[60px] hover:bg-neutral-subtle-over border-none xl:rounded-r-none xl:rounded-l-10 ">

                    <div className="flex  justify-between items-center relative w-full h-full " onClick={() => { show("inputBox1"); hide('inputSpan1'); focus('inputBox1')}}>
                      <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 xl:w-[400px]" >
                        <div className="flex items-center " >
                          <div className="flex flex-col">
                            <p className="body-xs  text-neutral-400" >Destination</p>
                            <span id='inputSpan1' className='hidden w- text-lg  font-semibold outline-none bg-transparent ' >{destination && `${destination}`}</span>
                            <input type="text" id='inputBox1' className='hidden w-full text-lg font-semibold outline-none bg-transparent' autoComplete='off' value={destination} onClick={() => { show("list1") }} onChange={(e) => { setDestination(e.target.value) }} onFocus={(e) => { e.target.select(); show("list1") }} />
                          </div>
                        </div>
                      </div>
                    </div>


                    {
                      <div id='list1' className="hidden overflow-y-scroll absolute top-[45px] xl:top-[60px] bg-white w-[250px] xl:w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20  !animate-none no-scrollbar  Autocompleter_animate__zqRDe">

                        {
                          destinationCities.map((city, index) => {
                            const cityCode = city.iata_code;
                            const cityName = city.city;
                            const country = city.country;
                            const airportName = city.name;


                            return <div key={index} onClick={() => { setDestination(cityName); hide("list1"); hide("inputBox1"); show("inputSpan1"); focus("datePicker1") }}>
                              <li className="flex items-center relative hover:bg-primary-over px-20 gap-10 group list-sm max-w-screen-sm gap-15 py-2 xl:py-15" >

                                <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate" >
                                  <p className="body-md flex group-[.list-lg]:body-lg text-primary" >
                                    <span className="block truncate" >
                                      {cityName}, {country}
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

                  </div>

                </div>

                <div className="flex  gap-0.5 flex-row w-full justify-between ">


                  {/* CHECK-IN */}
                  <div className=" DATE PICKER bg-charcoal-40 hover:bg-neutral-subtle-over w-[50%] xl:w-full rounded-10 xl:rounded-none  " onClick={() => { focus("datePicker1"); hide("list1"); hide('inputBox1'); show('inputSpan1'); hide('trevellersDropdown') }}>
                  <div className="flex justify-between items-center relative w-full h-[45px] xl:h-[60px]  border-b-4 lg:min-h-[60px] border-transparent ">
                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                      <div className="flex items-center ">
                        <div className="flex flex-col" >
                          <p className="body-xs text-neutral-400">Check-in</p>
                          <div id='datePickerDiv' className='' ><DatePicker id='datePicker1' className='w-full h-full truncate text-primary font-medium outline-none bg-transparent' value={`${weekDays[checkIn.getDay()]}, ${checkIn.getDate()} ${month[checkIn.getMonth()]}`} selected={checkIn} onChange={(d) => { setCheckIn(d); hide("datePicker1"); focus('datePicker2') }} formatDate="DD/MM/YYY" minDate={new Date()} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* CHECK-IN */}

                {/* CHECK-OUT */}
                <div className="bg-charcoal-40 border-charcoal-40 hover:bg-neutral-subtle-over hover:border-contrast  w-[50%] xl:w-full rounded-10 xl:rounded-none " onClick={() => { focus("datePicker2"); hide("list1"); hide('inputBox1'); show('inputSpan1'); }}>
                  <div className="flex justify-between items-center relative w-full h-[45px] xl:h-[60px] border-b-4 lg:min-h-[60px] border-transparent">
                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                      <div className="flex items-center ">
                        <div className="flex flex-col" >
                          <p className="body-xs text-neutral-400">Check-out</p>
                          <div id='datePickerDiv' className='' ><DatePicker id='datePicker2' className='w-full h-full truncate text-primary font-medium outline-none bg-transparent' value={`${weekDays[checkOut.getDay()]}, ${checkOut.getDate()} ${month[checkOut.getMonth()]}`} selected={checkOut} onChange={(d) => { d > checkIn ? `${setCheckOut(d)} ${show("trevellersDropdown")}` : alert('Select date greater that check-in date'); hide("datePicker2") }} formatDate="DD/MM/YYY" minDate={new Date(checkIn)} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* CHECK-OUT */}

                </div>

              


                {/* ROOMS AND GUESTS */}
                <div className="relative overflow-visible w-full">

                  <div className="flex justify-between items-center relative w-full  bg-charcoal-40 hover:bg-neutral-subtle-over border-b-4  md:h-full h-full  border-transparent rounded-10 xl:rounded-none " onClick={() => { document.getElementById("trevellersDropdown").classList.toggle("hidden"); hide('inputBox1'); hide('list1'); show('inputSpan1')}} >
                    <div className="flex-1 flex flex-col justify-center px-15 h-[45px] ">
                      <div className="flex items-center !border-none">
                        <div className="flex flex-col">
                          <p className="body-xs text-neutral-400"> Select Rooms and Guests </p>
                          <p className="h6 max-w-[190px] truncate text-primary font-medium font-medium" >{rooms} Room , {adults + childrens} Guests</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id='trevellersDropdown' className="DROPDOWN hidden absolute xl:top-[61px] xl:-right-[150px] bg-white rounded-20 w-full xl:w-[450px] shadow-500 z-30">
                    <div className="xl:relative">
                      <h6 className="h6 pt-20 xl:pb-10 px-20 font-medium">Select Rooms & Guests</h6>
                      <div className="TRAVELLERS AND CLASS flex flex-col  xl:h-[352px] overflow-y-scroll no-scrollbar">

                        <div className="ROOMS flex justify-between  max-w-full px-20 py-10 ">
                          <div className="flex items-center justify-between gap-2 xl:flex-col xl:items-start xl:justify-start xl:w-[95px]">
                            <p className=" text-sm xl:body-md text-primary font-normal">Rooms</p>
                            <p className="text-xs xl:body-xs text-secondary font-normal">(Minimum 1)</p>
                          </div>
                          <div className="mt-10 xl:mt-0 xl:justify-start xl:items-start xl:flex-1">
                            <div className="">

                              {
                                [1, 2, 3, 4].map((num, index) => {
                                  return <button key={index} className={` rounded  w-[30px] h-[30px] xl:rounded-xl xl:w-[40px] ${index + 1 == rooms ? "bg-selection-solid text-selection-solid" : ""}`} onClick={() => { setRooms(num) }}> {num} </button>
                                })
                              }
                            </div>
                          </div>
                        </div>

                        <div className="ADULTS flex justify-between max-w-full px-20 py-10 ">
                          <div className="flex items-center justify-between gap-2 xl:flex-col xl:items-start xl:justify-start xl:w-[95px]">
                            <p className="text-sm xl:body-md text-primary font-normal">Adults</p>
                            <p className=" text-xs xl:body-xs text-secondary font-normal">(13 yrs & above)</p>
                          </div>
                          <div className="mt-10 xl:mt-0 xl:justify-start xl:items-start xl:flex-1">
                            <div className="">

                              {
                                [1, 2, 3, 4].map((num, index) => {
                                  return <button key={index} className={`rounded  w-[30px] h-[30px] xl:rounded-xl xl:w-[40px] ${index + 1 == adults ? "bg-selection-solid text-selection-solid" : ""}`} onClick={() => { setAdults(num) }}> {num} </button>
                                })
                              }
                            </div>
                          </div>
                        </div>
                        <div className="CHILDREN flex justify-between max-w-full px-20 py-10">
                          <div className="flex items-center justify-between gap-2 xl:flex-col xl:items-start xl:justify-start xl:w-[95px]">
                            <p className="body-md text-primary font-normal">Children</p>
                            <p className="body-xs text-secondary font-normal">(0 - 12 yrs)</p>
                          </div>
                          <div className="mt-10 xl:mt-0 xl:justify-start xl:items-start xl:flex-1">
                            <div className="">
                              {
                                [0, 1, 2, 3].map((num, index) => {
                                  return <button key={index} className={`rounded  w-[30px] h-[30px] xl:rounded-xl xl:w-[40px] ${index == childrens ? "bg-selection-solid text-selection-solid" : ""}`} onClick={() => { setChildrens(num) }}> {num} </button>
                                })
                              }
                            </div>
                          </div>
                        </div>

                        <div className="PLANNING hidden xl:flex A TRIP px-20 py-0">
                          <div className="inline-alert flex h-auto w-full border-solid rounded-10 p-10 bg-neutral-moderate text-neutral-moderate">
                            <div className="left-content flex items-start pt-px">
                              <svg
                                width="1em"
                                height="1em"
                                fontSize="1.5rem"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                data-testid="GroupIcon"
                                className="h-20 w-20"
                                style={{ userSelect: "none", display: "inline-block" }}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.7143 7.9076c0 1.3077-1.0844 2.4077-2.4717 2.4077-1.3873 0-2.4717-1.1-2.4717-2.4077C7.771 6.6 8.8553 5.5 10.2426 5.5c1.3873 0 2.4717 1.1 2.4717 2.4076Zm1.5014 0c0 2.1582-1.7788 3.9077-3.9731 3.9077s-3.9731-1.7495-3.9731-3.9077C6.2695 5.7496 8.0483 4 10.2426 4s3.9731 1.7495 3.9731 3.9076Zm2.3735 7.2162c-3.6311-3.4101-9.0438-3.4071-12.6844-.0148C2.155 16.7396 3.12 20 5.4813 20h9.5154c2.3467 0 3.3407-3.2345 1.5925-4.8762ZM4.7819 16.2579c3.1349-2.9211 7.804-2.9211 10.9262.011.8236.7735.3174 2.2282-.7114 2.2282H5.4813c-1.021 0-1.535-1.4607-.6994-2.2392Zm11.5044-3.4757c.1301-.3933.5548-.6067.9484-.4767 1.3435.4438 3.7739 1.6945 3.7739 4.3569 0 1.3963-1.0214 2.1463-2.0675 2.1463-.9682 0-.9682-1.5 0-1.5 1.7717-.4337-.8558-3.3712-2.1777-3.579a.7498.7498 0 0 1-.4771-.9475Zm-.6702-7.1478c-.9624-.0925-1.1135 1.3999-.1484 1.4927 1.9914.1915 1.767 2.9102-.2699 2.7143-.9624-.0926-1.1134 1.3998-.1484 1.4926 3.8917.3743 4.4702-5.0527.5667-5.6996Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="right-content flex w-full pl-5">
                              <div className="grow">
                                <div className="body-sm text-primary">
                                  <p className="body-sm">
                                    Planning a trip for{" "}
                                    <span className="body-sm font-medium">
                                      more than 9 travellers?
                                    </span>
                                  </p>
                                </div>
                                <div className="body-xs text-secondary">
                                  <p className="body-sm underline text-brand font-medium">
                                    Create Group Booking
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                      </div>
                      <div className="BUTTON flex justify-end bottom-0 gap-5 pt-[9px] pb-10 px-20 border-t border-neutral-100 w-full xl:justify-end relative">
                        <button className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over xl:gap-[3px] rounded-10 xl:min-h-[40px] button-md py-2 px-10 xl:w-[81px]" onClick={() => { hide('trevellersDropdown') }}>
                          Done
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
                {/* ROOMS AND GUESTS */}

                {/* SEARCH BUTTON */}
                <button id='searchBtn' className="inline-flex justify-center items-center h-[45px] w-full bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-5 rounded-10 xl:min-h-[50px] xl:h-full xl:py-[13px] px-15 xl:rounded-l-none xl:rounded-r-10 text-2xl xl:w-[160px] pl-[25px] " onClick={() => { obj.destination !== '' ? navigate("/HotelResults", { state: obj }) : alert("All fields are required") }}>
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
              {/* SEARCHBAR END */}



            </div>

          </div>

        </div>


      </div>

      <div className=" OFFERS-MAIN-CONTAINER  xl:xl:pb-0 mx-20 xl:mt-20 w ">
                <div className="flex flex-col my-30 gap-6  xl:my-0 xl:py-30 xl:gap-0 ">
                    <h2 className=" pl-20 xl:pl-0 xl:pb-10 font-bold flex justify-center text-xl xl:text-4xl">
                        Offers For You
                    </h2>
                    <div className="relative w-full my-auto mx-0  ">
                        <button className="flex absolute top-[100px] left-2  flex order-2 mx-5 bg-transparent focus:outline-none cursor-pointer" onClick={(e) => { document.getElementById('offersOuterDiv').scrollLeft += document.getElementById('offersOuterDiv').clientWidth }}> <div className="w-40 h-40 bg-white rounded-full flex justify-center items-center text-blue-500 shadow-500 z-20 mb-15 mr-10"> <MdKeyboardArrowLeft className='text-3xl' /> </div> </button>
                        <div id='offersOuterDiv' className=" overflow-x-scroll transition-all ease-in-out duration-300 scroll-smooth no-scrollbar " style={{}} onScroll={(e) => { document.getElementById('scd').style.transform = `translateX(${Math.round(((e.nativeEvent.target.scrollLeft + 1384) / 6400) * 100) - 21.625}px)`;  }}  >
                            <div id='offersScrollableDiv' className="flex flex-row justify-between  flex-grow  gap-20">

                                {
                                    offers && offers.map((offer, index) => {
                                        return <div id={`offerCard${index}`} key={index} className=" offerCard relative group transition duration-1000 shrink-0 last:mr-20  xl:first:ml-0 xl:last:mr-0 xl:rounded-20 xl:transition-all xl:duration-300 xl:ease-in xl:hover:shadow-100 xl:hover:duration-300 xl:hover:ease-out h-[310px]" style={{ scrollSnapAlign: "center" }} >
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
                        <button className="flex order-1 mx-5 bg-transparent focus:outline-none absolute top-[100px]  right-0 flex order-2 mx-5 bg-transparent focus:outline-none cursor-pointer" onClick={() => { document.getElementById("offersOuterDiv").scrollLeft -= document.getElementById('offersOuterDiv').clientWidth }}> <div className="w-40 h-40 bg-white rounded-full flex justify-center items-center text-blue-500 shadow-500 z-20 mb-15 mr-10"> <MdKeyboardArrowRight className='text-3xl' /> </div> </button>

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

      <BottomRibbon setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow}/>

    </>
  )
})

export default HotelSearch