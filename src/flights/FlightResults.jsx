import React from 'react'
import Navbar from '../Navbar'

import { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { CiBowlNoodles } from "react-icons/ci";
import { CiWifiOn } from "react-icons/ci";
import { CiPlug1 } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { PiFirstAidKitLight } from "react-icons/pi";
import { FaArrowRight, FaThumbsUp } from "react-icons/fa";
import { BiLeftArrow, BiLeftDownArrowCircle, BiRightArrow, BiSolidOffer, BiUpArrow } from "react-icons/bi";
import { IoCall, IoClose, IoCloseCircleSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { GiDoubleShot } from 'react-icons/gi';
import { FcLeft } from 'react-icons/fc';
import { LineWave, ThreeCircles } from 'react-loader-spinner';
import plane from '../assets/plane1-unscreen.gif'
import Login from '../Login';
import Signup from '../Signup';
import { TiFilter } from "react-icons/ti";
import { CgSortZa } from 'react-icons/cg';
import { RiArrowDropDownLine } from "react-icons/ri";

const FlightResults = React.memo(() => {

  const location = useLocation();
  const obj = location.state;


  let angle = 180;
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const navigate = useNavigate();

  const [swapAngle, setSwapAngle] = useState(0)
  const [from, setFrom] = useState(obj.from);
  const [to, setTo] = useState(obj.to);
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [date, setDate] = useState(new Date(obj.date))
  const [adults, setAdults] = useState(obj.adults);
  const [childrens, setChildrens] = useState(obj.childrens);
  const [infants, setInfants] = useState(obj.infants);
  const [seatClass, setSeatClass] = useState(obj.seatClass);
  const [flights, setFlights] = useState([])
  const [paginatedFlights, setPaginatedFlights] = useState(flights)
  const [flightDetailsDropdownIndex, setFlightDetailsDropdownIndex] = useState();
  const [filterObj, setFilterObj] = useState({});
  const [clearAllFilters, setClearAllFilters] = useState(false)
  const [sortObj, setSortObj] = useState({})
  const [dateArray, setDateArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [val, setval] = useState([0, 100000])
  const [minmax, setminmax] = useState([]);
  const [minTicketPrice, setMinTicketPrice] = useState(1000000);
  const [MaxTicketPrice, setMaxTicketPrice] = useState(0)
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') != null);
  const [popupShow, setPopupShow] = useState();
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const [active, setActive] = useState(false)


  const [offers, setOffers] = useState()
  const ran = useRef(false);



  const itemsPerPage = 7;
  const firstIndex = (currentPage * itemsPerPage)
  const lastIndex = (currentPage * itemsPerPage + itemsPerPage)
  const pages = Math.ceil(flights.length / itemsPerPage)

  useEffect(() => { console.log(obj); }, [])

  useEffect(() => {
    setActive(true)
  }, [activeTab])

  useEffect(() => {
    getOffers()
  }, [])

  useEffect(() => {
    getFromCities();
  }, [from])

  useEffect(() => {
    getToCities();
  }, [to])

  useEffect(() => {
    generateDateArray();
  }, [date])

  useEffect(() => {
    getFlights()
  }, [filterObj, sortObj, currentPage])

  const getFlights = async () => {
    // const url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${from.iata_code}","destination":"${to.iata_code}"}&day=Fri`
    const url = getFilteredUrl()
    console.log(url);

    const projectId = '8bropwptza4g';


    try {
      setMessage('Loading...')
      var response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          projectID: projectId
        }
      })
      response = await response.json();
      if (response.status === "success") {
        const data = response.data.flights;
        setFlights(data);
        paginate(data)
        if (data.length <= 0) {
          setMessage('No Flights Available')
        }
        else {
          setMessage('Success')
        }
      }
      if (response.status === "fail") {
        alert(response.message)
        console.log('fail');
      }
    } catch (error) {
      console.log(error);
      setMessage(error)
    }
  }


  const paginate = (data) => {


    setPaginatedFlights(data.slice(firstIndex, lastIndex))

  }


  const scrollable = document.getElementById('scrollable');

  const handleFilterChange = (e) => {
    scrollable.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(0)
    var filterType = e.target.attributes.filtertype.value;
    console.log(filterType);

    if (filterType === "stops") {
      if (e.target.checked) {
        if ("stops" in filterObj) {

          setFilterObj(prev => ({
            ...prev, stops: [...prev.stops, e.target.value]
          }))


        }
        else {
          const newObj = { ...filterObj, "stops": [] }
          setFilterObj(() => {
            return { ...newObj, stops: [...newObj.stops, e.target.value] }
          })

        }
      }
      else {
        setFilterObj((prev) => {
          return { ...prev, stops: [...prev.stops.filter((stop) => { return stop != e.target.value })] }
        })

        if (filterObj.stops.length <= 1) {
          const { stops, ...rest } = filterObj;
          setFilterObj(rest);
        }



      }

    }

    if (filterType === "departures") {
      if (e.target.checked) {

        if ("departureTime" in filterObj) {

          setFilterObj(prev => ({
            ...prev, departureTime: [...prev.departureTime, e.target.value]
          }))
        }
        else {
          const newObj = { ...filterObj, "departureTime": [] }
          setFilterObj(() => {
            return { ...newObj, departureTime: [...newObj.departureTime, e.target.value] }
          })
        }


      }
      else {
        setFilterObj((prev) => {
          return { ...prev, departureTime: [...prev.departureTime.filter((departure) => { return departure != e.target.value })] }
        })

        if (filterObj.departureTime.length <= 1) {
          const { departureTime, ...rest } = filterObj;
          setFilterObj(rest);
        }

      }

    }

    if (filterType === "airline") {
      if (e.target.checked) {
        if ("airlines" in filterObj) {

          setFilterObj((prev) => {
            return { ...prev, airlines: [...prev.airlines, e.target.value] }
          })
        }
        else {
          const newObj = { ...filterObj, "airlines": [] }
          setFilterObj(() => {
            return { ...newObj, airlines: [...newObj.airlines, e.target.value] }
          })
        }

      }
      else {
        setFilterObj((prev) => {
          return { ...prev, airlines: [...prev.airlines.filter((d) => { return d != e.target.value })] }
        })
        if (filterObj.airlines.length <= 1) {
          const { airlines, ...rest } = filterObj;
          setFilterObj(rest)
        }

      }
    }

    if (filterType === "durations") {
      if (e.target.checked) {
        if ("duration" in filterObj) {

          setFilterObj((prev) => {
            return { ...prev, duration: [...prev.duration, e.target.value] }
          })
        }
        else {
          const newObj = { ...filterObj, "duration": [] }
          setFilterObj(() => {
            return { ...newObj, duration: [...newObj.duration, e.target.value] }
          })
        }

      }
      else {
        setFilterObj((prev) => {
          return { ...prev, duration: [...prev.duration.filter((d) => { return d != e.target.value })] }
        })
        if (filterObj.duration.length <= 1) {
          const { duration, ...rest } = filterObj;
          setFilterObj(rest)
        }

      }
    }


    if (e.target.name === "sort") {

      if (filterType === "priceSort") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { ...rest.sort, ticketPrice: 1 } }
        setSortObj(ob)
      }


      if (filterType === "fastestSort") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { ...rest.sort, duration: 1 } }
        setSortObj(ob)
      }

      if (filterType === "departurePreferenceSort") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { ...rest.sort, departureTime: 1 } }
        setSortObj(ob)
      }

      if (filterType === "SmartSort") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { ...rest.sort, SmartSort: 1 } }
        setSortObj(ob)
      }
    }


  }

  const handleTicketPrice = (e) => {


    if ("ticketPrice" in filterObj) {

      setFilterObj((prev) => {
        return { ...prev, ticketPrice: { ...prev.ticketPrice, min: e[0], max: e[1] } }
      })
    }
    else {
      const newObj = { ...filterObj, "ticketPrice": {} }

      setFilterObj((prev) => {
        return { ...prev, ticketPrice: { ...prev.ticketPrice, min: e[0], max: e[1] } }
      })
    }
  }


  const getFilteredUrl = () => {


    const airlinesID = {
      "Air India": '65144a1b664a43628887c45d',
      "IndiGo Airline": '65144a1b664a43628887c45e',
      "SpiceJet": '65144a1b664a43628887c45f',
      "Vistara": '65144a1b664a43628887c460',
      "GoAir": '65144a1b664a43628887c461'
    }


    const str = Object.keys(filterObj).map((key) => {

      if (key === 'stops') {
        const stringifyedStopsValues = filterObj[key].map((stop) => {
          return `"${stop}"`
        })
        return `"stops":[${stringifyedStopsValues}]`
      }

      if (key === 'departureTime') {
        const stringifyedStopsValues = filterObj[key].map((departure) => {

          if (departure === 'EARLY_MORNING') { return `"$lte":"06","$gte":"0"` }
          if (departure === 'MORNING') { return `"$lte":"12","$gte":"06"` }
          if (departure === 'AFTERNOON') { return `"$lte":"18","$gte":"12"` }
          if (departure === 'NIGHT') { return `"$lte":"24","$gte":"18"` }

        })

        return `"departureTime":{${stringifyedStopsValues}}`
      }

      if (key === 'airlines') {
        const stringifyedStopsValues = filterObj[key].map((airline) => {
          return `"${airlinesID[airline]}"`
        })

        return `"airline":[${stringifyedStopsValues}]`
      }

      if (key === 'duration') {
        const stringifyedStopsValues = filterObj[key].map((duration) => {
          return `"${duration}"`
        })

        return `"duration":[${stringifyedStopsValues}]`
      }

      if (key === 'ticketPrice') {


        const str = Object.keys(filterObj[key]).map((k) => {


          if (k === 'min') {
            return `"$gte":${minmax[0]}`;
          }
          if (k === 'max') {
            return `"$lte":${minmax[1]}`
          }

        })

        return `"ticketPrice":{${str}}`
      }

    })

    let sortStr = [];
    if ("sort" in sortObj) {
      sortStr = Object.keys(sortObj.sort).map((key) => {
        return `"${key}":"${sortObj.sort[key]}"`
      })


    }

    const filterString = str.join(",");
    const sortString = sortStr.join(',');
    const url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${from.iata_code}","destination":"${to.iata_code}"}&day=${weekDays[date.getDay()]}&filter={${filterString}}&sort={${sortString}}`;





    return url




  }


  const getOffers = async () => {


    const projectId = '8bropwptza4g';
    const baseUrl = 'https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"FLIGHTS"} ';

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

  const generateDateArray = () => {
    const dates = [];
    let currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 30);

    while (currentDate <= endDate) {
      dates.push(currentDate.toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDateArray(dates);
  };

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

  const addClass = (id, property) => {
    document.getElementById(id).classList.add(property)
  }

  const removeClass = (id, property) => {
    document.getElementById(id).classList.remove(property)
  }




  return (

    <>
     
      <div id='login' className={`${popupShow == 'signinShow' ? 'block' : 'hidden'} relative`}>
        <Login setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow} />
      </div>

      <div id='signup' className={`${popupShow == "signupShow" ? 'block' : 'hidden'} relative`}>
        <Signup setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow} />
      </div>


      <div className="bg-neutral-60 h-screen w-screen flex flex-col justify-center items-center">



        <div id='scrollable' className="ROOT COMPONENT bg-neutral-60 w-full  mx-[100px]  overflow-y-auto no-scrollbar  flex flex-col items-center  ">

          <input id='searchbardropdowncheckbox' type="checkbox" className='peer absolute opacity-0' />

          <label htmlFor='searchbardropdowncheckbox' className='relative sticky top-0 z-40 flex flex-col border shadow bg-gray-400 font-bold rounded-20 text-sm px-12 py-2 mt-2'>
            <span className='flex justify-center items-center gap-2'> { from.city} <FaArrowRight /> {to.city} </span>
            <span className='flex justify-center items-center gap-2'>{date.getDay()} {month[date.getMonth()]} <p className='w-1 h-1 bg-black rounded-full'/> {adults+childrens+infants} Travellers  <p className='w-1 h-1 bg-black rounded-full'/> {seatClass} </span>
            <span className='absolute -bottom-3 left-[45%]'>{<RiArrowDropDownLine className='text-2xl' />}</span>
          </label>

          <div className="SEARCHBAR-RELATIVE-CONTAINER  bg-transparent rounded-20 absolute transition-all ease-in-out duration-700 transform -top-[100%] peer-checked:top-1 flex justify-center items-start w-[100%] xl:mt-6  z-40">

          <span className='absolute right-2 top-1 w-[20px] h-[20px]' onClick={()=>{document.getElementById('searchbardropdowncheckbox').checked=false}}><IoCloseCircleSharp className='w-full h-full'/></span>

            <div className="xl:shadow  xl:border-none w-[98%] p-20 flex flex-col gap-10 rounded-20 bg-slate-400 undefined">

                {/* TYPE OF TRIP AND AUTO SCROLLING HEADING CONTAINER STARTS */}
                <div className="flex justify-center items-center">

                  <p className='font-semibold'>Modify Flight Search</p>
                 
                    {/* AUTO SCROLLING HEADINGS CONTAINER STARTS */}
                    <div className=" hidden xl:block h-[20px] overflow-y-auto no-scrollbar" >
                        <div className="style_scrollingWordBox__F_1N8">
                            <ul className="style_scrollingWordBoxUlInput__efDeh scrollingContainer ">
                                <li className="style_scrollingWordBoxUlListInput__1zls5 !justify-end ">
                                    <p className="body-sm flex items-center gap-5 ">
                                        <IoCall />
                                        24x7 Customer Support
                                    </p>
                                </li>
                                <li className="style_scrollingWordBoxUlListInput__1zls5 !justify-end">
                                    <p className="body-sm flex items-center gap-5">
                                        <FaThumbsUp />
                                        Hassle-Free Bookings
                                    </p>
                                </li>
                                <li className="style_scrollingWordBoxUlListInput__1zls5 !justify-end">
                                    <p className="body-sm flex items-center gap-5">
                                        <BiSolidOffer />
                                        Best Flight Offers
                                    </p>
                                </li>
                                <li className="style_scrollingWordBoxUlListInput__1zls5 !justify-end">
                                    <p className="body-sm flex items-center gap-5">
                                        <FaThumbsUp />
                                        Hassle-Free Bookings
                                    </p>
                                </li>
                                <li className="style_scrollingWordBoxUlListInput__1zls5 !justify-end">
                                    <p className="body-sm flex items-center gap-5">
                                        <IoCall />
                                        24x7 Customer Support
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* AUTO SCROLLING HEADINGS CONTAINER ENDS */}

                </div>
                {/* TYPE OF TRIP AND AUTO SCROLLING HEADING CONTAINER ENDS */}

                {/* SEARCHBAR START */}
                <div className=" flex flex-col gap-1 cursor-pointer ">


                    <div className="relative  flex justify-between gap-0.5 flex-1">

                        <div className="INPUT FROM bg-charcoal-40 flex items-center relative w-[50%] h-[50px] hover:bg-neutral-subtle-over border-none rounded-l-10">

                            {/* INPUT TAG FROM */}
                            <div className="flex  justify-between items-center relative w-full h-full" onClick={() => { show("inputBox1"); hide('inputSpan1'); focus('inputBox1'); hide("trevellersDropdown"); }}>
                                <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 " >
                                    <div className="flex items-center " >
                                        <div className="flex flex-col">
                                            <p className="body-xs  text-neutral-400" >From</p>
                                            <span id='inputSpan1' className=' text-sm xl:text-lg  font-semibold outline-none bg-transparent ' >{from && `${from.iata_code} - ${from.city}`}</span>
                                            <input type="text" id='inputBox1' className='hidden w-full text-lg font-semibold outline-none bg-transparent' autoComplete='off' value={from.city} onClick={() => { show("list1") }} onChange={(e) => { setFrom(e.target.value) }} onFocus={(e) => { e.target.select(); show("list1"); hide("list2"); hide('inputBox2'); show('inputSpan2') }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* INPUT TAG FROM */}


                            {/* INPUT LIST FROM */}
                            {
                                <div id='list1' className="hidden overflow-y-scroll absolute top-[61px] bg-white w-[200%] lg:w-[375px] min-h-[70px] max-h-[450px] shadow-500 z-20 rounded-10  !animate-none no-scrollbar  Autocompleter_animate__zqRDe">
                                   
                                    <div>
                                        <p className="h6 px-20 pt-15 pb-5 font-medium">
                                            Select Airport
                                        </p>
                                    </div>
                                    {
                                        fromCities.map((city, index) => {
                                            const cityCode = city.iata_code;
                                            const cityName = city.city;
                                            const country = city.country;
                                            const airportName = city.name;


                                            return <div key={index} onClick={() => { setFrom(city); hide("list1"); hide("inputBox1"); show("inputSpan1"); show('inputBox2'); focus("inputBox2") }}>
                                                <li className="flex items-center relative hover:bg-primary-over px-20  gap-10 group list-sm max-w-screen-sm gap-15 py-2  " >
                                                    <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[30px] w-[30px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded" >
                                                        <span className="text-primary text-xs" >{cityCode}</span>
                                                    </div>
                                                    <div className="flex flex-col flex-auto  group-[.list-sm]:py-[1px] p-0 gap-[3px]  truncate" >
                                                        <p className="body-md flex group-[.list-lg]:body-lg text-primary" >
                                                            <span className="block truncate text-xs" >
                                                                {cityName}, {country}
                                                            </span>
                                                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                                                        </p>
                                                        <p className="body-sm text-secondary text-xs" >
                                                            {airportName}
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

                        <div className=" INPUT TO bg-charcoal-40 flex items-center relative w-[50%] h-[50px] hover:bg-neutral-subtle-over border-none rounded-r-10 xl:rounded-none">

                            {/* INPUT TAG TO */}
                            <div className="flex justify-between items-center relative w-full h-full pl-10 block" onClick={() => { show("inputBox2"); hide('inputSpan2'); focus('inputBox2'); hide('inputBox1'); show("inputSpan1"); hide("trevellersDropdown"); }} >
                                <div className="flex-1 h-full flex flex-col justify-center px-15  " >
                                    <div className="flex items-center " >
                                        <div className="flex flex-col">
                                            <p className="body-xs text-neutral-400">To</p>
                                            <span id='inputSpan2' className='  text-sm xl:text-lg   font-semibold outlin bg-transparent ' >{to && `${to.iata_code} - ${to.city}`}</span>
                                            <input id='inputBox2' type="text" className=' hidden text-lg  w-[100%] font-semibold outline-none bg-transparent ' autoComplete='off' value={to.city} onClick={() => { show("list2") }} onChange={(e) => { setTo(e.target.value) }} onFocus={(e) => { e.target.select(); show("list2"); hide('inputSpan2'); hide('list1'); }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* INPUT TAG TO */}


                            {/* INPUT LIST TO */}
                            <div id='list2' className=" hidden overflow-y-scroll absolute top-[61px] right-0 bg-white w-[200%] lg:w-[375px] min-h-[150px] max-h-[450px] shadow-500 z-20 rounded-10 !animate-none no-scrollbar  Autocompleter_animate__zqRDe">
                              
                                <div>
                                    <p className="h6 px-20 pt-15 pb-5 font-medium">
                                        Select Airport
                                    </p>
                                </div>
                                {
                                    toCities.map((city, index) => {
                                        const cityCode = city.iata_code;
                                        const cityName = city.city;
                                        const country = city.country;
                                        const airportName = city.name;

                                        return <div key={index} onClick={() => { setTo(city); show("inputSpan2"); hide("list2"); hide("inputBox2"); document.getElementById("datePicker").focus() }}>
                                            <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-1 ">
                                                <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[30px] w-[30px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded">
                                                    <span className="text-primary text-xs">{cityCode}</span>
                                                </div>
                                                <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                                                    <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                                        <span className="block truncate text-xs">
                                                            {cityName}, {country}
                                                        </span>
                                                        <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                                                    </p>
                                                    <p className="body-sm text-secondary text-xs">
                                                        {airportName}
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

                    <div className=" DATE PICKER AND RETURN flex items-center justify-between rounded-10 xl:rounded-none relative w-full h-[50px] gap-0.5 overflow-visible  ">

                        {/* DATE PICKER */}
                        <div className=" DATE PICKER bg-charcoal-40 hover:bg-neutral-subtle-over w-full rounded-10 xl:rounded-none" onClick={() => { focus("datePicker"); hide("list1"); hide("list2"); hide('inputBox1'); hide('inputBox2'); show('inputSpan1'); show('inputSpan2'); }}>
                            <div className="flex justify-between items-center relative w-full h-full justify-center border-b-4 lg:min-h-[60px] border-transparent">
                                <div className="flex-1 h-full flex flex-col justify-center px-15 py-1 ">
                                    <div className="flex items-center ">
                                        <div className="flex flex-col" >
                                            <p className="body-xs text-neutral-400">Departure</p>
                                            <div id='datePickerDiv' className='' ><DatePicker id='datePicker' className='h6 max-w-[190px] truncate text-primary font-medium font-medium outline-none bg-transparent' value={`${weekDays[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`} selected={date} onChange={(d) => { setDate(d); hide("datePicker"); show("trevellersDropdown") }} formatDate="DD/MM/YYY" minDate={new Date()} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* DATE PICKER */}

                    </div>

                    {/* TRAVELLERS & CLASS */}
                    <div className="relative overflow-visible">

                        <div className="flex justify-between items-center relative rounded-10 xl:rounded-none bg-charcoal-40 hover:bg-neutral-subtle-over border-b-4 py-0.5  border-transparent " onClick={() => { document.getElementById("trevellersDropdown").classList.toggle("hidden"); hide('inputBox1'); hide('inputBox2'); hide('list1'); hide('list2'); show('inputSpan1'); show('inputSpan2') }} >
                            <div className="flex-1 h-full flex flex-col justify-center px-15 py-1 ">
                                <div className="flex items-center !border-none">
                                    <div className="flex flex-col">
                                        <p className="body-xs text-neutral-400"> Travellers &amp; Class </p>
                                        <p className="h6 max-w-[190px] truncate text-primary " > {adults + childrens + infants} Traveller, {seatClass} </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id='trevellersDropdown' className="DROPDOWN hidden w-[100%] absolute xl:top-[61px] xl:right-[150px] bg-white rounded-20 xl:w-[450px] shadow z-30">
                            <div className="xl:relative">
                                <h6 className="font-semibold pt-20 pb-10 px-20 ">Travellers</h6>
                                <div className="TRAVELLERS AND CLASS flex flex-col  overflow-y-scroll no-scrollbar">

                                    <div className="ADULTS flex justify-between max-w-full px-20  ">
                                        <div className="flex items-center  justify-between gap-1">
                                            <p className="text-sm text-primary font-normal">Adults</p>
                                            <p className="text-xs text-secondary font-normal">(12 yrs or above)</p>
                                        </div>
                                        <div className="mt-10 xl:mt-0 xl:justify-start xl:items-start xl:flex-1">
                                            <div className=" flex gap-2">

                                                {
                                                    [1, 2, 3, 4].map((num, index) => {
                                                        return <button key={index} className={`py-1 px-1 rounded-5  w-6 ${index + 1 == adults ? "bg-selection-solid text-selection-solid" : ""}`} onClick={() => { setAdults(num) }}> {num} </button>
                                                    })
                                                }


                                            </div>
                                        </div>
                                    </div>
                                    <div className="CHILDREN flex justify-between  max-w-full px-20 ">
                                        <div className="flex items-center justify-between gap-1">
                                            <p className="text-sm text-primary font-normal">Children</p>
                                            <p className="text-xs text-secondary font-normal">(2 - 12 yrs)</p>
                                        </div>
                                        <div className="mt-10 xl:mt-0 xl:justify-start xl:items-start xl:flex-1">
                                            <div className="flex gap-2">
                                                {
                                                    [0, 1, 2, 3].map((num, index) => {
                                                        return <button key={index} className={`py-1 px-1 rounded-5  w-6 ${index == childrens ? "bg-selection-solid text-selection-solid" : ""}`} onClick={() => { setChildrens(num) }}> {num} </button>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="INFANTS flex justify-between  max-w-full px-20 ">
                                        <div className="flex items-center justify-between gap-1">
                                            <p className="text-sm text-primary font-normal">Infants</p>
                                            <p className="text-xs text-secondary font-normal">(0 - 2 yrs)</p>
                                        </div>
                                        <div className="mt-10 xl:mt-0 xl:justify-start xl:items-start xl:flex-1">
                                            <div className="flex gap-2">
                                                {
                                                    [0, 1, 2, 3].map((num, index) => {
                                                        return <button key={index} className={`py-1 px-1 rounded-5 w-6 ${index == infants ? "bg-selection-solid text-selection-solid" : ""}`} onClick={() => { setInfants(num) }}> {num} </button>
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className="PLANNING A TRIP hidden xl:block px-20">
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
                                    <div className="CLASS p-4 ">
                                    <h6 className="font-semibold pt-20 pb-10 px-1 ">Class</h6>
                                        <div className="flex gap-10">
                                            {
                                                ["Economy", "Premium Economy", "Business"].map((e, index) => {
                                                    return <div key={index} className={`inline-flex items-center font-normal w-fit border cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] ${e === seatClass ? "bg-selection-solid text-selection-solid border-none" : ""}`} onClick={() => { setSeatClass(e) }}>
                                                        <p className="text-xs px-5">{e}</p>
                                                    </div>
                                                })
                                            }

                                        </div>
                                    </div>

                                </div>
                                <div className="BUTTON flex  bottom-0 gap-5 pt-[9px] pb-10 px-20 border-t border-neutral-100 w-full justify-end relative">
                                    <button className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-[3px] rounded-10 min-h-[40px] button-md py-2 px-10 xl:w-[81px]" onClick={() => { hide('trevellersDropdown') }}>
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* TRAVELLERS & CLASS */}

                    {/* SEARCH BUTTON */}
                    <button id='searchBtn' className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-5 rounded-10 min-h-[30px] button-lg py-3 px-15 xl:rounded-none xl:rounded-r-[10px] text-2xl xl:w-[160px] pl-[25px] " onClick={() => { from.city && to.city != undefined ? (from.city === to.city ? alert("Source and destination cannot be same") : `${getFlights()} ${document.getElementById('searchbardropdowncheckbox').checked=false} `) : alert("All fields are required") }}>
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

                {/* SPECIAL FARE START */}
                <div className="border-none hidden xl:block pb-0 pl-0 h-40 pt-10 ">
                    <div className="flex gap-10 !flex-row justify-start">
                        <div className="flex gap-5 items-center relative">
                            <p className="body-md flex text-primary gap-[3px] font-medium">
                                Special Fares{" "}
                                <span className="font-normal text-secondary">(Optional)</span>
                                <span className="block text-secondary">:</span>
                            </p>
                        </div>
                        <div className="flex gap-10 overflow-x-scroll no-scrollbar xl:gap-15">
                            <div className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid shrink-0">
                                <p className="body-sm px-5">Student</p>
                            </div>
                            <div className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid shrink-0">
                                <p className="body-sm px-5">Senior Citizen</p>
                            </div>
                            <div className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid shrink-0">
                                <p className="body-sm px-5">Armed Forces</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SPECIAL FARE END */}

            </div>

          </div>


          <div className="SEARCHBAR hidden xl:flex  w-[100%] pb-20 px-20 flex-col gap-10  bg-white sticky top-0 z-40 mt-[0px]">

            {/* TYPE OF TRIP AND AUTO SCROLLING HEADING CONTAINER STARTS */}
            <div className="flex h-4 justify-between items-center">


            </div>
            {/* TYPE OF TRIP AND AUTO SCROLLING HEADING CONTAINER ENDS */}

            {/* SEARCHBAR START */}
            <div className="flex gap-0.5 cursor-pointer h-[60px]">


              <div className="relative flex gap-0.5 flex-1">

                <div className="INPUT FROM bg-charcoal-40 flex items-center relative w-full h-[60px] hover:bg-neutral-subtle-over border-none rounded-l-10">

                  {/* INPUT TAG FROM */}
                  <div className="flex  justify-between items-center relative w-full h-full" onClick={() => { show("inputBox1"); hide('inputSpan1'); focus('inputBox1'); hide("trevellersDropdown"); }}>
                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 " >
                      <div className="flex items-center " >
                        <div className="flex flex-col">
                          <p className="body-xs  text-neutral-400" >From</p>
                          <span id='inputSpan1' className=' w- text-lg  font-semibold outline-none bg-transparent ' >{from && `${from.iata_code} - ${from.city}`}</span>
                          <input type="text" id='inputBox1' className='hidden w-full text-lg font-semibold outline-none bg-transparent' value={from.city} onClick={() => { show("list1") }} onChange={(e) => { setFrom(e.target.value) }} onFocus={(e) => { e.target.select(); show("list1"); hide("list2"); hide('inputBox2'); show('inputSpan2') }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* INPUT TAG FROM */}


                  {/* INPUT LIST FROM */}
                  {
                    <div id='list1' className="hidden overflow-y-scroll absolute top-[61px] bg-white w-[375px] min-h-[150px] max-h-[450px] shadow-500 z-20 rounded-20  !animate-none no-scrollbar  Autocompleter_animate__zqRDe">
                      <div>
                        <p className="h6 px-20 pt-15 pb-5 font-medium">
                          Recent Searches
                        </p>
                      </div>
                      <div>
                        <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                          <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                            <svg
                              width="1em"
                              height="1em"
                              fontSize="1.5rem"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              data-testid="ScheduleIcon"
                              style={{
                                userSelect: "none",
                                display: "inline-block"
                              }}
                            >
                              <path d="M12.7358 7.98a.75.75 0 0 0-1.5 0v4.9844c0 .1989.0791.3897.2197.5303l2.2749 2.2749a.75.75 0 0 0 1.0606 0 .75.75 0 0 0 0-1.0606l-2.0552-2.0552V7.98Z" />
                              <path
                                fillRule="evenodd"
                                d="M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9Zm-1.5 0c0 4.1421-3.3579 7.5-7.5 7.5S4.5 16.1421 4.5 12 7.8579 4.5 12 4.5s7.5 3.3579 7.5 7.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                            <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                              <span className="flex items-center gap-[3px]">
                                PNQ
                                <svg
                                  width="1em"
                                  height="1em"
                                  fontSize="1.5rem"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  data-testid="ArrowRightIcon"
                                  style={{
                                    userSelect: "none",
                                    display: "inline-block"
                                  }}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18.7669 12a.725.725 0 0 1-.2127.5131l-6.0481 6.0425a.7254.7254 0 0 1-1.0253-1.0262l4.8085-4.8041H5.9585a.7253.7253 0 1 1 0-1.4506h10.3308l-4.8085-4.8041a.7253.7253 0 1 1 1.0253-1.0262l6.0481 6.0425a.725.725 0 0 1 .2127.5131Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                HYD
                              </span>
                              <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                            </p>
                            <p className="body-sm text-secondary">
                              <span className="block truncate">
                                Sat, 06 Apr • 1 Traveller • Economy
                              </span>
                            </p>
                          </div>
                        </li>
                        <div className="border-b border-neutral-100 mx-20" />
                      </div>
                      <div>
                        <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                          <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                            <svg
                              width="1em"
                              height="1em"
                              fontSize="1.5rem"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              data-testid="ScheduleIcon"
                              style={{
                                userSelect: "none",
                                display: "inline-block"
                              }}
                            >
                              <path d="M12.7358 7.98a.75.75 0 0 0-1.5 0v4.9844c0 .1989.0791.3897.2197.5303l2.2749 2.2749a.75.75 0 0 0 1.0606 0 .75.75 0 0 0 0-1.0606l-2.0552-2.0552V7.98Z" />
                              <path
                                fillRule="evenodd"
                                d="M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9Zm-1.5 0c0 4.1421-3.3579 7.5-7.5 7.5S4.5 16.1421 4.5 12 7.8579 4.5 12 4.5s7.5 3.3579 7.5 7.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                            <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                              <span className="flex items-center gap-[3px]">
                                PNQ
                                <svg
                                  width="1em"
                                  height="1em"
                                  fontSize="1.5rem"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  data-testid="ArrowRightIcon"
                                  style={{
                                    userSelect: "none",
                                    display: "inline-block"
                                  }}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18.7669 12a.725.725 0 0 1-.2127.5131l-6.0481 6.0425a.7254.7254 0 0 1-1.0253-1.0262l4.8085-4.8041H5.9585a.7253.7253 0 1 1 0-1.4506h10.3308l-4.8085-4.8041a.7253.7253 0 1 1 1.0253-1.0262l6.0481 6.0425a.725.725 0 0 1 .2127.5131Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                HYD
                              </span>
                              <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                            </p>
                            <p className="body-sm text-secondary">
                              <span className="block truncate">
                                Fri, 29 Mar • 1 Traveller • Economy
                              </span>
                            </p>
                          </div>
                        </li>
                      </div>
                      <div>
                        <p className="h6 px-20 pt-15 pb-5 font-medium">
                          Popular Airports
                        </p>
                      </div>
                      {
                        fromCities.map((city, index) => {
                          const cityCode = city.iata_code;
                          const cityName = city.city;
                          const country = city.country;
                          const airportName = city.name;


                          return <div key={index} onClick={() => { setFrom(city); hide("list1"); hide("inputBox1"); show("inputSpan1"); show('inputBox2'); focus("inputBox2") }}>
                            <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 " >
                              <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10" >
                                <span className="text-primary text-sm" >{cityCode}</span>
                              </div>
                              <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate" >
                                <p className="body-md flex group-[.list-lg]:body-lg text-primary" >
                                  <span className="block truncate" >
                                    {cityName}, {country}
                                  </span>
                                  <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                                </p>
                                <p className="body-sm text-secondary" >
                                  {airportName}
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

                <div className=" INPUT TO bg-charcoal-40 flex items-center relative w-full h-[60px] hover:bg-neutral-subtle-over border-none ">

                  {/* INPUT TAG TO */}
                  <div className="flex justify-between items-center relative w-full h-full pl-10 block" onClick={() => { show("inputBox2"); hide('inputSpan2'); focus('inputBox2'); hide('inputBox1'); show("inputSpan1"); hide("trevellersDropdown"); }} >
                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 " >
                      <div className="flex items-center " >
                        <div className="flex flex-col">
                          <p className="body-xs text-neutral-400">To</p>
                          <span id='inputSpan2' className='  w- text-lg  font-semibold outline-none bg-transparent ' >{to && `${to.iata_code} - ${to.city}`}</span>
                          <input id='inputBox2' type="text" className=' hidden text-lg font-semibold outline-none bg-transparent ' value={to.city} onChange={(e) => { setTo(e.target.value) }} onFocus={(e) => { e.target.select(); show("list2"); hide('inputSpan2'); hide('list1'); }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* INPUT TAG TO */}


                  {/* INPUT LIST TO */}
                  <div id='list2' className=" hidden overflow-y-scroll absolute top-[61px] bg-white w-[375px] min-h-[150px] max-h-[450px] shadow-500 z-20 rounded-20 !animate-none no-scrollbar  Autocompleter_animate__zqRDe">
                    <div>
                      <p className="h6 px-20 pt-15 pb-5 font-medium">
                        Recent Searches
                      </p>
                    </div>
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <svg
                            width="1em"
                            height="1em"
                            fontSize="1.5rem"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            data-testid="ScheduleIcon"
                            style={{
                              userSelect: "none",
                              display: "inline-block"
                            }}
                          >
                            <path d="M12.7358 7.98a.75.75 0 0 0-1.5 0v4.9844c0 .1989.0791.3897.2197.5303l2.2749 2.2749a.75.75 0 0 0 1.0606 0 .75.75 0 0 0 0-1.0606l-2.0552-2.0552V7.98Z" />
                            <path
                              fillRule="evenodd"
                              d="M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9Zm-1.5 0c0 4.1421-3.3579 7.5-7.5 7.5S4.5 16.1421 4.5 12 7.8579 4.5 12 4.5s7.5 3.3579 7.5 7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="flex items-center gap-[3px]">
                              PNQ
                              <svg
                                width="1em"
                                height="1em"
                                fontSize="1.5rem"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                data-testid="ArrowRightIcon"
                                style={{
                                  userSelect: "none",
                                  display: "inline-block"
                                }}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18.7669 12a.725.725 0 0 1-.2127.5131l-6.0481 6.0425a.7254.7254 0 0 1-1.0253-1.0262l4.8085-4.8041H5.9585a.7253.7253 0 1 1 0-1.4506h10.3308l-4.8085-4.8041a.7253.7253 0 1 1 1.0253-1.0262l6.0481 6.0425a.725.725 0 0 1 .2127.5131Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              HYD
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">
                            <span className="block truncate">
                              Sat, 06 Apr • 1 Traveller • Economy
                            </span>
                          </p>
                        </div>
                      </li>
                      <div className="border-b border-neutral-100 mx-20" />
                    </div>
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <svg
                            width="1em"
                            height="1em"
                            fontSize="1.5rem"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            data-testid="ScheduleIcon"
                            style={{
                              userSelect: "none",
                              display: "inline-block"
                            }}
                          >
                            <path d="M12.7358 7.98a.75.75 0 0 0-1.5 0v4.9844c0 .1989.0791.3897.2197.5303l2.2749 2.2749a.75.75 0 0 0 1.0606 0 .75.75 0 0 0 0-1.0606l-2.0552-2.0552V7.98Z" />
                            <path
                              fillRule="evenodd"
                              d="M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9Zm-1.5 0c0 4.1421-3.3579 7.5-7.5 7.5S4.5 16.1421 4.5 12 7.8579 4.5 12 4.5s7.5 3.3579 7.5 7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="flex items-center gap-[3px]">
                              PNQ
                              <svg
                                width="1em"
                                height="1em"
                                fontSize="1.5rem"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                data-testid="ArrowRightIcon"
                                style={{
                                  userSelect: "none",
                                  display: "inline-block"
                                }}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18.7669 12a.725.725 0 0 1-.2127.5131l-6.0481 6.0425a.7254.7254 0 0 1-1.0253-1.0262l4.8085-4.8041H5.9585a.7253.7253 0 1 1 0-1.4506h10.3308l-4.8085-4.8041a.7253.7253 0 1 1 1.0253-1.0262l6.0481 6.0425a.725.725 0 0 1 .2127.5131Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              HYD
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">
                            <span className="block truncate">
                              Fri, 29 Mar • 1 Traveller • Economy
                            </span>
                          </p>
                        </div>
                      </li>
                    </div>
                    <div>
                      <p className="h6 px-20 pt-15 pb-5 font-medium">
                        Popular Airports
                      </p>
                    </div>
                    {
                      toCities.map((city, index) => {
                        const cityCode = city.iata_code;
                        const cityName = city.city;
                        const country = city.country;
                        const airportName = city.name;

                        return <div key={index} onClick={() => { setTo(city); show("inputSpan2"); hide("list2"); hide("inputBox2"); document.getElementById("datePicker").focus() }}>
                          <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                            <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                              <span className="text-primary text-sm">{cityCode}</span>
                            </div>
                            <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                              <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                <span className="block truncate">
                                  {cityName}, {country}
                                </span>
                                <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                              </p>
                              <p className="body-sm text-secondary">
                                {airportName}
                              </p>
                            </div>
                          </li>
                          <div className="border-b border-neutral-100 mx-20" />
                        </div>
                      })
                    }
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <span className="text-primary text-sm">BOM</span>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="block truncate">
                              Mumbai, Maharashtra, India
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">
                            Chatrapati Shivaji International Airport
                          </p>
                        </div>
                      </li>
                      <div className="border-b border-neutral-100 mx-20" />
                    </div>
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <span className="text-primary text-sm">HYD</span>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="block truncate">
                              Hyderabad, Telangana, India
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">
                            Rajiv Gandhi International Airport
                          </p>
                        </div>
                      </li>
                      <div className="border-b border-neutral-100 mx-20" />
                    </div>
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <span className="text-primary text-sm">BLR</span>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="block truncate">
                              Bengaluru, Karnataka, India
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">
                            Kempegowda International Airport
                          </p>
                        </div>
                      </li>
                      <div className="border-b border-neutral-100 mx-20" />
                    </div>
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <span className="text-primary text-sm">MAA</span>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="block truncate">
                              Chennai, Tamil Nadu, India
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">
                            Chennai International Airport
                          </p>
                        </div>
                      </li>
                      <div className="border-b border-neutral-100 mx-20" />
                    </div>
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <span className="text-primary text-sm">GOI</span>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="block truncate">
                              Goa, Goa, India
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">
                            Dabolim Airport
                          </p>
                        </div>
                      </li>
                      <div className="border-b border-neutral-100 mx-20" />
                    </div>
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <span className="text-primary text-sm">DXB</span>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="block truncate">
                              Dubai, Dubayy, United Arab Emirates
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">
                            Dubai International Airport
                          </p>
                        </div>
                      </li>
                      <div className="border-b border-neutral-100 mx-20" />
                    </div>
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <span className="text-primary text-sm">SIN</span>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="block truncate">
                              Singapore, Singapore
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">Changi</p>
                        </div>
                      </li>
                      <div className="border-b border-neutral-100 mx-20" />
                    </div>
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <span className="text-primary text-sm">BKK</span>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="block truncate">
                              Bangkok, Bangkok, Thailand
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">
                            Suvarnabhumi Airport
                          </p>
                        </div>
                      </li>
                      <div className="border-b border-neutral-100 mx-20" />
                    </div>
                    <div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center border border-neutral-100 bg-neutral-40 rounded-10">
                          <span className="text-primary text-sm">KUL</span>
                        </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                            <span className="block truncate">
                              Kuala Lumpur, Kuala Lumpur, Malaysia
                            </span>
                            <span className="body-xs ml-auto group-[.list-lg]:body-sm text-secondary" />
                          </p>
                          <p className="body-sm text-secondary">
                            Kuala Lumpur Intl
                          </p>
                        </div>
                      </li>
                      <div className="border-b border-neutral-100 mx-20" />
                    </div>
                  </div>
                  {/* INPUT LIST TO */}

                </div>

                {/* SWAP BUTTON */}

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
                {/* SWAP BUTTON */}



              </div>

              <div className=" DATE PICKER AND RETURN flex items-center justify-between border-none relative w-[320px] gap-0.5 overflow-visible calendarInput">

                {/* DATE PICKER */}
                <div className=" DATE PICKER bg-charcoal-40 hover:bg-neutral-subtle-over w-full" onClick={() => { focus("datePicker"); hide("list1"); hide("list2"); hide('inputBox1'); hide('inputBox2'); show('inputSpan1'); show('inputSpan2'); }}>
                  <div className="flex justify-between items-center relative w-full h-[60px] justify-center border-b-4 lg:min-h-[60px] border-transparent">
                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                      <div className="flex items-center ">
                        <div className="flex flex-col" >
                          <p className="body-xs text-neutral-400">Departure</p>
                          <div id='datePickerDiv' className='' ><DatePicker id='datePicker' className='h6 max-w-[190px] truncate text-primary font-medium font-medium outline-none bg-transparent' value={`${weekDays[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`} selected={date} onChange={(d) => { setDate(d); hide("datePicker"); show("trevellersDropdown") }} formatDate="DD/MM/YYY" minDate={new Date()} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* DATE PICKER */}



                {/* RETURN */}
                <div className="bg-charcoal-40 border-charcoal-40 hover:bg-neutral-subtle-over hover:border-contrast w-full">
                  <div className="flex justify-between items-center relative w-full h-[60px] justify-center border-b-4 lg:min-h-[60px] border-transparent">
                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                      <div className="flex items-center ">
                        <div className="flex flex-col">
                          <p
                            data-testid="returnDate"
                            className="h6 max-w-[190px] truncate text-secondary font-normal font-medium"
                          >
                            <span className="absolute top-20">Return</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* RETURN */}


              </div>

              {/* TRAVELLERS & CLASS */}
              <div className="relative overflow-visible">

                <div className="flex justify-between items-center relative w-[220px] bg-charcoal-40 hover:bg-neutral-subtle-over border-b-4 py-0.5 flex justify-center md:h-full h-full  border-transparent " onClick={() => { document.getElementById("trevellersDropdown").classList.toggle("hidden"); hide('inputBox1'); hide('inputBox2'); hide('list1'); hide('list2'); show('inputSpan1'); show('inputSpan2') }} >
                  <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                    <div className="flex items-center !border-none">
                      <div className="flex flex-col">
                        <p className="body-xs text-neutral-400"> Travellers &amp; Class </p>
                        <p className="h6 max-w-[190px] truncate text-primary font-medium font-medium" > {adults + childrens + infants} Traveller, {seatClass} </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id='trevellersDropdown' className="DROPDOWN hidden absolute top-[61px] -right-[150px] bg-white rounded-20 w-[450px] shadow-500 z-30">
                  <div className="xl:relative">
                    <h6 className="h6 pt-20 pb-10 px-20 font-medium">Travellers</h6>
                    <div className="TRAVELLERS AND CLASS flex flex-col  h-[352px] overflow-y-scroll no-scrollbar">

                      <div className="ADULTS flex  max-w-full px-20 py-10 ">
                        <div className="flex items-center justify-between xl:flex-col xl:items-start xl:justify-start xl:w-[95px]">
                          <p className="body-md text-primary font-normal">Adults</p>
                          <p className="body-xs text-secondary font-normal">12 yrs or above</p>
                        </div>
                        <div className="mt-10 xl:mt-0 xl:justify-start xl:items-start xl:flex-1">
                          <div className="">

                            {
                              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => {
                                return <button key={index} className={`py-1.5 px-2.5 rounded-10  min-w-[35px] ${index + 1 == adults ? "bg-selection-solid text-selection-solid" : ""}`} onClick={() => { setAdults(num) }}> {num} </button>
                              })
                            }


                          </div>
                        </div>
                      </div>
                      <div className="CHILDREN flex  max-w-full px-20 py-10">
                        <div className="flex items-center justify-between xl:flex-col xl:items-start xl:justify-start xl:w-[95px]">
                          <p className="body-md text-primary font-normal">Children</p>
                          <p className="body-xs text-secondary font-normal">2 - 12 yrs</p>
                        </div>
                        <div className="mt-10 xl:mt-0 xl:justify-start xl:items-start xl:flex-1">
                          <div className="">
                            {
                              [0, 1, 2, 3, 4, 5, 6, 7].map((num, index) => {
                                return <button key={index} className={`py-1.5 px-2.5 rounded-10  min-w-[35px] ${index == childrens ? "bg-selection-solid text-selection-solid" : ""}`} onClick={() => { setChildrens(num) }}> {num} </button>
                              })
                            }
                          </div>
                        </div>
                      </div>
                      <div className="INFANTS flex  max-w-full px-20 py-10">
                        <div className="flex items-center justify-between xl:flex-col xl:items-start xl:justify-start xl:w-[95px]">
                          <p className="body-md text-primary font-normal">Infants</p>
                          <p className="body-xs text-secondary font-normal">0 - 2 yrs</p>
                        </div>
                        <div className="mt-10 xl:mt-0 xl:justify-start xl:items-start xl:flex-1">
                          <div className="">
                            {
                              [0, 1, 2, 3, 4].map((num, index) => {
                                return <button key={index} className={`py-1.5 px-2.5 rounded-10  min-w-[35px] ${index == infants ? "bg-selection-solid text-selection-solid" : ""}`} onClick={() => { setInfants(num) }}> {num} </button>
                              })
                            }

                          </div>
                        </div>
                      </div>
                      <div className="PLANNING A TRIP px-20 py-0">
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
                      <div className="CLASS p-20">
                        <p className="body-lg text-primary mb-10 font-normal">Class</p>
                        <div className="flex gap-10">
                          {
                            ["Economy", "Premium Economy", "Business"].map((e, index) => {
                              return <div key={index} className={`inline-flex items-center font-normal w-fit border cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] ${e === seatClass ? "bg-selection-solid text-selection-solid border-none" : ""}`} onClick={() => { setSeatClass(e) }}>
                                <p className="body-sm px-5">{e}</p>
                              </div>
                            })
                          }

                        </div>
                      </div>

                    </div>
                    <div className="BUTTON flex justify-between bottom-0 gap-5 pt-[9px] pb-10 px-20 border-t border-neutral-100 w-full xl:justify-end relative">
                      <button className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-[3px] rounded-10 min-h-[40px] button-md py-2 px-10 xl:w-[81px]" onClick={() => { hide('trevellersDropdown') }}>
                        Done
                      </button>
                    </div>
                  </div>
                </div>

              </div>
              {/* TRAVELLERS & CLASS */}

              {/* SEARCH BUTTON */}
              <button id='searchBtn' className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-5 rounded-10 min-h-[50px] button-lg py-[13px] px-15 rounded-none rounded-r-10 text-2xl w-[160px] pl-[25px] " onClick={() => { obj.from && obj.to != undefined ? (obj.from === obj.to ? alert("Source and destination cannot be same") : (navigate("/FlightResults", { state: obj }))) : alert("All fields are required"); getFlights() }}>
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

            {/* SPECIAL FARE START */}
            <div className="border-none pb-0 pl-0 h-40 pt-10 ">
              <div className="flex gap-10 !flex-row justify-start">
                <div className="flex gap-5 items-center relative">
                  <p className="body-md flex text-primary gap-[3px] font-medium">
                    Special Fares{" "}
                    <span className="font-normal text-secondary">(Optional)</span>
                    <span className="block text-secondary">:</span>
                  </p>
                </div>
                <div className="flex gap-10 overflow-x-scroll no-scrollbar xl:gap-15">
                  <div className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid shrink-0">
                    <p className="body-sm px-5">Student</p>
                  </div>
                  <div className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid shrink-0">
                    <p className="body-sm px-5">Senior Citizen</p>
                  </div>
                  <div className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid shrink-0">
                    <p className="body-sm px-5">Armed Forces</p>
                  </div>
                </div>
              </div>
            </div>
            {/* SPECIAL FARE END */}

          </div >

          <div id='mainScrollableContainer' className="MAIN CONTAINER  m-auto pb-[60px] w-screen px-1 xl:px-8">

            <div className="LEFT MIDDLE AND RIGHT CONTAINER DIV flex gap-20 mt-20 items-start w-full  min-h-screen ">

              <div className='LEFT CONTAINER border sticky -top-[390px] pb-10 hidden xl:flex' >
                <div className="bg-white rounded-10 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)] overflow-hidden filterContainer">
                  <div className="flex justify-between p-20 items-center">
                    <p className="body-md font-bold">Filters</p>
                    {/* if(document.getElementById('filterCheck1').checked==true ){ document.getElementById('filterCheck1').click() } */}


                    <p className="body-sm cursor-pointer text-brand-500 font-medium" onClick={() => { document.querySelectorAll('.filterCheckBox').forEach((i) => { if (i.checked) { i.click() } }); setFilterObj({}) }}> Clear All </p>
                  </div>
                  <div className="border-t border-neutraPral-100 mx-20" />
                  <div className="py-20">

                    <div id='stopsFilterContainer' className="STOPS FILTER DIV py-20 pt-0 pb-10">
                      <p className="body-lg px-20 pb-10">Stops</p>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm  max-w-screen-sm gap-15 !bg-transparent">
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary"> Non-Stop </p>
                        </div> <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary"> <input id='filterCheck1' className="filterCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer " type="checkbox" value={0} filtertype={'stops'} onChange={(e) => { handleFilterChange(e) }} /> <FaCheck className='text-blue-700 hidden peer-checked:inline-block' /> </span>
                      </li>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm  max-w-screen-sm gap-15 !bg-transparent">
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary"> 1 Stop </p>
                        </div> <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary"> <input className=" filterCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value={1} filtertype={'stops'} onChange={(e) => { handleFilterChange(e) }} /> <FaCheck className='text-blue-700 hidden peer-checked:inline-block' /> </span>
                      </li>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm  max-w-screen-sm gap-15 !bg-transparent">
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary"> 2+ Stops </p>
                        </div> <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary"> <input className=" filterCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value={2} filtertype={'stops'} onChange={(e) => { handleFilterChange(e) }} /> <FaCheck className='text-blue-700 hidden peer-checked:inline-block' /> </span>
                      </li>
                    </div>

                    <div className="PRICE FILTER DIV p-20  mb-40">
                      <p className="body-lg mb-30 xl:mb-8">Flight Price </p>
                      <div className="relative w-full max-w-full">
                        <div className="slider">  </div>

                        <div className="relative w-full ">
                          <div> <RangeSlider min={0} max={10000} value={val} onInput={(e) => { setval(e) }} onThumbDragEnd={(e) => { setminmax(val); handleTicketPrice(val) }} /> </div>
                          <div className="absolute left-0 text-secondary text-sm mt-20"> {val[0]} </div>
                          <div className="absolute right-0 text-secondary text-sm mt-20"> {val[1]} </div>
                        </div>
                      </div>
                    </div>

                    <div className="DEPARTURE FILTER DIV flex flex-col gap-30 px-20 pt-20 pb-30">
                      <div className="flex flex-col gap-10">
                        <p className="body-lg">Departure from New {from.city}</p>

                        <div className="flex pt-10 gap-15 w-full">

                          <div id='' className="relative flex flex-col justify-center items-center border rounded-10 px-15 py-10 w-full h-[57px] xl:h-[86px] bg-neutral-0 border-neutral-100" >
                            <span className=" shrink-0 opacity-0 inline-flex items-center justify-center w-full h-full rounded hover:bg-primary-over border border-primary w-full h-auto opacity-0">
                              <input className="filterCheckBox absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="EARLY_MORNING" filtertype={'departures'} onClick={(e) => { handleFilterChange(e); let ele = document.getElementById('earlyMorningDeparture'); ele.classList.toggle('bg-subbrand-50'); ele.classList.toggle('text-subbrand-500'); ele.classList.toggle('border-subbrand-500') }} />
                            </span>
                            <div id='earlyMorningDeparture' className=" w-full h-full flex flex-col justify-center items-center absolute text-center pointer-events-none rounded-lg border " >
                              <p className="body-sm">Early Morning</p>
                              <p className="body-xs ">Before 6AM</p>
                            </div>
                          </div>

                          <div id='morningDeparture' className="relative flex flex-col justify-center items-center border rounded-10 px-15 py-10 w-full h-[57px] xl:h-[86px] ">
                            <span className="shrink-0 inline-flex items-center justify-center w-0 h-0 rounded hover:bg-selection-solid-over text-selection-solid bg-selection-solid w-full h-auto opacity-100">
                              <input className="filterCheckBox group absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="MORNING" filtertype={'departures'} onClick={(e) => { handleFilterChange(e); let ele = document.getElementById('morningDeparture'); ele.classList.toggle('bg-subbrand-50'); ele.classList.toggle('text-subbrand-500'); ele.classList.toggle('border-subbrand-500') }} />
                            </span>
                            <div className="absolute text-center pointer-events-none">
                              <p className="body-sm  ">Morning</p>
                              <p className="body-xs ">6AM - 12PM</p>
                            </div>
                          </div>

                        </div>
                        <div className="flex pt-10 gap-15 w-full">

                          <div id='afternoonDeparture' className="relative flex flex-col justify-center items-center border rounded-10 px-15 py-10 w-full h-[57px] xl:h-[86px] bg-neutral-0 border-neutral-100">
                            <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary w-full h-auto opacity-0">
                              <input className="filterCheckBox absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="AFTERNOON" filtertype={'departures'} onClick={(e) => { handleFilterChange(e); let ele = document.getElementById('afternoonDeparture'); ele.classList.toggle('bg-subbrand-50'); ele.classList.toggle('text-subbrand-500'); ele.classList.toggle('border-subbrand-500') }} />
                            </span>
                            <div className="absolute text-center pointer-events-none" >
                              <p className="body-sm">Mid Day</p>
                              <p className="body-xs ">12PM - 6PM</p>
                            </div>
                          </div>

                          <div id='nightDeparture' className="relative flex flex-col justify-center items-center border rounded-10 px-15 py-10 w-full h-[57px] xl:h-[86px] bg-neutral-0 border-neutral-100">
                            <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary w-full h-auto opacity-0">
                              <input className="filterCheckBox absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="NIGHT" filtertype={'departures'} onClick={(e) => { handleFilterChange(e); let ele = document.getElementById('nightDeparture'); ele.classList.toggle('bg-subbrand-50'); ele.classList.toggle('text-subbrand-500'); ele.classList.toggle('border-subbrand-500') }} />
                            </span>
                            <div className="absolute text-center pointer-events-none" >
                              <p className="body-sm">Night</p>
                              <p className="body-xs ">After 6PM</p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="AIRLINES FILTER DIV pt-20">
                      <div className="flex justify-between items-center px-20">
                        <p className="body-lg">Popular Airlines</p>

                      </div>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-10 px-20 !bg-transparent xl:py-5 xl:gap-5">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center"> <img alt="holiday-image" loading="lazy" width={40} height={40} decoding="async" data-nimg={1} className="h-auto w-auto" src="https://images.ixigo.com/img/common-resources/airline-new/AI.png" style={{ color: "transparent" }} /> </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-10 text-primary">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary"> Air India </p>
                        </div>
                        <p className="body-xs text-secondary">₹7,279</p>
                        <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary">
                          <input className="filterCheckBox airlineCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="Air India" filtertype={'airline'} onClick={(e) => { handleFilterChange(e) }} />
                          <FaCheck className='text-blue-700 hidden peer-checked:inline-block' />
                        </span>
                      </li>

                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-10 px-20 !bg-transparent xl:py-5 xl:gap-5">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center"> <img alt="holiday-image" loading="lazy" width={40} height={40} decoding="async" data-nimg={1} className="h-auto w-auto" src="https://images.ixigo.com/img/common-resources/airline-new/6E.png" style={{ color: "transparent" }} /> </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-10 text-primary">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary"> IndiGo </p>
                        </div>
                        <p className="body-xs text-secondary">₹6,766</p>
                        <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary">
                          <input className="filterCheckBox airlineCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="IndiGo Airline" filtertype={'airline'} onClick={(e) => { handleFilterChange(e) }} />
                          <FaCheck className='text-blue-700 hidden peer-checked:inline-block' />
                        </span>
                      </li>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-10 px-20 !bg-transparent xl:py-5 xl:gap-5">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center"> <img alt="holiday-image" loading="lazy" width={40} height={40} decoding="async" data-nimg={1} className="h-auto w-auto" src="https://images.ixigo.com/img/common-resources/airline-new/UK.png" style={{ color: "transparent" }} /> </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-10 text-primary">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary"> Vistara </p>
                        </div>
                        <p className="body-xs text-secondary">₹7,260</p>
                        <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary">
                          <input className="filterCheckBox airlineCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="Vistara" filtertype={'airline'} onClick={(e) => { handleFilterChange(e) }} />
                          <FaCheck className='text-blue-700 hidden peer-checked:inline-block' />
                        </span>
                      </li>
                      <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-10 px-20 !bg-transparent xl:py-5 xl:gap-5">
                        <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center"> <img alt="holiday-image" loading="lazy" width={40} height={40} decoding="async" data-nimg={1} className="h-auto w-auto" src="https://images.ixigo.com/img/common-resources/airline-new/SG.png" style={{ color: "transparent" }} /> </div>
                        <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-10 text-primary">
                          <p className="body-md flex group-[.list-lg]:body-lg text-primary"> SpiceJet </p>
                        </div>
                        <p className="body-xs text-secondary">₹9,917</p>
                        <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary">
                          <input className="filterCheckBox airlineCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="SpiceJet" filtertype={'airline'} onClick={(e) => { handleFilterChange(e) }} />
                          <FaCheck className='text-blue-700 hidden peer-checked:inline-block' />
                        </span>
                      </li>

                    </div>

                  </div>
                </div>
              </div>

              <div className="MIDDLE CONTAINER listingContainer w-full">

                <div className="SUGGESTION BAR AND SORT BY HEADING CONTAINER flex w-full justify-between mb-10">
                  <div className=" w-full flex flex-col gap-10">
                    <div className="SUGGESTION BAR flex bg-white border-b border-neutral-100 h-[50px] w-full items-center rounded-10 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]">
                      <div className="LEFT ARROW flex shrink-0 justify-center py-10 items-center w-40 h-full border-r border-neutral-100 cursor-pointer rounded-l-10 " onClick={() => { document.getElementById('suggestionScrollDiv').scrollLeft += 400 }}> <MdKeyboardArrowLeft /> </div>

                      <div id='suggestionScrollDiv' className="SUGGESTION CELLS CONTAINER flex no-scrollbar overflow-auto scroll-smooth w-full transition-all transition duration-1000 ">
                        {
                          dateArray.map((d, index) => {
                            return <a key={index} className="SUGGESTION CELL flex flex-col shrink-0 justify-center items-center h-[50px] cursor-pointer w-[123px] outlookList border-r" rel="nofollow">
                              <p className="body-xs text-neutral-500">{d}</p>
                              <p className="body-sm text-success-500">₹6429</p>
                            </a>
                          })
                        }
                      </div>

                      <div className="RIGHT ARROW flex shrink-0 justify-center py-10 items-center w-40 h-full border-r border-neutral-100 cursor-pointer rounded-r-10 border-l" onClick={() => { document.getElementById('suggestionScrollDiv').scrollLeft -= 400 }}> <MdKeyboardArrowRight /> </div>
                    </div>
                    <div className="SORT BY AND NO OF FLIGHTS HEADING CONTAINER  mb-0">
                      <div className=" justify-between items-center hidden xl:flex">
                        <p className="body-sm font-medium">Sort by </p>
                        <p className="body-sm text-secondary">{flights.length} Flights Available</p>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="SORTING BAR mb-20 z-50 hidden xl:flex">
                  <div className="flex flex-col  gap-20 md:p-0 md:flex-row w-full">
                    <div className="flex flex-wrap gap-20 py-2 md:gap-0 md:justify-between md:divide-x md:text-center md:bg-white md:rounded-10 md:shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)] md:w-full">


                      <div className="flex items-center justify-center gap-10 py-1 w-[157px] relative md:w-1/4 md:justify-center md:gap-0 md:py-0 transition duration-1000">
                        <div className=' w-full h-full relative flex flex-col justify-center items-center transition-all duration-1000'>
                          <input id='radio1' className='hidden group peer' type="radio" name='sort' value={"Early"} filtertype={"priceSort"} onClick={(e) => { handleFilterChange(e) }} />
                          <label htmlFor='radio1' className=' absolute left-0 top-0 w-full h-full cursor-pointer'></label>
                          <p className="body-md md:text-sm md:font-semibold md:font-400 peer-checked:text-blue-700"> Price </p>
                          <p className="body-sm text-secondary md:text-xs peer-checked:text-blue-700"> Low to High </p>
                          <FaCaretDown className='absolute opacity-0 -bottom-2 peer-checked:opacity-100 peer-checked:translate-y-2 peer-checked:text-blue-700 transition duration-150' />
                        </div>
                      </div>

                      <div className="flex items-center gap-10 py-1 w-[157px] relative md:w-1/4 md:justify-center md:gap-0 md:py-0">
                        <div className=' w-full h-full relative flex flex-col justify-center items-center transition duration-500'>
                          <input id='radio2' className='hidden peer' type="radio" name='sort' value={"Early"} filtertype={"fastestSort"} onClick={(e) => { handleFilterChange(e) }} />
                          <label htmlFor='radio2' className=' absolute left-0 top-0 w-full h-full cursor-pointer'></label>
                          <p className="body-md md:text-sm md:font-semibold md:font-400 peer-checked:text-blue-700"> Fastest </p>
                          <p className="body-sm text-secondary md:text-xs peer-checked:text-blue-700"> Shortest First </p>
                          <FaCaretDown className='absolute opacity-0 -bottom-2 peer-checked:opacity-100 peer-checked:translate-y-2 peer-checked:text-blue-700 transition duration-150' />
                        </div>
                      </div>

                      <div className="flex items-center gap-10 py-1 w-[157px] relative md:w-1/4 md:justify-center md:gap-0 md:py-0">
                        <div className=' w-full h-full relative flex flex-col justify-center items-center transition duration-500'>
                          <input id='radio3' className='hidden peer' type="radio" name='sort' value={"Early"} filtertype={"departurePreferenceSort"} onClick={(e) => { handleFilterChange(e) }} />
                          <label htmlFor='radio3' className=' absolute left-0 top-0 w-full h-full cursor-pointer'></label>
                          <p className="body-md md:text-sm md:font-semibold md:font-400 peer-checked:text-blue-700"> Departure </p>
                          <p className="body-sm text-secondary md:text-xs peer-checked:text-blue-700"> Earliest First </p>
                          <FaCaretDown className='absolute opacity-0 -bottom-2 peer-checked:opacity-100 peer-checked:translate-y-2 peer-checked:text-blue-700 transition duration-150' />
                        </div>
                      </div>

                      <div className=" flex items-center gap-10 py-1 w-[157px] relative md:w-1/4 md:justify-center md:gap-0 md:py-0 ">
                        <div className=' w-full h-full relative flex flex-col justify-center items-center transition duration-500'>
                          <input id='radio4' className='hidden peer' type="radio" name='sort' value={"Early"} filtertype={"SmartSort"} onClick={(e) => { handleFilterChange(e) }} />
                          <label htmlFor='radio4' className=' absolute left-0 top-0 w-full h-full cursor-pointer'></label>
                          <p className="body-md md:text-sm md:font-semibold  md:font-400 peer-checked:text-blue-700 "> Smart </p>
                          <p className="body-sm text-secondary md:text-xs peer-checked:text-blue-700"> Recommended </p>
                          <FaCaretDown className='absolute opacity-0 -bottom-2 peer-checked:opacity-100 peer-checked:translate-y-2 peer-checked:text-blue-700 transition duration-150' />
                        </div>
                      </div>


                    </div>
                  </div>
                </div>



                <div className='FLIGHTS CONTAINER w-full '>

                  {
                    paginatedFlights.length > 0 ?

                      <div className='FLIGHT COLUMNS flex flex-col xl:gap-[10px] w-full'>
                        {
                          paginatedFlights.map((flight, index) => {

                            let minPrice = 100000;
                            let maxPrice = 0;

                            if (flight.ticketPrice > MaxTicketPrice) {
                              setMaxTicketPrice(flight.ticketPrice)
                            }

                            if (flight.ticketPrice < minTicketPrice) {
                              setMinTicketPrice(flight.ticketPrice)
                            }

                            const airlinesCodeNameAndLogo = {
                              "65144a1b664a43628887c45d": { name: "Air India", logoUrl: "https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimg%2Fcommon-resources%2Fairline-new%2FAI.png&w=64&q=75" },
                              "65144a1b664a43628887c45e": { name: "IndiGo ", logoUrl: "https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimg%2Fcommon-resources%2Fairline-new%2F6E.png&w=64&q=75" },
                              "65144a1b664a43628887c45f": { name: "SpiceJet", logoUrl: "https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimg%2Fcommon-resources%2Fairline-new%2FSG.png&w=64&q=75" },
                              "65144a1b664a43628887c460": { name: "Vistara", logoUrl: "https://images.ixigo.com/img/common-resources/airline-new/UK.png" },
                              "65144a1b664a43628887c461": { name: "GoAir", logoUrl: "https://images.ixigo.com/img/common-resources/airline-new/G8.png" }
                            }

                            return <div key={index} className={`FLIGHT ROW AND DROPDOWN  flex flex-col mb-20 w-[100%] transitoin duration-700  ${flightDetailsDropdownIndex == index ? `shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10) border border-black` : ""}`} onClick={(e)=>{e.currentTarget.scrollIntoView({block:'top', behavior:'smooth'})}}>

                                      <div className='LAPTOP hidden xl:flex'>
                                        <div className={`w-full relative px-20 pt-20  bg-white ${flightDetailsDropdownIndex == index ? "rounded-t-10 " : "rounded-10 hover:scale-[1.01] hover:shadow-300 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]"}  cursor-pointer z-10 transition-all duration-300 ease-in   hover:duration-300 hover:ease-out`}>
                                          <div className="absolute -top-[8px] left-20">
                                            <div className="inline-flex items-center font-normal w-fit text-new-outline hover:bg-new-outline-over border-new-outline py-0 px-0.5 rounded-10 min-h-[20px] border border-solid bg-white">
                                              <div className="inline-flex overflow-hidden justify-center items-center">
                                                <svg width="1em" height="1em" fontSize="1.5rem" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-testid="StarFilledIcon" className="body-lg" style={{ userSelect: "none", display: "inline-block" }}>
                                                  <path fillRule="evenodd" d="M10.7506 3.9473c.3932-1.263 2.1056-1.263 2.4988 0l1.519 4.8784h4.9154c1.2726 0 1.8017 1.6994.7721 2.4801l-3.9766 3.015 1.519 4.8784c.3932 1.2631-.9921 2.3134-2.0217 1.5328L12 17.7169 8.0234 20.732c-1.0296.7806-2.415-.2697-2.0217-1.5328l1.519-4.8784-3.9766-3.015c-1.0296-.7807-.5005-2.48.7721-2.48h4.9154l1.519-4.8785Z" clipRule="evenodd" />
                                                </svg>
                                              </div>
                                              <p className="body-xs px-[3px]">Recommended</p>
                                            </div>
                                          </div>
                                          <div className="flex items-start w-full borde">
                                            <div className=" xl:w-[510px] flex ">
                                              <div className="flex gap-5 items-center w-200 airlineInfo "> <img alt="IXIGO" data-testid="airline-logo" loading="lazy" width={50} height={50} decoding="async" data-nimg={1} src={airlinesCodeNameAndLogo[flight.airline].logoUrl} style={{ color: "transparent" }} />
                                                <div className="flex gap-5 flex-col">
                                                  <p className="body-md text-primary truncate max-w-[125px] airlineTruncate font-medium"> {airlinesCodeNameAndLogo[flight.airline].name} </p>
                                                  <p className="body-sm text-secondary truncate max-w-[115px]"> {flight.flightID} </p>
                                                </div>
                                              </div>
                                              <div className="w-[310px] timeTile flex items-center ">
                                                <div className="flex justify-between">
                                                  <div className="flex flex-col items-end">
                                                    <div>
                                                      <div className="w-100 timeTileList">
                                                        <div className="flex items-end relative">
                                                          <h5 className="h5 text-primary font-medium"> {flight.departureTime} </h5>
                                                        </div>
                                                        <p className="body-sm text-secondary">{flight.source}</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="flex items-center w-[110px] justify-center">
                                                    <div className="text-center">
                                                      <p className="body-xs text-secondary">{flight.duration}h</p>
                                                      <div className="flex items-center w-[60px] relative h-2.5">
                                                        <div className="h-px w-full bg-neutral-100 relative" />
                                                        <div className="flex justify-evenly w-full absolute" />
                                                      </div>
                                                      <p className="body-xs text-secondary">{flight.stops}</p>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-col items-end">
                                                    <div>
                                                      <div className="flex flex-col items-end w-100 timeTileList">
                                                        <div className="flex items-end relative">
                                                          <h6 className="h6 text-primary font-medium"> {flight.arrivalTime} </h6>
                                                        </div>
                                                        <p className="body-sm text-secondary">{flight.destination}</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex w-[inherit] justify-end gap-10 items-center">
                                              <div className="flex w-[inherit] justify-end gap-20 items-center">
                                                <div className="text-right">
                                                  <div className="flex items-baseline gap-1">
                                                    <h5 data-testid="pricing" className="h5 text-primary font-bold"> ₹{flight.ticketPrice} </h5>
                                                  </div>
                                                  <p className="body-sm"> {" "} <span className="dynot" style={{ font: "11px/1 system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue", color: "#EC5B24" }}> Extra ₹330 Off </span> </p>

                                                </div> <button className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-[3px] rounded-10 min-h-[40px] button-md py-2 px-10 w-[128px]" onClick={() => { localStorage.getItem("token") ? navigate("/BookFlight", { state: { 'flightId': flight._id, 'from': from, 'to': to, 'sourceCity': from.city, 'destinationCity': to.city, 'day': date.getDay(), 'month': date.getMonth(), 'date': date.getDate(), 'adults': adults, 'childrens': childrens, 'infants': infants } }) : `${setPopupShow('signinShow')}` }}> Book </button>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="py-5 flex justify-end ">

                                            {flightDetailsDropdownIndex == index ? <p className="body-sm text-brand flex items-center font-medium" onClick={() => { setFlightDetailsDropdownIndex(-1) }}> Flight Details </p> : <p className="body-sm text-brand flex items-center font-medium" onClick={() => { setFlightDetailsDropdownIndex(index) }}> Flight Details </p>}
                                          </div>

                                        </div>
                                      </div>

                                      <div className={`MOBILE  xl:hidden w-full flex flex-col relative px-2 py-2 gap-2 shadow bg-white border ${flightDetailsDropdownIndex == index ? "rounded-t-md " : "rounded-md hover:scale-[1.01] hover:shadow-300 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]"}  cursor-pointer z-10 transition-all duration-300 ease-in   hover:duration-300 hover:ease-out `} onClick={() => { localStorage.getItem("token") ? navigate("/BookFlight", { state: { 'flightId': flight._id, 'from': from, 'to': to, 'sourceCity': from.city, 'destinationCity': to.city, 'day': date.getDay(), 'month': date.getMonth(), 'date': date.getDate(), 'adults': adults, 'childrens': childrens, 'infants': infants, 'seatClass':seatClass } }) : `${setPopupShow('signinShow')}` }} >

                                        <div className="airlineNameCode flex gap-2 items-center ">
                                          <p className="body-md text-primary   airlineTruncate font-medium"> {airlinesCodeNameAndLogo[flight.airline].name} </p>
                                          <p className='w-1 h-1 rounded-full bg-black' />
                                          <p className="body-sm text-secondary  "> {flight.flightID} </p>
                                        </div>

                                        <div className='flex justify-between '>

                                          <div className="airlineLogo"><img alt="IXIGO" className='' data-testid="airline-logo" loading="lazy" width={50} height={50} decoding="async" data-nimg={1} src={airlinesCodeNameAndLogo[flight.airline].logoUrl} style={{ color: "transparent" }} /></div>

                                          <div className="timings flex  items-center justify-center">
                                            <div className="flex gap-4 justify-between items-center ">
                                              <div className="flex flex-col items-end">
                                                <div>
                                                  <div className=" timeTileList">
                                                    <div className="flex items-end relative">
                                                      <h5 className="h5 text-primary font-medium"> {flight.departureTime} </h5>
                                                    </div>
                                                    <p className="body-sm text-secondary">{flight.source}</p>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="flex items-center justify-center">
                                                <div className="text-center">
                                                  <p className="body-xs text-secondary">{flight.duration}h</p>
                                                  <div className="flex items-center w-[60px] relative h-2.5">
                                                    <div className="h-px w-full bg-neutral-100 relative" />
                                                    <div className="flex justify-evenly w-full absolute" />
                                                  </div>
                                                  <p className="body-xs text-secondary">{flight.stops}</p>
                                                </div>
                                              </div>
                                              <div className="flex flex-col items-end">
                                                <div>
                                                  <div className="flex flex-col items-end timeTileList">
                                                    <div className="flex items-end relative">
                                                      <h6 className="h6 text-primary font-medium"> {flight.arrivalTime} </h6>
                                                    </div>
                                                    <p className="body-sm text-secondary">{flight.destination}</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className='Book&flightDetailsButton  flex flex-col justify-center items-center'>
                                          {/* <button className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-[3px] rounded-10  button-md py-2 px-4" onClick={() => { localStorage.getItem("token") ? navigate("/BookFlight", { state: { 'flightId': flight._id, 'from': from, 'to': to, 'sourceCity': from.city, 'destinationCity': to.city, 'day': date.getDay(), 'month': date.getMonth(), 'date': date.getDate(), 'adults': adults, 'childrens': childrens, 'infants': infants } }) : `${setPopupShow('signinShow')}` }}> Book </button> */}
                                          <p data-testid="pricing" className=" text-primary font-bold"> ₹{flight.ticketPrice} </p>

                                          {flightDetailsDropdownIndex == index ? <p className="text-sm flex items-center font-medium" onClick={(e) => { setFlightDetailsDropdownIndex(-1); e.stopPropagation() }}>Details </p> : <p className="text-sm text-brand items-center " onClick={(e) => { setFlightDetailsDropdownIndex(index); e.stopPropagation() }}> Details </p>}
                                          </div>
                                        </div>

                                      </div>

                                      <div id={`detailsDropdown${index}`} className={` LAPTOP DETAILS DROPDOWN relative    flex-row  justify-between bg-white w-full pb-20 px-20 pt-20 border-t-2 border-dashed   ${flightDetailsDropdownIndex == index ? 'hidden xl:flex rounded-b-10 opacity-100  z-30' : 'hidden'}  `}>

                                        <div className='absolute top-1 right-4 w-4 h-8  cursor-pointer flex justify-center items-center' onClick={() => { setFlightDetailsDropdownIndex(-1) }}> <IoIosArrowUp className='h-full' /> </div>

                                        <div className={`bg-white transition duration-1000 opacity-0 ${flightDetailsDropdownIndex == index ? "opacity-100" : ""}`}>

                                          <div className="">
                                            <div className="">
                                              <div className="LOGO AIRLINE CODE ROW flex items-center gap-15 mb-10">
                                                <div className="flex justify-between ">
                                                  <div className="flex items-center">
                                                    <img
                                                      alt="IXIGO"
                                                      data-testid="airline-logo"
                                                      loading="lazy"
                                                      width={35}
                                                      height={35}
                                                      decoding="async"
                                                      data-nimg={1}
                                                      src={airlinesCodeNameAndLogo[flight.airline].logoUrl}
                                                      style={{ color: "transparent" }}
                                                    />
                                                    <div className="flex-col items-center ml-5">
                                                      <p
                                                        data-testid="airline-number"
                                                        className="body-sm text-secondary truncate max-w-[255px]"
                                                      >
                                                        <span className="body-md text-primary">{airlinesCodeNameAndLogo[flight.airline].name}</span> | {flight.flightID}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="inline-flex items-center font-normal w-fit bg-success-subtle text-success-subtle hover:bg-success-subtle-over border-success-subtle py-0 px-0.5 rounded-10 min-h-[20px] border border-solid !items-end hover:!bg-transparent">
                                                  <div className="inline-flex overflow-hidden justify-center items-center">
                                                    <svg
                                                      width="1em"
                                                      height="1em"
                                                      fontSize="1.5rem"
                                                      fill="currentColor"
                                                      viewBox="0 0 24 24"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      data-testid="ScheduleFilledIcon"
                                                      className="body-lg"
                                                      style={{ userSelect: "none", display: "inline-block" }}
                                                    >
                                                      <path
                                                        fillRule="evenodd"
                                                        d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9Zm.7358-13.02a.75.75 0 0 0-1.5 0v4.9844c0 .1989.0791.3897.2197.5303l2.2749 2.2749a.75.75 0 0 0 1.0606 0 .75.75 0 0 0 0-1.0606l-2.0552-2.0552V7.98Z"
                                                        clipRule="evenodd"
                                                      />
                                                    </svg>
                                                  </div>
                                                  <p className="body-xs px-[3px]">
                                                    <span>
                                                      <span className="font-700">73%</span> On-time
                                                    </span>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="MIDDLE DEPARTURE ARRIVAL DETAILS AND BAGGAGE CABIN CHECK-IN DETAILS flex justify-between gap-20">
                                                <div className="DEPARTURE AND ARRIVAL DETAILS w-full max-w-[380px]">
                                                  <div className="flex justify-between">
                                                    <div className="min-w-[140px] text-left">
                                                      <p className="body-sm text-secondary">{weekDays[date.getDay()]}, {date.getDate()} {month[date.getMonth()]}</p>
                                                      <h4 className="h4 text-primary mb-5 font-medium">{flight.departureTime}</h4>
                                                      <p className="body-sm text-primary mb-5 font-medium">
                                                        {from.iata_code} - {from.city}
                                                      </p>
                                                    </div>
                                                    <div className="min-w-[60px] text-center mt-30">
                                                      <p className="body-sm text-secondary">{flight.duration}h</p>
                                                      <img
                                                        alt="IXIGO"
                                                        loading="lazy"
                                                        width={80}
                                                        height={6}
                                                        decoding="async"
                                                        data-nimg={1}
                                                        src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg"
                                                        style={{ color: "transparent" }}
                                                      />
                                                    </div>
                                                    <div className="text-right w-[140px]">
                                                      <p className="body-sm text-secondary">{weekDays[date.getDay()]}, {date.getDate()} {month[date.getMonth()]}</p>
                                                      <h4 className="h4 text-primary mb-5 font-medium">{flight.arrivalTime}</h4>
                                                      <p className="body-sm text-primary mb-5 font-medium">
                                                        {to.iata_code} - {to.city}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="flex justify-between gap-100">
                                                    <div className="w-[140px] text-left max-h-[34px]">
                                                      <p className="body-xs text-secondary mb-5">
                                                        {from.name}
                                                      </p>
                                                    </div>
                                                    <div className="text-right w-[140px] max-h-[34px]">
                                                      <p className="body-xs text-secondary mb-5">
                                                        {to.name}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="flex justify-between items-center gap-[100px]">


                                                  </div>
                                                </div>
                                                <div className="BAGGAGE CABIN AND CHECK-IN DETAILS min-w-[340px]">
                                                  <div className="flex gap-20">
                                                    <div className="flex flex-col min-w-[100px] gap-10">
                                                      <div className="flex gap-1 items-center">
                                                        <p className="body-sm text-charcoal-800 font-medium">Baggage</p>
                                                      </div>
                                                      <p className="body-sm text-charcoal-800">Per Traveller</p>
                                                    </div>
                                                    <div className="flex flex-col min-w-[100px] gap-10">
                                                      <div className="flex gap-1 items-center">
                                                        <p className="body-sm text-charcoal-800 font-medium">Cabin</p>
                                                      </div>
                                                      <p className="body-sm text-charcoal-800">
                                                        7 Kg (1 piece per pax)
                                                      </p>
                                                    </div>
                                                    <div className="flex flex-col min-w-[100px] gap-10">
                                                      <div className="flex gap-1 items-center">
                                                        <p className="body-sm text-charcoal-800 font-medium">
                                                          Check-in
                                                        </p>
                                                      </div>
                                                      <p className="body-sm text-charcoal-800">
                                                        15 Kg (1 piece per pax)
                                                      </p>
                                                    </div>
                                                  </div>{" "}
                                                </div>
                                              </div>

                                              <div className="flex items-center gap-10 mt-10">
                                                <div className="flex items-center gap-5">
                                                  <svg
                                                    width="1em"
                                                    height="1em"
                                                    fontSize={20}
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    data-testid="FlightEngineFilledIcon"
                                                    style={{ userSelect: "none", display: "inline-block" }}
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M21.944 12c0 4.9706-4.0295 9-9 9-4.9706 0-9-4.0294-9-9s4.0294-9 9-9c4.9705 0 9 4.0294 9 9Zm-1.8312-2.2108c-.9931-3.224-6.351-5.9028-6.4167-.6941a2.9975 2.9975 0 0 1 1.3901.8046c1.5407-.87 3.4794-1.071 5.0266-.1105Zm-4.277 1.4096c4.5465-2.549 4.903 3.427 2.6073 5.9012.057-1.8187-1.0859-3.3957-2.6085-4.2945.1421-.5112.1426-1.0952.0012-1.6067Zm-.7528 2.9046a2.9973 2.9973 0 0 1-1.3913.8027c-.0171 1.7689-.8121 3.5478-2.417 4.4075 3.2687.7429 8.2538-2.5693 3.8083-5.2102Zm-2.8911.8015a2.9975 2.9975 0 0 1-1.3901-.8046c-1.5408.87-3.4795 1.0711-5.0267.1106.9932 3.224 6.3511 5.9028 6.4168.694Zm-2.1398-2.1037c-.1413-.5115-.141-1.0955.0012-1.6066C8.5307 10.2957 7.3878 8.7187 7.4448 6.9c-2.2957 2.4742-1.9391 8.4502 2.6073 5.9012Zm.7528-2.9046a2.9968 2.9968 0 0 1 1.3913-.8027c.0172-1.7689.8122-3.5478 2.4171-4.4074-3.2906-.748-8.2935 2.5456-3.8084 5.21Z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <p className="body-xs text-primary">B737-800</p>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                  <svg
                                                    width="1em"
                                                    height="1em"
                                                    fontSize={20}
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    data-testid="AirlineSeatReclineExtraIcon"
                                                    style={{ userSelect: "none", display: "inline-block" }}
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="m11.385 11.4901.4179 1.8999h5.2947c1.4552 0 2.7334 1.1156 2.8254 2.6427l.0734 1.2178c.0641 1.0628-.7385 1.9618-1.7513 1.9618h-8.1913l.0415.1872c.1322.5967.638 1.019 1.2207 1.019h5.6895c.4153 0 .752.354.752.7907 0 .4368-.3367.7908-.752.7908H11.316c-1.2819 0-2.3948-.9289-2.6856-2.2416l-.121-.5461h-.0825c-.8315 0-1.549-.6137-1.718-1.4698L4.0372 4.2205C3.811 3.0748 4.6428 2 5.7554 2h1.3498c1.2735 0 2.3813.917 2.6804 2.2185l1.2695 5.7716h5.6414c.436 0 .7895.3357.7895.75 0 .4142-.3535.75-.7895.75H11.385ZM5.51 3.8987c-.0323-.1636.0865-.3171.2454-.3171h1.3498c.5788 0 1.0824.4167 1.2184 1.0084l1.194 5.4h-.528c-.436 0-.7895.3358-.7895.7501 0 .4142.3535.75.7895.75h.8596l.7698 3.4814h6.4786c.6615 0 1.2825.4671 1.3243 1.1612l.0734 1.2178c.0092.1519-.1055.2803-.2502.2803H9.1229a.8359.8359 0 0 0-.0317 0H8.427c-.1188 0-.2212-.0877-.2454-.21L5.51 3.8988Z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <p className="body-xs text-primary">Standard</p>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                  <svg
                                                    width="1em"
                                                    height="1em"
                                                    fontSize={20}
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    data-testid="GridSmallIcon"
                                                    style={{ userSelect: "none", display: "inline-block" }}
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M9.25 5.5H6a.5.5 0 0 0-.5.5v3.25a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5ZM6 11.25c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2h3.25c1.1046 0 2 .8954 2 2v3.25c0 1.1046-.8954 2-2 2H6ZM11.25 18v-3.25c0-1.1046-.8954-2-2-2H6c-1.1046 0-2 .8954-2 2V18c0 1.1046.8954 2 2 2h3.25c1.1046 0 2-.8954 2-2Zm1.5-12v3.25c0 1.1046.8954 2 2 2H18c1.1046 0 2-.8954 2-2V6c0-1.1046-.8954-2-2-2h-3.25c-1.1046 0-2 .8954-2 2ZM5.5 14.75V18a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5v-3.25a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0-.5.5Zm9.25 3.75H18a.5.5 0 0 0 .5-.5v-3.25a.5.5 0 0 0-.5-.5h-3.25a.5.5 0 0 0-.5.5V18a.5.5 0 0 0 .5.5Zm0-8.75H18a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-3.25a.5.5 0 0 0-.5.5v3.25a.5.5 0 0 0 .5.5Zm0 10.25c-1.1046 0-2-.8954-2-2v-3.25c0-1.1046.8954-2 2-2H18c1.1046 0 2 .8954 2 2V18c0 1.1046-.8954 2-2 2h-3.25Z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <p className="body-xs text-primary">Narrow (Limited seat tilt)</p>
                                                </div>
                                                <div className="cursor-pointer -mt-1">
                                                  <CiBowlNoodles />
                                                </div>
                                                <div className="cursor-pointer -mt-1">
                                                  <CiWifiOn />
                                                </div>
                                                <div className="cursor-pointer -mt-1">
                                                  <CiPlug1 />
                                                </div>
                                                <div className="cursor-pointer -mt-1">
                                                  <CiYoutube />
                                                </div>
                                                <div className="cursor-pointer -mt-1">
                                                  <PiFirstAidKitLight />
                                                </div>
                                              </div>

                                            </div>
                                          </div>

                                        </div>

                                        <div className=' flex justify-center items-end w-[80px] '> <button className='text-xs font-bold py-2 flex justify-center items-center w-full transition duration-200 border text-white bg-[#fc790d] hover:shadow-300 rounded-lg cursor-pointer' onClick={() => { localStorage.getItem("token") ? navigate("/BookFlight", { state: { 'flightId': flight._id, 'from': from, 'to': to, 'sourceCity': from.city, 'destinationCity': to.city, 'day': date.getDay(), 'month': date.getMonth(), 'date': date.getDate(), 'adults': adults, 'childrens': childrens, 'infants': infants } }) : `${setPopupShow('signinShow')}` }}>Book Now</button> </div>
                                      </div>

                                      <div id={`detailsDropdown${index}`} className={`MOBILE DETAILS DROPDOWN  relative xl:hidden flex flex-col gap-4  justify-between bg-white w-full pb-20 px-20 pt-20 border-t-2 border-dashed   ${flightDetailsDropdownIndex == index ? 'inline-flex rounded-b-10 opacity-100  z-30' : 'hidden'}  `}>

                                        <div className='absolute top-1 right-4 w-4 h-8  cursor-pointer flex justify-center items-center' onClick={() => { setFlightDetailsDropdownIndex(-1) }}> <IoIosArrowUp className='h-full' /> </div>

                                        <div className={`bg-white w-full flex flex-col gap-4  transition duration-1000 opacity-0 ${flightDetailsDropdownIndex == index ? "opacity-100" : ""}`}>

                                        
                                                <div className="LOGO AIRLINE CODE ROW flex items-center gap-15 mb-10 ">
                                                  <div className="flex justify-between ">
                                                    <div className="flex items-center">
                                                      <img
                                                        alt="IXIGO"
                                                        data-testid="airline-logo"
                                                        loading="lazy"
                                                        width={35}
                                                        height={35}
                                                        decoding="async"
                                                        data-nimg={1}
                                                        src={airlinesCodeNameAndLogo[flight.airline].logoUrl}
                                                        style={{ color: "transparent" }}
                                                      />
                                                      <div className="flex-col items-center ml-5">
                                                        <p
                                                          data-testid="airline-number"
                                                          className="body-sm text-secondary truncate max-w-[255px]"
                                                        >
                                                          <span className="body-md text-primary">{airlinesCodeNameAndLogo[flight.airline].name}</span> | {flight.flightID}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                
                                                </div>

                                                <div className="DEPARTURE AND ARRIVAL DETAILS w-full">

                                                  <div className="flex justify-between ">

                                                    <div className=" LEFT text-left w-[40%] ">
                                                      <p className="body-sm text-secondary">{weekDays[date.getDay()]}, {date.getDate()} {month[date.getMonth()]}</p>
                                                      <h4 className="h4 text-primary mb-5 font-medium">{flight.departureTime}</h4>
                                                      <p className="body-sm text-primary mb-5 font-medium">{from.iata_code} - {from.city}</p>
                                                      <p className="body-xs text-secondary mb-5">{from.name}</p>
                                                    </div>

                                                    <div className="MIDDLE text-center mt-30  w-[20%]">
                                                      <p className="body-sm text-secondary">{flight.duration}h</p>
                                                    </div>

                                                    <div className="RIGHT text-right  w-[40%]">
                                                      <p className="body-sm text-secondary">{weekDays[date.getDay()]}, {date.getDate()} {month[date.getMonth()]}</p>
                                                      <h4 className="h4 text-primary mb-5 font-medium">{flight.arrivalTime}</h4>
                                                      <p className="body-sm text-primary mb-5 font-medium">{to.iata_code} - {to.city}</p>
                                                      <p className="body-xs text-secondary mb-5">{to.name}</p>
                                                    </div>
                                                  </div>
                                                
                                                </div>

                                                <div className="BAGGAGE CABIN AND CHECK-IN DETAILS ">
                                                  <div className="flex gap-20">
                                                    <div className="flex flex-col min-w-[100px] gap-10">
                                                      <div className="flex gap-1 items-center">
                                                        <p className="body-sm text-charcoal-800 font-medium">Baggage</p>
                                                      </div>
                                                      <p className="body-sm text-charcoal-800">Per Traveller</p>
                                                    </div>
                                                    <div className="flex flex-col min-w-[100px] gap-10">
                                                      <div className="flex gap-1 items-center">
                                                        <p className="body-sm text-charcoal-800 font-medium">Cabin</p>
                                                      </div>
                                                      <p className="body-sm text-charcoal-800">
                                                        7 Kg 
                                                      </p>
                                                    </div>
                                                    <div className="flex flex-col min-w-[100px] gap-10">
                                                      <div className="flex gap-1 items-center">
                                                        <p className="body-sm text-charcoal-800 font-medium">
                                                          Check-in
                                                        </p>
                                                      </div>
                                                      <p className="body-sm text-charcoal-800">
                                                        15 Kg
                                                      </p>
                                                    </div>
                                                  </div>{" "}
                                                </div>

                                              <div className="SEATING FEATURES flex flex-col  gap-2 mt-10 ">
                                                <div className="flex items-center gap-5">
                                                  <svg
                                                    width="1em"
                                                    height="1em"
                                                    fontSize={20}
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    data-testid="FlightEngineFilledIcon"
                                                    style={{ userSelect: "none", display: "inline-block" }}
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M21.944 12c0 4.9706-4.0295 9-9 9-4.9706 0-9-4.0294-9-9s4.0294-9 9-9c4.9705 0 9 4.0294 9 9Zm-1.8312-2.2108c-.9931-3.224-6.351-5.9028-6.4167-.6941a2.9975 2.9975 0 0 1 1.3901.8046c1.5407-.87 3.4794-1.071 5.0266-.1105Zm-4.277 1.4096c4.5465-2.549 4.903 3.427 2.6073 5.9012.057-1.8187-1.0859-3.3957-2.6085-4.2945.1421-.5112.1426-1.0952.0012-1.6067Zm-.7528 2.9046a2.9973 2.9973 0 0 1-1.3913.8027c-.0171 1.7689-.8121 3.5478-2.417 4.4075 3.2687.7429 8.2538-2.5693 3.8083-5.2102Zm-2.8911.8015a2.9975 2.9975 0 0 1-1.3901-.8046c-1.5408.87-3.4795 1.0711-5.0267.1106.9932 3.224 6.3511 5.9028 6.4168.694Zm-2.1398-2.1037c-.1413-.5115-.141-1.0955.0012-1.6066C8.5307 10.2957 7.3878 8.7187 7.4448 6.9c-2.2957 2.4742-1.9391 8.4502 2.6073 5.9012Zm.7528-2.9046a2.9968 2.9968 0 0 1 1.3913-.8027c.0172-1.7689.8122-3.5478 2.4171-4.4074-3.2906-.748-8.2935 2.5456-3.8084 5.21Z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <p className="body-xs text-primary">B737-800</p>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                  <svg
                                                    width="1em"
                                                    height="1em"
                                                    fontSize={20}
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    data-testid="AirlineSeatReclineExtraIcon"
                                                    style={{ userSelect: "none", display: "inline-block" }}
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="m11.385 11.4901.4179 1.8999h5.2947c1.4552 0 2.7334 1.1156 2.8254 2.6427l.0734 1.2178c.0641 1.0628-.7385 1.9618-1.7513 1.9618h-8.1913l.0415.1872c.1322.5967.638 1.019 1.2207 1.019h5.6895c.4153 0 .752.354.752.7907 0 .4368-.3367.7908-.752.7908H11.316c-1.2819 0-2.3948-.9289-2.6856-2.2416l-.121-.5461h-.0825c-.8315 0-1.549-.6137-1.718-1.4698L4.0372 4.2205C3.811 3.0748 4.6428 2 5.7554 2h1.3498c1.2735 0 2.3813.917 2.6804 2.2185l1.2695 5.7716h5.6414c.436 0 .7895.3357.7895.75 0 .4142-.3535.75-.7895.75H11.385ZM5.51 3.8987c-.0323-.1636.0865-.3171.2454-.3171h1.3498c.5788 0 1.0824.4167 1.2184 1.0084l1.194 5.4h-.528c-.436 0-.7895.3358-.7895.7501 0 .4142.3535.75.7895.75h.8596l.7698 3.4814h6.4786c.6615 0 1.2825.4671 1.3243 1.1612l.0734 1.2178c.0092.1519-.1055.2803-.2502.2803H9.1229a.8359.8359 0 0 0-.0317 0H8.427c-.1188 0-.2212-.0877-.2454-.21L5.51 3.8988Z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <p className="body-xs text-primary">Standard</p>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                  <svg
                                                    width="1em"
                                                    height="1em"
                                                    fontSize={20}
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    data-testid="GridSmallIcon"
                                                    style={{ userSelect: "none", display: "inline-block" }}
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M9.25 5.5H6a.5.5 0 0 0-.5.5v3.25a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5ZM6 11.25c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2h3.25c1.1046 0 2 .8954 2 2v3.25c0 1.1046-.8954 2-2 2H6ZM11.25 18v-3.25c0-1.1046-.8954-2-2-2H6c-1.1046 0-2 .8954-2 2V18c0 1.1046.8954 2 2 2h3.25c1.1046 0 2-.8954 2-2Zm1.5-12v3.25c0 1.1046.8954 2 2 2H18c1.1046 0 2-.8954 2-2V6c0-1.1046-.8954-2-2-2h-3.25c-1.1046 0-2 .8954-2 2ZM5.5 14.75V18a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5v-3.25a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0-.5.5Zm9.25 3.75H18a.5.5 0 0 0 .5-.5v-3.25a.5.5 0 0 0-.5-.5h-3.25a.5.5 0 0 0-.5.5V18a.5.5 0 0 0 .5.5Zm0-8.75H18a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-3.25a.5.5 0 0 0-.5.5v3.25a.5.5 0 0 0 .5.5Zm0 10.25c-1.1046 0-2-.8954-2-2v-3.25c0-1.1046.8954-2 2-2H18c1.1046 0 2 .8954 2 2V18c0 1.1046-.8954 2-2 2h-3.25Z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <p className="body-xs text-primary">Narrow (Limited seat tilt)</p>
                                                </div>
                                              </div>

                                              <div className='AMENITIES flex gap-4'>
                                              <div className="cursor-pointer -mt-1">
                                                  <CiBowlNoodles />
                                                </div>
                                                <div className="cursor-pointer -mt-1">
                                                  <CiWifiOn />
                                                </div>
                                                <div className="cursor-pointer -mt-1">
                                                  <CiPlug1 />
                                                </div>
                                                <div className="cursor-pointer -mt-1">
                                                  <CiYoutube />
                                                </div>
                                                <div className="cursor-pointer -mt-1">
                                                  <PiFirstAidKitLight />
                                                </div>
                                              </div>


                                        </div>

                                        <div className='BUTTON flex justify-end w-full  '> <button className='text-xs font-bold py-2 flex justify-center items-center w-[80px] transition duration-200 border text-white bg-[#fc790d] hover:shadow-300 rounded-lg cursor-pointer' onClick={(e) => { localStorage.getItem("token") ? navigate("/BookFlight", { state: { 'flightId': flight._id, 'from': from, 'to': to, 'sourceCity': from.city, 'destinationCity': to.city, 'day': date.getDay(), 'month': date.getMonth(), 'date': date.getDate(), 'adults': adults, 'childrens': childrens, 'infants': infants } }) : `${setPopupShow('signinShow')}`; }}>Book Now</button> </div>

                                      </div>

                                   </div>
                          })
                        }
                      </div>

                      :

                      <div className='Spinner flex flex-col justify-center items-center gap-10 my-10  '>
                        {
                          message === 'Loading...' ? <div> <ThreeCircles wrapperClass={'w-[50px] h-[50px] flex justify-center items-center'} color='#0770e4' /><h1>{message}</h1> </div> : <div className='border w-full h-full flex justify-center items-center pt-8 text-xl font-semibold'>{message}</div>
                        }



                      </div>


                  }


                  {
                    paginatedFlights.length > 0 && <div className='PAGINATION BUTTONS flex flex-col justify-center items-center mt-20 pb-10 transition duration-500'>

                      <div className='flex justify-center items-center gap-4 transition duration-300'>
                        <button className={`border shadow w-[30px] h-[30px] rounded-full flex flex-col justify-center items-center ${currentPage == 0 ? "cursor-not-allowed" : ""}`} onClick={() => { setCurrentPage((prev) => { return Math.max(prev - 1, 0) }); document.getElementById('w1').scrollTo({ top: 0, behavior: "smooth" }) }}> <MdKeyboardArrowLeft /> </button>       {Array(pages).fill().map((_, index) => { return <button key={index} className={`${currentPage == index ? 'bg-blue-700 text-white' : ""} w-[30px] h-[30px] rounded-full shadow-300 flex justify-center items-center `} onClick={() => { setCurrentPage(index); document.getElementById('w1').scrollTo({ top: 0, behavior: "smooth" }) }}>{index + 1}</button> })}        <button className={`border border shadow  w-[30px] h-[30px] rounded-full flex flex-col justify-center items-center ${currentPage == pages - 1 ? "cursor-not-allowed" : ""}`} onClick={() => { setCurrentPage((prev) => { return Math.min(prev + 1, pages - 1) }); document.getElementById('w1').scrollTo({ top: 0, behavior: "smooth" }) }}> <MdKeyboardArrowRight /> </button>
                      </div>

                    </div>
                  }

                </div>


              </div>

              <div className="RIGHT CONTAINER adsContainer  ">
                <div className="flex flex-col gap-20 items-center relative">
                  <div className=''><img src="https://tpc.googlesyndication.com/simgad/5638658297868945798" alt="" /></div>
                  <div><img src="https://s0.2mdn.net/dfp/514231/4813921807/1713188086517/300x250/300x250.png" alt="" /></div>
                </div>
              </div>

            </div>

          </div>

        </div>

        <div className="BOTTOM RIBBON fixed  bottom-0 z-50 xl:hidden h-[60px] w-full bg-gray-400 flex justify-between px-8 items-center">

          <div className="FILTER relative flex flex-col justify-center items-center" onClick={() => { setActive(!active); setActiveTab('filter') }}>
            <p><TiFilter /></p>
            <p>Filter</p>
            <div className={`filterpopup absolute  shadow rounded-10 left-0 h-[500px]  transition-all transform duration-700 ${active == true && activeTab === 'filter' ? '-translate-y-[280px] -translate-x-[5px]  opacity-100 scale-x-100' : 'opacity-0 scale-0 -translate-x-[200px]'}`} >
              <div className="bg-white h-full overflow-auto rounded-10 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]  filterContainer">
                <div className="flex justify-between p-20 items-center">
                  <p className="body-md font-bold">Filters</p>
                  {/* if(document.getElementById('filterCheck1').checked==true ){ document.getElementById('filterCheck1').click() } */}


                  <p className="body-sm cursor-pointer text-brand-500 font-medium" onClick={() => { document.querySelectorAll('.filterCheckBox').forEach((i) => { if (i.checked) { i.click() } }); setFilterObj({}) }}> Clear All </p>
                </div>
                <div className="border-t border-neutraPral-100 mx-20" />
                <div className="py-20">

                  <div id='stopsFilterContainer' className="STOPS FILTER DIV py-20 pt-0 pb-10">
                    <p className="body-lg px-20 pb-10">Stops</p>
                    <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm  max-w-screen-sm gap-15 !bg-transparent">
                      <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                        <p className="body-md flex group-[.list-lg]:body-lg text-primary"> Non-Stop </p>
                      </div> <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary"> <input id='filterCheck1' className="filterCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer " type="checkbox" value={0} filtertype={'stops'} onChange={(e) => { handleFilterChange(e) }} /> <FaCheck className='text-blue-700 hidden peer-checked:inline-block' /> </span>
                    </li>
                    <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm  max-w-screen-sm gap-15 !bg-transparent">
                      <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                        <p className="body-md flex group-[.list-lg]:body-lg text-primary"> 1 Stop </p>
                      </div> <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary"> <input className=" filterCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value={1} filtertype={'stops'} onChange={(e) => { handleFilterChange(e) }} /> <FaCheck className='text-blue-700 hidden peer-checked:inline-block' /> </span>
                    </li>
                    <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm  max-w-screen-sm gap-15 !bg-transparent">
                      <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                        <p className="body-md flex group-[.list-lg]:body-lg text-primary"> 2+ Stops </p>
                      </div> <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary"> <input className=" filterCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value={2} filtertype={'stops'} onChange={(e) => { handleFilterChange(e) }} /> <FaCheck className='text-blue-700 hidden peer-checked:inline-block' /> </span>
                    </li>
                  </div>

                  <div className="PRICE FILTER DIV p-20  mb-40">
                    <p className="body-lg mb-30 xl:mb-8">Flight Price </p>
                    <div className="relative w-full max-w-full">
                      <div className="slider">  </div>

                      <div className="relative w-full ">
                        <div> <RangeSlider min={0} max={10000} value={val} onInput={(e) => { setval(e) }} onThumbDragEnd={(e) => { setminmax(val); handleTicketPrice(val) }} /> </div>
                        <div className="absolute left-0 text-secondary text-sm mt-20"> {val[0]} </div>
                        <div className="absolute right-0 text-secondary text-sm mt-20"> {val[1]} </div>
                      </div>
                    </div>
                  </div>

                  <div className="DEPARTURE FILTER DIV flex flex-col gap-30 px-20 pt-20 pb-30">
                    <div className="flex flex-col gap-10">
                      <p className="body-lg">Departure from New {from.city}</p>

                      <div className="flex pt-10 gap-15 w-full">

                        <div id='' className="relative flex flex-col justify-center items-center border rounded-10 px-15 py-10 w-full h-[57px] xl:h-[86px] bg-neutral-0 border-neutral-100" >
                          <span className=" shrink-0 opacity-0 inline-flex items-center justify-center w-full h-full rounded hover:bg-primary-over border border-primary w-full h-auto opacity-0">
                            <input className="filterCheckBox absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="EARLY_MORNING" filtertype={'departures'} onClick={(e) => { handleFilterChange(e); let ele = document.getElementById('earlyMorningDeparture'); ele.classList.toggle('bg-subbrand-50'); ele.classList.toggle('text-subbrand-500'); ele.classList.toggle('border-subbrand-500') }} />
                          </span>
                          <div id='earlyMorningDeparture' className=" w-full h-full flex flex-col justify-center items-center absolute text-center pointer-events-none rounded-lg border " >
                            <p className="body-sm">Early Morning</p>
                            <p className="body-xs ">Before 6AM</p>
                          </div>
                        </div>

                        <div id='morningDeparture' className="relative flex flex-col justify-center items-center border rounded-10 px-15 py-10 w-full h-[57px] xl:h-[86px] ">
                          <span className="shrink-0 inline-flex items-center justify-center w-0 h-0 rounded hover:bg-selection-solid-over text-selection-solid bg-selection-solid w-full h-auto opacity-100">
                            <input className="filterCheckBox group absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="MORNING" filtertype={'departures'} onClick={(e) => { handleFilterChange(e); let ele = document.getElementById('morningDeparture'); ele.classList.toggle('bg-subbrand-50'); ele.classList.toggle('text-subbrand-500'); ele.classList.toggle('border-subbrand-500') }} />
                          </span>
                          <div className="absolute text-center pointer-events-none">
                            <p className="body-sm  ">Morning</p>
                            <p className="body-xs ">6AM - 12PM</p>
                          </div>
                        </div>

                      </div>
                      <div className="flex pt-10 gap-15 w-full">

                        <div id='afternoonDeparture' className="relative flex flex-col justify-center items-center border rounded-10 px-15 py-10 w-full h-[57px] xl:h-[86px] bg-neutral-0 border-neutral-100">
                          <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary w-full h-auto opacity-0">
                            <input className="filterCheckBox absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="AFTERNOON" filtertype={'departures'} onClick={(e) => { handleFilterChange(e); let ele = document.getElementById('afternoonDeparture'); ele.classList.toggle('bg-subbrand-50'); ele.classList.toggle('text-subbrand-500'); ele.classList.toggle('border-subbrand-500') }} />
                          </span>
                          <div className="absolute text-center pointer-events-none" >
                            <p className="body-sm">Mid Day</p>
                            <p className="body-xs ">12PM - 6PM</p>
                          </div>
                        </div>

                        <div id='nightDeparture' className="relative flex flex-col justify-center items-center border rounded-10 px-15 py-10 w-full h-[57px] xl:h-[86px] bg-neutral-0 border-neutral-100">
                          <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary w-full h-auto opacity-0">
                            <input className="filterCheckBox absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="NIGHT" filtertype={'departures'} onClick={(e) => { handleFilterChange(e); let ele = document.getElementById('nightDeparture'); ele.classList.toggle('bg-subbrand-50'); ele.classList.toggle('text-subbrand-500'); ele.classList.toggle('border-subbrand-500') }} />
                          </span>
                          <div className="absolute text-center pointer-events-none" >
                            <p className="body-sm">Night</p>
                            <p className="body-xs ">After 6PM</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="AIRLINES FILTER DIV pt-20">
                    <div className="flex justify-between items-center px-20">
                      <p className="body-lg">Popular Airlines</p>

                    </div>
                    <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-10 px-20 !bg-transparent xl:py-5 xl:gap-5">
                      <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center"> <img alt="holiday-image" loading="lazy" width={40} height={40} decoding="async" data-nimg={1} className="h-auto w-auto" src="https://images.ixigo.com/img/common-resources/airline-new/AI.png" style={{ color: "transparent" }} /> </div>
                      <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-10 text-primary">
                        <p className="body-md flex group-[.list-lg]:body-lg text-primary"> Air India </p>
                      </div>
                      <p className="body-xs text-secondary">₹7,279</p>
                      <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary">
                        <input className="filterCheckBox airlineCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="Air India" filtertype={'airline'} onClick={(e) => { handleFilterChange(e) }} />
                        <FaCheck className='text-blue-700 hidden peer-checked:inline-block' />
                      </span>
                    </li>

                    <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-10 px-20 !bg-transparent xl:py-5 xl:gap-5">
                      <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center"> <img alt="holiday-image" loading="lazy" width={40} height={40} decoding="async" data-nimg={1} className="h-auto w-auto" src="https://images.ixigo.com/img/common-resources/airline-new/6E.png" style={{ color: "transparent" }} /> </div>
                      <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-10 text-primary">
                        <p className="body-md flex group-[.list-lg]:body-lg text-primary"> IndiGo </p>
                      </div>
                      <p className="body-xs text-secondary">₹6,766</p>
                      <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary">
                        <input className="filterCheckBox airlineCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="IndiGo Airline" filtertype={'airline'} onClick={(e) => { handleFilterChange(e) }} />
                        <FaCheck className='text-blue-700 hidden peer-checked:inline-block' />
                      </span>
                    </li>
                    <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-10 px-20 !bg-transparent xl:py-5 xl:gap-5">
                      <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center"> <img alt="holiday-image" loading="lazy" width={40} height={40} decoding="async" data-nimg={1} className="h-auto w-auto" src="https://images.ixigo.com/img/common-resources/airline-new/UK.png" style={{ color: "transparent" }} /> </div>
                      <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-10 text-primary">
                        <p className="body-md flex group-[.list-lg]:body-lg text-primary"> Vistara </p>
                      </div>
                      <p className="body-xs text-secondary">₹7,260</p>
                      <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary">
                        <input className="filterCheckBox airlineCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="Vistara" filtertype={'airline'} onClick={(e) => { handleFilterChange(e) }} />
                        <FaCheck className='text-blue-700 hidden peer-checked:inline-block' />
                      </span>
                    </li>
                    <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-10 px-20 !bg-transparent xl:py-5 xl:gap-5">
                      <div className="inline-flex shrink-0 group-[.list-lg]:h-[60px] group-[.list-lg]:w-[60px] h-[50px] w-[50px] items-center justify-center"> <img alt="holiday-image" loading="lazy" width={40} height={40} decoding="async" data-nimg={1} className="h-auto w-auto" src="https://images.ixigo.com/img/common-resources/airline-new/SG.png" style={{ color: "transparent" }} /> </div>
                      <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-10 text-primary">
                        <p className="body-md flex group-[.list-lg]:body-lg text-primary"> SpiceJet </p>
                      </div>
                      <p className="body-xs text-secondary">₹9,917</p>
                      <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary">
                        <input className="filterCheckBox airlineCheckBox peer absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="SpiceJet" filtertype={'airline'} onClick={(e) => { handleFilterChange(e) }} />
                        <FaCheck className='text-blue-700 hidden peer-checked:inline-block' />
                      </span>
                    </li>

                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className={`SORT relative flex flex-col justify-center items-center `} onClick={() => { setActive(!active); setActiveTab('sort') }}>
            <p><CgSortZa /></p>
            <p>Sort</p>
            <div className={`sortpopup absolute   bg-white shadow rounded-10 transition-all transform duration-700 ${active == true && activeTab === 'sort' ? '-translate-y-[180px] -translate-x-[60px]  opacity-100 scale-x-100' : 'opacity-0 scale-0'}`}>
              <div className="SORTING BAR mb-20 z-50">
                <div className="flex flex-col  gap-20 md:p-0 md:flex-row w-full">
                  <div className="flex flex-wrap gap-20 py-2 md:gap-0 md:justify-between md:divide-x md:text-center md:bg-white md:rounded-10 md:shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)] md:w-full">


                    <div className="flex items-center justify-center gap-10 py-1 w-[157px] relative md:w-1/4 md:justify-center md:gap-0 md:py-0 transition duration-1000">
                      <div className=' w-full h-full relative flex flex-col justify-center items-center transition-all duration-1000'>
                        <input id='radio1' className='hidden group peer' type="radio" name='sort' value={"Early"} filtertype={"priceSort"} onClick={(e) => { handleFilterChange(e) }} />
                        <label htmlFor='radio1' className=' absolute left-0 top-0 w-full h-full cursor-pointer'></label>
                        <p className="body-md md:text-sm md:font-semibold md:font-400 peer-checked:text-blue-700"> Price </p>
                        <p className="body-sm text-secondary md:text-xs peer-checked:text-blue-700"> Low to High </p>
                        <FaCaretDown className='absolute opacity-0 -bottom-2 peer-checked:opacity-100 peer-checked:translate-y-2 peer-checked:text-blue-700 transition duration-150' />
                      </div>
                    </div>

                    <div className="flex items-center gap-10 py-1 w-[157px] relative md:w-1/4 md:justify-center md:gap-0 md:py-0">
                      <div className=' w-full h-full relative flex flex-col justify-center items-center transition duration-500'>
                        <input id='radio2' className='hidden peer' type="radio" name='sort' value={"Early"} filtertype={"fastestSort"} onClick={(e) => { handleFilterChange(e) }} />
                        <label htmlFor='radio2' className=' absolute left-0 top-0 w-full h-full cursor-pointer'></label>
                        <p className="body-md md:text-sm md:font-semibold md:font-400 peer-checked:text-blue-700"> Fastest </p>
                        <p className="body-sm text-secondary md:text-xs peer-checked:text-blue-700"> Shortest First </p>
                        <FaCaretDown className='absolute opacity-0 -bottom-2 peer-checked:opacity-100 peer-checked:translate-y-2 peer-checked:text-blue-700 transition duration-150' />
                      </div>
                    </div>

                    <div className="flex items-center gap-10 py-1 w-[157px] relative md:w-1/4 md:justify-center md:gap-0 md:py-0">
                      <div className=' w-full h-full relative flex flex-col justify-center items-center transition duration-500'>
                        <input id='radio3' className='hidden peer' type="radio" name='sort' value={"Early"} filtertype={"departurePreferenceSort"} onClick={(e) => { handleFilterChange(e) }} />
                        <label htmlFor='radio3' className=' absolute left-0 top-0 w-full h-full cursor-pointer'></label>
                        <p className="body-md md:text-sm md:font-semibold md:font-400 peer-checked:text-blue-700"> Departure </p>
                        <p className="body-sm text-secondary md:text-xs peer-checked:text-blue-700"> Earliest First </p>
                        <FaCaretDown className='absolute opacity-0 -bottom-2 peer-checked:opacity-100 peer-checked:translate-y-2 peer-checked:text-blue-700 transition duration-150' />
                      </div>
                    </div>

                    <div className=" flex items-center gap-10 py-1 w-[157px] relative md:w-1/4 md:justify-center md:gap-0 md:py-0 ">
                      <div className=' w-full h-full relative flex flex-col justify-center items-center transition duration-500'>
                        <input id='radio4' className='hidden peer' type="radio" name='sort' value={"Early"} filtertype={"SmartSort"} onClick={(e) => { handleFilterChange(e) }} />
                        <label htmlFor='radio4' className=' absolute left-0 top-0 w-full h-full cursor-pointer'></label>
                        <p className="body-md md:text-sm md:font-semibold  md:font-400 peer-checked:text-blue-700 "> Smart </p>
                        <p className="body-sm text-secondary md:text-xs peer-checked:text-blue-700"> Recommended </p>
                        <FaCaretDown className='absolute opacity-0 -bottom-2 peer-checked:opacity-100 peer-checked:translate-y-2 peer-checked:text-blue-700 transition duration-150' />
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

    </>


  )
})

export default FlightResults

























