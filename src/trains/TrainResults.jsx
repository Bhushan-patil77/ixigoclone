import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineSwapHorizontalCircle } from 'react-icons/md'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { IoIosArrowDown } from 'react-icons/io';
import Navbar from '../Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlass, ThreeCircles } from 'react-loader-spinner';
import { DiVim } from 'react-icons/di';
import Login from '../Login';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { IoClose, IoCloseCircleSharp } from 'react-icons/io5';
import Signup from '../Signup';
import { TiFilter } from 'react-icons/ti';
import { FaArrowRight, FaCheck } from 'react-icons/fa6';
import { CgSortZa } from 'react-icons/cg';
import { RiArrowDropDownLine } from 'react-icons/ri';



const TrainResults = React.memo(()=> {
  const location = useLocation();
  const obj = location.state;
  const [dateArray, setDateArray] = useState([]);
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [from, setFrom] = useState(obj.from);
  const [to, setTo] = useState(obj.to);
  const [date, setDate] = useState(new Date(obj.date));
  const [trains, setTrains] = useState([]);
  const [paginatedTrains, setPaginatedTrains] = useState(trains)
  const [filterObj, setFilterObj] = useState({});
  const [sortObj, setSortObj] = useState({})
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage]=useState('');
  const [isLoggedIn, setIsLoggedIn]=useState(localStorage.getItem('user') != null);
  const [popupShow, setPopupShow]=useState();
  const [activeTab, setActiveTab] = useState('');
  const [active, setActive] = useState(false)
  const [val, setval] = useState([0, 100000]);
  const [minmax, setminmax] = useState([]);





  const navigate = useNavigate();

  const itemsPerPage = 7;
  const firstIndex = (currentPage * itemsPerPage)
  const lastIndex = (currentPage * itemsPerPage + itemsPerPage)
  const pages = Math.ceil(trains.length / itemsPerPage)


  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  useEffect(() => {
    setActive(true)
  }, [activeTab])



  useEffect(()=>{
    console.log(filterObj);
  },[filterObj])

useEffect(()=>{
  getTrains()
  generateDateArray()
},[])

useEffect(()=>{
  getFromCities()
},[from])

useEffect(()=>{
  getToCities()
},[to])


useEffect(()=>{
  getTrains()
},[currentPage, filterObj, sortObj])



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

  const getTrains = async () => {

    const projectId = '8bropwptza4g';
    const url = getFilteredUrl();
    console.log(url);
    setMessage('Loading...')


    try {
      var response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          projectID: projectId
        }
      })

      response = await response.json();

      if (response.status === "success") {
        const data = response.data.trains;
        setTrains(data);
        paginate(data)
        setMessage('success')
        show('suggestionBar')
        show('sortBar')
        console.log(data);
      }
      if (response.status === "fail") {
        alert(response.message)
        setMessage('failed')
      }
      if(response.message=='No trains found for the given day.')
        {
          setPaginatedTrains([])
          setMessage('No Trains Found')
          hide('suggestionBar')
          hide('sortBar')
        }
    } catch (error) {
      console.log(error);
    }

  }

  const paginate = (data) => {

    setPaginatedTrains(data.slice(firstIndex, lastIndex))

  }

  const handleFilterChange = (e) => {
    
    setCurrentPage(0);
    var filterType = e.target.attributes.filtertype.value;
    console.log(filterType);

    if (filterType === "coach") {
      if (e.target.checked) {
        if ("coaches" in filterObj) {

          setFilterObj(prev => ({
            ...prev, coaches: [...prev.coaches, e.target.value]
          }))


        }
        else {
          const newObj = { ...filterObj, "coaches": [] }
          setFilterObj(() => {
            return { ...newObj, coaches: [...newObj.coaches, e.target.value] }
          })

        }
      }
      else {
        setFilterObj((prev) => {
          return { ...prev, coaches: [...prev.coaches.filter((coach) => { return coach != e.target.value })] }
        })

        if (filterObj.coaches.length <= 1) {
          const { coaches, ...rest } = filterObj;
          setFilterObj(rest);
        }



      }

    }

    if (filterType === "departure") {
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
          return { ...prev, departures: [...prev.departures.filter((departure) => { return departure != e.target.value })] }
        })

        if (filterObj.departures.length <= 1) {
          const { departures, ...rest } = filterObj;
          setFilterObj(rest);
        }

      }

    }

    if (filterType === "arrival") {
      if (e.target.checked) {
        if ("arrivals" in filterObj) {

          setFilterObj((prev) => {
            return { ...prev, arrivals: [...prev.arrivals, e.target.value] }
          })
        }
        else {
          const newObj = { ...filterObj, "arrivals": [] }
          setFilterObj(() => {
            return { ...newObj, arrivals: [...newObj.arrivals, e.target.value] }
          })
        }

      }
      else {
        setFilterObj((prev) => {
          return { ...prev, arrivals: [...prev.arrivals.filter((d) => { return d != e.target.value })] }
        })
        if (filterObj.arrivals.length <= 1) {
          const { arrivals, ...rest } = filterObj;
          setFilterObj(rest)
        }

      }
    }

    if (filterType === "quota") {
      if (e.target.checked) {
        if ("quotas" in filterObj) {

          setFilterObj((prev) => {
            return { ...prev, quotas: [...prev.quotas, e.target.value] }
          })
        }
        else {
          const newObj = { ...filterObj, "quotas": [] }
          setFilterObj(() => {
            return { ...newObj, quotas: [...newObj.quotas, e.target.value] }
          })
        }

      }
      else {
        setFilterObj((prev) => {
          return { ...prev, quotas: [...prev.quotas.filter((d) => { return d != e.target.value })] }
        })
        if (filterObj.quotas.length <= 1) {
          const { quotas, ...rest } = filterObj;
          setFilterObj(rest)
        }

      }
    }

    if (e.target.name === "sort") {

      if (filterType === "departureSort") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { ...rest.sort, departureTime: 1 } }
        setSortObj(ob)
      }


      if (filterType === "arrivalSort") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { ...rest.sort, arrivalTime: 1 } }
        setSortObj(ob)
      }

      if (filterType === "quotasSort") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { ...rest.sort, quota: 1 } }
        setSortObj(ob)
      }

      if (filterType === "durationSort") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { ...rest.sort, travelDuration: 1 } }
        setSortObj(ob)
      }

      if (filterType === "priceSort") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { ...rest.sort, fare: 1 } }
        setSortObj(ob)
      }
    }


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


  const getFilteredUrl = () => {



    const str = Object.keys(filterObj).map((key) => {

      if (key === 'coaches') {
        const stringifyedCoachesValues = filterObj[key].map((coach) => {
          return `"${coach}"`
        })
        return `"coaches.coachType":[${stringifyedCoachesValues}]`
      }

      if (key === 'departures') {
        const stringifyedDepartureTimesValues = filterObj[key].map((departure) => {

          if (departure === 'Early Morning') { return `"$lte":"06","$gte":"0"` }
          if (departure === 'Morning') { return `"$lte":"12","$gte":"06"` }
          if (departure === 'Mid Day') { return `"$lte":"18","$gte":"12"` }
          if (departure === 'Night') { return `"$lte":"24","$gte":"18"` }

        })

        return `"departureTime":{${stringifyedDepartureTimesValues}}`
      }


      if (key === 'arrivals') {
        const stringifyedArrivalTimesValues = filterObj[key].map((arrival) => {

          if (arrival === 'Early Morning') { return `"$lte":"06","$gte":"0"` }
          if (arrival === 'Morning') { return `"$lte":"12","$gte":"06"` }
          if (arrival === 'Mid Day') { return `"$lte":"18","$gte":"12"` }
          if (arrival === 'Night') { return `"$lte":"24","$gte":"18"` }

        })

        return `"arrivalTime":{${stringifyedArrivalTimesValues}}`
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





      if (key === 'duration') {
        const stringifyedStopsValues = filterObj[key].map((duration) => {
          return `"${duration}"`
        })

        return `"duration":[${stringifyedStopsValues}]`
      }

      // if (key === 'ticketPrice') {


      //   const str = Object.keys(filterObj[key]).map((k) => {


      //     if (k === 'min') {
      //       return `"$gte":${minmax[0]}`;
      //     }
      //     if (k === 'max') {
      //       return `"$lte":${minmax[1]}`
      //     }

      //   })

      //   return `"ticketPrice":{${str}}`
      // }

    })

    let sortStr = [];
    if ("sort" in sortObj) {
      sortStr = Object.keys(sortObj.sort).map((key) => {
        return `"${key}":"${sortObj.sort[key]}"`
      })


    }

    const filterString = str.join(",");
    const sortString = sortStr.join(',');
    const url = `https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${from}","destination":"${to}"}&day=${weekDays[date.getDay()]}&filter={${filterString}}&sort={${sortString}}`;





    return url




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


  return (
    <div className=' w-screen h-screen'>
     
     <div id='login' className={`${popupShow == 'signinShow' ? 'block' : 'hidden'} relative`}>
      <Login setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow}/>
     </div>

     <div id='signup' className={`${popupShow == "signupShow" ? 'block' : 'hidden'} relative`}>
      <Signup setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow}/>
     </div>

     <div className='xl:block hidden'><Navbar activeLink={2}/></div>

    <div id='w1' className='transition duration-500 ' >

      <div className='flex justify-center'>

        <input id='searchbardropdowncheckbox' type="checkbox" className='peer absolute opacity-0' />

        <label htmlFor='searchbardropdowncheckbox' className='relative flex  justify-center items-center w-[80%] gap-2 sticky top-0 z-40  bg-gray-200  rounded-20 text-sm text-gray-600 py-3 mt-2 mb-2 xl:hidden'>
          <span className='flex justify-center items-center gap-2 text-gray-700'> { from} <FaArrowRight /> {to} </span> <p className='w-1 h-1 bg-black rounded-full'/>   <span className='flex justify-center items-center gap-2' >   {date.getDate()} {month[date.getMonth()]}  </span>
        </label>

        <div className="SEARCHBAR-RELATIVE-CONTAINER  bg-transparent rounded-20 absolute transition-all ease-in-out duration-700 transform -top-[100%] peer-checked:top-0 flex justify-center items-start w-[100%] xl:mt-6  z-40 xl:hidden">

        <span className='absolute right-2 top-1 w-[20px] h-[20px]' onClick={()=>{document.getElementById('searchbardropdowncheckbox').checked=false}}><IoCloseCircleSharp className='w-full h-full'/></span>

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
                                <div className="flex  justify-between items-center relative w-full h-full" onClick={() => { show("mobileinputbox1"); hide('mobileinputspan1'); focus('mobileinputbox1'); hide("mobiletravellersdropdown"); }}>
                                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 " >
                                        <div className="flex items-center " >
                                            <div className="flex flex-col">
                                                <p className=" body-xs text-neutral-400 w-full" >From</p>
                                                <input type="text" id='mobileinputbox1' className=' w-full text-sm font-semibold outline-none bg-transparent' value={from && from}  onChange={(e) => { setFrom(e.target.value) }} onFocus={(e) => { e.target.select(); show("mobilelist1"); hide("mobilelist2") }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* INPUT TAG FROM */}


                                {/* INPUT LIST FROM */}
                                {
                                  <div id='mobilelist1' className="hidden overflow-y-scroll absolute top-[61px] bg-white w-[200%] lg:w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20  !animate-none no-scrollbar  Autocompleter_animate__zqRDe">
                                            
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


                                          return <div key={index} onClick={() => { setFrom(cityName); hide("mobilelist1"); show('mobileinputbox2'); focus("mobileinputbox2") }}>
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

                            <div className=" INPUT TO bg-charcoal-40 flex items-center relative w-full h-[45px] xl:h-[60px] hover:bg-neutral-subtle-over border-none rounded-r-10 ">

                                {/* INPUT TAG TO */}
                                <div className="flex justify-between items-center relative w-full h-full pl-10 " onClick={() => { show("mobileinputbox2"); hide('mobileinputspan2'); focus('mobileinputbox2'); hide('mobileinputbox1'); show("mobileinputspan1"); hide("mobiletravellersdropdown"); }} >
                                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 " >
                                        <div className="flex items-center " >
                                            <div className="flex flex-col">
                                                <p className="body-xs text-neutral-400">To</p>
                                                <input id='mobileinputbox2' type="text" className='  w-full text-sm font-semibold outline-none bg-transparent ' value={to && to} onChange={(e) => { setTo(e.target.value) }} onFocus={(e) => { e.target.select(); show("mobilelist2"); hide('mobilelist1'); }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* INPUT TAG TO */}


                                {/* INPUT LIST TO */}
                                <div id='mobilelist2' className=" hidden overflow-y-scroll absolute top-[61px] right-0 bg-white w-[200%] lg:w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20 !animate-none no-scrollbar  Autocompleter_animate__zqRDe">
                                        
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

                                                return <div key={index} onClick={() => { setTo(cityName);  hide("mobilelist2") }}>
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

                          

                            <div id='swapBtn' className="SWAP BUTTON absolute w-30 h-30 bg-white text-center rounded-full top-[calc(50%-15px)] left-[calc(50%-15px)] rotate-0 border-none shadow-100 flex justify-center items-center transition duration-400 " onClick={(e) => { let x = from; setFrom(to); setTo(x); e.currentTarget.classList.toggle("rotate-180"); hide("mobilelist1"); hide('mobilelist2'); hide('mobileinputbox1'); hide('mobileinputbox2'); show('mobileinputspan1'); show("mobileinputspan2") }} >
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
                            <div className=" DATE PICKER bg-charcoal-40 hover:bg-neutral-subtle-over w-full xl:rounded-none rounded-10" onClick={() => { focus("mobiledatepicker"); hide("mobilelist1"); hide("mobilelist2"); hide('mobileinputbox1'); hide('mobileinputbox2'); show('mobileinputspan1'); show('mobileinputspan2'); }}>
                                <div className="flex justify-between items-center relative w-full h-[45px] xl:h-[60px] justify-center border-b-4 lg:min-h-[60px] border-transparent">
                                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                                        <div className="flex items-center ">
                                            <div className="flex flex-col" >
                                                <p className="body-xs text-neutral-400">Departure</p>
                                                <div id='mobiledatepickerDiv' className='' ><DatePicker id='mobiledatepicker' className='h6 max-w-[190px] truncate xl:text-lg text-sm xl:text-primary font-medium font-medium outline-none bg-transparent' value={`${weekDays[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`} selected={date} onChange={(d) => { setDate(d); hide("mobiledatepicker") }} formatDate="DD/MM/YYY" minDate={new Date()} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* DATE PICKER */}





                        </div>

                    

                        {/* SEARCH BUTTON */}
                        <button id='mobilesearchbtn' className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-5 rounded-10 xl:h-[60px] h-[45px] button-lg py-[13px] px-15  rounded xl:rounded-l-none xl:rounded-r-10 text-2xl xl:w-[160px] pl-[25px] " onClick={()=>{obj.from && obj.to != undefined ? (from===to? alert("Source and destination cannot be same") : (navigate("/TrainResults" , {state: obj}))): alert("All fields are required")}}>
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

                        <img className='absolute -z-10 bg-cover bg-center' src={''} alt="" />

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

      </div>

 

     

      <div className="searchbar  hidden xl:flex  gap-[50px] pl-16 pt-[19px] pb-6 items-end bg-gradient-to-r from-[#751152] to-[#ab2d42] border border-black w-full">

        <div className="from flex flex-col gap-2 relative">
          <label htmlFor="inputfrom" className='text-gray-400 text-sm'>From</label>
          <input id='inputfrom' className='peer outline-none border-b-2 border-white bg-transparent text-white' type="text" placeholder='Leaving from' autoComplete='off' value={from}  onChange={(e) => { setFrom(e.target.value) }} onFocus={(e) => { e.target.select() }} />
          <div className='inputList1 hidden peer-focus:flex hover:flex overflow-y-scroll absolute top-[61px] bg-white w-[200px] rounded-md no-scrollbar flex-col divide-y-2 px-4 gap-2 min-h-[40px] max-h-[394px] shadow-500 z-50'>
            {fromCities && fromCities.map((e, index) => { return <div key={index} className='py-2 cursor-pointer ' onClick={() => { setFrom(`${e.city} Junction`) }} >{e.city}</div> })}
          </div>
        </div>

        <div className=" w-[30px] h-[30px] transition quotas-300" onClick={(e) => { let x = from; setFrom(to); setTo(x); e.currentTarget.classList.toggle("rotate-180") }}><MdOutlineSwapHorizontalCircle className='w-full h-full text-white' /></div>

        <div className="to flex flex-col gap-2 relative">
          <label htmlFor="inputto" className='text-gray-400 text-sm'>To</label>
          <input id='inputto' className='peer outline-none border-b-2 border-white bg-transparent text-white' type="text" placeholder='Going to' autoComplete='off' value={to} onChange={(e) => { setTo(e.target.value) }} onFocus={(e) => { e.target.select() }} />
          <div className='inputList1 hidden peer-focus:flex hover:flex overflow-y-scroll absolute top-[61px] bg-white w-[200px] rounded-md no-scrollbar flex-col divide-y-2 px-4 gap-2 min-h-[40px] max-h-[394px] shadow-500 z-50'>
            {toCities && toCities.map((e, index) => { return <div key={index} className='py-2 cursor-pointer ' onClick={() => { setTo(`${e.city} Junction`) }} >{e.city}</div> })}
          </div>
        </div>

        <div className="date flex flex-col gap-2">

          <label htmlFor="inputto" className='text-gray-400 text-sm'>Date</label>
          <input id='inputto' className='outline-none border-b-2 border-white bg-transparent select-none text-white' type="date" placeholder='Date' value={`${new Date(date).getFullYear()}-${new Date(date).getMonth() < 10 ? `0${new Date(date).getMonth() + 1}` : `${new Date(obj.date).getMonth() + 1}`}-${new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : `${new Date(date).getDate()}`}`} onChange={(e) => { setDate(new Date(e.target.value)) }} />
        </div>

        <div className="searchBtn  px-[70px] py-2 bg-orange-700 text-white font cursor-pointer" onClick={() => { getTrains() }}>SEARCH</div>

      </div>


      <div id='filterContainer' className="filters hidden xl:flex  p-4 shadow border w-full h-[140px] transition-all quotas-500 divide-x divide-dashed overflow-hidden bg-white border border-black">

        <div className="coachClasses flex flex-col gap-4 px-4">
          <div className="headingAndAllBtn flex justify-between"><span>Class</span>  <span><input className='group' id='all' type="checkbox"/> <p className='inline'>all</p></span></div>
          <div className="classes flex flex-col gap-4 ">
            <div className='flex gap-12'>
              
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="SL" value={'SL'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="SL">SL</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="3A" value={'3A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="3A">3A</label></span>
            </div>
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="2A" value={'2A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="2A">2A</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="1A" value={'1A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="1A">1A</label></span>
            </div>
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="CC" value={'CC'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="CC">CC</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="2S" value={'2S'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="2S">2S</label></span>
            </div>
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="EV" value={'EV'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="EV">EV</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="3E" value={'3E'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="3E">3E</label></span>
            </div>
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="EC" value={'EC'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="EC">EC</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="11" value={'1A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="11">1A</label></span>
            </div>
          </div>
        </div>

        <div className="quota flex flex-col gap-4 px-4">
          <span className='text-xl'>Quota</span>
          <div className="classes flex flex-col gap-4 ">
            <div className='flex justify-between gap-16'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="general" value={'General'} name='quota' type="radio"  filtertype={'quota'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="general">General</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="tatkal" value={'Tatkal'} name='quota' type="radio" filtertype={'quota'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="tatkal">Tatkal</label></span>
            </div>
            <div className='flex justify-between '>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="lowerberth" value={'Lower Berth'} name='quota' type="radio" filtertype={'quota'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="lowerberth">Lower Berth</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="ladies" value={'Ladies'} name='quota' type="radio" filtertype={'quota'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="ladies">Ladies</label></span>
            </div>
          </div>
        </div>

        <div className="departures flex flex-col gap-4 px-4">
          <span className='text-xl'>Departure from</span>
          <div className='text-xs font-semibold  flex gap-3 '>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="departureCheckBox1" type="checkbox" value={'Early Morning'} filtertype={'departure'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='departureCheckBox1' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 00:00 - 06:00</label> <span>Early Morning</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="departureCheckBox2" type="checkbox" value={'Morning'} filtertype={'departure'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='departureCheckBox2' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 06:00 - 12:00</label> <span>Morning</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="departureCheckBox3" type="checkbox" value={'Mid Day'} filtertype={'departure'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='departureCheckBox3' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 12:00 - 18:00</label> <span>Mid Day</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="departureCheckBox4" type="checkbox" value={'Night'} filtertype={'departure'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='departureCheckBox4' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 18:00 - 24:00</label> <span>Night</span></span>
          </div>
        </div>

        <div className="arrivalTime flex flex-col gap-4 px-4">
          <span className='text-xl'>Arrival at</span>
          <div className='text-xs font-semibold flex gap-3 '>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="arrivalRadio1" type="checkbox" name='arrival' value={'Early Morning'} filtertype={'arrival'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='arrivalRadio1' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 00:00 - 06:00</label> <span>Early Morning</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="arrivalRadio2" type="checkbox" name='arrival' value={'Morning'} filtertype={'arrival'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='arrivalRadio2' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 06:00 - 12:00</label> <span>Morning</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="arrivalRadio3" type="checkbox" name='arrival' value={'Mid Day'} filtertype={'arrival'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='arrivalRadio3' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 12:00 - 18:00</label> <span>Mid Day</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="arrivalRadio4" type="checkbox" name='arrival' value={'Night'} filtertype={'arrival'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='arrivalRadio4' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 18:00 - 24:00</label> <span>Night</span></span>
          </div>
        </div>

        
        <div className="PRICE FILTER DIV flex flex-col ga  px-4 py-4 rounded-md w-[200px]">
          <p className=" pb-4">Price Range</p>
          <div className="relative w-full ">
            <div className='border'> <RangeSlider min={0} max={10000} value={val} onInput={(e) => { setval(e) }} onThumbDragEnd={(e) => { setminmax(val); handlePrice(val) }} /> </div>
            <div className='flex justify-between'>
              <div className=" left-2 text-secondary text-sm mt-2"> {val[0]} </div>
              <div className=" right-2 text-secondary text-sm mt-2"> {val[1]} </div>
            </div>
          </div>
        </div>


          <div className='flex justify-center items-end pl-8 gap-2' onClick={() => { document.getElementById('filterContainer').classList.toggle('h-[140px]'); document.getElementById('moreFilterDownArrow').classList.toggle('rotate-180') }}>  <span id='moreFilterDownArrow' className='transition quotas-500'> <IoIosArrowDown /></span> </div>
     

      </div>


      <div className="LAPTOP resultsAndAddContainer xl:px-[60px] pt-4 hidden xl:flex gap-11 ">

        <div className="results  xl:w-[82%] ">

          <div id='suggestionBar' className="suggestionBar text-black bg-white ">
            <div className=" w-full flex flex-col gap-10 ">
              <div className="SUGGESTION BAR flex bg-white  h-[70px] w-full items-center shadow ">
                <div className="LEFT ARROW flex shrink-0 justify-center py-10 items-center w-8 h-full border-r border-neutral-100 cursor-pointer rounded-l-10 " onClick={() => { document.getElementById('suggestionScrollDiv').scrollLeft += 400 }}> <MdKeyboardArrowLeft /> </div>

                <div id='suggestionScrollDiv' className="SUGGESTION CELLS CONTAINER  flex no-scrollbar overflow-auto scroll-smooth w-full  transition quotas-1000 ">
                  {
                    dateArray.map((d, index) => {
                      return <a key={index} className="SUGGESTION CELL flex flex-col gap-1 shrink-0 justify-center items-center h-[50px] cursor-pointer w-[123px] outlookList border-r" rel="nofollow" onClick={()=>{setDate(new Date(d))}}>
                        <p className="body-xs">{d}</p>
                        <p className="body-sm text-success-500">Few Seats</p>
                      </a>
                    })
                  }
                </div>

                <div className="RIGHT ARROW flex shrink-0 justify-center py-10 items-center w-8 h-full border-r border-neutral-100 cursor-pointer border-l" onClick={() => { document.getElementById('suggestionScrollDiv').scrollLeft -= 400 }}> <MdKeyboardArrowRight /> </div>
              </div>
            </div>
          </div>

          <div id='sortBar' className="sortBarAndRadio hidden xl:flex justify-between flex-row  py-6 bg-white">

            <div className="sortBar flex items-center py-2 tracking-wide shadow">

              <span className='text-gray-400 pl-6 py-2'>Sort by:</span>

              <div className='  flex divide-x font-semibold divide-solid text-slate-500 p-1'>
                <span className='px-6'> <input className='hidden peer' id='sortRadio1' type="radio" name='sort' filtertype={'departureSort'} onClick={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio1">DEPARTURE TIME</label></span>
                <span className='px-4'> <input className='hidden peer' id='sortRadio2' type="radio" name='sort' filtertype={'arrivalSort'} onClick={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio2">ARRIVAL TIME</label></span>
                <span className='px-4'> <input className='hidden peer' id='sortRadio3' type="radio" name='sort' filtertype={'durationSort'} onClick={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio3">DURATION</label></span>
                <span className='px-4'> <input className='hidden peer' id='sortRadio4' type="radio" name='sort' filtertype={'priceSort'} onClick={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sortRadio4">FARE</label></span>
              </div>

            </div>

            <div className="radioForShowTrainsConfirmSeats text-lg text-slate-500 tracking-wider flex gap-4 px-4 shadow">
              <span className='flex justify-center items-center'>Show trains with confirmed seats</span>
              <span className='flex justify-center items-center'><input className=' peer' id="showtrainswithconfirm" type="checkbox" /> <label htmlFor="showtrainswithconfirm"></label></span>
            </div>
          </div>

          <div className="getFullRefundCheckBoxDiv"></div>

          <div className="resultCards flex flex-col gap-6 transition duration-500">

            {
              message=='success' ?
                <div className='flex flex-col gap-6' >
                  {
                  paginatedTrains.length > 0 &&  paginatedTrains.map((train, index) => {
                      return <div key={index} id={`card${index}`} className='trainCard divide-y divide-dashed divide-slate-300 border shadow h-[129px] overflow-hidden' onChange={()=>{console.log('changed');}} >

                        <div className="upper px-6 mb-6 mt-8 flex items-center justify-between divide-x divide-dashed divide-slate-300">

                          <div className="left flex flex-col gap-3   ">
                            <div className="nameAndNumber text-[#ec5824]">
                              <span>{train.trainNumber}</span> <span>{train.trainName}</span>
                            </div>
                            <div className="runningDays text-sm flex items-center gap-2"> <span className='font-semibold'>Runs on :</span> <div className="workingDays text-xs font-semibold">{train.daysOfOperation.map((d, i) => { return d.charAt(0) + " " })}</div> <div className='w-1 h-1 rounded-full bg-black' /> <span className='text-[#ec5b24]'>Special ({train.trainNumber} Running Status)</span></div>
                          </div>

                          <div className="right  flex  ">

                            <div className="fromInfo flex flex-col pl-8"> <span className='from text-[#ec5b24] truncate'>{train.source}</span> <span className='font-bold text-xl'>{train.departureTime}</span> <span className='text-slate-400 text-sm'>{weekDays[date.getDay()]}, {date.getDate()} {month[date.getMonth()]}</span></div>

                            <div className="quotas flex flex-col justify-center items-center px-6">
                              <span>{train.travelDuration}</span>
                              <div className='flex items-center text-slate-400'><div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /> <div className='w-24 h-[2px] bg-slate-400' /> <div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /></div>
                            </div>

                            <div className="toInfo flex flex-col pr-8">
                              <div className="fromInfo flex flex-col"> <span className='from text-[#ec5b24] truncate'>{train.destination}</span> <span className='font-bold text-xl'>{train.arrivalTime}</span> <span className='text-slate-400 text-sm'>{weekDays[date.getDay()]}, {date.getDate()} {month[date.getMonth()]}</span></div>
                            </div>

                            <div className="showAvailabilitybtn flex flex-col justify-center items-center gap-2">
                              <span className='font-bold'>₹ {train.fare}</span>
                              <button className='group flex items-center gap-1 bg-[#ec5b24] text-white font-semibold text-sm  px-[12px] py-[11px] rounded-sm' onClick={() => { document.getElementById(`card${index}`).classList.toggle('h-[129px]'); document.getElementById(`availabilityDropdownArrow${index}`).classList.toggle('rotate-180') }}><span>SHOW AVAILABILITY</span> <span id={`availabilityDropdownArrow${index}`} className='text-xl font-bold'><IoIosArrowDown /></span></button>
                            </div>

                          </div>


                        </div>

                        <div className="lower  max-w-full">

                          <div className="scrollableDiv flex items-center mt-4 gap-4 overflow-x-auto no-scrollbar  ">

                            <div className='cellsContainer flex gap-6 py-4 px-6 '>


                              {
                                train.coaches.map((coach, index) => {
                                  return <div key={index} className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                                    <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                                      <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                                      <span className='class w-full flex justify-center'>{coach.coachType}</span>
                                      <span className='availability text-slate-400 w-full flex justify-center'>{`${coach.numberOfSeats > 0 ? `${coach.numberOfSeats}` : `NOT AVL`}`}</span>
                                    </div>

                                    <div className="updatedTime"></div>
                                    <span className='flex justify-center items-center text-sm  w-full py-1 bg-[#ec5b24] text-white font-semibold cursor-pointer' onClick={() => { obj.coach = coach.coachType; obj.trainID = train._id; obj.numberOfSeats = coach.numberOfSeats; isLoggedIn == true? navigate('/BookTrain', {state:obj}) : setPopupShow('signinShow') }}>BOOK</span>
                                  </div>
                                })
                              }


                            </div>

                          </div>

                        </div>

                      </div>
                    })
                  }
                </div>
                :
                <div className='MESSAGE flex flex-col justify-center items-center gap-10 my-10  '>
                 {
                   message == 'Loading...' ? <div className=' w-full  flex flex-col justify-center items-center '> <ThreeCircles visible={true} height="50" width="50" color="#fc790d" ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass="animate-spin"/> <p>{message}</p></div> : <div className=' w-full h-28 flex justify-center items-end text-xl font-semibold tracking-widest'>{message}</div>
                 }
                </div>
            }

            {
               message =='success' && <div className='PAGINATION BUTTONS flex flex-col justify-center items-center mt-20 pb-10 transition duration-500'>

                <div className='flex justify-center items-center gap-4 transition duration-300'>
                  <button className={`border shadow w-[30px] h-[30px] rounded-full flex flex-col justify-center items-center ${currentPage == 0 ? "cursor-not-allowed" : ""}`} onClick={() => { setCurrentPage((prev) => { return Math.max(prev - 1, 0) }); document.getElementById('w1').scrollTo({ top: 0, behavior: "smooth" }) }}> <MdKeyboardArrowLeft /> </button>       {Array(pages).fill().map((_, index) => { return <button key={index} className={`${currentPage == index ? 'bg-blue-700 text-white' : ""} w-[30px] h-[30px] rounded-full shadow-300 flex justify-center items-center `} onClick={() => { setCurrentPage(index); document.getElementById('w1').scrollTo({ top: 0, behavior: "smooth" }) }}>{index + 1}</button> })}        <button className={`border border shadow  w-[30px] h-[30px] rounded-full flex flex-col justify-center items-center ${currentPage == pages - 1 ? "cursor-not-allowed" : ""}`} onClick={() => { setCurrentPage((prev) => { return Math.min(prev + 1, pages - 1) }); document.getElementById('w1').scrollTo({ top: 0, behavior: "smooth" }) }}> <MdKeyboardArrowRight /> </button>
                </div>

              </div>
            }


          </div>

        </div>




        <div className="adds w-[30%] flex justify-center xl:flex hidden">

          <div className='pt-24'>
            <img src="https://tpc.googlesyndication.com/simgad/17232132750874073794" alt="" />
          </div>
        </div>

      </div>

      <div className="MOBILE resultsAndAddContainer xl:hidden w-full h-screen  flex gap-2 ">

        <div className="results flex flex-col gap-2  w-full ">

          <div id='suggestionBar' className="suggestionBar text-black bg-white ">
            <div className=" w-full flex flex-col gap-10 ">
              <div className="SUGGESTION BAR flex bg-white  h-[50px] w-full items-center border ">
                <div className="LEFT ARROW flex shrink-0 justify-center py-10 items-center w-6 h-full border-r border-neutral-100 cursor-pointer rounded-l-10 " onClick={() => { document.getElementById('suggestionScrollDiv').scrollLeft += 400 }}> <MdKeyboardArrowLeft /> </div>

                <div id='suggestionScrollDiv' className="SUGGESTION CELLS CONTAINER  flex no-scrollbar overflow-auto scroll-smooth w-full  transition quotas-1000 ">
                  {
                    dateArray.map((d, index) => {
                      return <a key={index} className="SUGGESTION CELL flex flex-col gap-1 shrink-0 justify-center items-center h-[50px] cursor-pointer w-[123px] outlookList border-r" rel="nofollow" onClick={()=>{setDate(new Date(d))}}>
                        <p className="text-xs">{d}</p>
                        <p className="text-xs text-success-500">Few Seats</p>
                      </a>
                    })
                  }
                </div>

                <div className="RIGHT ARROW flex shrink-0 justify-center py-10 items-center w-6 h-full border-r border-neutral-100 cursor-pointer border-l" onClick={() => { document.getElementById('suggestionScrollDiv').scrollLeft -= 400 }}> <MdKeyboardArrowRight /> </div>
              </div>
            </div>
          </div>


          <div className="resultCards flex flex-col gap-6 transition duration-500  mb-16">

            {
              message=='success' ?
                <div className='flex flex-col gap-6' >
                  {
                     paginatedTrains.length > 0 &&  paginatedTrains.map((train, index) => {
                     
                      return  <div className='w-full flex flex-col gap-2 bg-white shadow rounded-10  px-2 py-3 relative'>
                                
                                <div className="upper flex justify-between items-center text-orange-500 font-semibold"> <div><span>{train.trainNumber}</span> <span>{train.trainName}</span></div>  <div><span className=' text-xs font-semibold flex'>     </span>  </div></div>

                                <div className="middle flex gap-2 items-center justify-between text-sm font-semibold">  <div className='flex gap-2 items-center'><p>{train.departureTime}</p>     <div className="duration flex items-center gap-1 "> <span className='flex items-center '><p className='w-[5px] h-[5px] rounded-full bg-gray-400'/> <p className='w-3 h-[2px]  bg-gray-400'/> </span> <span>{train.travelDuration}</span>  <span className='flex items-center '><p className='w-[5px] h-[5px] order-2 rounded-full bg-gray-400' /> <p className='w-3 h-[2px] order-1  bg-gray-400'/> </span>  </div>   <div className="to"> <p>{train.arrivalTime}</p> </div></div>  <div className="workingDays flex gap-2 text-[12px] font-bold "> {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => { return  <p className={`${train.daysOfOperation.includes(d) ? 'text-orange-500' : 'text-gray-300'}`}>{d[0]}</p> })}</div> </div>

                                <div className="lower  max-w-full">

                                    <div className="scrollableDiv flex items-center gap-4 overflow-x-auto no-scrollbar  ">

                                        <div className='cellsContainer flex gap-4 pt-4  '>


                                          {
                                            train.coaches.map((coach, index) => {
                                              return <div key={index} className="cell flex flex-col justify-center items-center flex-nowrap w-[100px] border border-slate-400 rounded-10">

                                                        <div className='quota-class-availability relative flex flex-col  items-center  w-full  pt-2 pb-1'>
                                                          <span className='absolute -top-3 border text-xs bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                                                          <span className='class w-full flex justify-center text-xs font-bold'>{coach.coachType}</span>
                                                          <span className='availability  w-full flex justify-center text-xs font-bold text-green-500'>AVL {`${coach.numberOfSeats > 0 ? `${coach.numberOfSeats}` : `NOT AVL`}`}</span>
                                                        </div>

                                                        <span className='flex justify-center items-center text-sm  w-full py-1 bg-[#ec5b24] text-white font-semibold cursor-pointer rounded-b-10 border' onClick={() => { obj.coach = coach.coachType; obj.trainID = train._id; obj.numberOfSeats = coach.numberOfSeats; isLoggedIn == true? navigate('/BookTrain', {state:obj}) : setPopupShow('signinShow') }}>BOOK</span>
                                                     </div>
                                            })
                                          }


                                        </div>

                                      </div>

                                </div>





                              </div>
                    })
                  }
                </div>
                :
                <div className='MESSAGE flex flex-col justify-center items-center gap-8  w-full h-[500px] '>
                 {
                   message == 'Loading...' ? <div className=' w-full  flex flex-col gap-4 justify-center items-center '> <ThreeCircles visible={true} height="50" width="50" color="#fc790d" ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass="animate-spin"/> <p>{message}</p></div> : <div className=' w-full h-28 flex justify-center items-end text-xl font-semibold tracking-widest'>{message}</div>
                 }
                </div>
            }

            {
               message =='success' && <div className='PAGINATION BUTTONS flex flex-col justify-center items-center mt-8 pb-10 transition duration-500'>

                <div className='flex justify-center items-center gap-4 transition duration-300'>
                  <button className={`border shadow w-[30px] h-[30px] rounded-full flex flex-col justify-center items-center ${currentPage == 0 ? "cursor-not-allowed" : ""}`} onClick={() => { setCurrentPage((prev) => { return Math.max(prev - 1, 0) }); document.getElementById('w1').scrollTo({ top: 0, behavior: "smooth" }) }}> <MdKeyboardArrowLeft /> </button>       {Array(pages).fill().map((_, index) => { return <button key={index} className={`${currentPage == index ? 'bg-blue-700 text-white' : ""} w-[30px] h-[30px] rounded-full shadow-300 flex justify-center items-center `} onClick={() => { setCurrentPage(index); document.getElementById('w1').scrollTo({ top: 0, behavior: "smooth" }) }}>{index + 1}</button> })}        <button className={`border border shadow  w-[30px] h-[30px] rounded-full flex flex-col justify-center items-center ${currentPage == pages - 1 ? "cursor-not-allowed" : ""}`} onClick={() => { setCurrentPage((prev) => { return Math.min(prev + 1, pages - 1) }); document.getElementById('w1').scrollTo({ top: 0, behavior: "smooth" }) }}> <MdKeyboardArrowRight /> </button>
                </div>

              </div>
            }


          </div>

        </div>

      </div>


    </div>

    {
        <div className="BOTTOM RIBBON fixed  bottom-0 z-50 xl:hidden h-[60px] w-full bg-slate-400 flex justify-between px-8 items-center">

                                <div className="FILTER relative flex flex-col justify-center items-center"  onClick={() => { setActive(!active); setActiveTab('filter') }} >
                                  <p><TiFilter /></p>
                                  <p>Filter</p>

                                  <div className={`filterpopup  absolute  shadow rounded-10 left-0 h-[500px]  transition-all transform duration-700 ${active == true && activeTab === 'filter' ? '-translate-y-[285px] -translate-x-[27px]  opacity-100 scale-x-100' : 'opacity-0 scale-0 -translate-x-[200px]'}`}  >

                                  <div id='filterContainer' className="filters xl:hidden flex flex-col gap-4  p-4 shadow  rounded-10 transition-all h-[500px] overflow-y-auto quotas-500   overflow-hidden bg-white">

                                      <div className="coachClasses flex flex-col gap-4 px-4 bg-slate-400 py-2 rounded-10">
                                        <div className="headingAndAllBtn flex justify-between font-bold"><span>Class</span> </div>
                                        <div className="classes flex flex-col gap-4 ">
                                          <div className='flex gap-12'>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4 peer' id="mobileSL" value={'SL'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="mobileSL">SL</label></span>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4 peer' id="mobile3A" value={'3A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="mobile3A">3A</label></span>
                                          </div>
                                          <div className='flex gap-12'>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4 peer' id="mobile2A" value={'2A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="mobile2A">2A</label></span>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4 peer' id="mobile1A" value={'1A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="mobile1A">1A</label></span>
                                          </div>
                                          <div className='flex gap-12'>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4 peer' id="mobileCC" value={'CC'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="mobileCC">CC</label></span>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4 peer' id="mobile2S" value={'2S'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="mobile2S">2S</label></span>
                                          </div>
                                          <div className='flex gap-12'>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4 peer' id="mobileEV" value={'EV'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="mobileEV">EV</label></span>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4 peer' id="mobile3E" value={'3E'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="mobile3E">3E</label></span>
                                          </div>
                                          <div className='flex gap-12'>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4 peer' id="mobileEC" value={'EC'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="mobileEC">EC</label></span>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4 peer' id="mobile11" value={'1A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="mobile11">1A</label></span>
                                          </div>
                                        </div>
                                      </div>
{/* 
                                      <div className="quota flex flex-col gap-4 px-4 bg-slate-400 py-2 rounded-10 cursor-not-allowed">
                                        <span className='flex justify-between font-bold'>Quota</span>
                                        <div className="classes flex flex-col gap-4 ">
                                          <div className='flex justify-between gap-16'>
                                            <span className='flex items-center gap-2 cursor-not-allowed'><input className='w-4 h-4 cursor-not-allowed' id="general" value={'General'} name='quota' type="radio"  filtertype={'quota'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="general">General</label></span>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4' id="tatkal" value={'Tatkal'} name='quota' type="radio" filtertype={'quota'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="tatkal">Tatkal</label></span>
                                          </div>
                                          <div className='flex justify-between '>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4' id="lowerberth" value={'Lower Berth'} name='quota' type="radio" filtertype={'quota'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="lowerberth">Lower Berth</label></span>
                                            <span className='flex items-center gap-2'><input className='w-4 h-4' id="ladies" value={'Ladies'} name='quota' type="radio" filtertype={'quota'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="ladies">Ladies</label></span>
                                          </div>
                                        </div>
                                      </div> */}

                                      <div className="departures flex flex-col gap-4 px-4 bg-slate-400 py-2 rounded-10">
                                        <span className='flex justify-between font-bold'>Departure from</span>
                                        <div className='text-xs  font-semibold  flex gap-3 '>
                                          <span className='flex flex-col  items-center gap-1'><input className=' peer absolute opacity-0' id="dc1" type="checkbox" value={'Early Morning'} filtertype={'departure'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='dc1' className="timeSlot border border-gray-500 rounded-5 py-1 px-2 font-semibold flex flex-col justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> <p>00:00</p> - <p>06:00</p></label> <span className='text-center'>Early</span></span>
                                          <span className='flex flex-col items-center gap-1'><input className=' peer absolute opacity-0' id="dc2" type="checkbox" value={'Morning'} filtertype={'departure'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='dc2' className="timeSlot border border-gray-500 rounded-5 py-1 px-2 font-semibold flex flex-col justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> <p>06:00</p> - <p>12:00</p></label> <span className='text-center'>Morning</span></span>
                                          <span className='flex flex-col items-center gap-1'><input className=' peer absolute opacity-0' id="dc3" type="checkbox" value={'Mid Day'} filtertype={'departure'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='dc3' className="timeSlot border border-gray-500 rounded-5 py-1 px-2 font-semibold flex flex-col justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> <p>12:00 </p>- <p>18:00</p></label> <span className='text-center'>Mid Day</span></span>
                                          <span className='flex flex-col items-center gap-1'><input className=' peer absolute opacity-0' id="dc4" type="checkbox" value={'Night'} filtertype={'departure'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='dc4' className="timeSlot border border-gray-500 rounded-5 py-1 px-2 font-semibold flex flex-col justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> <p>18:00</p> - <p>24:00</p></label> <span className='text-center'>Night</span></span>
                                        </div>
                                      </div>

                                      <div className="arrivalTime flex flex-col gap-4 px-4 bg-slate-400 py-2 rounded-10">
                                        <span className='flex justify-between font-bold'>Arrival at</span>
                                        <div className='text-xs font-semibold flex gap-3 '>
                                          <span className='flex flex-col items-center gap-1'><input id='ar1' className='peer absolute opacity-0' type="checkbox" name='arrival' value={'Early Morning'} filtertype={'arrival'} onChange={(e) => { handleFilterChange(e) }}  /><label htmlFor="ar1" className='flex flex-col justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white border border-gray-500 py-1 px-2 rounded-5'><p>00:00</p> - <p>06:00</p></label><span className='text-center'>Early</span></span>
                                          <span className='flex flex-col items-center gap-1'><input className=' peer absolute opacity-0' id="ar2" type="checkbox" name='arrival' value={'Morning'} filtertype={'arrival'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='ar2' className="timeSlot border border-gray-500 rounded-5 py-1 px-2 font-semibold flex flex-col justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> <p>06:00</p> - <p>12:00</p></label> <span className='text-center'>Morning</span></span>
                                          <span className='flex flex-col items-center gap-1'><input className=' peer absolute opacity-0' id="ar3" type="checkbox" name='arrival' value={'Mid Day'} filtertype={'arrival'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='ar3' className="timeSlot border border-gray-500 rounded-5 py-1 px-2 font-semibold flex flex-col justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> <p>12:00</p> - <p>18:00</p></label> <span className='text-center'>Mid Day</span></span>
                                          <span className='flex flex-col items-center gap-1'><input className=' peer absolute opacity-0' id="ar4" type="checkbox" name='arrival' value={'Night'} filtertype={'arrival'} onChange={(e) => { handleFilterChange(e) }} /><label htmlFor='ar4' className="timeSlot border border-gray-500 rounded-5 py-1 px-2 font-semibold flex flex-col justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> <p>18:00</p> - <p>24:00</p></label> <span className='text-center'>Night</span></span>
                                        </div>
                                      </div>

                             
                                      <div className="PRICE FILTER DIV flex flex-col ga  px-4 py-4 bg-slate-400 rounded-md">
                                        <p className=" pb-4 flex justify-between font-bold">Price Range</p>
                                        <div className="relative w-full ">
                                          <div className=''> <RangeSlider min={0} max={10000} value={val} onInput={(e) => { setval(e) }} onThumbDragEnd={(e) => { setminmax(val); handlePrice(val) }} /> </div>
                                          <div className='flex justify-between'>
                                            <div className=" left-2 text-secondary text-sm mt-2"> {val[0]} </div>
                                            <div className=" right-2 text-secondary text-sm mt-2"> {val[1]} </div>
                                          </div>
                                        </div>
                                      </div>
                                      

                                  </div>

                                  </div>
                                  
                                </div>

                                <div className={`SORT relative flex flex-col justify-center items-center  `} onClick={() => { setActive(!active); setActiveTab('sort') }}>
                                  <p><CgSortZa /></p>
                                  <p>Sort</p>

                                  <div className={`sortpopup absolute bg-white py-4 px-4  rounded-10 shadow rounded-10 transition-all transform duration-700 ${active == true && activeTab === 'sort' ? '-translate-y-[140px] -translate-x-[30px]  opacity-100 scale-x-100' : 'opacity-0 scale-0'}`}>
                                  <div className=' SORT flex flex-col gap-4 items-center px-4 py-2  font-semibold divide-solid text-[12px] shadow rounded-10 w-full border bg-slate-400'>
                                    <span className='  text-[15px] font-semibold border-b'>Sort By</span> 
                                      <span className=''> <input className=' peer absolute opacity-0' id='sr1' type="radio" name='sort' filtertype={'departureSort'} onClick={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sr1">DEPARTURE</label></span>
                                      <span className=''> <input className=' peer absolute opacity-0' id='sr2' type="radio" name='sort' filtertype={'arrivalSort'} onClick={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sr2">ARRIVAL</label></span>
                                      <span className=''> <input className=' peer absolute opacity-0' id='sr3' type="radio" name='sort' filtertype={'durationSort'} onClick={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sr3">DURATION</label></span>
                                      <span className=''> <input className=' peer absolute opacity-0' id='sr4' type="radio" name='sort' filtertype={'priceSort'} onClick={(e) => { handleFilterChange(e) }} /> <label className='peer-checked:text-[#ec5b24] cursor-pointer' htmlFor="sr4">FARE</label></span>
                                    </div>
                                  </div>
                                  
                                
                                </div>

                              </div>
    }

    </div>

  )
})

export default TrainResults