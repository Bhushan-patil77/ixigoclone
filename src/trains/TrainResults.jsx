import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineSwapHorizontalCircle } from 'react-icons/md'
import { RangeSlider } from 'range-slider-input'
import { IoIosArrowDown } from 'react-icons/io';
import Navbar from '../Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlass, ThreeCircles } from 'react-loader-spinner';
import { DiVim } from 'react-icons/di';
import Login from '../Login';
import { IoClose } from 'react-icons/io5';
import Signup from '../Signup';

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



  const navigate = useNavigate();

  const itemsPerPage = 7;
  const firstIndex = (currentPage * itemsPerPage)
  const lastIndex = (currentPage * itemsPerPage + itemsPerPage)
  const pages = Math.ceil(trains.length / itemsPerPage)


  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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

console.log(popupShow);

  return (
    <div className=' w-screen h-screen'>
     
     <div id='login' className={`${popupShow == 'signinShow' ? 'block' : 'hidden'} relative`}>
      <Login setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow}/>
     </div>

     <div id='signup' className={`${popupShow == "signupShow" ? 'block' : 'hidden'} relative`}>
      <Signup setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow}/>
     </div>

     <Navbar activeLink={2}/>

    <div id='w1' className='transition duration-500' >

     

      <div className="searchbar   flex gap-[50px] pl-16 pt-[19px] pb-6 items-end bg-gradient-to-r from-[#751152] to-[#ab2d42]">

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


      <div id='filterContainer' className="filters flex  p-4 shadow border h-[140px] transition-all quotas-500 border-black divide-x divide-dashed overflow-hidden bg-white">

        <div className="coachClasses flex flex-col gap-4 px-4">
          <div className="headingAndAllBtn flex justify-between"><span>Class</span>  <span><input className='group' id='all' type="checkbox"/> <p className='inline'>all</p></span></div>
          <div className="classes flex flex-col gap-4 ">
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="SL" value={'SL'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="sl">SL</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="3A" value={'3A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="3A">3A</label></span>
            </div>
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="2A" value={'2A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="2A">2A</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="1A" value={'1A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="1A">1A</label></span>
            </div>
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="CC" value={'CC'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="2A">CC</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="2S" value={'2S'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="1A">2S</label></span>
            </div>
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="EV" value={'EV'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="2A">EV</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="3E" value={'3E'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="1A">3E</label></span>
            </div>
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="EC" value={'EC'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="2A">EC</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="1A" value={'1A'} type="checkbox" filtertype={'coach'} onChange={(e) => { handleFilterChange(e) }} /> <label htmlFor="1A">1A</label></span>
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

        <div className="relative flex items-end px-4">
          <div className='flex justify-center items-center gap-2' onClick={() => { document.getElementById('filterContainer').classList.toggle('h-[140px]'); document.getElementById('moreFilterDownArrow').classList.toggle('rotate-180') }}> <span>MORE FILTERS</span> <span id='moreFilterDownArrow' className='transition quotas-500'> <IoIosArrowDown /></span> </div>
        </div>

      </div>


      <div className="resultsAndAddContainer px-[60px] pt-4 flex gap-11 ">

        <div className="results w-[82%] ">

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

          <div id='sortBar' className="sortBarAndRadio flex justify-between flex-row  py-6 bg-white">

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




        <div className="adds w-[30%] flex justify-center ">

          <div className='pt-24'>
            <img src="https://tpc.googlesyndication.com/simgad/17232132750874073794" alt="" />
          </div>
        </div>

      </div>


    </div>

    </div>

  )
})

export default TrainResults