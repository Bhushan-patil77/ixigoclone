import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Navbar from '../Navbar';
import { FaAngleLeft, FaArrowRight, FaBottleWater, FaCheck, FaChevronDown, FaMapLocationDot, FaPlug, FaWifi } from 'react-icons/fa6';
import "react-datepicker/dist/react-datepicker.css";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { WiSnowflakeCold, WiSunrise, WiSunset } from 'react-icons/wi';
import { FiSun } from 'react-icons/fi';
import { MdAirlineSeatFlat, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineAirlineSeatReclineExtra, MdOutlineKeyboardArrowRight, MdOutlineNightsStay } from 'react-icons/md';
import { IoChevronDown, IoClose, IoCloseCircleSharp, IoSunnyOutline } from 'react-icons/io5';
import { PiCloudMoonDuotone } from 'react-icons/pi';
import { TbAirConditioning, TbAirConditioningDisabled, TbSteeringWheel } from 'react-icons/tb';
import { CiStar } from 'react-icons/ci';
import { IoIosSearch, IoMdStar } from 'react-icons/io';
import { BiSolidCctv, BiSolidUser } from 'react-icons/bi';
import { DiVim } from 'react-icons/di';
import Login from '../Login';
import Signup from '../Signup';
import { ThreeCircles } from 'react-loader-spinner';
import { GiChipsBag } from 'react-icons/gi';
import StripeCheckout from 'react-stripe-checkout';
import Payment from '../Payment';
import { TiFilter } from 'react-icons/ti';
import { CgSortZa } from 'react-icons/cg';
import { RiArrowDropDownLine } from 'react-icons/ri';


const BusResults = React.memo(() => {
  const location = useLocation();
  const obj = location.state;
  const [from, setFrom] = useState(obj.from);
  const [to, setTo] = useState(obj.to);
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [date, setDate] = useState(new Date(obj.date));
  const [buses, setBuses] = useState([]);
  const [paginatedBuses, setPaginatedBuses] = useState(buses)
  const [currentPage, setCurrentPage] = useState(0);
  const [selection, setSelection]=useState({'busID':'', 'seats':[], 'boarding_point':'select', 'dropping_point':'select', 'date':date});
  const [selectedSeats, setSelectedSeats]=useState([])
  const [isLoggedIn, setIsLoggedIn]=useState(localStorage.getItem('user') != null);
  const [popupShow, setPopupShow]=useState();
  const [val, setval] = useState([0, 100000])
  const [minmax, setminmax] = useState([]);
  const [message, setMessage]=useState('');
  const [filterObj, setFilterObj] = useState({});
  const [sortObj, setSortObj] = useState({})
  const [activeTab, setActiveTab] = useState('');
  const [active, setActive] = useState(false);
  const [clickedBusId, setClickedBusId]=useState();
  const [clickedBusIndex, setClickedBusIndex]=useState()


  const navigate = useNavigate();

  useEffect(()=>{console.log(selection);},[selection])


  const travelInfo={
    'from':from,
    'to':to,
    'date':date,
  }



  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
 
  const itemsPerPage = 7;
  const firstIndex = (currentPage * itemsPerPage)
  const lastIndex = (currentPage * itemsPerPage + itemsPerPage)
  const pages = Math.ceil(buses.length / itemsPerPage)

  useEffect(()=>{ 
    console.log(selection);
  },[selection])

  useEffect(() => {
    getBuses();
  }, [filterObj, sortObj])

  useEffect(() => {
    getBuses();
  }, [currentPage])

  useEffect(()=>{
   getFromCities()
  },[from])

  useEffect(()=>{
    getToCities()
  },[to])

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

  const getBuses = async () => {
    // const url = `https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${from}","destination":"${to}"}&day=${weekDays[date.getDay()]}`
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
      console.log(response);
      if (response.message === "success") {
        const data = response.data.buses;
        if(response.totalResults>0)
          {
            setMessage('Success')
          }
          if(response.totalResults==0)
            {
              setMessage('No Buses Found')
            }
        setBuses(data);
        paginate(data)
      }
      if (response.status === "fail") {
        alert(response.message)
        setMessage('failed')
      }

      if(response.totalResults==0)
        {
          setMessage('No Buses Found')
        }
    } catch (error) {
      console.log(error);
    }
  }

  


  const paginate = (data) => {

    setPaginatedBuses(data.slice(firstIndex, lastIndex))

  }

  const handleSelection = (e)=>{

  
    const clickedContent = e.target.nextSibling.innerText;
    
       
    if (e.target.attributes.type.value === "checkbox") {
      if (e.target.checked) {

          setSelection(prev => ({
            ...prev, seats: [...prev.seats, clickedContent]
          }))

      }
      else {

        setSelection((prev) => {
          return { ...prev, seats: [...prev.seats.filter((s) => { return s != clickedContent })] }
        })

      }

    }


    if(e.target.attributes.type.value=='radio')
      {

          if (e.target.attributes.name.value === "bordingRadio") {

            setSelection(prevSelection => ({...prevSelection, boarding_point: clickedContent }));
                
          }

          if (e.target.attributes.name.value === "droppingRadio") {

            setSelection(prevSelection => ({...prevSelection, dropping_point: clickedContent }));
          
          }


      }
  
}

  const hide = (id) => {
    document.getElementById(id).classList.add("hidden");
    console.log(' hidding'+ id);
  }

  const show = (id) => {
    document.getElementById(id).classList.remove("hidden");
    console.log('showing'+ id);
  }

  const focus = (id) => {
    document.getElementById(id).focus();
    console.log('focusing'+ id);
  }

  const handlePrice = (e) => {


    if ("price" in filterObj) {

      setFilterObj((prev) => {
        return { ...prev, price: { ...prev.price, min: e[0], max: e[1] } }
      })
    }
    else {
      const newObj = { ...filterObj, "price": {} }

      setFilterObj((prev) => {
        return { ...prev, price: { ...prev.price, min: e[0], max: e[1] } }
      })
    }
  }


  const handleFilterChange = (e) => {

    setCurrentPage(0);
    var filtertype = e.target.attributes.filtertype.value;
    console.log(filtertype);

    if (filtertype === "busType") {
      if (e.target.checked) {
        if ("busType" in filterObj) {

          setFilterObj((prev) => {
            return { ...prev, busType: [...prev.busType, e.target.value] }
          })
        }
        else {
          const newObj = { ...filterObj, "busType": [] }
          setFilterObj(() => {
            return { ...newObj, busType: [...newObj.busType, e.target.value] }
          })
        }

      }
      else {
        setFilterObj((prev) => {
          return { ...prev, busType: [...prev.busType.filter((d) => { return d != e.target.value })] }
        })
        if (filterObj.busType.length <= 1) {
          const { busType, ...rest } = filterObj;
          setFilterObj(rest)
        }

      }
    }

    if (filtertype === "User Rating") {
      if (e.target.checked) {
        if ("userRating" in filterObj) {

          setFilterObj(prev => ({
            ...prev, userRating: e.target.value
          }))


        }
        else {
          const newObj = { ...filterObj, "userRating": '' }
          setFilterObj(() => {
            return { ...newObj, userRating: e.target.value }
          })

        }
      }


    }

    if (filtertype === "departures") {
      if (e.target.checked) {

        if ("departures" in filterObj) {

          setFilterObj(prev => ({
            ...prev, departures: [...prev.departures, e.target.value]
          }))
        }
        else {
          const newObj = { ...filterObj, "departures": [] }
          setFilterObj(() => {
            return { ...newObj, departures: [...newObj.departures, e.target.value] }
          })
        }


      }
      else {
        setFilterObj((prev) => {
          return { ...prev, departures: [...prev.departures.filter((f) => { return f != e.target.value })] }
        })

        if (filterObj.departures.length <= 1) {
          const { departures, ...rest } = filterObj;
          setFilterObj(rest);
        }

      }

    }

    if (filtertype === "Star Rating") {
      if (e.target.checked) {
        if ("starRating" in filterObj) {

          setFilterObj((prev) => {
            return { ...prev, starRating: [e.target.value] }
          })
        }
        else {
          const newObj = { ...filterObj, "starRating": [] }
          setFilterObj(() => {
            return { ...newObj, starRating: [...newObj.starRating, e.target.value] }
          })
        }

      }

    }

    if (filtertype === "Accomodation Type") {
      if (e.target.checked) {
        if ("accomodationType" in filterObj) {

          setFilterObj((prev) => {
            return { ...prev, accomodationType: e.target.value }
          })
        }
        else {
          const newObj = { ...filterObj, "accomodationType": '' }
          setFilterObj(() => {
            return { ...newObj, accomodationType: e.target.value }
          })
        }

      }
      else {
        setFilterObj((prev) => {
          return { ...prev, accomodationType: [...prev.accomodationType.filter((d) => { return d != e.target.value })] }
        })
        if (filterObj.accomodationType.length <= 1) {
          const { accomodationType, ...rest } = filterObj;
          setFilterObj(rest)
        }

      }
    }


    if (filtertype === "Payment Mode") {
      if (e.target.checked) {
        if ("paymentMode" in filterObj) {

          setFilterObj((prev) => {
            return { ...prev, paymentMode: [...prev.paymentMode, e.target.value] }
          })
        }
        else {
          const newObj = { ...filterObj, "paymentMode": [] }
          setFilterObj(() => {
            return { ...newObj, paymentMode: [...newObj.paymentMode, e.target.value] }
          })
        }

      }
      else {
        setFilterObj((prev) => {
          return { ...prev, paymentMode: [...prev.paymentMode.filter((d) => { return d != e.target.value })] }
        })
        if (filterObj.paymentMode.length <= 1) {
          const { paymentMode, ...rest } = filterObj;
          setFilterObj(rest)
        }

      }
    }

    if (filtertype === "Meals") {
      if (e.target.checked) {
        if ("meals" in filterObj) {

          setFilterObj((prev) => {
            return { ...prev, meals: [...prev.meals, e.target.value] }
          })
        }
        else {
          const newObj = { ...filterObj, "meals": [] }
          setFilterObj(() => {
            return { ...newObj, meals: [...newObj.meals, e.target.value] }
          })
        }

      }
      else {
        setFilterObj((prev) => {
          return { ...prev, meals: [...prev.meals.filter((d) => { return d != e.target.value })] }
        })
        if (filterObj.meals.length <= 1) {
          const { meals, ...rest } = filterObj;
          setFilterObj(rest)
        }

      }
    }


    if (e.target.name === "sort") {

      if (filtertype === "Price") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { fare: 1 } }
        setSortObj(ob)
      }


      if (filtertype === "Seats") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { seats: 1 } }
        setSortObj(ob)
      }

      if (filtertype === "Ratings") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { ratings: 1 } }
        setSortObj(ob)
      }

      if (filtertype === "Arrival Time") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { arrivalTime: 1 } }
        setSortObj(ob)
      }

      if (filtertype === "Departure Time") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { departureTime: 1 } }
        setSortObj(ob)
      }


    }


  }

  const getFilteredUrl = () => {



    const str = Object.keys(filterObj).map((key) => {

      if (key === 'busType') {
        const stringifyedStopsValues = filterObj[key].map((f) => {
          return `"${f}"`
        })
        return `"type":[${stringifyedStopsValues}]`
      }

      if (key === 'departures') {
        const stringifyedStopsValues = filterObj[key].map((departure) => {

          if (departure === 'Before 10 AM') { return `"$lte":"10","$gte":"0"` }
          if (departure === '10 AM - 5 PM') { return `"$lte":"17","$gte":"11"` }
          if (departure === '5 PM - 11 PM') { return `"$lte":"23","$gte":"18"` }
          if (departure === 'After 11 PM') { return `"$lte":"24","$gte":"23"` }

        })

        return `"departureTime":{${stringifyedStopsValues}}`
      }

      if (key === 'userRating') {
        return `"rating":{"$gte":${filterObj[key]}}`
      }

      if (key === 'price') {


        const str = Object.keys(filterObj[key]).map((k) => {


          if (k === 'min') {
            return `"$gte":${minmax[0]}`;
          }
          if (k === 'max') {
            return `"$lte":${minmax[1]}`
          }

        })

        return `"fare":{${str}}`
      }

    })

    let sortStr = [];
    if ("sort" in sortObj) {
      sortStr = Object.keys(sortObj.sort).map((key) => {
        return `"${key}":${sortObj.sort[key]}`
      })


    }

    const filterString = str.join(",");
    const sortString = sortStr.join(',');
    const url = `https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${from}","destination":"${to}"}&day=${weekDays[date.getDay()]}&filter={${filterString}}&sort={${sortString}}`
    // const url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&filter={${filterString}}&sort={${sortString}}`

    return url

  }


  // onChange={(e)=>{ const newObj = {'busID':'', 'seats':[], 'boarding_point':'', 'dropping_point':''}; setSelection(newObj);  setSelection((prev)=>{return {...prev, busID: bus._id}}); setSelection((prev)=>{return {...prev, 'travelInfo': travelInfo}});}}

  return (
    <>

     <input id={`popradio`} className='absolute -left-28 opacity-0 peer' type="radio" name='showSeats'  />


      <div className=' absolute  xl:hidden right-[100%] peer-checked:translate-x-[100%] transform transition-all duration-700  w-screen h-screen bg-slate-500 flex flex-col  z-[50]'> <FaAngleLeft  className=' absolute left-1 top-4 w-6 h-6' onClick={()=>{document.getElementById('popradio').checked=false; setSelection({'busID':'', 'seats':[], 'boarding_point':'select', 'dropping_point':'select'}) }} /> 

                    <div  className='w-full h-[85%]   overflow-y-hidden '>

                          {
                            Array(1).fill(0).map((e,i)=>{
                              let u=1;
                              let l=1;
                              return <div id='seatsSelection' className={`  w-full h-full flex flex-col gap-3 items-center transition duration-500    rounded-b-10 pt-2 `}>

                                            <div className="availableSeatsAndColorCodes flex flex-col  items-center  ">
                                              <div className="colorCodes flex ">
                                                <div className='flex flex-col gap-1 items-center text-center text-[11px] leading-3  w-[60px]'> <span className='w-6 h-6 border-2 rounded border-gray-400 bg-white'></span> <p>Available Seats</p> </div> 
                                                <div className='flex flex-col gap-1 items-center text-center text-[11px] leading-3  w-[60px]'> <span className='w-6 h-6 border-2 rounded border-pink-400'></span> <p>Available For Female</p> </div> 
                                                <div className='flex flex-col gap-1 items-center text-center text-[11px] leading-3  w-[60px]'> <span className='w-6 h-6 border-2 rounded  border-gray-400 bg-gray-100'></span> <p>Booked Seats</p> </div> 
                                                <div className='flex flex-col gap-1 items-center text-center text-[11px] leading-3  w-[60px]'> <span className='w-6 h-6 border-2 rounded border-blue-400'></span> <p>Available For Male</p> </div> 
                                                <div className='flex flex-col gap-1 items-center text-center text-[11px] leading-3  w-[60px]'> <span className='w-6 h-6 border-2 rounded bg-green-100 border-green-400'></span> <p>Selected Seats</p> </div> 
                                              </div>
                                            </div>

                                            <div className="seats container flex flex-col justify-center items-center   ">

                                              <div className="seatsContainer flex  justify-around  w-full">
                                                
                                                <div className="upperSeats flex flex-col gap-2 bg-white w-[45%] justify-center items-center    rounded-10 py-2">

                                                <div className="cabin  w-full"><p className='flex justify-start pl-3  '>Upper</p></div>

                                                <div className='flex flex-col gap-2 '>

                                                {
                                                  
                                                  Array(5).fill(0).map((seatRow, seatRowIndex)=>{

                                                

                                                    return  <div key={seatRowIndex} className='flex flex-row gap-8'>

                                                                <div>
                                                                    <input id={`upperseat${clickedBusIndex}${seatRowIndex}3`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}}/>
                                                                    <label htmlFor={`upperseat${clickedBusIndex}${seatRowIndex}3`} className="w-8 h-14 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                    {`U${u++}`}
                                                                        <span className=" absolute bottom-[1px] peer-checked:border-green-300 w-[80%] h-[12%] bg-white rounded-10"/>
                                                                    </label>
                                                                </div>
                                                              
                                                                <div className='flex flex-row gap-2'>
                                                                    <div>
                                                                        <input id={`upperseat${clickedBusIndex}${seatRowIndex}1`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}} />
                                                                        <label htmlFor={`upperseat${clickedBusIndex}${seatRowIndex}1`} className="w-8 h-14 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                            {`U${u++}`} 
                                                                            <span className=" absolute bottom-[1px] peer-checked:border-green-300 w-[80%] h-[12%] bg-white rounded-10"/>
                                                                        </label>
                                                                    </div>

                                                                    <div>
                                                                        <input id={`upperseat${clickedBusIndex}${seatRowIndex}2`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}} />
                                                                        <label htmlFor={`upperseat${clickedBusIndex}${seatRowIndex}2`} className="w-8 h-14 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                            {`U${u++}`}
                                                                            <span className=" absolute bottom-[1px] peer-checked:border-green-300 w-[80%] h-[12%] bg-white rounded-10"/>
                                                                        </label>
                                                                    </div>
                                                                </div>  

                                                            


                                                            </div>

                                                  })
                                                }

                                                </div>

                                                </div>

                                                <div className="lowerSeats flex flex-col gap-2 bg-white w-[45%] justify-center items-center   rounded-10 py-2">

                                                <div className="cabin  flex w-full items-center justify-between px-3 "> <p className=' '>Lower</p> <TbSteeringWheel className='w-6 h-6' /> </div>

                                                <div className='flex flex-col gap-2'>

                                                {
                                                  
                                                  Array(5).fill(0).map((seatRow, seatRowIndex)=>{

                                                    let l = 1
                                                    return  <div key={seatRowIndex} className='flex flex-row gap-8'>

                                                                <div>
                                                                    <input id={`lowerseat${clickedBusIndex}${seatRowIndex}3`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}}/>
                                                                    <label htmlFor={`lowerseat${clickedBusIndex}${seatRowIndex}3`} className="w-8 h-14 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                    {`L${l++}`}
                                                                        <span className=" absolute right-[1px] peer-checked:border-green-300 w-[12%] h-[80%] bg-white rounded-10"/>
                                                                    </label>
                                                                </div>
                                                              
                                                                <div className='flex flex-row gap-2'>
                                                                    <div>
                                                                        <input id={`lowerseat${clickedBusIndex}${seatRowIndex}1`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}} />
                                                                        <label htmlFor={`lowerseat${clickedBusIndex}${seatRowIndex}1`} className="w-8 h-14 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                            {`L${l++}`}
                                                                            <span className=" absolute right-[1px] peer-checked:border-green-300 w-[12%] h-[80%] bg-white rounded-10"/>
                                                                        </label>
                                                                    </div>

                                                                    <div>
                                                                        <input id={`lowerseat${clickedBusIndex}${seatRowIndex}2`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}}/>
                                                                        <label htmlFor={`lowerseat${clickedBusIndex}${seatRowIndex}2`} className="w-8 h-14 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                            {`L${l++}`}
                                                                            <span className=" absolute right-[1px] peer-checked:border-green-300 w-[12%] h-[80%] bg-white rounded-10"/>
                                                                        </label>
                                                                    </div>
                                                                </div>  

                                                              


                                                            </div>

                                                  })
                                                }

                                                </div>

                                                </div>

                                              </div>

                                            </div>

                                            <div className="selectedBoardingAndDroppingPoints w-[100%]  flex flex-col   ">
                                              { selection.boarding_point != "" &&  <div className='flex flex-col p-2 rounded-lg '><p className='text-gray-300'>Boarding Point</p> <div className='flex justify-between gap-1 items-center'>  <div className="selectedBoardingPoint text-[13px]">{selection.boarding_point}</div> <button className='rounded-md text-sm text-orange-400' onClick={()=>{setSelection(prev => ({...prev, boarding_point:'select' })); show(`boardingPointContainer${clickedBusIndex}`); hide(`droppingPointContainer${clickedBusIndex}`)}}> <label htmlFor="boardingPointRadio"> {selection.boarding_point!=='select' ? 'Change' : 'Select'} </label> </button> </div> </div>}
                                              { selection.dropping_point != "" &&  <div className='flex flex-col p-2 rounded-lg '><p className='text-gray-300'>Dropping Point</p> <div className='flex justify-between gap-1 items-center'>  <div className="selectedDroppingPoint text-[13px]">{selection.dropping_point}</div> <button className='rounded-md text-sm text-orange-400' onClick={()=>{setSelection(prev => ({...prev, dropping_point:'select' })); show(`droppingPointContainer${clickedBusIndex}`); hide(`boardingPointContainer${clickedBusIndex}`)}}> <label htmlFor="droppingPointRadio"> {selection.dropping_point!=='select' ? 'Change' : 'Select'} </label> </button> </div> </div>}
                                            </div>
                                            
                                            <div className='Boarding  w-full'>

                                             
                                            <input id='boardingPointRadio' className='peer absolute -top-[100px] opacity-0 ' type="radio" name='boardDrop' />
                                            <div id={`boardingPointContainer${clickedBusIndex}`} className="boardingPointContainer absolute -top-[600px] right-0 transform transition-all duration-700  peer-checked:translate-y-[600px] p-2 w-[100%] min-h-[400px]   rounded-lg bg-white">
                                              <div className="searchBoarding w-full h-[40px] border-b flex gap-2 p-2 items-center"><IoIosSearch /><input className=' outline-none w-full' type="text" placeholder='Search Boarding Point'/></div>
                                              <div className=' min-h-[400px] overflow-y-scroll no-scrollbar'>
                                              <div className="boardingList px-1 flex flex-col divide-y ">
                                                {
                                                  Array(10).fill(0).map((b,i)=>{
                                                    return  <div key={i} className='flex justify-between items-center hover:bg-gray-200 rounded-lg pl-3 '> <input className=' absolute opacity-0' id={`boardingRadio${clickedBusIndex}${i}`} type="radio" name='bordingRadio' onClick={(e)=>{handleSelection(e); hide(`boardingPointContainer${clickedBusIndex}`); selection.dropping_point=="" ? show(`droppingPointContainer${clickedBusIndex}`): ''}} /><label className='text-sm cursor-pointer py-3' htmlFor={`boardingRadio${clickedBusIndex}${i}`}> Ramchandra Flyover {from}</label> <span className='flex flex-col text-xs  w-14'><p>07:30</p><p>10 May</p></span></div>
                                                  })
                                                }
                                              </div>
                                              </div>
                                            </div>

                                            </div>

                                            <div className='Dropping  w-full'>

                                            <input id='droppingPointRadio' className='peer absolute -top-[100px] opacity-0' type="radio" name='boardDrop'/>
                                            <div id={`droppingPointContainer${clickedBusIndex}`} className="droppingPointContainer absolute -top-[600px] right-0 transform transition-all duration-700  peer-checked:translate-y-[600px] p-2 w-[100%] min-h-[400px]   rounded-lg bg-white ">
                                              <div className="searchDropping w-full h-[40px] border-b flex gap-2 p-2 items-center"><IoIosSearch /><input className=' outline-none w-full' type="text" placeholder='Search Dropping Point'/></div>
                                              <div className=' min-h-[400px] overflow-y-scroll no-scrollbar'>
                                              <div className="boardingList px-1 flex flex-col divide-y">
                                                {
                                                  Array(10).fill(0).map((d,i)=>{
                                                    return  <div key={i} className='flex justify-between items-center hover:bg-gray-200 rounded-lg pl-3'> <input className=' absolute opacity-0' id={`droppingRadio${clickedBusIndex}${i}`} type="radio" name='droppingRadio' onClick={(e)=>{handleSelection(e); hide(`droppingPointContainer${clickedBusIndex}`); selection.boarding_point=="" ? show(`boardingPointContainer${clickedBusIndex}`): ''}}/><label className='text-sm cursor-pointer py-3' htmlFor={`droppingRadio${clickedBusIndex}${i}`}> Orchid Hospital, Main circle {to}</label> <span className='flex flex-col text-xs  w-14'><p>07:30</p><p>10 May</p></span></div>
                                                  })
                                                }
                                              </div>
                                              </div>
                                            </div>

                                            </div>

                                      </div>
                            })
                          }



                    </div>
                  

                        
                    <div className='selectionReviewAndContinue flex flex-col gap-2 absolute bottom-0  w-full '>
                      <div className="selectedSeatsAndBaseFare flex justify-between px-2"> <span className='flex gap-2 text-sm'>Seat Selected: { selection.seats.length>0 && selection.seats.map((seat, seatIndex)=>{return <p key={seatIndex} className='font-semibold text-orange-400'>{seat}</p>})}</span> <span className='flex gap-1 '>Base Fare: {selection.seats.length > 0 && <p className='text-orange-400 font-semibold'>{selection.seats.length}</p>}</span></div>
                      <div id='cntbtn' className={`continueBtn  flex justify-center items-center  py-3  font-bold ${selection.seats.length > 0 && selection.boarding_point!='select' && selection.dropping_point!='select' ? `${'bg-[#fc790d] text-white cursor-pointer '}` : `${'text-gray-400 bg-gray-200 cursor-not-allowed'}`}`} onClick={()=>{ isLoggedIn == true? navigate('/BookBus', {state:selection}) : setPopupShow('signinShow') }}> Continue  </div>
                    </div>

      </div>




    
    <div className='bg-gray-100 w-screen h-screen overflow-y-scroll '>


      <div id='login' className={`${popupShow == 'signinShow' ? 'block' : 'hidden'} relative`}>
        <Login setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow}/>
      </div>

     <div id='signup' className={`${popupShow == "signupShow" ? 'block' : 'hidden'} relative`}>
        <Signup setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow}/>
     </div>

     <div className='hidden xl:flex'><Navbar activeLink={3}/></div>
   
      <div className="searchBarDiv hidden xl:block sticky top-0 z-40 ">

        <div className="searchBarWrapper flex flex-col items-center">


          <div className=" shadow-500 w-[100%] p-20 flex flex-col gap-10 bg-gradient-to-r from-[#6f2354] to-[#9d3845] ">

            <div className="flex gap-0.5 cursor-pointer">


              <div className="relative flex gap-0.5 flex-1">

                <div className="INPUT FROM bg-charcoal-40 flex items-center relative w-full h-[60px] hover:bg-neutral-subtle-over border-none rounded-l-10">

                  <div className="INPUT TAG flex  justify-between items-center relative w-full h-full" onClick={() => { show("inputBox1"); hide('inputSpan1'); focus('inputBox1')}}>
                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 " >
                      <div className="flex items-center " >
                        <div className="flex flex-col">
                          <p className="body-xs  text-neutral-400" >From</p>
                          <span id='inputSpan1' className='hidden w- text-lg  font-semibold outline-none bg-transparent ' >{from}</span>
                          <input type="text" id='inputBox1' className=' w-full text-lg font-semibold outline-none bg-transparent' autoComplete='off' value={from} onClick={() => { show("list1") }} onChange={(e) => { setFrom(e.target.value) }} onFocus={(e) => { e.target.select(); show("list1"); hide("list2"); hide('inputBox2'); show('inputSpan2') }}/>
                        </div>
                      </div>
                    </div>
                  </div>


                  {
                    <div id='list1' className="hidden overflow-y-scroll absolute top-[61px] bg-white w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20  !animate-none no-scrollbar  Autocompleter_animate__zqRDe">

                      <div>
                        <p className="h6 px-20 pt-15 pb-5 font-medium">
                          Select Source
                        </p>
                      </div>
                      {
                        fromCities.map((city, index) => {

                          const cityName = city.city;


                          return <div key={index} onClick={() => { setFrom(cityName); hide("list1"); hide("inputBox1"); show("inputSpan1"); show('inputBox2'); focus("inputBox2") }}>
                            <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 " >

                              <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate" >
                                <p className="body-md flex group-[.list-lg]:body-lg text-primary" >
                                  <span className="block truncate" >
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

                </div>

                <div className=" INPUT TO bg-charcoal-40 flex items-center relative w-full h-[60px] hover:bg-neutral-subtle-over border-none ">

                  <div className="flex justify-between items-center relative w-full h-full pl-10" onClick={() => { show("inputBox2"); hide('inputSpan2'); focus('inputBox2'); hide('inputBox1'); show("inputSpan1") }} >
                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10" >
                      <div className="flex items-center " >
                        <div className="flex flex-col">
                          <p className="body-xs text-neutral-400">To</p>
                          <span id='inputSpan2' className='  w-full text-lg  font-semibold outline-none bg-transparent' >{to}</span>
                          <input id='inputBox2' type="text" className='hidden text-lg font-semibold outline-none bg-transparent ' autoComplete='off' value={to} onChange={(e) => { setTo(e.target.value) }} onFocus={(e) => { e.target.select(); show("list2"); hide('inputSpan2'); hide('list1'); }} />
                        </div>
                      </div>
                    </div>
                  </div>


                  <div id='list2' className=" hidden overflow-y-scroll absolute top-[61px] bg-white w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20 !animate-none no-scrollbar  Autocompleter_animate__zqRDe">

                    <div>
                      <p className="h6 px-20 pt-15 pb-5 font-medium">
                        Select Destination
                      </p>
                    </div>
                    {
                      toCities.map((city, index) => {
                        const cityName = city.city;

                        return <div key={index} onClick={() => { setTo(cityName); show("inputSpan2"); hide("list2"); hide("inputBox2"); document.getElementById("datePicker").focus() }}>
                          <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">

                            <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                              <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                <span className="block truncate">
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

              <div className=" DATE PICKER AND RETURN flex items-center justify-between border-none relative w-[320px] gap-0.5 overflow-visible calendarInput">

                <div className=" DATE PICKER bg-charcoal-40 hover:bg-neutral-subtle-over w-full" onClick={() => { focus("datePicker"); hide("list1"); hide("list2"); hide('inputBox1'); hide('inputBox2'); show('inputSpan1'); show('inputSpan2'); }}>
                  <div className="flex justify-between items-center relative w-full h-[60px] justify-center border-b-4 lg:min-h-[60px] border-transparent">
                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                      <div className="flex items-center ">
                        <div className="flex flex-col" >
                          <p className="body-xs text-neutral-400">Departure</p>
                          <div id='datePickerDiv' className='' ><DatePicker id='datePicker' className='h6 max-w-[190px] truncate text-primary font-medium font-medium outline-none bg-transparent' value={`${weekDays[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`} selected={date} onChange={(d) => { setDate(d); hide("datePicker") }} formatDate="DD/MM/YYY" minDate={new Date()} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>





              </div>


              <button id='searchBtn' className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-5 rounded-10 min-h-[50px] button-lg py-[13px] px-15 rounded-none rounded-r-10 text-2xl w-[160px] pl-[25px] " onClick={() => { from && to != undefined ? (from === to ? alert("Source and destination cannot be same") : getBuses()) : alert("All fields are required") }}>
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


            </div>



          </div>

        </div>

      </div>

          <input id='searchbardropdowncheckbox' type="checkbox" className='peer absolute opacity-0' />

          <label htmlFor='searchbardropdowncheckbox' className='xl:hidden relative sticky top-0 z-40 flex flex-col  shadow bg-white font-bold rounded-10 text-sm w-full py-3 '>
            <span className='flex justify-center items-center gap-2'> { from} <FaArrowRight /> {to} </span>
            <span className='flex justify-center items-center gap-2'>{date.getDay()} {month[date.getMonth()]}  <p className='w-1 h-1 bg-black rounded-full'/> {'bus type'} </span>
            <span className='absolute -bottom-3 left-[45%]'>{<RiArrowDropDownLine className='text-2xl' />}</span>
          </label>

          <div className="SEARCHBAR-RELATIVE-CONTAINER xl:hidden bg-transparent rounded-20 absolute transition-all ease-in-out duration-700 transform -top-[100%] peer-checked:top-1 flex justify-center items-start w-[100%] xl:mt-6  z-40 ">

                <span className='absolute right-2 top-1 w-[20px] h-[20px]' onClick={()=>{document.getElementById('searchbardropdowncheckbox').checked=false}}><IoCloseCircleSharp className='w-full h-full'/></span>

                      
                <div className="searchBarWrapper w-full flex flex-col items-center  ">

                          <div className=" shadow-500 w-full xl:w-[90%] xl:p-6 px-2 py-8 flex flex-col gap-10 bg-white  rounded-10  ">

                              <div className="flex xl:flex-row flex-col gap-0.5 cursor-pointer">


                                  <div className="relative flex  gap-0.5 flex-1">

                                      <div className="INPUT FROM bg-charcoal-40 flex items-center relative w-[50%] xl:w-full h-[45px] hover:bg-neutral-subtle-over border-none rounded-l-10">

                                          <div className="INPUT TAG flex  justify-between items-center relative w-full h-full" onClick={() => { show("mobileInputBox1"); hide('mobileInputSpan1'); focus('mobileInputBox1')}}>
                                              <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 " >
                                                  <div className="flex items-center " >
                                                      <div className="flex flex-col">
                                                          <p className="body-xs  text-neutral-400" >From</p>
                                                          <span id='mobileInputSpan1' className='hidden w- xl:text-lg text-sm  font-semibold outline-none bg-transparent'>{from}</span>
                                                          <input type="text" id='mobileInputBox1' defaultValue={'Pune'} className='hidden w-full xl:text-lg truncate text-sm font-semibold outline-none bg-transparent' autoComplete='off' value={from} onClick={() => { show("mobileList1") }} onChange={(e) => { setFrom(e.target.value) }} onFocus={(e) => { e.target.select(); show("mobileList1"); hide("mobileList2"); hide('mobileInputBox2'); show('mobileInputSpan2') }} />
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>


                                          {
                                              <div id='mobileList1' className="hidden overflow-y-scroll absolute top-[61px] bg-white w-[130%] xl:w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20  !animate-none no-scrollbar  Autocompleter_animate__zqRDe">
                                      
                                                  <div>
                                                      <p className="h6 px-20 pt-15 pb-5 font-medium">
                                                          Select Source
                                                      </p>
                                                  </div>
                                                  {
                                                      fromCities.map((city, index) => {

                                                          const cityName = city.city;


                                                          return <div key={index} onClick={() => { setFrom(cityName); hide("mobileList1"); hide("mobileInputBox1"); show("mobileInputSpan1"); show('mobileInputBox2'); focus("mobileInputBox2") }}>
                                                              <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 " >
                                                              
                                                                  <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate" >
                                                                      <p className="body-md flex group-[.list-lg]:body-lg text-primary" >
                                                                          <span className="block truncate" >
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

                                      </div>

                                      <div className=" INPUT TO bg-charcoal-40 flex items-center relative w-[50%] xl:w-full h-[45px] hover:bg-neutral-subtle-over border-none xl:rounded-r-none rounded-r-10 ">

                                          <div className="flex justify-between items-center relative w-full h-full pl-10 " onClick={() => { show("mobileInputBox2"); hide('mobileInputSpan2'); focus('mobileInputBox2'); hide('mobileInputBox1'); show("mobileInputSpan1") }} >
                                              <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 " >
                                                  <div className="flex items-center " >
                                                      <div className="flex flex-col">
                                                          <p className="body-xs text-neutral-400">To</p>
                                                          <span id='mobileInputSpan2' className=' hidden w- text-sm xl:text-lg  font-semibold outline-none bg-transparent ' >{to}</span>
                                                          <input id='mobileInputBox2' type="text" defaultValue={'Mumbai'} className=' hidden text-sm font-semibold outline-none bg-transparent border w-full' autoComplete='off' value={to} onChange={(e) => { setTo(e.target.value) }} onFocus={(e) => { e.target.select(); show("mobileList2"); hide('mobileInputSpan2'); hide('mobileList1'); }} />
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>


                                          <div id='mobileList2' className=" hidden overflow-y-scroll absolute top-[61px] right-0 bg-white w-[130%]  xl:w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20 !animate-none no-scrollbar  Autocompleter_animate__zqRDe">
                                          
                                              <div>
                                                  <p className="h6 px-20 pt-15 pb-5 font-medium">
                                                      Select Destination
                                                  </p>
                                              </div>
                                              {
                                                  toCities.map((city, index) => {
                                                      const cityName = city.city;

                                                      return <div key={index} onClick={() => { setTo(cityName); show("mobileInputSpan2"); hide("mobileList2"); hide("mobileInputBox2"); document.getElementById("datePicker").focus() }}>
                                                          <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15 px-20 ">
                                                            
                                                              <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] p-0 gap-[3px] block truncate">
                                                                  <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                                                      <span className="block truncate">
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

                                      </div>


                                      <div id='swapBtn' className="SWAP BUTTON absolute w-30 h-30 bg-white text-center rounded-full top-[calc(50%-15px)] left-[calc(50%-15px)] rotate-0 border-none shadow-100 flex justify-center items-center transition duration-400 " onClick={(e) => { let x = from; setFrom(to); setTo(x); e.currentTarget.classList.toggle("rotate-180"); hide("mobileList1"); hide('mobileList2'); hide('mobileInputBox1'); hide('mobileInputBox2'); show('mobileInputSpan1'); show("mobileInputSpan2") }} >
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

                                  <div className=" DATE PICKER AND RETURN flex items-center bg-charcoal-40 rounded-10 xl:rounded-none justify-between border-none relative w-full  xl:w-[320px] gap-0.5 overflow-visible calendarInput">

                                      <div className=" DATE PICKER hover:bg-neutral-subtle-over w-full" onClick={() => { focus("datePicker"); hide("mobileList1"); hide("mobileList2"); hide('mobileInputBox1'); hide('mobileInputBox2'); show('mobileInputSpan1'); show('mobileInputSpan2'); }}>
                                          <div className="flex justify-between items-center relative w-full h-[45px] justify-center border-b-4 lg:min-h-[60px] border-transparent">
                                              <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                                                  <div className="flex items-center ">
                                                      <div className="flex flex-col" >
                                                          <p className="body-xs text-neutral-400">Departure</p>
                                                          <div id='datePickerDiv' className='' ><DatePicker id='datePicker' className='h6 max-w-[190px] truncate text-primary font-medium font-medium outline-none bg-transparent' value={`${weekDays[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`} selected={date} onChange={(d) => { setDate(d); hide("datePicker") }} formatDate="DD/MM/YYY" minDate={new Date()} /></div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>





                                  </div>


                                  <button id='searchBtn' className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-5 rounded-10 xl:rounded-l-none xl:min-h-[50px] button-lg h-[45px] px-15 xl:w-[160px] pl-[25px] " onClick={()=>{from && to != undefined ? (from===to ? alert("Source and destination cannot be same") : (navigate("/BusResults" , {state: obj}))): alert("All fields are required")}}>
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


                              </div>



                          </div>

                </div>

          </div>


      <div className="results flex flex-col xl:mx-28">

        {
          buses.length > 0 && <div id='sortBar' className="sortBarAndRadio hidden xl:flex gap-4 flex-row  py-3 sticky top-[90px]  bg-gray-100 z-30">

                                  <div className="sortBar flex items-center py-2 tracking-wide  bg-white drop-shadow rounded-10">

                                    <span className='text-black font-semibold pl-6 py-2'>Sort by:</span>

                                    <div className='  flex divide-x  divide-solid text-slate-600 p-1'>
                                      <span className='px-6'> <input className='hidden peer' id='sortRadio1' type="radio" name='sort' filtertype={'Price'} onChange={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio1">Price</label></span>
                                      <span className='px-4'> <input className='hidden peer' id='sortRadio2' type="radio" name='sort' filtertype={'Seats'} onChange={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio2">Seats</label></span>
                                      <span className='px-4'> <input className='hidden peer' id='sortRadio3' type="radio" name='sort' filtertype={'Ratings'} onChange={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio3">Ratings</label></span>
                                      <span className='px-4'> <input className='hidden peer' id='sortRadio4' type="radio" name='sort' filtertype={'Arrival Time'} onChange={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio4">Arrival Time</label></span>
                                      <span className='px-4'> <input className='hidden peer' id='sortRadio5' type="radio" name='sort' filtertype={'Departure Time'} onChange={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio5">Departure Time</label></span>
                                    </div>

                                  </div>

                                  <div className="numberOfBuses text-[#dc6437] tracking-wider flex gap-4 px-4  bg-white drop-shadow rounded-10">
                                    <span className='flex justify-center items-center'>Showing {buses.length} Buses on this route</span>
                                  </div>

                            </div>
        }

        <div className="filterAndBuses flex gap-6 mt-1 pb-8 ">
          

         {
                               <div className="filter hidden xl:block max-h-[76vh]  sticky top-24 drop-shadow rounded-10 ">

                                    < div className="bg-white rounded-10 w-[300px] ">
                                      <div className="flex justify-between p-20 items-center">
                                        <p className="HEADING body-md font-bold">Filters</p>
                                        <p className="CLEAR ALL body-sm cursor-pointer text-brand-500 font-medium" onClick={() => { document.querySelectorAll('.filterCheckBox').forEach((i) => { if (i.checked) { i.click() } }); setFilterObj({}) }}> Clear All </p>
                                      </div>

                                      <div className="flex flex-col gap-2 px-3 pb-6">

                                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-4 bg-slate-100 rounded-md'><span>Price Drop</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={0} filtertype={'stops'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>

                                        <div className="busType flex flex-col gap-2  px-4 py-4 bg-slate-100 rounded-md">
                                          <span >Bus Type</span>
                                          <div className='flex gap-2 justify-center items-center'>
                                            <span className='relative flex flex-col justify-center items-center rounded-md '><input id='bustypecheckbox1' className='peer absolute opacity-0' type="checkbox" value="AC" filtertype={'busType'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="bustypecheckbox1" className='flex flex-col items-center w-[60px] h-full py-2 peer-checked:text-orange-400 peer-checked:border-orange-400 border rounded-lg bg-[#ffffff]'> <TbAirConditioning className='text-lg' /> <p className='text-xs'>AC</p> </label></span>
                                            <span className='relative flex flex-col justify-center items-center rounded-md '><input id='bustypecheckbox2' className='peer absolute opacity-0' type="checkbox" value="Non-AC" filtertype={'busType'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="bustypecheckbox2" className='flex flex-col items-center w-[60px] h-full py-2 peer-checked:text-orange-400 peer-checked:border-orange-400 border rounded-lg bg-[#ffffff]'> <TbAirConditioningDisabled className='text-lg' /> <p className='text-xs'>Non AC</p> </label></span>
                                            <span className='relative flex flex-col justify-center items-center rounded-md '><input id='bustypecheckbox3' className='peer absolute opacity-0' type="checkbox" value="AC" filtertype={'busType'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="bustypecheckbox3" className='flex flex-col items-center w-[60px] h-full py-2 peer-checked:text-orange-400 peer-checked:border-orange-400 border rounded-lg bg-[#ffffff]'> <MdOutlineAirlineSeatReclineExtra className='text-lg' /><p className='text-xs'>Seater</p> </label></span>
                                            <span className='relative flex flex-col justify-center items-center rounded-md '><input id='bustypecheckbox4' className='peer absolute opacity-0' type="checkbox" value="AC" filtertype={'busType'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="bustypecheckbox4" className='flex flex-col items-center w-[60px] h-full py-2 peer-checked:text-orange-400 peer-checked:border-orange-400 border rounded-lg bg-[#ffffff]'><MdAirlineSeatFlat className='text-lg' /> <p className='text-xs'>Sleeper</p> </label></span>
                                          </div>
                                        </div>

                                        <div className="PRICE FILTER DIV flex flex-col ga  px-4 py-4 bg-slate-100 rounded-md">
                                          <p className=" pb-4">Price Range</p>
                                          <div className="relative w-full ">
                                            <div className='border'> <RangeSlider min={0} max={10000} value={val} onInput={(e) => { setval(e) }} onThumbDragEnd={(e) => { setminmax(val); handlePrice(val) }} /> </div>
                                            <div className='flex justify-between'>
                                              <div className=" left-2 text-secondary text-sm mt-2"> {val[0]} </div>
                                              <div className=" right-2 text-secondary text-sm mt-2"> {val[1]} </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="DEPARTURE FILTER DIV flex flex-col gap-30  px-4 py-4 bg-slate-100 rounded-md">
                                          <div className="flex flex-col gap-10">
                                            <p className="">Departure from {from}</p>

                                            <div className="flex pt-10 gap-15 w-full h-[86px]">

                                              <div id='' className="relative flex flex-col justify-center items-center px-15 py-10 w-full h-full bg-[#ffffff] rounded-lg">
                                                <input id='before10am' className="filterCheckBox peer group absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="Before 10 AM" filtertype={'departures'} onClick={(e) => { handleFilterChange(e) }} />
                                                <label htmlFor='before10am' className="absolute flex flex-col justify-center items-center gap-1 pointer-events-none peer-checked:text-orange-400 peer-checked:border-orange-400 border w-full h-full rounded-lg" >
                                                  <p className="text-3xl"><WiSunrise /></p>
                                                  <p className="">Before 10 AM</p>
                                                </label>
                                              </div>

                                              <div id='' className="relative flex flex-col justify-center items-center px-15 py-10 w-full bg-[#ffffff]  rounded-lg">
                                                <input id='10amTo5pm' className="filterCheckBox peer group absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="10 AM - 5 PM" filtertype={'departures'} onClick={(e) => { handleFilterChange(e) }} />
                                                <label htmlFor='10amTo5pm' className="absolute flex flex-col justify-center items-center gap-1 pointer-events-none peer-checked:text-orange-400 peer-checked:border-orange-400 border w-full h-full rounded-lg" >
                                                  <p className="text-3xl"><IoSunnyOutline /></p>
                                                  <p className=" ">10 AM - 5 PM</p>
                                                </label>
                                              </div>

                                            </div>
                                            <div className="flex pt-10 gap-15 w-full h-[86px]">

                                              <div id='' className="relative flex flex-col justify-center items-center px-15  w-full bg-[#ffffff] rounded-lg">
                                                <input id='5amTo11pm' className="filterCheckBox peer group absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="5 PM - 11 PM" filtertype={'departures'} onClick={(e) => { handleFilterChange(e) }} />
                                                <label htmlFor='5amTo11pm' className="absolute  flex flex-col justify-center items-center gap-1 pointer-events-none peer-checked:text-orange-400 peer-checked:border-orange-400 border w-full h-full rounded-lg" >
                                                  <p className="text-3xl"><WiSunset /></p>
                                                  <p className=" ">5 PM - 11 PM</p>
                                                </label>
                                              </div>

                                              <div id='' className="relative flex flex-col justify-center items-center   px-15 py-10 w-full bg-[#ffffff] rounded-lg ">
                                                <input id='after11pm' className="filterCheckBox peer group absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="After 11 PM" filtertype={'departures'} onClick={(e) => { handleFilterChange(e) }} />
                                                <label htmlFor='after11pm' className="absolute flex flex-col justify-center items-center gap-1 pointer-events-none peer-checked:text-orange-400 peer-checked:border-orange-400 border w-full h-full rounded-lg" >
                                                  <p className="text-3xl"><PiCloudMoonDuotone /></p>
                                                  <p className=" ">After 11 PM</p>
                                                </label>
                                              </div>

                                            </div>
                                          </div>
                                        </div>

                                      </div>

                                    </div>

                              </div> 
         }

          <div className="buses xl:flex justify-center w-full ">
            <div className="offers"></div>
            <div className="suggestions"></div>

            <div id='busCardsScrollable' className="busCards px-1 xl:px-2 flex flex-col gap-4 overflow-y-scroll no-scrollbar  " >


              
             


                  {
                    

                    message === 'Success' ?  paginatedBuses.map((bus, index) => {

                                                        let u = 1;
                                                        let l = 1;
                                                        
                                                        return <div>
                                                        
                                                                    <div  key={index} className='LAPTOP hidden xl:block drop-shadow rounded-10 shadow-slate-800 hover:scale-[1.01]  transition-all duration-200 bg-white'onClick={(e)=>{e.currentTarget.scrollIntoView({behavior:'smooth',block:'end'})}} >

                                                                      <input id={`showseats${index}`} className='absolute opacity-0 peer' type="radio" name='showSeats' onChange={(e)=>{ const newObj = {'busID':'', 'seats':[], 'boarding_point':'', 'dropping_point':''}; setSelection(newObj);  setSelection((prev)=>{return {...prev, busID: bus._id}}); setSelection((prev)=>{return {...prev, 'travelInfo': travelInfo}});}} />

                                                                      <div className="busCard  flex justify-between  rounded-t-10  px-4 pt-3 pb-3 w-[948px] z-0 peer ">

                                                                        <div className="left">

                                                                          <div className="top flex flex-col justify-between ">
                                                                            <div className="upper">
                                                                              <span></span>
                                                                            </div>

                                                                            <div className="middle flex justify-between">

                                                                              <div className="headingandbustype flex flex-col w-[300px] ">
                                                                                <span className='text-lg font-semibold'>{bus.name}</span>
                                                                                <span className='text-sm'>{bus.type} Sleeper (2 + 1)</span>
                                                                              </div>
                                                                              <div className="datetimeinfo flex justify-between items-center px-4 float-right w-[458px]">
                                                                                <div className="from flex flex-col items-start w-[100px]"><span>{date.getDay()} {month[date.getMonth()]}</span><span className='font-bold text-lg'>{bus.departureTime}</span><span>{bus.source.split(',')[0]}</span></div>
                                                                                <div className="travelduration flex justify-center items-center gap-2"><div className='w-1 h-1 bg-slate-400 rounded-full' /> <div className='w-4 border-[1px] border-dashed' /> <span className='border px-2 py-1 text-xs rounded-md'>10:30 Hrs</span> <div className='w-4 border-[1px] border-dashed' /> <div className='w-1 h-1 bg-slate-400 rounded-full' /></div>
                                                                                <div className="to flex flex-col items-end w-[100px]"><span >{date.getDay()} {month[date.getMonth()]}</span><span className='font-bold text-lg'>{bus.arrivalTime}</span><span>{bus.destination.split(',')[0]}</span></div>
                                                                              </div>

                                                                            </div>

                                                                            <div className="lower ">
                                                                              <div className='ratingAminitiesLiveTracking flex gap-2'>
                                                                                <div className="rating flex"><span className=' bg-[#61b00f] text-white px-2 rounded-l-md flex  justify-center items-center gap-1 py-1 text-sm'> <IoMdStar /> <p>{bus.ratings}</p></span>  <span className=' pl-1 pr-2 bg-slate-50 text-slate-300 flex justify-center items-center text-sm rounded-r-md gap-1 '> <BiSolidUser className='' /><p>1.{index}k</p></span></div>
                                                                                <div className="aminities flex gap-1 flex-row items-center bg-slate-50 px-2 rounded-md text-orange-500">{bus.amenities.includes('WiFi') && <FaWifi />}   {bus.amenities.includes('Charging Point') && <FaPlug />}   {bus.amenities.includes('Snack Box') &&  <GiChipsBag /> } {bus.amenities.includes('Water Bottle') &&  <FaBottleWater /> } </div>
                                                                                <div className="liveTracking flex items-center gap-2 bg-slate-50 px-2 rounded-md"><FaMapLocationDot /> <p>Live Tracking</p></div>
                                                                              </div>
                                                                            </div>
                                                                          </div>

                                                                          <div className="bottom flex gap-6 p-1 text-slate-300">

                                                                            <div className="boardingAndDroppingPoints">
                                                                              <div className='relative'>
                                                                                <span className='flex items-center gap-1 text-sm'> <p>Boarding & Droping Points</p> <FaChevronDown /></span>
                                                                                <div className="dropdown"></div>
                                                                              </div>

                                                                            </div>

                                                                            <div className="aminities">
                                                                              <div className='relative'>
                                                                                <span className='flex items-center gap-1 text-sm'> <p>Amenities</p> <FaChevronDown /></span>
                                                                                <div className="dropdown"></div>
                                                                              </div>
                                                                            </div>

                                                                            <div className="cancellationPolicy">
                                                                              <div className='relative'>
                                                                                <span className='flex items-center gap-1 text-sm'> <p>Cancellation Policy</p> <FaChevronDown /></span>
                                                                                <div className="dropdown"></div>
                                                                              </div>
                                                                            </div>

                                                                            <div className="travelPolicy">
                                                                              <div className='relative'>
                                                                                <span className='flex items-center gap-1 text-sm'> <p>Travel Policy</p> <FaChevronDown /></span>
                                                                                <div className="dropdown"></div>
                                                                              </div>
                                                                            </div>

                                                                          </div>
                                                                        </div>

                                                                        <div className="right w-[158px] flex flex-col justify-between items-end py-2   ">
                                                                          <div className="price flex flex-col items-end"> <span>Starting at</span> <span className='text-2xl font-bold'>₹ {bus.fare}</span></div>
                                                                          <div className="availabilityBtnAndAvlSeats flex flex-col items-center gap-1"> <label htmlFor={`showseats${index}`} className=' border  px-6 py-1 flex justify-center items-center  rounded-md bg-[#dc6437] text-white'>Show Seats</label> <span className='text-sm text-slate-400'>{bus.seats} Seats Available</span></div>
                                                                        </div>

                                                                      </div>

                                                                      <div className={`dropdown  w-[948px]  hidden peer-checked:block transition duration-500 bg-[#f8f8f8] rounded-b-10`}>
                                                                            <div className="availableSeatsAndColorCodes flex justify-between px-4 pt-4 bg-gradient-to-b from-white to-[#f8f8f8]">
                                                                              <span className='flex flex-col'> <p className='font-semibold'>{bus.seats} Seats Available</p> <p className='text-gray-300 text-sm'>Click on seat to select/deselect</p></span>
                                                                              <div className="colorCodes flex gap-3">
                                                                                <div className='flex flex-col gap-1 items-center text-center text-[11px] leading-3  w-[60px]'> <span className='w-6 h-6 border-2 rounded border-gray-400 bg-white'></span> <p>Available Seats</p> </div> 
                                                                                <div className='flex flex-col gap-1 items-center text-center text-[11px] leading-3  w-[60px]'> <span className='w-6 h-6 border-2 rounded border-pink-400'></span> <p>Available For Female</p> </div> 
                                                                                <div className='flex flex-col gap-1 items-center text-center text-[11px] leading-3  w-[60px]'> <span className='w-6 h-6 border-2 rounded  border-gray-400 bg-gray-100'></span> <p>Booked Seats</p> </div> 
                                                                                <div className='flex flex-col gap-1 items-center text-center text-[11px] leading-3  w-[60px]'> <span className='w-6 h-6 border-2 rounded border-blue-400'></span> <p>Available For Male</p> </div> 
                                                                                <div className='flex flex-col gap-1 items-center text-center text-[11px] leading-3  w-[60px]'> <span className='w-6 h-6 border-2 rounded bg-green-100 border-green-400'></span> <p>Selected Seats</p> </div> 
                                                                              </div>
                                                                            </div>

                                                                            <div className="seatFares flex items-center gap-2 text-sm px-4">
                                                                              <span className='border px-4 rounded py-1 bg-[#dc6437] text-white '>All</span>
                                                                              {
                                                                                Array(5).fill(0).map((e, i)=>{
                                                                                  
                                                                                  return  <div key={i} className='relative '> <input className='absolute opacity-0 peer' id={`busfare${index}${i}`} type="radio" name='busFare' /> <label className='bg-white px-3 py-1 peer-checked:bg-[#dc6437] peer-checked:text-white rounded'  htmlFor={`busfare${index}${i}`}>₹1700</label></div>
                                                                            
                                                                                })
                                                                              }
                                                                            </div>

                                                                            <div className="seatsAndBoardingPointWrapper flex justify-evenly ">

                                                                              <div className="seatsContainer flex flex-col gap-4 py-4 px-1 w-[48%] ">
                                                                                
                                                                                <div className="upperSeats flex bg-white  py-4 rounded-10">

                                                                                <div className="cabin  flex items-end justify-center pb-4"><p className='  -rotate-90 '>Upper</p></div>

                                                                                <div className='flex gap-4'>

                                                                                {
                                                                                  
                                                                                  Array(5).fill(0).map((seatRow, seatRowIndex)=>{

                                                                                    return  <div key={seatRowIndex} className='flex flex-col gap-8'>
                                                                                              
                                                                                                <div className='flex flex-col gap-1'>
                                                                                                    <div>
                                                                                                        <input id={`upperseat${index}${seatRowIndex}1`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}} />
                                                                                                        <label htmlFor={`upperseat${index}${seatRowIndex}1`} className="w-16 h-7 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                                                            {`U${u++}`}
                                                                                                            <span className=" absolute right-[1px] peer-checked:border-green-300 w-[12%] h-[80%] bg-white rounded-10"/>
                                                                                                        </label>
                                                                                                    </div>

                                                                                                    <div>
                                                                                                        <input id={`upperseat${index}${seatRowIndex}2`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}} />
                                                                                                        <label htmlFor={`upperseat${index}${seatRowIndex}2`} className="w-16 h-7 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                                                            {`U${u++}`}
                                                                                                            <span className=" absolute right-[1px] peer-checked:border-green-300 w-[12%] h-[80%] bg-white rounded-10"/>
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </div>  

                                                                                                <div>
                                                                                                    <input id={`upperseat${index}${seatRowIndex}3`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}}/>
                                                                                                    <label htmlFor={`upperseat${index}${seatRowIndex}3`} className="w-16 h-7 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                                                    {`U${u++}`}
                                                                                                        <span className=" absolute right-[1px] peer-checked:border-green-300 w-[12%] h-[80%] bg-white rounded-10"/>
                                                                                                    </label>
                                                                                                </div>


                                                                                            </div>

                                                                                  })
                                                                                }

                                                                                </div>

                                                                                </div>

                                                                                <div className="lowerSeats flex bg-white py-4 rounded-10">

                                                                                <div className="cabin  flex flex-col items-center justify-between py-4"> <TbSteeringWheel className='-rotate-90  w-8 h-8' /> <p className='  -rotate-90 '>Lower</p></div>

                                                                                <div className='flex gap-4'>

                                                                                {
                                                                                  
                                                                                  Array(5).fill(0).map((seatRow, seatRowIndex)=>{

                                                                                    return  <div key={seatRowIndex} className='flex flex-col gap-8'>
                                                                                              
                                                                                                <div className='flex flex-col gap-1'>
                                                                                                    <div>
                                                                                                        <input id={`lowerseat${index}${seatRowIndex}1`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}} />
                                                                                                        <label htmlFor={`lowerseat${index}${seatRowIndex}1`} className="w-16 h-7 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                                                            {`L${l++}`}
                                                                                                            <span className=" absolute right-[1px] peer-checked:border-green-300 w-[12%] h-[80%] bg-white rounded-10"/>
                                                                                                        </label>
                                                                                                    </div>

                                                                                                    <div>
                                                                                                        <input id={`lowerseat${index}${seatRowIndex}2`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}}/>
                                                                                                        <label htmlFor={`lowerseat${index}${seatRowIndex}2`} className="w-16 h-7 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                                                            {`L${l++}`}
                                                                                                            <span className=" absolute right-[1px] peer-checked:border-green-300 w-[12%] h-[80%] bg-white rounded-10"/>
                                                                                                        </label>
                                                                                                    </div>
                                                                                                </div>  

                                                                                                <div>
                                                                                                    <input id={`lowerseat${index}${seatRowIndex}3`} className="opacity-0 absolute peer" type="checkbox" onChange={(e)=>{handleSelection(e)}}/>
                                                                                                    <label htmlFor={`lowerseat${index}${seatRowIndex}3`} className="w-16 h-7 relative rounded border-2 flex justify-center items-center peer-checked:bg-green-200 peer-checked:border-green-300 cursor-pointer group-hover:bg-gray-200 text-xs">
                                                                                                    {`L${l++}`}
                                                                                                        <span className=" absolute right-[1px] peer-checked:border-green-300 w-[12%] h-[80%] bg-white rounded-10"/>
                                                                                                    </label>
                                                                                                </div>


                                                                                            </div>

                                                                                  })
                                                                                }

                                                                                </div>

                                                                                </div>

                                                                              </div>

                                                                              <div className='boardingAndDroppingContainer py-4 px-1 w-[48%] flex flex-col gap-2 '>
                                                                                  
                                                                                  <div className="selectedBoardingAndDroppingPoints w-[100%] flex flex-col  gap-2 ">
                                                                                    { selection.boarding_point != "" &&  <div className='flex flex-col bg-white p-2 rounded-lg'><p className='text-gray-300'>Boarding Point</p> <div className='flex justify-between gap-2 items-center'>  <div className="selectedBoardingPoint text-[13px]">{selection.boarding_point}</div> <button className='border border-orange-500 px-2 py-1 rounded-md text-sm text-orange-400' onClick={()=>{setSelection(prev => ({...prev, boarding_point:'' })); show(`boardingPointContainer${index}`); hide(`droppingPointContainer${index}`)}}>Change</button> </div> </div>}
                                                                                    { selection.dropping_point != "" &&  <div className='flex flex-col bg-white p-2 rounded-lg'><p className='text-gray-300'>Dropping Point</p> <div className='flex justify-between gap-2 items-center'>  <div className="selectedDroppingPoint text-[13px]">{selection.dropping_point}</div> <button className='border border-orange-500 px-2 py-1 rounded-md text-sm text-orange-400' onClick={()=>{setSelection(prev => ({...prev, dropping_point:'' })); show(`droppingPointContainer${index}`); hide(`boardingPointContainer${index}`)}}>Change</button> </div> </div>}
                                                                                  </div>

                                                                                  <div id={`boardingPointContainer${index}`} className="boardingPointContainer p-2 w-[100%] rounded-lg bg-white">
                                                                                    <div className="searchBoarding w-full h-[40px] border-b flex gap-2 p-2 items-center"><IoIosSearch /><input className=' outline-none w-full' type="text" placeholder='Search Boarding Point'/></div>
                                                                                    <div className=' h-[150px] overflow-y-scroll no-scrollbar'>
                                                                                    <div className="boardingList px-1 flex flex-col divide-y ">
                                                                                      {
                                                                                        Array(10).fill(0).map((b,i)=>{
                                                                                          return  <div key={i} className='flex justify-between items-center hover:bg-gray-200 rounded-lg pl-3 '> <input className=' absolute opacity-0' id={`boardingRadio${index}${i}`} type="radio" name='bordingRadio' onClick={(e)=>{handleSelection(e); hide(`boardingPointContainer${index}`); selection.dropping_point=="" ? show(`droppingPointContainer${index}`): ''}} /><label className='text-sm cursor-pointer py-3' htmlFor={`boardingRadio${index}${i}`}> Ramchandra Flyover Opp Hotel Rajyoj Garden, {from}</label> <span className='flex flex-col text-xs  w-14'><p>07:30</p><p>10 May</p></span></div>
                                                                                        })
                                                                                      }
                                                                                    </div>
                                                                                    </div>
                                                                                  </div>

                                                                                  <div id={`droppingPointContainer${index}`} className="droppingPointContainer p-2 w-[100%] rounded-lg  bg-white hidden">
                                                                                    <div className="searchDropping w-full h-[40px] border-b flex gap-2 p-2 items-center"><IoIosSearch /><input className=' outline-none w-full' type="text" placeholder='Search Dropping Point'/></div>
                                                                                    <div className=' h-[150px] overflow-y-scroll no-scrollbar'>
                                                                                    <div className="boardingList px-1 flex flex-col divide-y">
                                                                                      {
                                                                                        Array(10).fill(0).map((d,i)=>{
                                                                                          return  <div key={i} className='flex justify-between items-center hover:bg-gray-200 rounded-lg pl-3'> <input className=' absolute opacity-0' id={`droppingRadio${index}${i}`} type="radio" name='droppingRadio' onClick={(e)=>{handleSelection(e); hide(`droppingPointContainer${index}`); selection.boarding_point=="" ? show(`boardingPointContainer${index}`): ''}}/><label className='text-sm cursor-pointer py-3' htmlFor={`droppingRadio${index}${i}`}> Orchid Hospital, Main circle {to}</label> <span className='flex flex-col text-xs  w-14'><p>07:30</p><p>10 May</p></span></div>
                                                                                        })
                                                                                      }
                                                                                    </div>
                                                                                    </div>
                                                                                  </div>

                                                                                  <div className='selectionReviewAndContinue flex flex-col gap-2'>
                                                                                    <div className="selectedSeatsAndBaseFare flex justify-between px-2"> <span className='flex gap-2 text-sm'>Seat Selected: { selection.seats.length>0 && selection.seats.map((seat, seatIndex)=>{return <p key={seatIndex} className='font-semibold text-orange-400'>{seat}</p>})}</span> <span className='flex gap-1 '>Base Fare: {selection.seats.length > 0 && <p className='text-orange-400 font-semibold'>{selection.seats.length * bus.fare}</p>}</span></div>
                                                                                    <div className={`continueBtn w-[100%] flex justify-center items-center border py-4 rounded-xl font-bold ${selection.seats.length > 0 && selection.boarding_point!='' && selection.dropping_point!='' ? `${'bg-[#fc790d] text-white cursor-pointer'}` : `${'text-gray-400 bg-gray-200 cursor-not-allowed'}`}`} onClick={()=>{ isLoggedIn == true? navigate('/BookBus', {state:selection}) : setPopupShow('signinShow') }}> Continue  </div>
                                                                                  </div>

                                                                              </div>

                                                                            </div>
                                                                      </div>

                                                                    </div>




                                                                    


                                                                    <div className="MOBILE relative xl:hidden w-screen  flex flex-col shadow rounded-10 ">


                                                                    <label htmlFor={`popradio`} className=' flex flex-col gap-2 p-2' onClick={(e)=>{ const newObj = {'busID':'', 'seats':[], 'boarding_point':'select', 'dropping_point':'select'}; setSelection(newObj);  setSelection((prev)=>{return {...prev, busID: bus._id}}); setSelection((prev)=>{return {...prev, 'travelInfo': travelInfo}});}} >

                                                                      <div className="businfo and rating flex justify-between gap-2">

                                                                        <div className="businfo flex flex-col">
                                                                        <span className='font-semibold'>{bus.name}</span>
                                                                        <span className='text-xs'>{bus.type} Sleeper (2 + 1)</span>
                                                                        </div>

                                                                                
                                                                        <div className="rating"> <div className="rating flex flex-col"><span className=' bg-[#61b00f] text-white px-2 rounded-t-md flex  justify-center items-center gap-1 py-1 text-xs'> <IoMdStar /> <p>{bus.ratings}</p></span>  <span className=' pl-1 pr-2 bg-slate-50 text-slate-300 flex justify-center items-center text-sm rounded-b-md gap-1 '> <BiSolidUser className='' /><p>1.{index}k</p></span></div> </div>

                                                                      </div>

                                                                      <div className="timings,liveTracking and fare flex justify-between">

                                                                        <div className="timings and liveTracking flex flex-col gap-2 ">
                                                                                <div className="timings flex gap-2">
                                                                                <div className="from flex flex-col items-start  "><span className='font-bold text-lg'>{bus.departureTime}</span></div>
                                                                                <div className="travelduration flex justify-center items-center"><div className='w-[5px] h-[5px] bg-slate-500 rounded-full flex justify-center items-center' /> <div className='w-3 border border-slate-400 border-dashed flex justify-center items-center' /> <span className='border border-slate-400 px-2 py-1 text-xs rounded-md'>10:30 Hrs</span> <div className='w-3 border border-slate-400 border-dashed flex justify-center items-center' /> <div className='w-[5px] h-[5px] bg-slate-500 rounded-full flex justify-center items-center' /></div>
                                                                                <div className="to flex flex-col items-end "><span className='font-bold text-lg'>{bus.arrivalTime}</span></div>
                                                                                </div>

                                                                                <div className="liveTracking flex">
                                                                                <div className="aminities flex gap-1 flex-row items-center bg-slate-50 rounded-md text-orange-500">{bus.amenities.includes('WiFi') && <FaWifi />}   {bus.amenities.includes('Charging Point') && <FaPlug />}   {bus.amenities.includes('Snack Box') &&  <GiChipsBag /> } {bus.amenities.includes('Water Bottle') &&  <FaBottleWater /> } </div>
                                                                                <div className="liveTracking flex items-center gap-2 bg-slate-50 px-2 rounded-md"><FaMapLocationDot /> <p>Live Tracking</p></div>
                                                                                </div>
                                                                        </div>

                                                                       

                                                                        <div className="fare">
                                                                        <div className="price flex flex-col items-center gap-2"> <span className='text-xs'>Starting @</span> <span className='text- font-bold'>₹ {bus.fare}</span></div>
                                                                        </div>

                                                                      </div>

                                                                      <div className="amenities"></div>


                                                                      </label>


                                                                    </div>



                                                                </div>
                                                })

                                   :

                                    <div className='MESSAGE flex flex-col justify-center items-center gap-10 my-10 w-screen xl:w-[948px]'>
                                        {
                                          
                                            message == 'Loading...' ? <div className=' w-full h-screen flex justify-center items-center animate-spin '> <ThreeCircles visible={true} height="50" width="50" color="#fc790d" ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass="animate-spin"/> </div> : <div className=' w-full h-screen flex justify-center items-center text-xl font-semibold tracking-widest'>{`${message}`}</div>
                                          }
                                    </div>
                  }

                  
                    {
                      message == 'Success' && <div className='PAGINATION BUTTONS flex flex-col justify-center items-center mt-20 transition duration-500'>

                                                <div className='flex justify-center items-center gap-4 transition duration-300 py-4'>
                                                  <button className={`border drop-shadow w-[30px] h-[30px] rounded-full flex flex-col justify-center items-center bg-white ${currentPage == 0 ? "cursor-not-allowed" : ""}`} onClick={() => { setCurrentPage((prev) => { return Math.max(prev - 1, 0) }); document.getElementById('busCardsScrollable').scrollTo({ top: 0, behavior: "smooth" }) }}> <MdKeyboardArrowLeft /> </button>       {Array(pages).fill().map((_, index) => { return <button key={index} className={`${currentPage == index ? 'bg-blue-700 text-white' : "bg-white"} w-[30px] h-[30px] rounded-full drop-shadow flex justify-center items-center `} onClick={() => { setCurrentPage(index); document.getElementById('screenScroll').scrollTo({ top: 0, behavior: "smooth" }) }}>{index + 1}</button> })}        <button className={`border drop-shadow  w-[30px] h-[30px] rounded-full flex flex-col justify-center items-center bg-white ${currentPage == pages - 1 ? "cursor-not-allowed" : ""}`} onClick={() => { setCurrentPage((prev) => { return Math.min(prev + 1, pages - 1) }); document.getElementById('screenScroll').scrollTo({ top: 0, behavior: "smooth" }) }}> <MdKeyboardArrowRight /> </button>
                                                </div>

                                            </div>
                    }

            </div>



          </div>


        </div>

      </div>


      <div className="BOTTOM RIBBON hidden fixed  bottom-0 z-50 xl:hidden h-[60px] w-full bg-gray-400 flex justify-between px-8 items-center">

            <div className="FILTER relative flex flex-col justify-center items-center" onClick={() => { setActive(!active); setActiveTab('filter') }}>
              <p><TiFilter /></p>
              <p>Filter</p>
              <div className={`filterpopup absolute  shadow rounded-10 left-0 h-[500px]  transition-all transform duration-700 ${active == true && activeTab === 'filter' ? '-translate-y-[280px] -translate-x-[5px]  opacity-100 scale-x-100' : 'opacity-0 scale-0 -translate-x-[200px]'}`} >
                  

                      <div className="filter max-h-[76vh]  sticky top-24 drop-shadow rounded-10 ">

                    < div className="bg-white rounded-10 w-[300px] ">
                      <div className="flex justify-between p-20 items-center">
                        <p className="HEADING body-md font-bold">Filters</p>
                        <p className="CLEAR ALL body-sm cursor-pointer text-brand-500 font-medium" onClick={() => { document.querySelectorAll('.filterCheckBox').forEach((i) => { if (i.checked) { i.click() } }); setFilterObj({}) }}> Clear All </p>
                      </div>

                      <div className="flex flex-col gap-2 px-3 pb-6">

                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-4 bg-slate-100 rounded-md'><span>Price Drop</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={0} filtertype={'stops'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>

                        <div className="busType flex flex-col gap-2  px-4 py-4 bg-slate-100 rounded-md">
                          <span >Bus Type</span>
                          <div className='flex gap-2 justify-center items-center'>
                            <span className='relative flex flex-col justify-center items-center rounded-md '><input id='bustypecheckbox1' className='peer absolute opacity-0' type="checkbox" value="AC" filtertype={'busType'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="bustypecheckbox1" className='flex flex-col items-center w-[60px] h-full py-2 peer-checked:text-orange-400 peer-checked:border-orange-400 border rounded-lg bg-[#ffffff]'> <TbAirConditioning className='text-lg' /> <p className='text-xs'>AC</p> </label></span>
                            <span className='relative flex flex-col justify-center items-center rounded-md '><input id='bustypecheckbox2' className='peer absolute opacity-0' type="checkbox" value="Non-AC" filtertype={'busType'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="bustypecheckbox2" className='flex flex-col items-center w-[60px] h-full py-2 peer-checked:text-orange-400 peer-checked:border-orange-400 border rounded-lg bg-[#ffffff]'> <TbAirConditioningDisabled className='text-lg' /> <p className='text-xs'>Non AC</p> </label></span>
                            <span className='relative flex flex-col justify-center items-center rounded-md '><input id='bustypecheckbox3' className='peer absolute opacity-0' type="checkbox" value="AC" filtertype={'busType'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="bustypecheckbox3" className='flex flex-col items-center w-[60px] h-full py-2 peer-checked:text-orange-400 peer-checked:border-orange-400 border rounded-lg bg-[#ffffff]'> <MdOutlineAirlineSeatReclineExtra className='text-lg' /><p className='text-xs'>Seater</p> </label></span>
                            <span className='relative flex flex-col justify-center items-center rounded-md '><input id='bustypecheckbox4' className='peer absolute opacity-0' type="checkbox" value="AC" filtertype={'busType'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="bustypecheckbox4" className='flex flex-col items-center w-[60px] h-full py-2 peer-checked:text-orange-400 peer-checked:border-orange-400 border rounded-lg bg-[#ffffff]'><MdAirlineSeatFlat className='text-lg' /> <p className='text-xs'>Sleeper</p> </label></span>
                          </div>
                        </div>

                        <div className="PRICE FILTER DIV flex flex-col ga  px-4 py-4 bg-slate-100 rounded-md">
                          <p className=" pb-4">Price Range</p>
                          <div className="relative w-full ">
                            <div className='border'> <RangeSlider min={0} max={10000} value={val} onInput={(e) => { setval(e) }} onThumbDragEnd={(e) => { setminmax(val); handlePrice(val) }} /> </div>
                            <div className='flex justify-between'>
                              <div className=" left-2 text-secondary text-sm mt-2"> {val[0]} </div>
                              <div className=" right-2 text-secondary text-sm mt-2"> {val[1]} </div>
                            </div>
                          </div>
                        </div>

                        <div className="DEPARTURE FILTER DIV flex flex-col gap-30  px-4 py-4 bg-slate-100 rounded-md">
                          <div className="flex flex-col gap-10">
                            <p className="">Departure from {from}</p>

                            <div className="flex pt-10 gap-15 w-full h-[86px]">

                              <div id='' className="relative flex flex-col justify-center items-center px-15 py-10 w-full h-full bg-[#ffffff] rounded-lg">
                                <input id='before10am' className="filterCheckBox peer group absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="Before 10 AM" filtertype={'departures'} onClick={(e) => { handleFilterChange(e) }} />
                                <label htmlFor='before10am' className="absolute flex flex-col justify-center items-center gap-1 pointer-events-none peer-checked:text-orange-400 peer-checked:border-orange-400 border w-full h-full rounded-lg" >
                                  <p className="text-3xl"><WiSunrise /></p>
                                  <p className="">Before 10 AM</p>
                                </label>
                              </div>

                              <div id='' className="relative flex flex-col justify-center items-center px-15 py-10 w-full bg-[#ffffff]  rounded-lg">
                                <input id='10amTo5pm' className="filterCheckBox peer group absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="10 AM - 5 PM" filtertype={'departures'} onClick={(e) => { handleFilterChange(e) }} />
                                <label htmlFor='10amTo5pm' className="absolute flex flex-col justify-center items-center gap-1 pointer-events-none peer-checked:text-orange-400 peer-checked:border-orange-400 border w-full h-full rounded-lg" >
                                  <p className="text-3xl"><IoSunnyOutline /></p>
                                  <p className=" ">10 AM - 5 PM</p>
                                </label>
                              </div>

                            </div>
                            <div className="flex pt-10 gap-15 w-full h-[86px]">

                              <div id='' className="relative flex flex-col justify-center items-center px-15  w-full bg-[#ffffff] rounded-lg">
                                <input id='5amTo11pm' className="filterCheckBox peer group absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="5 PM - 11 PM" filtertype={'departures'} onClick={(e) => { handleFilterChange(e) }} />
                                <label htmlFor='5amTo11pm' className="absolute  flex flex-col justify-center items-center gap-1 pointer-events-none peer-checked:text-orange-400 peer-checked:border-orange-400 border w-full h-full rounded-lg" >
                                  <p className="text-3xl"><WiSunset /></p>
                                  <p className=" ">5 PM - 11 PM</p>
                                </label>
                              </div>

                              <div id='' className="relative flex flex-col justify-center items-center   px-15 py-10 w-full bg-[#ffffff] rounded-lg ">
                                <input id='after11pm' className="filterCheckBox peer group absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" value="After 11 PM" filtertype={'departures'} onClick={(e) => { handleFilterChange(e) }} />
                                <label htmlFor='after11pm' className="absolute flex flex-col justify-center items-center gap-1 pointer-events-none peer-checked:text-orange-400 peer-checked:border-orange-400 border w-full h-full rounded-lg" >
                                  <p className="text-3xl"><PiCloudMoonDuotone /></p>
                                  <p className=" ">After 11 PM</p>
                                </label>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                      </div> 

              </div>
            </div>

            <div className={`SORT relative flex flex-col justify-center items-center `} onClick={() => { setActive(!active); setActiveTab('sort') }}>
              <p><CgSortZa /></p>
              <p>Sort</p>
              <div className={`sortpopup absolute   bg-white shadow rounded-10 transition-all transform duration-700 ${active == true && activeTab === 'sort' ? '-translate-y-[180px] -translate-x-[60px]  opacity-100 scale-x-100' : 'opacity-0 scale-0'}`}>
              

                    <div className="sortBar flex items-center py-2 tracking-wide  bg-white drop-shadow rounded-10">

                  <span className='text-black font-semibold pl-6 py-2'>Sort by:</span>

                  <div className='  flex divide-x  divide-solid text-slate-600 p-1'>
                    <span className='px-6'> <input className='hidden peer' id='sortRadio1' type="radio" name='sort' filtertype={'Price'} onChange={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio1">Price</label></span>
                    <span className='px-4'> <input className='hidden peer' id='sortRadio2' type="radio" name='sort' filtertype={'Seats'} onChange={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio2">Seats</label></span>
                    <span className='px-4'> <input className='hidden peer' id='sortRadio3' type="radio" name='sort' filtertype={'Ratings'} onChange={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio3">Ratings</label></span>
                    <span className='px-4'> <input className='hidden peer' id='sortRadio4' type="radio" name='sort' filtertype={'Arrival Time'} onChange={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio4">Arrival Time</label></span>
                    <span className='px-4'> <input className='hidden peer' id='sortRadio5' type="radio" name='sort' filtertype={'Departure Time'} onChange={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio5">Departure Time</label></span>
                  </div>

                  </div>


              </div>
            </div>

      </div>



    </div>


    </>
  )
})

export default BusResults