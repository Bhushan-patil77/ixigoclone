import React, { useEffect, useRef, useState } from 'react'
import Login from '../Login';
import Signup from '../Signup';
import Navbar from '../Navbar';
import { TbAirConditioning, TbAirConditioningDisabled, TbWindow } from 'react-icons/tb';
import { MdAirlineSeatFlat, MdCheck, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdLocalBar, MdOutlineAirlineSeatReclineExtra, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineRestaurantMenu, MdRoomService } from 'react-icons/md';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { WiSunrise, WiSunset } from 'react-icons/wi';
import { IoBedOutline, IoCloseCircleSharp, IoRestaurant, IoSunnyOutline } from 'react-icons/io5';
import { PiBathtub, PiBathtubFill, PiCloudMoonDuotone } from 'react-icons/pi';
import { FaArrowRight, FaBowlFood, FaCheck, FaLocationDot, FaSortDown, FaSpa, FaStar, FaWifi } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosCheckmark, IoIosCrop } from 'react-icons/io';
import { GiHouseKeys } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiLeftArrow } from 'react-icons/bi';
import { Img } from 'react-image';
import { FaSwimmer } from 'react-icons/fa';
import Hotel_pic from '../assets/Hotel_pic.jpg'
import PlaceholderImg from '../assets/PlaceholderImg.jpeg'
import { LuUsers } from 'react-icons/lu';
import { RiArrowDropDownLine, RiCropLine } from 'react-icons/ri';
import { ThreeCircles } from 'react-loader-spinner';
import ConfettiExplosion from 'react-confetti-explosion';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Deluxe from '../assets/deluxRoom.jpg'
import Double from '../assets/doubleRoom.jpg'
import Suite from '../assets/suitRoom.jpg'
import Twin from '../assets/twinRoom.jpg'
import Single from '../assets/singleRoom.jpg'
import { CgGym, CgSortZa } from 'react-icons/cg';
import { TiFilter } from 'react-icons/ti';
import ImageCarousel from '../ImageCarousel';



const HotelResults = React.memo(() => {
  const location = useLocation();
  const obj = location.state;

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const [destination, setDestination] = useState(obj.destination);
  const [destinationCities, setdestinationCities] = useState([])
  const [date, setDate] = useState(new Date())
  const [checkIn, setCheckIn] = useState(new Date(obj.checkIn));
  const [checkOut, setCheckOut] = useState(new Date(obj.checkOut));
  const [rooms, setRooms] = useState(obj.rooms);
  const [adults, setAdults] = useState(obj.adults);
  const [childrens, setChildrens] = useState(obj.childrens)
  const [hotels, setHotels] = useState([]);
  const [paginatesHotels, setPaginatedHotels] = useState([])
  const [selectedHotel, setSelectedHotel] = useState();
  const [selectedHotelDetails, setSelecteHotelDetails] = useState();
  const [selectedRoom, setSelectedRoom] = useState({})
  const [popupShow, setPopupShow] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') != null);
  const [message, setMessage] = useState('');
  const [val, setval] = useState([0, 100000])
  const [sort, setSort] = useState('Popularity');
  const [visibleSection, setVisibleSection] = useState()
  const [visibleElements, setvisibleElements] = useState([]);
  const [continueBtnActive, setContinueBtnActive] = useState(false);
  const [guestDetails, setGuestDetails] = useState({})
  const [filterObj, setFilterObj] = useState({});
  const [sortObj, setSortObj] = useState({})
  const [minmax, setminmax] = useState([]);
  const [minTicketPrice, setMinTicketPrice] = useState(1000000);
  const [MaxTicketPrice, setMaxTicketPrice] = useState(0)
  const [flag, setFlag] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [active, setActive] = useState(false)
  const [bottomRibbonShow,setBottomRibbonShow]=useState(true)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const stayDetails = {
   
  }

  useEffect(()=>{console.log(visibleElements);},[visibleElements])

  

  const itemsPerPage = 6;
  const firstIndex = (currentPage * itemsPerPage)
  const lastIndex = (currentPage * itemsPerPage + itemsPerPage)
  const pages = Math.ceil(hotels.length / itemsPerPage)



  const roomsRef = useRef(null);
  const overviewRef = useRef(null);
  const reviewsRef = useRef(null);

  const selection = {
    'destination': destination,
    'checkIn': checkIn,
    'checkOut': checkOut,
    'adults': adults,
    'childrens': childrens,
    'rooms': rooms,
    'selectedHotel': selectedHotel,
    'selectedRoom': selectedRoom,
    'guestDetails': guestDetails
  }

  const arr = []
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // 200px offset from the bottom
    threshold: 0 // 50% of the element must be visible to trigger the callback
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setvisibleElements((prev) => {
          if (!prev.includes(entry.target.id)) {
            return [...prev, entry.target.id];
          }
          return prev;
        });
      } else {
        setvisibleElements((prev) => {
          return prev.filter((el) => el !== entry.target.id);
        });
      }
    });
  }, options);

  useEffect(()=>{getHotels},[])

  useEffect(() => {
    setActive(true)
  }, [activeTab])


  useEffect(() => {
    getHotels()
  }, [ currentPage, sortObj, filterObj])


  useEffect(() => {
   getDestinations()
  }, [destination])


  useEffect(()=>{
    console.log(selectedHotelDetails);
    console.log(selectedRoom);
    console.log(guestDetails);
  },[])


  const handleFilterChange = (e) => {
    setCurrentPage(0);
    var filtertype = e.target.attributes.filtertype.value;

    if (filtertype === "popularFilters") {
      if (e.target.checked) {
        if ("popularFilters" in filterObj) {

          setFilterObj((prev) => {
            return { ...prev, popularFilters: [...prev.popularFilters, e.target.value] }
          })
        }
        else {
          const newObj = { ...filterObj, "popularFilters": [] }
          setFilterObj(() => {
            return { ...newObj, popularFilters: [...newObj.popularFilters, e.target.value] }
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

    if (filtertype === "Facilities") {
      if (e.target.checked) {

        if ("facilities" in filterObj) {

          setFilterObj(prev => ({
            ...prev, facilities: [...prev.facilities, e.target.value]
          }))
        }
        else {
          const newObj = { ...filterObj, "facilities": [] }
          setFilterObj(() => {
            return { ...newObj, facilities: [...newObj.facilities, e.target.value] }
          })
        }


      }
      else {
        setFilterObj((prev) => {
          return { ...prev, facilities: [...prev.facilities.filter((f) => { return f != e.target.value })] }
        })

        if (filterObj.facilities.length <= 1) {
          const { facilities, ...rest } = filterObj;
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


    if (e.target.name === "sortRadio") {

      if (filtertype === "popularity") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { popularity: 1 } }
        setSortObj(ob)
      }


      if (filtertype === "price1") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { avgCostPerNight: 1 } }
        setSortObj(ob)
      }

      if (filtertype === "price2") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { avgCostPerNight: -1 } }
        setSortObj(ob)
      }

      if (filtertype === "rating") {
        const { sort, ...rest } = sortObj;
        setSortObj(rest);
        const ob = { ...rest, sort: { rating: -1 } }
        setSortObj(ob)
      }


    }


  }

  const getFilteredUrl = () => {



    const str = Object.keys(filterObj).map((key) => {

      if (key === 'popularFilters') {
        const stringifyedStopsValues = filterObj[key].map((f) => {
          return `"${f}"`
        })
        return `"popularFilters":[${stringifyedStopsValues}]`
      }

      if (key === 'facilities') {
        const stringifyedStopsValues = filterObj[key].map((f) => {

          return `"amenities":"${f}"`
        })
        return stringifyedStopsValues
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

        return `"avgCostPerNight":{${str}}`
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
    const url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&filter={${filterString}}&sort={${sortString}}`


    return url




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


  const observeTargets = () => {
    const observedElements = document.querySelectorAll('[observ="true"]');
    observedElements.forEach(target => observer.observe(target));

  }


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

  const getHotels = async () => {

    const url = getFilteredUrl()
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
      if (response.message === "success") {
        const data = response.data.hotels;
        if (response.totalResults > 0) {
          setMessage('Success')
        }
        if (response.totalResults == 0) {
          setMessage('No Hotel Found')
        }
        setHotels(data);
        paginate(data)
        setLoading(false)
        console.log(data);

      }
      if (response.status === "fail") {
        alert(response.message)
        setMessage('failed')
      }

      if (response.totalResults == 0) {
        setMessage('No Hotel Found')

      }
    } catch (error) {
      console.log(error);
    }
  }

  const paginate = (data) => {
    setPaginatedHotels(data.slice(firstIndex, lastIndex));
  }

  const getHotelDetails = async (_id) => {
    const url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${_id}`

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
        if (response.totalResults > 0) {
          setMessage('Success')
        }
        if (response.totalResults == 0) {
          setMessage('No Buses Found')
        }
        setSelecteHotelDetails(data);
      }
      if (response.status === "fail") {
        alert(response.message)
        setMessage('failed')
      }

      if (response.totalResults == 0) {
        setPaginatedTrains([])
        setMessage('No Buses Found')

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

  
  const generateBookingId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let bookingId = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      bookingId += characters[randomIndex];
    }
    return bookingId;
  };

  const scroll = (id, direction) => {
    const container = document.getElementById(id);
    container.scrollBy({ left: `${direction == 'left' ? 300 : -300}`, behavior: 'smooth' });
  }


  const handleFormSubmit = (e) => {
    e.preventDefault();
    let input = 0;
    let title = '';
    Array(3).fill(0).map((t, i) => {
      if (e.target[input].checked) {
        title = e.target[input].value;
        input++
      }
      else {
        input++
      }
    })

    const firstName = e.target[input++].value;
    const lastName = e.target[input++].value;
    const email = e.target[input++].value;
    const countryCode = e.target[input++].value;
    const mobile = e.target[input++].value;
    const guestDetails = { 'title': title, 'firstName': firstName, 'lastName': lastName, 'email': email, 'countryCode': countryCode, 'mobile': mobile }
    setGuestDetails(guestDetails)
    const bookingId = generateBookingId()

    navigate('/Payment',{state:{'bookingId': bookingId ,'checkin' : checkIn, 'checkout': checkOut, 'destination' : destination, 'guests' : { 'adults': adults, 'childrens':childrens, 'rooms': rooms}, 'guestDetails':guestDetails, 'selectedHotelDetails':selectedHotelDetails,'selectedRoom':selectedRoom, 'paymentFor' : 'hotel'}})




  }

  const handleFormChange = (e) => {
    let allInputs = document.getElementById('myform').querySelectorAll('input[required]')

    let allFilled = true;

    allInputs.forEach((input) => {

      if (input.type === 'checkbox') {
        if (!input.checked) {
          allFilled = false;
        }
      }
      else {
        if (input.value == '') {
          allFilled = false;
        }
      }


    })

    if (allFilled == false) {
      setContinueBtnActive(false)
    }
    else {
      setContinueBtnActive(true)
    }
  }

  return (
    <>
 
      <div className='flex flex-col items-center xl:bg-[#f4f5f5]'>


        <div id='login' className={`${popupShow == 'signinShow' ? 'block' : 'hidden'} relative`}>
          <Login setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow} />
        </div>

        <div id='signup' className={`${popupShow == "signupShow" ? 'block' : 'hidden'} relative`}>
          <Signup setisloggedin={setIsLoggedIn} setpopupshow={setPopupShow} />
        </div>

        {/* onScroll={(e)=>{ e.currentTarget.scrollLeft!=1536? hide('photos'): show('photos')}}    */}

        <div id='screenScroll' className=' flex flex-row w-screen max-h-[100vh] overflow-x-hidden overflow-y-scroll no-scrollbar bg-white xl:bg-gray-50' >

          <div id='screen1' className='flex flex-col min-w-[100%] '>

            <div className='hidden xl:flex'><Navbar activeLink={1} shadow={false} /></div>

            <input id='searchbardropdowncheckbox' type="checkbox" className='peer absolute opacity-0' />

                <label htmlFor='searchbardropdowncheckbox' className='relative sticky xl:hidden top-0 z-40 flex flex-col mx-[8px] bg-gray-300 font-bold rounded-20 text-sm  py-2 mt-2'>
                  <span className='flex justify-center items-center gap-2'> { destination} </span>
                  <span className='flex justify-center items-center gap-2'>{checkIn.getDate()} {month[checkIn.getMonth()]} -- {checkOut.getDate()} {month[checkOut.getMonth()]} <p className='w-1 h-1 bg-black rounded-full'/>{rooms} rooms <p className='w-1 h-1 bg-black rounded-full'/>{adults + childrens} Guests  </span>
                </label>

                <div className="shadow-500 xl:hidden  xl:w-[96%] p-20 flex flex-col gap-10 rounded-20 bg-white bg-transparent rounded-20 absolute transition-all ease-in-out duration-700 transform -top-[100%] peer-checked:top-1 flex justify-center items-start w-[100%] xl:mt-6  z-40 ">

                <span className='absolute right-2 top-1 w-[20px] h-[20px]' onClick={()=>{document.getElementById('searchbardropdowncheckbox').checked=false}}><IoCloseCircleSharp className='w-full h-full'/></span>

                    {/* SEARCHBAR START */}
                    <div className="flex flex-col xl:flex-row gap-0.5 cursor-pointer xl:h-[60px]">


                            <div className="relative flex gap-0.5 flex-1  ">

                              <div className="INPUT DESTINATION bg-charcoal-40 flex items-center relative h-[45px] w-full rounded-10 xl:h-[60px] hover:bg-neutral-subtle-over border-none xl:rounded-r-none xl:rounded-l-10 ">

                                <div className="flex  justify-between items-center relative w-full h-full " onClick={() => { show("mobileinputbox1"); hide('mobileinputspan1'); focus('mobileinputbox1')}}>
                                  <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 xl:w-[400px]" >
                                    <div className="flex items-center " >
                                      <div className="flex flex-col">
                                        <p className="body-xs  text-neutral-400" >Destination</p>
                                        <span id='mobileinputspan1' className='hidden text-primary font-medium outline-none bg-transparent ' >{destination && `${destination}`}</span>
                                        <input type="text" id='mobileinputbox1' className=' w-full text-primary font-medium outline-none bg-transparent' autoComplete='off' value={destination} onClick={() => { show("mobilelist1") }} onChange={(e) => { setDestination(e.target.value) }} onFocus={(e) => { e.target.select(); show("mobilelist1") }} />
                                      </div>
                                    </div>
                                  </div>
                                </div>


                                {
                                  <div id='mobilelist1' className="hidden overflow-y-scroll absolute top-[45px] xl:top-[60px] bg-white w-[250px] xl:w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20  !animate-none no-scrollbar  Autocompleter_animate__zqRDe">

                                    {
                                      destinationCities.map((city, index) => {
                                        const cityCode = city.iata_code;
                                        const cityName = city.city;
                                        const country = city.country;
                                        const airportName = city.name;


                                        return <div key={index} onClick={() => { setDestination(cityName); hide("mobilelist1"); hide("mobileinputbox1"); show("mobileinputspan1"); focus("datePicker1") }}>
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
                              <div className=" DATE PICKER bg-charcoal-40 hover:bg-neutral-subtle-over w-[50%] xl:w-full rounded-10 xl:rounded-none  " onClick={() => { focus("datePicker1"); hide("mobilelist1"); hide('mobileinputbox1'); show('mobileinputspan1'); hide('mobiletravellersdropdown') }}>
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
                            <div className="bg-charcoal-40 border-charcoal-40 hover:bg-neutral-subtle-over hover:border-contrast  w-[50%] xl:w-full rounded-10 xl:rounded-none " onClick={() => { focus("datePicker2"); hide("mobilelist1"); hide('mobileinputbox1'); show('mobileinputspan1'); }}>
                              <div className="flex justify-between items-center relative w-full h-[45px] xl:h-[60px] border-b-4 lg:min-h-[60px] border-transparent">
                                <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                                  <div className="flex items-center ">
                                    <div className="flex flex-col" >
                                      <p className="body-xs text-neutral-400">Check-out</p>
                                      <div id='datePickerDiv' className='' ><DatePicker id='datePicker2' className='w-full h-full truncate text-primary font-medium outline-none bg-transparent' value={`${weekDays[checkOut.getDay()]}, ${checkOut.getDate()} ${month[checkOut.getMonth()]}`} selected={checkOut} onChange={(d) => { d > checkIn ? `${setCheckOut(d)} ${show("mobiletravellersdropdown")}` : alert('Select date greater that check-in date'); hide("datePicker2") }} formatDate="DD/MM/YYY" minDate={new Date(checkIn)} /></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* CHECK-OUT */}

                            </div>




                            {/* ROOMS AND GUESTS */}
                            <div className="relative overflow-visible w-full">

                              <div className="flex justify-between items-center relative w-full  bg-charcoal-40 hover:bg-neutral-subtle-over border-b-4  md:h-full h-full  border-transparent rounded-10 xl:rounded-none " onClick={() => { document.getElementById("mobiletravellersdropdown").classList.toggle("hidden"); hide('mobileinputbox1'); hide('mobilelist1'); show('mobileinputspan1')}} >
                                <div className="flex-1 flex flex-col justify-center px-15 h-[45px] ">
                                  <div className="flex items-center !border-none">
                                    <div className="flex flex-col">
                                      <p className="body-xs text-neutral-400"> Select Rooms and Guests </p>
                                      <p className=" max-w-[190px] truncate text-primary font-medium" >{rooms} Room , {adults + childrens} Guests</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div id='mobiletravellersdropdown' className="DROPDOWN hidden absolute xl:top-[61px] xl:-right-[150px] bg-white rounded-20 w-full xl:w-[450px] shadow-500 z-30">
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
                                    <button className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over xl:gap-[3px] rounded-10 xl:min-h-[40px] button-md py-2 px-10 xl:w-[81px]" onClick={() => { hide('mobiletravellersdropdown') }}>
                                      Done
                                    </button>
                                  </div>
                                </div>
                              </div>

                            </div>
                            {/* ROOMS AND GUESTS */}

                            {/* SEARCH BUTTON */}
                            <button id='searchBtn' className="inline-flex justify-center items-center h-[45px] w-full bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-5 rounded-10 xl:min-h-[50px] xl:h-full xl:py-[13px] px-15 xl:rounded-l-none xl:rounded-r-10 text-2xl xl:w-[160px] pl-[25px] " onClick={() => { document.getElementById('searchbardropdowncheckbox').checked=false; obj.destination !== '' ? getHotels() : alert("All fields are required") }}>
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


            <div className=' SEARCHBAR w-[100%] hidden xl:flex justify-center bg-white py-4 sticky top-0 z-40'>
              <div className=" SEARCHBAR flex gap-0.5 cursor-pointer h-[60px] w-[96%] ">


                <div className="relative flex gap-0.5 flex-1  ">

                  <div className="INPUT DESTINATION bg-charcoal-40 flex items-center relative  h-[60px] hover:bg-neutral-subtle-over border-none rounded-l-10 ">

                    <div className="flex  justify-between items-center relative w-full h-full " onClick={() => { show("inputBox1"); hide('inputSpan1'); focus('inputBox1');  }}>
                      <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 w-[400px]" >
                        <div className="flex items-center " >
                          <div className="flex flex-col">
                            <p className="body-xs  text-neutral-400" >Destination</p>
                            <span id='inputSpan1' className='w- text-lg  font-semibold outline-none bg-transparent ' >{destination && `${destination}`}</span>
                            <input type="text" id='inputBox1' className='hidden w-full text-lg font-semibold outline-none bg-transparent' value={destination} onClick={() => { show("list1") }} onChange={(e) => { setDestination(e.target.value) }} onFocus={(e) => { e.target.select(); show("list1")}} />
                          </div>
                        </div>
                      </div>
                    </div>


                    {
                      <div id='list1' className="hidden overflow-y-scroll absolute top-[61px] bg-white w-[375px] min-h-[50px] max-h-[450px] shadow-500 z-20 rounded-20  !animate-none no-scrollbar  Autocompleter_animate__zqRDe">

                        {
                          destinationCities.map((city, index) => {
                            const cityCode = city.iata_code;
                            const cityName = city.city;
                            const country = city.country;
                            const airportName = city.name;


                            return <div key={index} onClick={() => { setDestination(cityName); hide("list1"); hide("inputBox1"); show("inputSpan1"); focus("datePicker1") }}>
                              <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm max-w-screen-sm gap-15 py-15" >
                               
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

                {/* CHECK-IN */}
                <div className=" DATE PICKER bg-charcoal-40 hover:bg-neutral-subtle-over w-full" onClick={() => { focus("datePicker1"); hide("list1"); hide('inputBox1'); show('inputSpan1'); hide('trevellersDropdown') }}>
                  <div className="flex justify-between items-center relative w-full h-[60px]  border-b-4 lg:min-h-[60px] border-transparent">
                    <div className="flex-1 w-full h-full flex flex-col justify-center px-15 py-10 ">
                      <div className="flex items-center w-full">
                        <div className="flex flex-col w-full" >
                          <p className="body-xs text-neutral-400">Check-in</p>
                          <div id='datePickerDiv ' className='w-full' ><DatePicker id='datePicker1' className='h6 w-full truncate text-primary font-medium outline-none bg-transparent' value={`${weekDays[checkIn.getDay()]}, ${checkIn.getDate()} ${month[checkIn.getMonth()]}`} selected={checkIn} onChange={(d) => { setCheckIn(d); hide("datePicker1"); focus('datePicker2') }} formatDate="DD/MM/YYY" minDate={new Date()} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* CHECK-IN */}

                {/* CHECK-OUT */}
                <div className="bg-charcoal-40 border-charcoal-40 hover:bg-neutral-subtle-over hover:border-contrast w-full" onClick={() => { focus("datePicker2"); hide("list1"); hide('inputBox1'); show('inputSpan1'); }}>
                  <div className="flex justify-between items-center relative w-full h-[60px] border-b-4 lg:min-h-[60px] border-transparent">
                    <div className="flex-1 w-full h-full flex flex-col justify-center px-15 py-10 ">
                      <div className="flex items-center w-full ">
                        <div className="flex flex-col w-full" >
                          <p className="body-xs text-neutral-400">Check-out</p>
                          <div id='datePickerDiv' className='w-full' ><DatePicker id='datePicker2' className='h6 w-full truncate text-primary font-medium outline-none bg-transparent' value={`${weekDays[checkOut.getDay()]}, ${checkOut.getDate()} ${month[checkOut.getMonth()]}`} selected={checkOut} onChange={(d) => { d > checkIn ? `${setCheckOut(d)} ${show("trevellersDropdown")}` : alert('Select date greater that check-in date'); hide("datePicker2") }} formatDate="DD/MM/YYY" minDate={new Date(checkIn)} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* CHECK-OUT */}


                {/* ROOMS AND GUESTS */}
                <div className="relative overflow-visible">

                  <div className="flex justify-between items-center relative w-[220px] bg-charcoal-40 hover:bg-neutral-subtle-over border-b-4 py-0.5 flex justify-center md:h-full h-full  border-transparent " onClick={() => { document.getElementById("trevellersDropdown").classList.toggle("hidden"); hide('inputBox1'); hide('inputBox2'); hide('list1'); hide('list2'); show('inputSpan1'); show('inputSpan2') }} >
                    <div className="flex-1 h-full flex flex-col justify-center px-15 py-10 ">
                      <div className="flex items-center !border-none">
                        <div className="flex flex-col">
                          <p className="body-xs text-neutral-400"> Travellers &amp; Class </p>
                          <p className="h6 max-w-[190px] truncate text-primary font-medium " >{rooms} Room , {adults + childrens} Guests</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id='trevellersDropdown' className="DROPDOWN hidden absolute top-[61px] -right-[150px] bg-white rounded-20 w-[450px] shadow-500 z-30">
                    <div className="xl:relative">
                      <h6 className="h6 pt-20 pb-10 px-20 font-medium">Select Rooms & Guests</h6>
                      <div className="TRAVELLERS AND CLASS flex flex-col  h-[352px] overflow-y-scroll no-scrollbar">

                        <div className="ROOMS flex  max-w-full px-20 py-10 ">
                          <div className="flex items-center justify-between xl:flex-col xl:items-start xl:justify-start xl:w-[95px]">
                            <p className="body-md text-primary font-normal">Rooms</p>
                            <p className="body-xs text-secondary font-normal">Minimum 1</p>
                          </div>
                          <div className="mt-10 xl:mt-0 xl:justify-start xl:items-start xl:flex-1">
                            <div className="">

                              {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => {
                                  return <button key={index} className={`py-1.5 px-2.5 rounded-10  min-w-[35px] ${index + 1 == rooms ? "bg-selection-solid text-selection-solid" : ""}`} onClick={() => { setRooms(num) }}> {num} </button>
                                })
                              }
                            </div>
                          </div>
                        </div>

                        <div className="ADULTS flex  max-w-full px-20 py-10 ">
                          <div className="flex items-center justify-between xl:flex-col xl:items-start xl:justify-start xl:w-[95px]">
                            <p className="body-md text-primary font-normal">Adults</p>
                            <p className="body-xs text-secondary font-normal">13 yrs & above</p>
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
                            <p className="body-xs text-secondary font-normal">0 - 12 yrs</p>
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


                      </div>
                      <div className="BUTTON flex justify-between bottom-0 gap-5 pt-[9px] pb-10 px-20 border-t border-neutral-100 w-full xl:justify-end relative">
                        <button className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-[3px] rounded-10 min-h-[40px] button-md py-2 px-10 xl:w-[81px]" onClick={() => { hide('trevellersDropdown') }}>
                          Done
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
                {/* ROOMS AND GUESTS */}

                {/* SEARCH BUTTON */}
                <button id='searchBtn' className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-5 rounded-10 min-h-[50px] button-lg py-[13px] px-15 rounded-none rounded-r-10 text-2xl w-[160px] pl-[25px] " onClick={() => { obj.destination !== '' ? getHotels()  : alert("All fields are required"); hide('list1'); show('inputSpan1') }}>
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
            </div>

            <div className=" HERO flex xl:justify-center xl:gap-4 xl:py-4 w-screen">

              <div className="LEFT-HERO hidden xl:flex z-10">

                <div className="filter max-h-[100%] ">

                  < div className="bg-white pb-4 rounded-10 w-[300px] ">

                    <div className="flex justify-between p-20 items-center">
                      <p className="HEADING body-md font-bold">Filters</p>
                      <p className="CLEAR ALL body-sm cursor-pointer text-brand-500 font-medium" onClick={() => { document.querySelectorAll('.filterCheckBox').forEach((i) => { if (i.checked) { i.click() } }); setFilterObj({}) }}> Clear All </p>
                    </div>

                    <div className="flex flex-col gap-6 ">

                      <div className="popularFilters">
                        <p className='w-full px-4  text-lg font-semibold'>Most Popular</p>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Free Cancellation</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Free Cancellation'} filtertype={'popularFilters'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Free Breakfast</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Free Breakfast'} filtertype={'popularFilters'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Rated Exceptional(9+)</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Rated Exceptional'} filtertype={'popularFilters'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Parking Available</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Parking Available'} filtertype={'popularFilters'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                      </div>

                      <div className="PRICE FILTER DIV flex flex-col px-4  gap-6 rounded-md">
                        <p className="w-full  text-lg font-semibold">Price</p>
                        <div className="relative w-full ">
                          <div className='border'> <RangeSlider min={0} max={10000} value={val} filtertype={'price'} onInput={(e) => { setval(e); }} onThumbDragEnd={(e) => { setminmax(val); handlePrice(val) }} /> </div>
                          <div className='flex justify-between'>
                            <div className=" left-2 text-secondary text-sm mt-2"> {val[0]} </div>
                            <div className=" right-2 text-secondary text-sm mt-2"> {val[1]} </div>
                          </div>
                        </div>
                      </div>

                      <div className="ratingFilter ">
                        <p className='w-full px-4  text-lg font-semibold'>User Rating </p>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Exceptional: 4.5+</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="radio" name='ratingFiltar' value={4.5} filtertype={'User Rating'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Excellent: 3.5+</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="radio" name='ratingFiltar' value={3.5} filtertype={'User Rating'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Good: 2.5+</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="radio" name='ratingFiltar' value={2.5} filtertype={'User Rating'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Pleasant: 1+</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="radio" name='ratingFiltar' value={1} filtertype={'User Rating'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>

                      </div>

                      <div className="facilitiesFilter">
                        <p className='w-full px-4  text-lg font-semibold'>Facilities </p>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Parking</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Parking'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Free WiFi</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Free WiFi'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Gym</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Gym'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Bar</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Bar'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Spa</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Spa'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Restaurant</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Restaurant'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Swimmint Pool</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Swimming Pool'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>

                      </div>

                      <div className="starRatingFilter flex gap-4 px-4 flex-wrap">
                        <p className='w-full  text-lg font-semibold'>Star Rating </p>
                        <span className='relative'> <input id='5star' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' value={'5 Star'} filtertype={'Star Rating'} onChange={(e) => { handleFilterChange(e) }} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor="5star">5 Star</label></span>
                        <span className='relative'> <input id='4star' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' value={'4 Star'} filtertype={'Star Rating'} onChange={(e) => { handleFilterChange(e) }} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor="4star">4 Star</label></span>
                        <span className='relative'> <input id='3star' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' value={'3 Star'} filtertype={'Star Rating'} onChange={(e) => { handleFilterChange(e) }} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor="3star">3 Star</label></span>
                        <span className='relative'> <input id='2star' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' value={'2 Star'} filtertype={'Star Rating'} onChange={(e) => { handleFilterChange(e) }} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor="2star">2 Star</label></span>
                        <span className='relative'> <input id='1star' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' value={'1 Star'} filtertype={'Star Rating'} onChange={(e) => { handleFilterChange(e) }} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor="1star">1 Star</label></span>
                      </div>

                      <div className="propertyType flex gap-4 flex-wrap px-4">
                        <p className='w-full  text-lg font-semibold'>Accommodation Type</p>
                        <span className='relative'> <input id='property1' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Hotel'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property1'>Hotel</label></span>
                        <span className='relative'> <input id='property2' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Resort'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property2'>Resort</label></span>
                        <span className='relative'> <input id='property3' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Bed and Breakfast'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property3'>Bed and Breakfast</label></span>
                        <span className='relative'> <input id='property4' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Entire Apartment'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property4'>Entire Apartment </label></span>
                        <span className='relative'> <input id='property5' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Tent'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property5'>Tent</label></span>
                        <span className='relative'> <input id='property6' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Ryokan'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property6'>Ryokan</label></span>
                        <span className='relative'> <input id='property7' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Country house'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property7'>Country house</label></span>
                        <span className='relative'> <input id='property8' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Serviced apartment'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property8'>Serviced apartment</label></span>
                        <span className='relative'> <input id='property9' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Capsule hotel'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property9'>Capsule hotel</label></span>
                        <span className='relative'><input id='property10' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Hostel'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property10'>Hostel</label></span>
                        <span className='relative'><input id='property11' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Entire house'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property11'>Entire house</label></span>
                        <span className='relative'><input id='property12' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Homestay'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property12'>Homestay</label></span>
                        <span className='relative'><input id='property13' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Lodge'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property13'>Lodge</label></span>
                        <span className='relative'><input id='property14' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Farm stay'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property14'>Farm stay </label></span>
                        <span className='relative'><input id='property15' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Riad'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property15'>Riad</label></span>
                      </div>

                      <div className="paymentMode">
                        <p className='w-full px-4  text-lg font-semibold'>Payment Mode</p>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Book with ₹0 payment</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Book with 0 payment'} filtertype={'Payment Mode'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Prepaid</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Prepaid'} filtertype={'Payment Mode'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Pay at hotel</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Pay at hotel'} filtertype={'Payment Mode'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                      </div>

                      <div className="mealsIncluded">
                        <p className='w-full px-4  text-lg font-semibold'>Meals</p>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Breakfast Included</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Breakfast included'} filtertype={'Meals'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Lunch Included</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Lunch included'} filtertype={'Meals'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                        <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Dinner Included</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Dinner included'} filtertype={'Meals'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className="RIGHT-HERO  flex  w-screen xl:w-[70%] xl:p-0 p-2 flex-col gap-3 mb-16">

                    <div className="SORT hidden xl:flex justify-between items-center  px-[26px]">


                      <p className=' font-semibold text-lg'>Showing Properties In {destination}</p>

                      <div className='relative w-[23%] flex z-30 '>
                        <input id='scheck' className='absolute opacity-0 peer' type="checkbox" />
                        <label htmlFor="scheck" className='w-full h-full inline-block py-3 px-4 bg-white rounded-10 font-semibold peer-checked:outline outline-2 outline-blue-400'>{sort}</label> <IoIosArrowDown className='absolute peer-checked:rotate-180 transition duration-200 right-3 top-[30%]' />

                        <div className="dropdown absolute top-[109%] w-full  bg-white hidden peer-checked:flex flex-col gap-3 px-1 py-1 rounded-10 shadow">
                          <span className='cursor-pointer hover:bg-slate-100 px-4 rounded flex flex-col relative' onClick={() => { document.getElementById('scheck').checked = false }}> <input id='sortRadio1' className='absolute opacity-0' type="radio" name='sortRadio' filtertype={'popularity'} value={'1'} onChange={(e) => { handleFilterChange(e); setSort('Popularity') }} /> <label className='font-semibold  flex flex-col' htmlFor="sortRadio1"><p>Popularity</p> <p className='text-gray-400'>Low to High</p> </label> </span>
                          <span className='cursor-pointer hover:bg-slate-100 px-4 rounded flex flex-col relative' onClick={() => { document.getElementById('scheck').checked = false }}> <input id='sortRadio2' className='absolute opacity-0' type="radio" name='sortRadio' filtertype={'price1'} value={'1'} onChange={(e) => { handleFilterChange(e); setSort('Price Low to High') }} /> <label className='font-semibold  flex flex-col' htmlFor="sortRadio2"><p>Price</p> <p className='text-gray-400'>Low to High</p> </label> </span>
                          <span className='cursor-pointer hover:bg-slate-100 px-4 rounded flex flex-col relative' onClick={() => { document.getElementById('scheck').checked = false }}> <input id='sortRadio3' className='absolute opacity-0' type="radio" name='sortRadio' filtertype={'price2'} value={'-1'} onChange={(e) => { handleFilterChange(e); setSort('Price High to Low') }} /> <label className='font-semibold  flex flex-col' htmlFor="sortRadio3"><p>Price</p> <p className='text-gray-400'>High to Low</p> </label> </span>
                          <span className='cursor-pointer hover:bg-slate-100 px-4 rounded flex flex-col relative' onClick={() => { document.getElementById('scheck').checked = false }}> <input id='sortRadio4' className='absolute opacity-0' type="radio" name='sortRadio' filtertype={'rating'} value={'1'} onChange={(e) => { handleFilterChange(e); setSort('User Rating Highest First') }} /> <label className='font-semibold  flex flex-col' htmlFor="sortRadio4"><p>User Rating</p> <p className='text-gray-400'>Highest First</p> </label> </span>


                        </div>
                      </div>

                    </div>

                    {
                      message === 'Success' ?

                        <>

                            <div className="LAPTOP HOTEL-CARDS hidden xl:flex flex-col items-center gap-6">
                              {



                                paginatesHotels.map((hotel, index) => (
                                  <div key={index} className="hotelCard bg-white w-[95%] h-[240px] px-6 py-4 rounded-10 flex justify-between items-center">
                                    <div className="left h-full items-center flex gap-6">
                                      <div className="IMAGES relative w-[300px] h-[200px]">
                                        <span className='absolute w-6 h-6 flex justify-center items-center  bg-white bg-opacity-50 hover:bg-opacity-100 text-blue-500 border rounded-full left-1 z-10 top-[50%] cursor-pointer' onClick={() => { scroll(`imageScroller${index}`, 'right') }}>
                                          <MdOutlineKeyboardArrowLeft />
                                        </span>
                                        <div id={`imageScroller${index}`} className='w-full h-full flex items-center overflow-x-scroll no-scrollbar bg-gray-400 rounded-10'>
                                          {
                                            hotel.images.map((image, i)=>{
                                              return  <div key={i} id={`img${i}${index}`} className='min-w-[300px] min-h-[200px] max-w-[300px] max-h-[200px] bg-gray-200 rounded-10 overflow-hidden flex items-center justify-center relative'>
                                                        <img className={`rounded-10 w-full h-full object-contain`} src={image} alt='img' loading='lazy'  />
                                                      </div>
                                            })
                                            
                                          }
                                        </div>
                                        <span className='absolute w-6 h-6 flex justify-center items-center bg-white bg-opacity-50 hover:bg-opacity-100 text-blue-500 border rounded-full right-1 top-[50%] z-10 cursor-pointer' onClick={() => { scroll(`imageScroller${index}`, 'left') }}>
                                          <MdOutlineKeyboardArrowRight />
                                        </span>
                                      </div>

                                      <div className="HOTEL-INFO h-full flex flex-col justify-start gap-4">
                                        <span className='flex flex-col'>
                                          <p className='text-xl font-bold'>{hotel.name}</p>
                                          <p className='text-sm text-gray-500'>Church View Building : 5.2 km from Goa</p>
                                        </span>
                                        <span className='flex items-center gap-2'>
                                          <p className='font-semibold text-blue-500 bg-blue-100 px-2 rounded'>{hotel.rating}</p>
                                          <p className='text-sm font-semibold text-blue-500'>{`${hotel.rating <= 2.5 ? 'poor' : ''} ${hotel.rating >= 2.5 && hotel.rating <= 3.5 ? 'Good' : ''} ${hotel.rating > 3.5 && hotel.rating <= 4.5 ? 'Excellent' : ''} ${hotel.rating > 4.5 ? 'Exceptional' : ''}`}</p>
                                          <p className='w-1 h-1 bg-gray-300 rounded-full' />
                                          <p className='text-sm text-gray-400'>166 Ratings</p>
                                        </span>

                                        <span className='flex gap-4'>
                                          <span className='flex items-center gap-1 '><GiHouseKeys /> <p>24*7 Check-In</p></span>
                                          <span className='flex items-center gap-1 '><MdOutlineRestaurantMenu /> <p>Restaurants</p></span>
                                        </span>

                                        <span className='flex gap-3 flex-wrap'>
                                          {
                                          hotel.amenities.map((amenity, i) => (
                                              <span key={i} className='flex items-center gap-1 text-[#258c47]'><p>{amenity}</p></span>
                                            ))
                                          }
                                        </span>
                                        <span className='flex gap-4 relative'>
                                          <input id={`hotelRulesPopup${index}`} className=' opacity-0 absolute peer' type="radio" name='hotelRulesPopup'/>
                                          
                                          <div className='bottom-[100%] flex flex-col justify-between font-semibold bg-white shadow p-4 left-0 w-[0px] h-[0px] rounded-2xl border absolute transform scale-0 opacity-0 transition-all duration-500 peer-checked:scale-100 peer-checked:opacity-100 peer-checked:right-1 peer-checked:w-[500px] peer-checked:h-[180px]'>
                                                <span className='absolute right-4 top-2 cursor-pointer' onClick={()=>{document.getElementById(`hotelRulesPopup${index}`).checked = false}}>x</span>
                                                <span className='flex gap-2 text-sm'><p>Accepted Id Proops : </p> { hotel.houseRules.restrictions.idProofsAccepted.map((idproof, i)=>{ return <p key={i}>{idproof} ,</p> }) }</span>
                                                <span className='flex gap-2 text-sm'><p>Unmarried Couples Allowed  :</p>{hotel.houseRules.guestProfile.unmarriedCouplesAllowed ? ' Yes' : ' No'}</span>
                                                <span className='flex gap-2 text-sm'><p>Local Ids Allowed :</p>{hotel.houseRules.idProofRelated.localIdsAllowed ? ' Yes' : ' No'}</span>
                                                <span className='flex gap-2 text-sm'><p>Pets Allowed :</p>{hotel.houseRules.restrictions.petsAllowed ? ' Yes' : ' No'}</span>
                                                <span className='flex gap-2 text-sm'><p>Smoking Allowed :</p>{hotel.houseRules.restrictions.smokingAllowed ? ' Yes' : ' No'}</span>
                                          </div>
                                          <span className='flex items-center gap-1 text-sm font-semibold '><label className='cursor-pointer text-blue-400' htmlFor={`hotelRulesPopup${index}`}>Hotel Rules</label></span>
                                          {hotel.houseRules.guestProfile.unmarriedCouplesAllowed && <span className='text-sm font-semibold'>Unmarried Couples Are welcome</span>}
                                        </span>

                                      </div>
                                    </div>

                                    <div className="right h-full flex flex-col justify-between items-end">
                                      <div className='relative text-xl w-[84px] h-[30px]'>
                                        <p className='absolute top-0 left-0'>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                                        <p className={`absolute top-0 left-0 text-yellow-400 overflow-hidden`} style={{ width: `${(hotel.rating * 100) / 5}%` }}>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                                      </div>
                                      <div className='border px-2 py-[2px] rounded-full bg-[#fff2f2] text-[#dc4046]'>6 rooms left</div>
                                      <div className='flex flex-col items-end'>
                                        <p className='font-semibold text-xl'>₹{Math.ceil(hotel.avgCostPerNight)}</p>
                                        <p className='text-xs font-semibold text-gray-500'>per night, per room</p>
                                        <p className='text-xs font-semibold text-gray-500'>+ ₹732 taxes & fees</p>
                                      </div>

                                      <button className='bg-orange-600 text-white px-3 py-[9px] rounded-10 font-semibold flex justify-center items-center gap-3' onClick={() => { document.getElementById('screenScroll').scrollBy({ left: `${document.getElementById('screen1').scrollWidth}`, behavior: 'smooth' }); setSelectedHotel(hotel._id); getHotelDetails(hotel._id); setTimeout(() => { observeTargets() }, 1000); }}> See Availability <MdKeyboardArrowRight /> </button>

                                    </div>
                                  </div>
                                ))
                              }
                            </div>

                            <div className='MOBILE HOTEL-CARDS xl:hidden w-full h-full flex flex-col  gap-6' >

                              {  
                                  paginatesHotels.map((hotel, index)=>{
                                    return <div key={index} className='w-full bg-white rounded-10 flex flex-col '>

                                                <div className='IMAGES w-full'>
                                                
                                                  <div id={`imageScroller${index}`} className='w-full h-full flex  items-center overflow-x-scroll no-scrollbar bg-gray-400 rounded-10 '>
                                                    {
                                                      hotel.images.map((image, i)=>{
                                                        return  <div key={i} id={`img${i}${index}`}  className='min-w-full h-[220px]  bg-gray-200 rounded-10 overflow-hidden flex items-center justify-center relative'>
                                                                  <img className={`rounded-10 w-full h-full object-`}  src={image} alt='img' loading='lazy'  />
                                                                </div>
                                                      })
                                                      
                                                    }
                                                  </div>

                                                 


                                                </div>

                                              <div className='flex justify-between w-full  py-2 rounded-b-10  '>
                                                  <div className="left  ">
                                                  <div className="HOTEL-INFO h-full flex flex-col justify-start gap-2 ">
                                                    <span className='flex flex-col'>
                                                      <p className=' font-semibold'>{hotel.name}</p>
                                                      <p className='text-xs text-gray-500'>Church View Building : 5.2 km from Goa</p>
                                                    </span>
                                                    <span className='flex items-center gap-2'>
                                                      <p className='font-semibold text-blue-500 bg-blue-100 px-2 py-1 flex justify-center items-center rounded text-xs'>{hotel.rating}</p>
                                                      <p className='text-xs font-semibold text-blue-500'>{`${hotel.rating <= 2.5 ? 'poor' : ''} ${hotel.rating >= 2.5 && hotel.rating <= 3.5 ? 'Good' : ''} ${hotel.rating > 3.5 && hotel.rating <= 4.5 ? 'Excellent' : ''} ${hotel.rating > 4.5 ? 'Exceptional' : ''}`}</p>
                                                      <p className='w-1 h-1 bg-gray-300 rounded-full' />
                                                      <p className='text-xs text-gray-400'>166 Ratings</p>
                                                    </span>

                                                    <span className='flex gap-4'>
                                                      <span className='flex items-center gap-1 text-xs font-semibold'><GiHouseKeys /> <p>24*7 Check-In</p></span>
                                                      <span className='flex items-center gap-1 text-xs font-semibold'><MdOutlineRestaurantMenu /> <p>Restaurants</p></span>
                                                    </span>

                                                    <span className='flex hidden gap-3 flex-wrap'>
                                                      {
                                                      hotel.amenities.map((amenity, i) => (
                                                          <span key={i} className='flex items-center gap-1 text-[#258c47] text-xs font-semibold'><p>{amenity}</p></span>
                                                        ))
                                                      }
                                                    </span>
                                                    <span className='flex gap-4 relative'>
                                                      <input id={`hotelRulesPopup${index}`} className=' opacity-0 absolute peer' type="radio" name='hotelRulesPopup'/>
                                                      
                                                      <div className='bottom-[100%] flex flex-col justify-between font-semibold bg-white shadow p-4 left-0 w-[0px] h-[0px] rounded-2xl border absolute transform scale-0 opacity-0 transition-all duration-500 peer-checked:scale-100 peer-checked:opacity-100 peer-checked:right-1 peer-checked:w-[500px] peer-checked:h-[180px]'>
                                                            <span className='absolute right-4 top-2 cursor-pointer' onClick={()=>{document.getElementById(`hotelRulesPopup${index}`).checked = false}}>x</span>
                                                            <span className='flex gap-2 text-sm'><p>Accepted Id Proops : </p> { hotel.houseRules.restrictions.idProofsAccepted.map((idproof, i)=>{ return <p key={i}>{idproof} ,</p> }) }</span>
                                                            <span className='flex gap-2 text-sm'><p>Unmarried Couples Allowed  :</p>{hotel.houseRules.guestProfile.unmarriedCouplesAllowed ? ' Yes' : ' No'}</span>
                                                            <span className='flex gap-2 text-sm'><p>Local Ids Allowed :</p>{hotel.houseRules.idProofRelated.localIdsAllowed ? ' Yes' : ' No'}</span>
                                                            <span className='flex gap-2 text-sm'><p>Pets Allowed :</p>{hotel.houseRules.restrictions.petsAllowed ? ' Yes' : ' No'}</span>
                                                            <span className='flex gap-2 text-sm'><p>Smoking Allowed :</p>{hotel.houseRules.restrictions.smokingAllowed ? ' Yes' : ' No'}</span>
                                                      </div>
                                                      <span className='flex items-center gap-1 text-sm font-semibold '><label className='cursor-pointer text-blue-400 text-xs font-semibold' htmlFor={`hotelRulesPopup${index}`}>Hotel Rules</label></span>
                                                      {hotel.houseRules.guestProfile.unmarriedCouplesAllowed && <span className='text-xs hidden font-semibold'>Unmarried Couples Are welcome</span>}
                                                    </span>
                                                  </div>
                                                  </div>

                                                  <div className="right ">
                                                  <div className='flex flex-col justify-between items-end  h-full '>

                                                        <div className='relative text-xs w-[60px]  p-2'>
                                                          <p className='absolute top-0 left-0'>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                                                          <p className={`absolute top-0 left-0 text-yellow-400 overflow-hidden`} style={{ width: `${(hotel.rating * 100) / 5.6}%` }}>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                                                        </div>
                                                        <div className='text-[#dc4046] text-xs'>6 rooms left</div>
                                                        <div className='flex flex-col items-end'>
                                                          <p className='font-semibold '>₹{Math.ceil(hotel.avgCostPerNight)}</p>
                                                          <p className='text-xs font-semibold text-gray-500'>per night, per room</p>
                                                        </div>

                                                        <button className='bg-orange-600 text-white  text-[12px] py-1 px-3 rounded-full font-semibold flex justify-center items-center gap-3 ' onClick={() => {setBottomRibbonShow(false); document.getElementById('screenScroll').scrollBy({ left: `${document.getElementById('screen1').scrollWidth}`, behavior: 'smooth' }); setSelectedHotel(hotel._id); getHotelDetails(hotel._id); setTimeout(() => { observeTargets() }, 1000); }}> See Availability </button>

                                                    </div>                                       
                                                  </div>
                                              </div>
                                              

                                          </div>
                                  })

                              }

                            </div>

                        </>


                        :

                        <div className='Spinner flex flex-col justify-center items-center gap-10 my-10  '>
                            {
                              message === 'Loading...' ?  <div> <ThreeCircles wrapperClass={'w-[50px] h-[50px] flex justify-center items-center animate-spin '} color='#0770e4' /><h1>{message}</h1> </div>  : <div className='border w-full h-full flex justify-center items-center pt-8 text-xl font-semibold'>{message}</div>
                            }
                        </div>

                    }


                    {
                      message === 'Success' && <div className='PAGINATION BUTTONS flex flex-col justify-center items-center mt-20 pb-10 transition duration-500 animate-spin'>

                        <div className='flex justify-center items-center gap-4 transition duration-300'>
                          <button className={`border shadow w-[30px] h-[30px] rounded-full flex flex-col justify-center items-center ${currentPage == 0 ? "cursor-not-allowed" : ""}`} onClick={() => { setCurrentPage((prev) => { return Math.max(prev - 1, 0) }); document.getElementById('screenScroll').scrollTo({ top: 0, behavior: "smooth" }) }}> <MdKeyboardArrowLeft /> </button>       {Array(pages).fill().map((_, index) => { return <button key={index} className={`${currentPage == index ? 'bg-blue-700 text-white' : ""} w-[30px] h-[30px] rounded-full shadow-300 flex justify-center items-center `} onClick={() => { setCurrentPage(index); document.getElementById('screenScroll').scrollTo({ top: 0, behavior: "smooth" }) }}>{index + 1}</button> })}        <button className={`border border shadow  w-[30px] h-[30px] rounded-full flex flex-col justify-center items-center ${currentPage == pages - 1 ? "cursor-not-allowed" : ""}`} onClick={() => { setCurrentPage((prev) => { return Math.min(prev + 1, pages - 1) }); document.getElementById('screenScroll').scrollTo({ top: 0, behavior: "smooth" }) }}> <MdKeyboardArrowRight /> </button>
                        </div>

                      </div>
                    }


              </div>

            </div>
            
          

          </div>

          <div id='screen2' className='min-w-[100%] max-h-screen overflow-hidden flex flex-col sticky top-0  bg-white'>
            <MdKeyboardArrowLeft className='absolute top-1 left-0 w-[30px] h-[30px] cursor-pointer z-50' onClick={() => { setBottomRibbonShow(true);document.getElementById('screenScroll').scrollBy({ left: -`${document.getElementById('screen1').scrollWidth}`, behavior: 'smooth' }); }} />
          

            {
              selectedHotelDetails && <div className='flex flex-col gap-6 overflow-y-auto no-scrollbar xl:px-[7%] xl:pt-12 border border-black bg-white'>

                                            <div id='Overview' ref={overviewRef} className="PHOTOS & INFO flex flex-col gap-6 xl:p-4 bg-gray-50 rounded-10">

                                              <div className='hidden LAPTOP xl:flex photos gap-2  w-full h-[400px] transition duration-500'>
                                                  <div className="left h-full w-[50%] rounded-10"> <img src={selectedHotelDetails.images[0]} className='w-full h-full rounded-10' alt="" /></div>
                                                  <div className="right h-full w-[50%] flex justify-center items-center gap-2  flex-wrap"> <img src={selectedHotelDetails.images[1]} className='w-[48%] h-[48%] rounded-10' alt="" /> <img src={selectedHotelDetails.images[2]} className='w-[48%] h-[48%] rounded-10' alt="" /> <img src={selectedHotelDetails.images[3]} className='w-[48%] h-[48%] rounded-10' alt="" /> <img src={selectedHotelDetails.images[0]} className='w-[48%] h-[48%] rounded-10' alt="" /> </div>
                                              </div>

                                              <div  className='MOBILE w-full h-full xl:hidden flex  items-center overflow-x-scroll no-scrollbar bg-gray-400  '>
                                                    {
                                                      selectedHotelDetails.images.map((image, i)=>{
                                                        return  <div key={i} id={`img${i}`}  className='min-w-full h-[220px]  bg-gray-200 overflow-hidden flex items-center justify-center relative'>
                                                                  <img className={` w-full h-full object-`}  src={image} alt='img' loading='lazy'  />
                                                                </div>
                                                      })
                                                      
                                                    }
                                              </div>

                                              <div className='info flex flex-col gap-2 xl:gap-6 px-2 pb-2 xl:pb-0' >

                                                <span className='flex justify-between xl:justify-start xl:gap-4 items-center '> <p className='text-lg xl:text-3xl font-bold'>{selectedHotelDetails.name}</p>   <div className='relative text-xl w-[84px] h-[30px] '> <p className='absolute top-0 left-0'>&#9733;&#9733;&#9733;&#9733;&#9733;</p> <p className={`absolute top-0 left-0 text-yellow-400 w-[${(selectedHotelDetails.rating * 100) / 5}%] overflow-hidden `}>&#9733;&#9733;&#9733;&#9733;&#9733;</p> </div>   </span>

                                                <div className='flex justify-between xl:justify-start  items-center xl:gap-16 '>  <div className='flex items-center gap-4 '><span className='font-bold xl:text-xl text-blue-400 '>{selectedHotelDetails.rating}</span> <span><p className='xl:text-lg font-semibold text-blue-400'>{`${selectedHotelDetails.rating <= 2.5 ? 'poor' : ''} ${selectedHotelDetails.rating >= 2.5 && selectedHotelDetails.rating <= 3.5 ? 'Good' : ''} ${selectedHotelDetails.rating > 3.5 && selectedHotelDetails.rating <= 4.5 ? 'Excellent' : ''} ${selectedHotelDetails.rating > 4.5 ? 'Exceptional' : ''}`}</p><p className='text-gray-400 text-sm xl:text-[14px] font-semibold hidden xl:block'>166 Ratings</p></span></div>    <div className='flex items-center gap-4'> <span className='xl:w-12 xl:h-12 bg-red-50 rounded-10 flex justify-center items-center text-2xl text-orange-400'><FaLocationDot /></span> <span className='flex flex-col'><p className='text-s xl:text-[17px] '> {selectedHotelDetails.location}</p> <p className='text-orange-400 xl:text-sm text-xs'>View On Map</p></span></div> </div>
                                              </div>
                                            </div>

                                            <div id='Navbar' observ="true" className="NAVIGATION-BAR flex xl:justify-start px-2  justify-between xl:gap-12 xl:px-4 pt-8 pb-2 sticky top-0 xl:-top-12 bg-gray-100 rounded-10 ">
                                              <div className='relative '> <input id='radio1' className='absolute opacity-0 peer' type="radio" name='navradio' checked={visibleElements.includes('About')} onChange={(e) => { e.currentTarget.checked ? document.getElementById('Overview').scrollIntoView({ behavior: 'smooth', block: 'start' }) : '' }} /> <label htmlFor="radio1" className='py-2 xl:p-2 text-sm xl:text-[18px] cursor-pointer peer-checked:border-b-4 border-blue-400 rounded peer-checked:text-blue-400'> Overview</label> </div>
                                              <div className='relative hidden xl:block'> <input id='roomRadioLaptop' className='absolute opacity-0 peer' type="radio" name='navradio' checked={visibleElements.includes('Rooms')} onChange={(e) => { e.currentTarget.checked ? document.getElementById('Rooms').scrollIntoView({ behavior: 'smooth', block: 'start' }) : '' }} /> <label htmlFor="roomRadioLaptop" className='py-2 xl:p-2 text-sm  xl:text-[18px] cursor-pointer peer-checked:border-b-4 border-blue-400 rounded peer-checked:text-blue-400'> Rooms</label> </div>
                                              <div className='relative xl:hidden'> <input id='roomRadioMobile' className='absolute opacity-0 peer' type="radio" name='navradio' checked={visibleElements.includes('RoomsMobile')} onChange={(e) => { e.currentTarget.checked ? document.getElementById('RoomsMobile').scrollIntoView({ behavior: 'smooth', block: 'start' }) : '' }} /> <label htmlFor="roomRadioMobile" className='py-2 xl:p-2 text-sm  xl:text-[18px] cursor-pointer peer-checked:border-b-4 border-blue-400 rounded peer-checked:text-blue-400'> Rooms</label> </div>
                                              <div className='relative hidden xl:block'> <input id='radio3' className='absolute opacity-0 peer' type="radio" name='navradio' checked={visibleElements.includes('Location')} onChange={(e) => { e.currentTarget.checked ? document.getElementById('Location').scrollIntoView({ behavior: 'smooth', block: 'start' }) : '' }} /> <label htmlFor="radio3" className='py-2 xl:p-2 text-sm  xl:text-[18px] cursor-pointer peer-checked:border-b-4 border-blue-400 rounded peer-checked:text-blue-400'> Location</label> </div>
                                              <div className='relative'> <input id='radio4' className='absolute opacity-0 peer' type="radio" name='navradio' checked={visibleElements.includes('Reviews')} onChange={(e) => { e.currentTarget.checked ? document.getElementById('Reviews').scrollIntoView({ behavior: 'smooth', block: 'start' }) : '' }} /> <label htmlFor="radio4" className='py-2 xl:p-2 text-sm  xl:text-[18px] cursor-pointer peer-checked:border-b-4 border-blue-400 rounded peer-checked:text-blue-400'> Reviews</label> </div>
                                              <div className='relative'> <input id='radio5' className='absolute opacity-0 peer' type="radio" name='navradio' checked={visibleElements.includes('Facilities')} onChange={(e) => { e.currentTarget.checked ? document.getElementById('Facilities').scrollIntoView({ behavior: 'smooth', block: 'start' }) : '' }} /> <label htmlFor="radio5" className='py-2 xl:p-2 text-sm  xl:text-[18px] cursor-pointer peer-checked:border-b-4 border-blue-400 rounded peer-checked:text-blue-400'> Facilities</label> </div>
                                              <div className='relative'> <input id='radio6' className='absolute opacity-0 peer' type="radio" name='navradio' checked={visibleElements.includes('Policies')} onChange={(e) => { e.currentTarget.checked ? document.getElementById('Policies').scrollIntoView({ behavior: 'smooth', block: 'start' }) : '' }} /> <label htmlFor="radio6" className='py-2 xl:p-2 text-sm  xl:text-[18px] cursor-pointer peer-checked:border-b-4 border-blue-400 rounded peer-checked:text-blue-400'>Policies</label> </div>
                                            </div>

                                            <div id='About' observ="true"  className="OVERVIEW flex flex-col xl:flex-row gap-8  bg-gray-100 rounded-10 p-4">

                                              <div className="left xl:w-[70%] flex flex-col gap-8">
                                                <div className="about flex flex-col gap-2">
                                                  <span className='font-semibold text-lg'>About</span> <p className='text-sm xl:text-base'>Located in {selectedHotelDetails.location}, The {selectedHotelDetails.name} Hotel is a perfect starting point from which to explore. The property features a wide range of facilities to make your stay a pleasant experience. All the necessary facilities...</p>
                                                </div>
                                                <div className="popularFacilities flex flex-col gap-6">
                                                  <p className='text-lg font-semibold'>Facilities</p>
                                                  <div className='flex xl:gap-8'>
                                                    {selectedHotelDetails.amenities.includes('Swimming Pool') && <span className='flex flex-col items-center w-[115px] text-center gap-2 '><FaSwimmer className='text-xl bg-gray-200 rounded-full h-[40px] w-[40px] xl:w-12 xl:h-12 p-[6px] xl:p-3 ' /> <p className='hidden xl:block text-xs xl:text-sm font-semibold'>Indoor Swimming Pool</p></span> }
                                                    {selectedHotelDetails.amenities.includes('Free WiFi') && <span className='flex flex-col items-center w-[115px] text-center gap-2 '><FaWifi className='text-xl bg-gray-200 rounded-full h-[40px] w-[40px] xl:w-12 xl:h-12 p-[6px] xl:p-3' /> <p className='hidden xl:block text-xs xl:text-sm font-semibold'>Free WiFi</p></span> }
                                                    {selectedHotelDetails.amenities.includes('Restaurant') && <span className='flex flex-col  items-center w-[115px] text-center gap-2 '><IoRestaurant className='text-xl bg-gray-200 rounded-full h-[40px] w-[40px] xl:w-12 xl:h-12 p-[6px] xl:p-3 ' /> <p className='hidden xl:block text-xs xl:text-sm font-semibold'>Restaurant</p></span>}
                                                    {selectedHotelDetails.amenities.includes('Bar') && <span className='flex flex-col items-center w-[115px] text-center gap-2 '><MdLocalBar className='text-xl bg-gray-200 rounded-full h-[40px] w-[40px] xl:w-12 xl:h-12 p-[6px] xl:p-3' /> <p className='hidden xl:block text-xs xl:text-sm font-semibold'>Bar</p></span> }  
                                                    {selectedHotelDetails.amenities.includes('Gym') && <span className='flex flex-col items-center w-[115px] text-center gap-2 '><CgGym className='text-xl bg-gray-200 rounded-full h-[40px] w-[40px] xl:w-12 xl:h-12 p-[6px] xl:p-3' /> <p className='hidden xl:block text-xs xl:text-sm font-semibold'>Gym</p></span> }  
                                                    {selectedHotelDetails.amenities.includes('Spa') && <span className='flex flex-col items-center w-[115px] text-center gap-2 '><FaSpa className='text-xl bg-gray-200 rounded-full h-[40px] w-[40px] xl:w-12 xl:h-12 p-[6px] xl:p-3' /> <p className='hidden xl:block text-xs xl:text-sm font-semibold'>Spa</p></span> }  

                                                  </div>
                                                </div>
                                              </div>

                                              <div className="RECOMMENDED right xl:w-[30%]  flex flex-col gap-3 p-4 rounded-10 bg-white">

                                                 <p className='text-sm text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 xl:hidden'>Recommended Deal</p>

                                                <div className='flex  gap-6 items-center '>
                                                  <span className='w-[100px] h-[100px] '><img src={Hotel_pic} width={100} height={100} className='rounded-10' alt="" /></span>
                                                  <span className='flex flex-col gap-2 xl:gap-3'> <p className='text-sm text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 hidden xl:block'>Recommended Deal</p> <p className='text-2xl font-semibold'>Superior</p> <span className='text-red-400 flex items-center gap-2 xl:hidden'> <p className='w-1 h-1 bg-red-400 rounded-full '></p> Non-refundable</span>  <span className=' flex items-center gap-2 xl:hidden'> <p className='w-1 h-1 bg-black rounded-full'></p>Breakfast</span> </span>
                                                </div>
                                                <span className='text-red-400  items-center gap-2 hidden xl:flex'> <p className='w-1 h-1 bg-red-400 rounded-full'></p> Non-refundable</span>
                                                <span className='  items-center gap-2 hidden xl:flex'> <p className='w-1 h-1 bg-black rounded-full'></p>Breakfast</span>
                                                <div className='flex items-start flex-col xl:items-center tracking-wide'>
                                                  <span className='flex items-center gap-2' ><p className='text-xs line-through text-gray-500'>₹9099</p> <p className='font-semibold text-lg' >₹6690</p></span>
                                                  <div className='flex gap-2'>
                                                  <span className='text-xs text-gray-500'>+ ₹840 taxes & fees</span>
                                                  <span className='text-xs text-gray-500'>Per night for 1 room</span>

                                                  </div>
                                                </div>
                                                <div className='flex justify-center'><button className='bg-orange-400 w-[100%] text-white font-semibold xl:text-lg rounded-10 py-2 xl:py-3'>Reserv 1 Room</button></div>
                                                <div className='flex justify-center'><button className='bg-orange-100 w-[100%] text-orange-400 font-semibold xl:text-lg rounded-10 py-2 xl:py-3'>View All Rooms</button></div>
                                              </div>

                                            </div>

                                            <div id='Rooms' observ="true" className="ROOMS bg-gray-100 rounded-10 flex-col gap-4 xl:p-4 hidden xl:flex  ">
                                              <div className="header  flex  py-6 "> <span className='xl:w-[35%] text-xl font-semibold '>Select Room Type</span> </div>

                                              {
                                                selectedHotelDetails.rooms.map((room, i) => {

                                                  return <div key={i} className='room1 flex  rounded-10 py-4 bg-white'>
                                                           

                                                              <div className="left flex flex-col  items-center gap-4 w-[50%] xl:w-[30%] ">
                                                                <div className="roomPhotos  xl:w-[350px] xl:h-[200px] overflow-hidden rouded-10"> <img className='rounded-10 w-full h-full' src={Suite} loading='lazy' width={350} height={200} alt="" /></div>
                                                              </div>

                                                              <div className="middle w-[50%] flex flex-col gap-4 pl-4 ">
                                                                <span className='xl:text-xl font-semibold'>{room.roomType}</span>
                                                                <span className="bedInfo flex flex-col  xl:flex-row flex-wrap gap-1 xl:gap-2 xl:text-base text-xs"> <p className='flex gap-2 items-center pr-6'><LuUsers /> Sleeps 2</p> <p className='flex gap-2 items-center pr-6'> <IoBedOutline />{room.bedDetail}</p> <p className='flex gap-2 items-center pr-6'> <TbWindow /> Garden View</p> <p className='flex gap-2 items-center'><RiCropLine /> {room.roomSize} sq.ft Area</p></span>
                                                                <span className='items-center gap-4 text-orange-400  hidden xl:flex'  > <p className='w-2 h-2 bg-orange-400 rounded-full'></p> {room.cancellationPolicy}</span>
                                                              </div>

                                                              <div className="right w-[20%]  flex-col gap-4 pl-4  hidden xl:flex">
                                                                <span className='bg-red-100 text-red-500 w-[80px] h-[30px] flex justify-center items-center rounded-full'>27% off</span>

                                                                <div className='flex flex-col  tracking-wide'>
                                                                  <span className='flex items-center gap-2' ><p className='text-xs line-through text-gray-500'>₹9099</p> <p className='font-semibold text-lg' >₹{room.costPerNight}</p></span>
                                                                  <span className='text-xs text-gray-500'>+ ₹{room.costDetails.taxesAndFees} taxes & fees</span>
                                                                  <span className='text-xs text-gray-500'>Per night for 1 room</span>
                                                                </div>

                                                                <div className="flex flex-col gap-2">
                                                                  <span className='text-sm text-orange-700'>Only 1 room left</span>
                                                                  <div className='flex'><button className='bg-orange-400 w-[80%] text-white font-semibold text-lg rounded-10 py-3' onClick={() => { setBottomRibbonShow(false); setSelectedRoom(room); document.getElementById('screenScroll').scrollBy({ left: `${document.getElementById('screen2').scrollWidth}`, behavior: 'smooth' }) }} >Reserv 1 Room</button></div>

                                                                </div>
                                                              </div>

                                                          </div>
                                                })
                                              }



                                            </div>

                                            <div id='RoomsMobile' observ="true" className='ROOMS bg-gray-100 rounded xl:hidden'>
                                            <div className="header  flex  py-6 "> <span className='xl:w-[35%] text-xl font-semibold '>Select Room Type</span> </div>

                                                 
                                              {
                                                selectedHotelDetails.rooms.map((room, i) => {

                                                  return <div key={i} className='room1 flex flex-col gap-2 rounded-10 py-4 px-2 bg-white border'>

                                                              <div className=" flex  gap-3 w-full xl:w-[30%]  ">

                                                                    <div className="roomPhotos w-[50%] overflow-hidden rouded-10"> <img className='rounded-10 w-full h-full' src={Suite} loading='lazy' width={350} height={200} alt="" /></div>

                                                                    <div className=" w-[50%] flex flex-col  justify-between ">
                                                                        <span className='xl:text-xl font-semibold'>{room.roomType}</span>
                                                                        <span className="bedInfo flex flex-col  xl:flex-row flex-wrap gap-2 text-xs"> <p className='flex gap-2 items-center pr-6'><LuUsers /> Sleeps 2</p> <p className='flex gap-2 items-center pr-6'> <IoBedOutline />{room.bedDetail}</p> <p className='flex gap-2 items-center pr-6'> <TbWindow /> Garden View</p> <p className='flex gap-2 items-center'><RiCropLine /> {room.roomSize} sq.ft Area</p></span>
                                                                        {/* <span className="roomFacilities  flex  flex-wrap gap-2"> <p className='flex gap-2 items-center pr-6'><MdCheck /> Bathrobes</p> <p className='flex gap-2 items-center pr-6'><MdCheck /> Hair dryer</p> <p className='flex gap-2 items-center pr-6'><MdCheck /> Mirror</p> <p className='flex gap-2 items-center pr-6'><MdCheck /> Toiletries</p> <p className='flex gap-2 items-center pr-6'><MdCheck /> Towels</p> <p className='flex gap-2 items-center pr-6'><MdCheck /> Wi-Fi</p> <p className='flex gap-2 items-center pr-6'><MdCheck /> Satellite channels</p></span> */}
                                                                  </div>

                                                              </div>


                                                              <div className=" w-  flex-col ">

                                                                <div className='flex justify-between'>
                                                                  <span className='bg-red-100 text-red-500 text-xs font-semibold px-3 flex justify-center items-center rounded-full'>27% off</span>
                                                                  <span className='flex items-center gap-2' ><p className='text-xs line-through text-gray-500'>₹9099</p> <p className='font-semibold text-lg' >₹{room.costPerNight}</p></span>
                                                                </div>

                                                                <div className='flex gap-1 tracking-wide justify-end'>
                                                                  <span className='text-xs text-gray-500'>+ ₹{room.costDetails.taxesAndFees} taxes & fees</span>
                                                                  <span className='text-xs text-gray-500'>Per night for 1 room</span>
                                                                </div>

                                                                <div className="flex flex-col gap-2">
                                                                  <div className='flex justify-between'>
                                                                    <span className='text-xs text-orange-700 font-semibold'>Only 1 room left</span>
                                                                    <span className='items-center gap-2 text-xs text-orange-400  flex '  >  {room.cancellationPolicy}</span>
                                                                  </div>
                                                                  <div className='flex'><button className='bg-orange-400 w-full text-white font-semibold text-sm rounded-10 py-2' onClick={() => { setSelectedRoom(room); document.getElementById('screenScroll').scrollBy({ left: `${document.getElementById('screen2').scrollWidth}`, behavior: 'smooth' }) }} >Reserv 1 Room</button></div>

                                                                </div>

                                                              </div>

                                                          </div>
                                                })
                                              }

                                            </div>

                                            <div id='Location' observ='true' className="LOCATION hidden xl:block rounded-10 bg-gray-50 p-4 min-h-[500px]">
                                              <div className='flex gap-4 w-full h-full'>
                                                <div className="left flex flex-col h-[500px] w-[30%] gap-4">
                                                  <p>Explore nearby area</p>
                                                  <div className="list min-w-[30%] max-h-[80%]  rounded-10 bg-white overflow-y-auto no-scrollbar">
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                    <span className='flex justify-between px-4 py-2'><p>Church Gate</p> <p>0.32km</p></span>
                                                  </div>
                                                </div>

                                                <div className="right flex flex-col h-[500px] w-[70%] gap-4 ">
                                                  <span className='flex justify-between px-4'><p>Goa</p> <p className='bg-red-50 px-2  cursor-pointer rounded-10 text-orange-600'>View On Google Maps</p></span>
                                                  <div className="map  min-h-[80%] rounded-10 bg-white">
                                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!4d74787.964683481648!2d75.03890321315343!3d21.042863409010796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd92dd5424bc0e5%3A0x277a74549702f415!2sDhule%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716818783934!5m2!1sen!2sin" className='h-full w-full rounded-10'  loading="lazy" ></iframe>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div id='Reviews' observ='true' ref={reviewsRef} className="REVIEWS  xl:block rounded-10 bg-gray-50 p-4">
                                              <div className="" id="reviews-section">
                                                <div className="flex  ">
                                                  <div className="flex gap-4 flex-col xl:flex-row  w-full">

                                                    <div className="flex-shrink-0 p-4 rounded-10 bg-white border">
                                                      <div data-testid="hotel-rating-section" className="lg:p-0">
                                                        <div className="flex items-center text-blue-500 mb-20 lg:mb-30">
                                                          <div
                                                            className="mr-10 flex items-center justify-center rounded-10"
                                                            style={{ padding: 10 }}
                                                          >
                                                            <p className="h1 font-bold">8.0</p>
                                                          </div>
                                                          <div>
                                                            <p className="body-md font-medium">Excellent</p>
                                                            <p className="body-sm  text-secondary font-normal">
                                                              5534 Ratings
                                                            </p>
                                                          </div>
                                                        </div>
                                                        <div className="mb-20 flex flex-wrap justify-between gap-x-15 gap-y-15 lg:gap-y-30">
                                                          <div className="w-[47%] lg:w-full">
                                                            <div
                                                              data-testid="progress-bar"
                                                              className="w-full rounded-5 bg-neutral-100 mb-5"
                                                              style={{ height: 6 }}
                                                            >
                                                              <div
                                                                className="rounded-5 bg-blue-400"
                                                                style={{ width: "75%", height: 6 }}
                                                              />
                                                            </div>
                                                            <div className="flex justify-between text-primary">
                                                              <p className="body-xs">Cleanliness</p>
                                                              <p
                                                                data-testid="ratingbar-value"
                                                                className="body-xs break-words"
                                                              >
                                                                7.5
                                                              </p>
                                                            </div>
                                                          </div>
                                                          <div className="w-[47%] lg:w-full">
                                                            <div
                                                              data-testid="progress-bar"
                                                              className="w-full rounded-5 bg-neutral-100 mb-5"
                                                              style={{ height: 6 }}
                                                            >
                                                              <div
                                                                className="rounded-5 bg-blue-400"
                                                                style={{ width: "74%", height: 6 }}
                                                              />
                                                            </div>
                                                            <div className="flex justify-between text-primary">
                                                              <p className="body-xs">Value for Money</p>
                                                              <p
                                                                data-testid="ratingbar-value"
                                                                className="body-xs break-words"
                                                              >
                                                                7.4
                                                              </p>
                                                            </div>
                                                          </div>
                                                          <div className="w-[47%] lg:w-full">
                                                            <div
                                                              data-testid="progress-bar"
                                                              className="w-full rounded-5 bg-neutral-100 mb-5"
                                                              style={{ height: 6 }}
                                                            >
                                                              <div
                                                                className="rounded-5 bg-blue-400"
                                                                style={{ width: "68%", height: 6 }}
                                                              />
                                                            </div>
                                                            <div className="flex justify-between text-primary">
                                                              <p className="body-xs">Staff</p>
                                                              <p
                                                                data-testid="ratingbar-value"
                                                                className="body-xs break-words"
                                                              >
                                                                6.8
                                                              </p>
                                                            </div>
                                                          </div>
                                                          <div className="w-[47%] lg:w-full">
                                                            <div
                                                              data-testid="progress-bar"
                                                              className="w-full rounded-5 bg-neutral-100 mb-5"
                                                              style={{ height: 6 }}
                                                            >
                                                              <div
                                                                className="rounded-5 bg-blue-400"
                                                                style={{ width: "85%", height: 6 }}
                                                              />
                                                            </div>
                                                            <div className="flex justify-between text-primary">
                                                              <p className="body-xs">Location</p>
                                                              <p
                                                                data-testid="ratingbar-value"
                                                                className="body-xs break-words"
                                                              >
                                                                8.5
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="no-scrollbar lg:flex-1 lg:overflow-x-auto">
                                                      <div className="mb-15 flex items-center justify-between">
                                                        <h6 className="h6 font-bold">617 Reviews</h6>
                                                        <div className="hidden">
                                                          <div className="inline-flex flex-col text-secondary">
                                                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center">
                                                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                                              <div className="flex flex-grow items-center">
                                                                <input
                                                                  readOnly=""
                                                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary"
                                                                  defaultValue="Most Recent"
                                                                />
                                                              </div>
                                                              <svg
                                                                width="1em"
                                                                height="1em"
                                                                fontSize="1.5rem"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                data-testid="ExpandMoreIcon"
                                                                style={{ userSelect: "none", display: "inline-block" }}
                                                              >
                                                                <path
                                                                  fillRule="evenodd"
                                                                  d="M17.7707 8.7125c.2983.2905.3066.77.0187 1.0708L12.54 15.2687A.7474.7474 0 0 1 12 15.5a.7474.7474 0 0 1-.54-.2313L6.2106 9.7833c-.288-.3009-.2796-.7803.0187-1.0708a.746.746 0 0 1 1.0613.0188L12 13.6524l4.7094-4.9211a.7459.7459 0 0 1 1.0613-.0188Z"
                                                                  clipRule="evenodd"
                                                                />
                                                              </svg>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="mb-20 hidden xl:flex gap-x-10 overflow-x-auto border-b  bg-primary px-20 py-15 no-scrollbar lg:flex lg:border-none lg:p-0 ">
                                                        <span className="inline-flex items-center font-normal w-fit hover:bg-natural-outline-over border-selection-subtle cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid whitespace-nowrap">
                                                          <p className="body-sm px-5">All Reviews (617)</p>
                                                        </span>
                                                        <span className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid whitespace-nowrap">
                                                          <p className="body-sm px-5">Couple (383)</p>
                                                        </span>
                                                        <span className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid whitespace-nowrap">
                                                          <p className="body-sm px-5">Family with young children (108)</p>
                                                        </span>
                                                        <span className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid whitespace-nowrap">
                                                          <p className="body-sm px-5">Group (101)</p>
                                                        </span>
                                                        <span className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid whitespace-nowrap">
                                                          <p className="body-sm px-5">Family with teens (13)</p>
                                                        </span>
                                                        <span className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid whitespace-nowrap">
                                                          <p className="body-sm px-5">Solo traveler (10)</p>
                                                        </span>
                                                        <span className="inline-flex items-center font-normal w-fit text-primary hover:bg-neutral-outline-over border-neutral-outline cursor-pointer px-1 py-[3px] rounded-20 min-h-[30px] border border-solid whitespace-nowrap">
                                                          <p className="body-sm px-5">Business traveler (2)</p>
                                                        </span>
                                                      </div>
                                                      <div>

                                                        <div className="">

                                                          <div data-testid="review-card" className="word-break mb-20 border-b border-neutral-100 break-words pb-20  cursor-pointer">

                                                            <div className="mb-5 flex items-start justify-between lg:justify-start lg:gap-10">
                                                              <h6 className="h6 font-medium">It was good room</h6>
                                                              <p className="body-md flex-shrink-0 rounded-5 bg-blue-50 px-5 text-blue-500 font-medium">9.2</p>
                                                            </div>
                                                            <div className=""> <p className="body-md mb-10 text-primary">Just had a fun there it's nice place</p></div>
                                                            <div className="mt-auto flex items-center justify-start">
                                                              <img src="https://hatscripts.github.io/circle-flags/flags/in.svg" alt="Flag" height={24} width={24}/>
                                                              <div className="body-sm flex gap-5 break-words text-secondary ml-10">
                                                                <p className="body-sm text-primary font-medium"> </p>Couple • India • May 2024
                                                              </div>
                                                            </div>
                                                          </div>

                                                             <div id="review-card" className="word-break mb-20 border-b border-neutral-100 break-words pb-20  cursor-pointer">

                                                            <div className="mb-5 flex items-start justify-between lg:justify-start lg:gap-10">
                                                              <h6 className="h6 font-medium">Upgrade/improvement</h6>
                                                              <p className="body-md flex-shrink-0 rounded-5 bg-blue-50 px-5 text-blue-500 font-medium">9.2</p>
                                                            </div>
                                                            <div className=""> <p className="body-md mb-10 text-primary">Just had a fun there it's nice place</p></div>
                                                            <div className="mt-auto flex items-center justify-start">
                                                              <img src="https://hatscripts.github.io/circle-flags/flags/in.svg" alt="Flag" height={24} width={24}/>
                                                              <div className="body-sm flex gap-5 break-words text-secondary ml-10">
                                                                <p className="body-sm text-primary font-medium"> </p>Couple • India • May 2024
                                                              </div>
                                                            </div>
                                                          </div>

                                                          <div id="review-card" className="word-break mb-20 border-b border-neutral-100 break-words pb-20 cursor-pointer">
                                                            <div className="mb-5 flex items-start justify-between lg:justify-start lg:gap-10">
                                                              <h6 className="h6 font-medium">Disappointing Stay</h6>
                                                              <p className="body-md flex-shrink-0 rounded-5 bg-blue-50 px-5 text-blue-500 font-medium">5.4</p>
                                                            </div>
                                                            <div className=""> <p className="body-md mb-10 text-primary">The service was below expectations and the room was not clean.</p></div>
                                                            <div className="mt-auto flex items-center justify-start">
                                                              <img src="https://hatscripts.github.io/circle-flags/flags/ca.svg" alt="Flag" height={24} width={24}/>
                                                              <div className="body-sm flex gap-5 break-words text-secondary ml-10">
                                                                <p className="body-sm text-primary font-medium"> </p>Solo • Canada • March 2024
                                                              </div>
                                                            </div>
                                                          </div>

                                                          <div data-testid="review-card" className="word-break mb-20 border-b border-neutral-100 break-words pb-20 cursor-pointer">
                                                            <div className="mb-5 flex items-start justify-between lg:justify-start lg:gap-10">
                                                              <h6 className="h6 font-medium">Fantastic Holiday</h6>
                                                              <p className="body-md flex-shrink-0 rounded-5 bg-blue-50 px-5 text-blue-500 font-medium">8.7</p>
                                                            </div>
                                                            <div className=""> <p className="body-md mb-10 text-primary">We had a great time. The location is beautiful and the food was excellent.</p></div>
                                                            <div className="mt-auto flex items-center justify-start">
                                                              <img src="https://hatscripts.github.io/circle-flags/flags/gb.svg" alt="Flag" height={24} width={24}/>
                                                              <div className="body-sm flex gap-5 break-words text-secondary ml-10">
                                                                <p className="body-sm text-primary font-medium"> </p>Couple • United Kingdom • April 

                                                                </div>
                                                            </div>
                                                          </div>

                                                          <div id="review-card" className="word-break mb-20 border-b border-neutral-100 break-words pb-20  cursor-pointer">
                                                            <div className="mb-5 flex items-start justify-between lg:justify-start lg:gap-10">
                                                              <h6 className="h6 font-medium">Beautiful Location</h6>
                                                              <p className="body-md flex-shrink-0 rounded-5 bg-blue-50 px-5 text-blue-500 font-medium">8.8</p>
                                                            </div>
                                                            <div className="">
                                                              <p className="body-md mb-10 text-primary">The scenery was stunning and the location is perfect for a peaceful getaway.</p>
                                                            </div>
                                                            <div className="mt-auto flex items-center justify-start">
                                                              <img src="https://hatscripts.github.io/circle-flags/flags/ca.svg" alt="Flag" height={24} width={24}/>
                                                              <div className="body-sm flex gap-5 break-words text-secondary ml-10">
                                                                <p className="body-sm text-primary font-medium"></p>Family • Canada • April 2024
                                                              </div>
                                                            </div>
                                                          </div>

                                                        <div id="review-card" className="word-break mb-20 border-b border-neutral-100 break-words pb-20  cursor-pointer">
                                                          <div className="mb-5 flex items-start justify-between lg:justify-start lg:gap-10">
                                                            <h6 className="h6 font-medium">Excellent Service</h6>
                                                            <p className="body-md flex-shrink-0 rounded-5 bg-blue-50 px-5 text-blue-500 font-medium">9.5</p>
                                                          </div>
                                                          <div className="">
                                                            <p className="body-md mb-10 text-primary">The service was exceptional and the staff was very friendly. Highly recommend!</p>
                                                          </div>
                                                          <div className="mt-auto flex items-center justify-start">
                                                            <img src="https://hatscripts.github.io/circle-flags/flags/us.svg" alt="Flag" height={24} width={24}/>
                                                            <div className="body-sm flex gap-5 break-words text-secondary ml-10">
                                                              <p className="body-sm text-primary font-medium"></p>Solo Traveler • USA • June 2024
                                                            </div>
                                                          </div>
                                                        </div>



                                                        </div>

                                                        <button className="body-md px-20 lg:p-0 text-brand font-medium">
                                                          View All{" "}
                                                          <span className="lg:hidden">
                                                            <svg width="1em" height="1em" fontSize="1.5rem" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  style={{ userSelect: "none", display: "inline-block" }}>
                                                              <path
                                                                fillRule="evenodd"
                                                                d="M8.7125 6.2293c.2905-.2983.77-.3066 1.0708-.0187l5.4854 5.2494A.7474.7474 0 0 1 15.5 12a.7474.7474 0 0 1-.2313.54l-5.4854 5.2494c-.3009.2879-.7803.2796-1.0708-.0187a.7459.7459 0 0 1 .0188-1.0613L13.6524 12 8.7313 7.2906a.746.746 0 0 1-.0188-1.0614Z"
                                                                clipRule="evenodd"
                                                              />
                                                            </svg>
                                                          </span>
                                                          <span className="hidden lg:inline">Reviews</span>
                                                        </button>
                                                      </div>
                                                    </div>

                                                  </div>
                                                </div>
                                              </div>

                                            </div>

                                            <div id='Facilities' observ='true' className="FACILITIES   xl:block p-4 bg-gray-100 rounded-10">

                                              <div className="mb-20 bg-primary  xl:p-4 rounded-10" id="facilities-section">
                                                <div className="container !pb-0">
                                                  <h6 className="h6 font-bold">Hotel Facilities</h6>
                                                  <div className="flex justify-between xl:gap-40">

                                                    <div className="xl:w-[30%] w-[50%] ">
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30 "> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/b06639d96e94c293d723dd86c54ea525-jrskt.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="xl:text-lg text-sm font-semibold">Access</h6>
                                                        </div>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> 24*7 Check-in </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Exterior corridor </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> 24*7 Front Desk </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Non-smoking rooms </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/b275fb3258ba5497024d1cd28664657c-fyyeo.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="xl:text-lg text-sm font-semibold">Safety and security</h6>
                                                        </div>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> 24*7 Security </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> CCTV in common areas </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Fire extinguisher </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Smoke detectors </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/b0dd9d7b35c4ee79822e3c99c50dacdb-znkpk.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="xl:text-lg text-sm font-semibold">Room amenities</h6>
                                                        </div>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Daily housekeeping </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> First Aid kit </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Hand sanitiser </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Ironing facilities </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Safety Deposit Box </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Exterior corridor </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/c844db3c5b138fafb0dc5ca096581cbb-merzm.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="xl:text-lg text-sm font-semibold">Family and kids</h6>
                                                        </div>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Play area </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Kids club </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/3b4fe317ef4c7bd4a06d84eeceb66869-sdszh.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="xl:text-lg text-sm font-semibold">Transfers and transport</h6>
                                                        </div>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Onsite car parking </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Car rental service </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Taxi/Cab service </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/151cef0685c0a4382988b6e4b1cff8c0-ufney.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="xl:text-lg text-sm font-semibold">Internet access</h6>
                                                        </div>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Internet services </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/da0b42fb35b40ff871caacab5bffdb1f-shpzg.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="xl:text-lg text-sm font-semibold">Food and drinks</h6>
                                                        </div>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Continental Breakfast </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Room Service </p>
                                                      </div>
                                                    </div>

                                                    <div className="xl:w-[30%] w-[50%] ">
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/ec3dc56707ddff3565437c56a97924d8-rohol.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="xl:text-lg text-sm font-semibold">Activities and sports</h6>
                                                        </div>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Outdoor Swimming Pool </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> In-House Golf Course </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Fishing </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Outdoor Recreational Activities </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Ticket Services </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Tours </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/70fd1e434fce695fe2b8c163e186d545-uarew.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="xl:text-lg text-sm font-semibold">Services</h6>
                                                        </div>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Facilities for Differently-Abled Guests </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Air conditioning in Public Area </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Photocopy/fax in business center </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Luggage Storage </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Terrace </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Fireplace </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Dry-Cleaning </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Invoice Provided </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Postal Service </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Smoke-Free Property </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Smoking Area </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Free car parking </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/43b26475ab09b8158bf97cf3bec3792c-tyhpv.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="xl:text-lg text-sm font-semibold">Accessibility</h6>
                                                        </div>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Elevator access </p>
                                                        <p className="text-xs ml-30 lg:body-md lg:mb-15 lg:ml-0"> Wheelchair-accessible </p>
                                                      </div>
                                                    </div>

                                                    <div className="w-[30%] hidden xl:block">
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/e4b95e7aa32ede731958c9a3a945ddbb-vlesm.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="h6 font-medium">Safety and cleanliness</h6>
                                                        </div>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Anti-Viral Cleaning Items </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Body Thermometer </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Cashless Payment Service </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Common Area Disinfection (Daily) </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Hot water linen and laundry washing </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Physical Distancing of at least 1 metre </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Professional Sanitisation and Disinfection Services </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Protective Screens in Common Areas </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Regularly disinfected rooms </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Room Sanitisation Opt-Out Available </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Room Sealing after Sanitisation </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Safety Protocol-trained staff </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Sterilising Equipment </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Temperature Check </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> First Aid kit </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Hand sanitiser </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/8e8f72b14e761e14b6742bb811849abb-uvvpx.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="h6 font-medium">Outdoor</h6>
                                                        </div>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Garden/Backyard </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/614b6ed13898a9477d26e3b483cf1c5c-lkzsm.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="h6 font-medium">Other facilities</h6>
                                                        </div>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Elevator access </p>
                                                      </div>
                                                      <div>
                                                        <div className="mb-10 mt-20 flex items-start gap-5 lg:mb-15 lg:mt-30"> <img src="https://images.ixigo.com/image/upload/accommodations/facilities/fb6d68de6ed57047e5d3ecb4d64d1d66-nwree.png" alt="amenity" width={24} height={24} />
                                                          <h6 className="h6 font-medium">Languages spoken</h6>
                                                        </div>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> English </p>
                                                        <p className="body-sm body-sm mb-5 ml-30 lg:body-md lg:mb-15 lg:ml-0"> Hindi </p>
                                                      </div>
                                                    </div>

                                                  </div>
                                                </div>
                                              </div>


                                            </div>

                                            <div id='Policies' observ='true' className="POLICIES  xl:block bg-gray-50 rounded-10 p-4 ">

                                              <div className="bg-primary p-4 pb-8">
                                                <div className=" container !pb-10 !pt-30" id="policies-section">
                                                  <h5 className="h5 mb-30 font-bold">Hotel Policies</h5>
                                                  <div className="flex flex-col gap-10 bg-neutral-40 lg:bg-primary">
                                                    <div>
                                                      <div className="flex items-center text-primary lg:hidden  border lg:p-0" style={{ gap: 5 }}>
                                                        <p className="body-md font-medium">Check-in :</p>
                                                        <p className="body-md">14:00</p>
                                                        <p className="body-md font-medium">•</p>
                                                        <p className="body-md font-medium">Check-out :</p>
                                                        <p className="body-md">11:00</p>
                                                      </div>
                                                      <div className="hidden items-center text-primary lg:flex lg:flex-col bg-primary px-20 pt-20 lg:p-0" style={{ gap: 5 }}>
                                                        <div className="mb-20 flex w-full border-b border-neutral-100 pb-20">
                                                          <h6 className="h6 w-[20%] font-medium"> <svg width="1em" height="1em" fontSize="1.5rem" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-testid="CheckinIcon" className="mr-5" style={{ userSelect: "none", display: "inline-block" }}>
                                                            <path fillRule="evenodd" d="M12.2222 11.4647c-.3926-1.0349-1.3933-1.7705-2.5658-1.7705-1.5151 0-2.7433 1.2282-2.7433 2.7433 0 1.5151 1.2282 2.7433 2.7433 2.7433 1.0544 0 1.9699-.5949 2.4291-1.4674l1.1118-.4782 1.0312.4938.9144-.4938 1.0506.6226 1.5565-2.3931h-5.5278Zm-3.8091.9728c0 .6867.5566 1.2433 1.2433 1.2433.5171 0 .9604-.3157 1.1479-.7649v-.9568c-.1875-.4492-.6308-.7649-1.148-.7649-.6866 0-1.2432.5567-1.2432 1.2433Z" clipRule="evenodd" />
                                                            <path d="M12 5.477c-1.5693 0-3.0083.5534-4.134 1.4768h.9816a.7385.7385 0 0 1 0 1.477H5.863a.7385.7385 0 0 1-.7385-.7385V4.7385a.7385.7385 0 0 1 1.477 0V6.096C8.0237 4.7949 9.9196 4 12 4c4.4183 0 8 3.5817 8 8s-3.5817 8-8 8-8-3.5817-8-8a.7385.7385 0 0 1 1.477 0c0 3.6026 2.9204 6.5231 6.523 6.5231S18.5231 15.6026 18.5231 12c0-3.6026-2.9205-6.523-6.5231-6.523Z" />
                                                          </svg>{" "} Check-in </h6>
                                                          <p className="body-md w-[80%]">From 14:00</p>
                                                        </div>
                                                        <div className="mb-20 flex w-full border-b border-neutral-100 pb-20">
                                                          <h6 className="h6 w-[20%] font-medium"> <svg width="1em" height="1em" fontSize="1.5rem" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-testid="CheckinIcon" className="mr-5" style={{ userSelect: "none", display: "inline-block" }}>
                                                            <path fillRule="evenodd" d="M12.2222 11.4647c-.3926-1.0349-1.3933-1.7705-2.5658-1.7705-1.5151 0-2.7433 1.2282-2.7433 2.7433 0 1.5151 1.2282 2.7433 2.7433 2.7433 1.0544 0 1.9699-.5949 2.4291-1.4674l1.1118-.4782 1.0312.4938.9144-.4938 1.0506.6226 1.5565-2.3931h-5.5278Zm-3.8091.9728c0 .6867.5566 1.2433 1.2433 1.2433.5171 0 .9604-.3157 1.1479-.7649v-.9568c-.1875-.4492-.6308-.7649-1.148-.7649-.6866 0-1.2432.5567-1.2432 1.2433Z" clipRule="evenodd" />
                                                            <path d="M12 5.477c-1.5693 0-3.0083.5534-4.134 1.4768h.9816a.7385.7385 0 0 1 0 1.477H5.863a.7385.7385 0 0 1-.7385-.7385V4.7385a.7385.7385 0 0 1 1.477 0V6.096C8.0237 4.7949 9.9196 4 12 4c4.4183 0 8 3.5817 8 8s-3.5817 8-8 8-8-3.5817-8-8a.7385.7385 0 0 1 1.477 0c0 3.6026 2.9204 6.5231 6.523 6.5231S18.5231 15.6026 18.5231 12c0-3.6026-2.9205-6.523-6.5231-6.523Z" />
                                                          </svg> Check-out </h6>
                                                          <p className="body-md w-[80%]">Till 11:00</p>
                                                        </div>
                                                      </div>
                                                      <div className="flex flex-col bg-primary p-20 lg:flex-row lg:p-0 ">
                                                        <h6 className="h6 mb-10 flex items-start gap-10 lg:w-[20%] lg:gap-5 font-medium"> <img alt="child" loading="lazy" width={24} height={24} decoding="async" data-nimg={1} src="https://edge.ixigo.com/st/nivas/_next/static/media/child.8a637167.svg" style={{ color: "transparent" }} /> Children and extra beds </h6>
                                                        <div className="w-full lg:w-[80%]">
                                                          <div className="flex w-full flex-col flex-wrap lg:flex-row lg:gap-x-20">
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> All children are welcome. </div>
                                                            </div>
                                                          </div>
                                                          <div className="flex w-full flex-col flex-wrap lg:flex-row lg:gap-x-20">
                                                            <p className="body-md mb-10 break-words font-medium"> Infant 0-3 year(s) <span className="hidden lg:inline"> -</span> </p>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary false font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Stay for free if using existing bedding. Note, if you need a cot there may be an extra charge. </div>
                                                            </div>
                                                          </div>
                                                          <div className="flex w-full flex-col flex-wrap lg:flex-row lg:gap-x-20">
                                                            <p className="body-md mb-10 break-words font-medium"> Children 4-5 year(s){" "} <span className="hidden lg:inline"> -</span> </p>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary false font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Stay for free if using existing bedding. {selectedHotelDetails.childAndExtraBedPolicy.extraBedProvidedForChild ? `Extra bed will be provided which will be charged ₹${selectedHotelDetails.childAndExtraBedPolicy.extraBedCharge} additionally` : 'Extra beds will not be provided'}.</div>
                                                            </div>
                                                          </div>
                                                          <div className="flex w-full flex-col flex-wrap lg:flex-row lg:gap-x-20">
                                                            <p className="body-md mb-10 break-words font-medium"> Guests  <span className="hidden lg:inline"> -</span> </p>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary false font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Extra beds are {selectedHotelDetails.childAndExtraBedPolicy.extraBedForAdditionalGuest ? `are provided which will be charged  ₹${selectedHotelDetails.childAndExtraBedPolicy.extraBedCharge} additionally` : 'will not be provided'}</div>
                                                            </div>
                                                          </div>
                                                          <div className="flex w-full flex-col flex-wrap lg:flex-row lg:gap-x-20">
                                                            <p className="body-md mb-10 break-words font-medium"> Other <span className="hidden lg:inline"> -</span> </p>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary false font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Extra beds are dependent on the room you choose. Please check the individual room capacity for more details. </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div>
                                                      <div className="flex flex-col bg-primary p-20 lg:flex-row lg:p-0 lg:border-t lg:pt-20">
                                                        <h6 className="h6 mb-10 flex items-start gap-10 lg:w-[20%] lg:gap-5 font-medium"> <img alt="document" loading="lazy" width={24} height={24} decoding="async" data-nimg={1} src="https://edge.ixigo.com/st/nivas/_next/static/media/Document.8f0d816e.svg" style={{ color: "transparent" }} /> Property Information </h6>
                                                        <div className="w-full lg:w-[80%]">
                                                          <div className="flex w-full flex-col flex-wrap lg:flex-row lg:gap-x-20">
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Distance from city center - 10 Km, 6 miles </div>
                                                            </div>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Travel time to airport (minutes) - 60 </div>
                                                            </div>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Year property opened - 2010 </div>
                                                            </div>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Room voltage - 220 </div>
                                                            </div>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Number of rooms - 48 </div>
                                                            </div>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Non-smoking rooms/floors - yes </div>
                                                            </div>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Number of restaurants - 1 </div>
                                                            </div>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Number of bars/lounges - 1 </div>
                                                            </div>
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Reception open until - 00:00 </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div>
                                                      <div className="flex flex-col bg-primary p-20 lg:flex-row lg:p-0 lg:border-t lg:pt-20">
                                                        <h6 className="h6 mb-10 flex items-start gap-10 lg:w-[20%] lg:gap-5 font-medium"> <svg width="1em" height="1em" fontSize="1.5rem" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-testid="HotelIcon" style={{ userSelect: "none", display: "inline-block" }}>
                                                          <path d="M10.3594 9.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm4.0312-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm-4.0312 2.9688a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm4.0312-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm-4.0312 3.1093a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm4.0312-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                          <path fillRule="evenodd" d="M8 4.9765c-.9154.1834-1.605.9917-1.605 1.961v4.4474H4c-1.1046 0-2 .8954-2 2V20c0 1.1045.8954 2 2 2h16c1.1046 0 2-.8955 2-2v-6.6151c0-1.1046-.8954-2-2-2h-2.375V6.9375c0-.9693-.6896-1.7776-1.605-1.961V4c0-1.1046-.8954-2-2-2H10c-1.1046 0-2 .8954-2 2v.9765ZM14.02 3.5H10a.5.5 0 0 0-.5.5v.9375h5.02V4a.5.5 0 0 0-.5-.5ZM7.895 6.9375a.5.5 0 0 1 .5-.5h7.23a.5.5 0 0 1 .5.5V20.5h-2.1406c0-1.4127.2977-3.3883-1.4688-3.868-.318-.0864-.6789-.091-1-.0121C9.7056 17.0642 10 19.075 10 20.5H7.895V6.9375ZM11.5156 20.5H11c0-2.8158 0-2.8158.5156-2.8158V20.5Zm1.4883 0h-.5156v-2.8158c.5156 0 .5156.0274.5156 2.8158Zm4.668-7.6151H20a.5.5 0 0 1 .5.5V20a.5.5 0 0 1-.5.5h-2.3281v-7.6151Zm-11.3125 0H4a.5.5 0 0 0-.5.5V20a.5.5 0 0 0 .5.5h2.3594v-7.6151Z" clipRule="evenodd" />
                                                        </svg> Property Announcements </h6>
                                                        <div className="w-full lg:w-[80%]">
                                                          <div className="flex w-full flex-col flex-wrap lg:flex-row lg:gap-x-20">
                                                            <div className="flex gap-x-10">
                                                              <p className="body-md hidden text-primary lg:inline font-medium"> • </p>
                                                              <div className="word-break body-md mb-20 break-words text-secondary lg:text-primary"> Free Wi-Fi is only available in the lobby. <br /> Please note that any changes in tax structure due to government policies will result in revised taxes, which will be applicable to all reservations and will be charged additionally during check out. </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>


                                            </div>

                                       </div>

                                       
            }

          </div>

          <div id='screen3' className='min-w-[100%]  max-h-screen flex flex-col sticky top-0 bg-[#f4f5f5] overflow-y-auto relative' >
           <div className='sticky top-0 bg'> <MdKeyboardArrowLeft className='sticky z-50 top-2 left-2 w-[30px] h-[30px] cursor-pointer' onClick={() => { document.getElementById('screenScroll').scrollBy({ left: -`${document.getElementById('screen1').scrollWidth}`, behavior: 'smooth' }); }} /></div>


            {
              selection.selectedRoom.costDetails && <div className='w-full h-full flex gap-4 xl:px-[6%]'>

                <div className="left w-[30%] flex flex-col gap-6 xl:flex hidden">
                  <div className="fareSummery bg-white p-4 flex flex-col gap-3 rounded-10">
                    <p className='text-2xl font-semibold'>Fare Summary</p>
                    <span className='flex justify-between'> <p className='font-semibold text-gray-700 tracking-tight'>1 Room, 1 Night</p> <p className='font-bold'>₹{selection.selectedRoom.costDetails.baseCost}</p></span>
                    <span className='flex justify-between'> <p className='font-semibold text-gray-700 tracking-tight'>Taxes & Charges</p> <p className='font-bold'>₹{selection.selectedRoom.costDetails.taxesAndFees}</p></span>
                    <span className='flex justify-between'> <p className='font-semibold text-gray-700 tracking-tight'>Convenience Fee</p> <p className='font-bold'>₹0</p></span>
                    <span className='w-full border-b'></span>
                    <span className='flex justify-between'> <p className='text-xl font-semibold'>Net Payable Amount</p> <p className='font-semibold text-xl'>₹{selection.selectedRoom.costDetails.baseCost + selection.selectedRoom.costDetails.taxesAndFees}</p></span>
                  </div>

                  <div className="offersForYou bg-white p-4 flex flex-col gap-4 rounded-10">
                    <p className='text-2xl font-semibold'>Offers For You</p>
                    <input className='outline-none border py-2 rounded px-3' placeholder='Have a promo code? Redeem here' type="text" />

                  </div>

                  <div className="paymentMethods flex flex-col gap-3 p-4">
                    <p>By clicking on Pay Now/Book Now, I confirm that I have read, understood, and agree with the <span className='text-blue-400 underline underline-offset-2'>Cancellation Policy</span>, <span className='text-blue-400 underline underline-offset-2'>Privacy Policy</span> and <span className='text-blue-400 underline underline-offset-2'>User Agreement</span>.</p>
                    <p>Please note that ixigo will not provide a tax invoice. You will be given a commercial receipt to serve as proof of transaction.</p>
                  </div>
                </div>

                <div className="right xl:w-[70%]  ">
                  <form id='myform' className='flex flex-col gap-6 ' onChange={(e) => { handleFormChange(e) }} onSubmit={(e) => { handleFormSubmit(e) }}>

                    <div className="guestDetails bg-white p-4 flex flex-col gap-4 rounded-10">
                      <p>Enter Your Details</p>
                      <div className="title flex gap-4"><span className='flex gap-2'><input type="radio" className='w-4' name='title' value={'Mr'} /><p>Mr.</p></span> <span className='flex gap-2'><input type="radio" className='w-4' name='title' value={'Mrs'} /><p>Mrs.</p></span> <span className='flex gap-2'><input type="radio" className='w-4' name='title' value={'Miss'} /><p>Miss.</p></span></div>
                      <div className="inputs flex flex-wrap gap-1 xl:gap-4">
                        <input type="text" className='border w-[48.5%] xl:w-[40%] py-2 rounded-lg px-4 capitalize' placeholder='First Name' required  />
                        <input type="text" className='border w-[48.5%] xl:w-[40%] py-2 rounded-lg px-4 capitalize' placeholder='Last Name' required />
                        <input type="text" className='border w-[98%] xl:w-[40%] py-2 rounded-lg px-4 capitalize' placeholder='Email Address' required />
                        <span className='w-[98%] xl:w-[40%] flex justify-between'> <select className='border py-2 w-[20%] rounded-lg px-2 outline-none' name="" id=""><option value="91">+91</option> <option value="92">+92</option></select> <input type="number" className='border w-[80] xl:w-[75%] py-2 rounded-lg px-4' placeholder='Mobile No. ' required /></span>
                        <select className='border hidden xl:block w-[40%] py-2 rounded-lg px-4' name="" id=""> <option value="India">India</option> <option value="Canada">Canada</option></select>
                      </div>
                    </div>

                    <div className="hotelDetails bg-white p-4 flex flex-col gap-4 rounded-10">
                      <div className="upper flex gap-4">
                        <div className="left">
                          <span className='w-[100px] h-[100px]'><img src={Hotel_pic} width={100} height={100} className='rounded-10' alt="" /></span>
                        </div>
                        <div className="right flex flex-col justify-between">
                          <span className='flex flex-col gap-1'> <p className='text-lg font-semibold tracking-wide'>{selectedHotelDetails.name}</p> <p className='text-gray-500'>{selectedHotelDetails.location}, 403516</p></span>
                          <span className='flex gap-6'> <p>{selection.rooms} x {selection.selectedRoom.roomType} Room </p> <p>{selection.adults + selection.childrens} Guests</p></span>
                        </div>
                      </div>

                      <div className="lower flex items-center justify-between xl:justify-start xl:gap-12 ">
                        <div className="checkin flex flex-col"><p className='text-sm text-gray-500'>CHECK-IN</p> <p className='text-lg font-semibold'>{weekDays[selection.checkIn.getDay()]}, {selection.checkIn.getDate()} {month[selection.checkIn.getMonth()]}</p> <p className='text-gray-500 text-sm'>14:00</p></div>
                        <div className="duration"><span className='text-sm border px-2 py-1 rounded-full flex justify-center items-center text-purple-700 border-purple-400 hover:bg-purple-100'>{selection.checkOut.getDay() - selection.checkIn.getDay()} Night</span></div>
                        <div className="checkout flex flex-col items-end"><p className='text-sm text-gray-500'>CHECK-OUT</p> <p className='text-lg font-semibold'>{weekDays[selection.checkOut.getDay()]}, {selection.checkOut.getDate()} {month[selection.checkOut.getMonth()]}</p> <p className='text-gray-500 text-sm'>11:00</p></div>
                      </div>

                      <span className='border-b' />

                      <div className="roomDetails flex flex-col gap-4">
                        <p className='text-lg font-semibold'>Room Details</p>
                        <div className="upper flex gap-4 xl:items-center ">
                          <div className="left ">
                            <span className='w-[100px] h-[100px]'><img src={Hotel_pic} width={100} height={100} className='rounded-10' alt="" /></span>
                          </div>
                          <div className="right flex flex-col xl:gap-2 ">
                            <span className='flex flex-col gap-1'> <p className='text-lg font-semibold tracking-wide'>{selection.selectedRoom.roomType} Room </p></span>
                            <span className='flex flex-col xl:flex-row xl:gap-6'> <p>Sleeps 2</p> <p>{selection.selectedRoom.bedDetail}</p> <p className='hidden xl:block'>Street view</p> <p>{selection.selectedRoom.roomSize} sq. mt.</p></span>
                          </div>
                        </div>

                        <div className="lower flex flex-col gap-2">
                          <p className='text-lg font-semibold'>Amenities</p>
                          <span className="roomFacilities  flex  flex-wrap xl:gap-2 gap-2"> <p className='flex gap-1 xl:gap-2 items-center pr-3'><MdCheck /> Bathrobes</p> <p className='flex gap-1 xl:gap-2 items-center pr-3'><MdCheck /> Hair dryer</p> <p className='flex gap-1 xl:gap-2 items-center pr-3'><MdCheck /> Mirror</p> <p className='flex gap-1 xl:gap-2 items-center pr-3'><MdCheck /> Toiletries</p> <p className='flex gap-1 xl:gap-2 items-center pr-3'><MdCheck /> Towels</p> <p className='flex gap-1 xl:gap-2 items-center pr-3'><MdCheck /> Wi-Fi</p> <p className='flex gap-1 xl:gap-2 items-center pr-3'><MdCheck /> Satellite channels</p></span>

                        </div>
                      </div>
                    </div>

                    <div className="left w-full flex flex-col gap-6 xl:hidden ">
                  <div className="fareSummery bg-white p-4 flex flex-col gap-3 rounded-10">
                    <p className='text-lg font-semibold'>Fare Summary</p>
                    <span className='flex justify-between'> <p className=' text-gray-700 tracking-tight'>1 Room, 1 Night</p> <p className=''>₹{selection.selectedRoom.costDetails.baseCost}</p></span>
                    <span className='flex justify-between'> <p className=' text-gray-700 tracking-tight'>Taxes & Charges</p> <p className=''>₹{selection.selectedRoom.costDetails.taxesAndFees}</p></span>
                    <span className='flex justify-between'> <p className=' text-gray-700 tracking-tight'>Convenience Fee</p> <p className=''>₹0</p></span>
                    <span className='w-full border-b'></span>
                    <span className='flex justify-between'> <p className='text- font-semibold'>Net Payable Amount</p> <p className='font-semibold '>₹{selection.selectedRoom.costDetails.baseCost + selection.selectedRoom.costDetails.taxesAndFees}</p></span>
                  </div>

                  <div className="offersForYou bg-white p-4 flex flex-col gap-4 rounded-10">
                    <p className='text-2xl font-semibold'>Offers For You</p>
                    <input className='outline-none border py-2 rounded px-3' placeholder='Have a promo code? Redeem here' type="text" />

                  </div>

                  <div className="paymentMethods flex flex-col gap-3 p-4">
                    <p>By clicking on Pay Now/Book Now, I confirm that I have read, understood, and agree with the <span className='text-blue-400 underline underline-offset-2'>Cancellation Policy</span>, <span className='text-blue-400 underline underline-offset-2'>Privacy Policy</span> and <span className='text-blue-400 underline underline-offset-2'>User Agreement</span>.</p>
                    <p>Please note that ixigo will not provide a tax invoice. You will be given a commercial receipt to serve as proof of transaction.</p>
                  </div>
                </div>

                    <div className="cancellationPolicy bg-white p-4 flex flex-col gap-2 rounded-10">
                      <p className='text-lg font-semibold'>Cancellation Policy</p>
                      <p className='text-gray-500'>{selection.selectedRoom.cancellationPolicy}</p>
                      <button className='text-orange-500 font-bold cursor-pointer  flex w-[200px]'>View Cancellation Policy</button>
                    </div>

                    <div className="specialRequest bg-white p-4 flex flex-col gap-2 rounded-10">
                      <p className='text-lg font-semibold'>Special Request</p>
                      <p className='text-gray-500'>We will forward your request to the hotel. Note: This is subject to availability and based on the hotel policies</p>
                      <button className='text-orange-500 font-bold cursor-pointer  flex w-[200px]'>Add Request</button>

                    <button className={` xl:hidden w-full  sticky xl:bottom-0 bottom-[0px] justify-center items-center py-3 mt-2 font-semibold rounded-10 xl:rounded-lg ${continueBtnActive ? `bg-orange-700 text-white cursor-pointer` : `bg-gray-200 text-gray-400 cursor-not-allowed `}`}>Pay Now</button>

                    </div>

                    <button className={`hidden xl:flex w-full  sticky xl:bottom-0 bottom-[0px] justify-center items-center py-3 mt-2 font-semibold xl:rounded-lg ${continueBtnActive ? `bg-orange-700 text-white cursor-pointer` : `bg-gray-200 text-gray-400 cursor-not-allowed `}`}>Pay Now</button>


                  </form>
                </div>

              </div>
            }





          </div>

          {

         bottomRibbonShow && <div className="BOTTOM RIBBON fixed bottom-0 z-50 xl:hidden h-[50px] w-full  bg-gray-400 flex justify-between px-8 items-center">

                  <div className="FILTER relative flex flex-col justify-center items-center cursor-pointer" onClick={() => { setActive(!active); setActiveTab('filter') }}>

                    <p><TiFilter /></p>
                    <p>Filter</p>
                    <div className={`filterpopup absolute  shadow rounded-10 left-0 w-[300px] h-[500px]  transition-all transform duration-700 bg-white ${active == true && activeTab === 'filter' ? '-translate-y-[290px] -translate-x-[20px]  opacity-100 scale-x-100' : 'opacity-0 scale-0 -translate-x-[200px]'}`} >
                      < div className="bg-white pb-4 rounded-10 w-full h-full  overflow-y-scroll ">

                          <div className="flex justify-between p-20 items-center">
                            <p className="HEADING body-md font-bold">Filters</p>
                            <p className="CLEAR ALL body-sm cursor-pointer text-brand-500 font-medium" onClick={() => { document.querySelectorAll('.filterCheckBox').forEach((i) => { if (i.checked) { i.click() } }); setFilterObj({}) }}> Clear All </p>
                          </div>

                          <div className="flex flex-col gap-6 ">

                            <div className="popularFilters">
                              <p className='w-full px-4  text-lg font-semibold'>Most Popular</p>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Free Cancellation</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Free Cancellation'} filtertype={'popularFilters'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Free Breakfast</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Free Breakfast'} filtertype={'popularFilters'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Rated Exceptional(9+)</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Rated Exceptional'} filtertype={'popularFilters'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Parking Available</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Parking Available'} filtertype={'popularFilters'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                            </div>

                            <div className="PRICE FILTER DIV flex flex-col px-4  gap-6 rounded-md">
                              <p className="w-full  text-lg font-semibold">Price</p>
                              <div className="relative w-full ">
                                <div className='border'> <RangeSlider min={0} max={10000} value={val} filtertype={'price'} onInput={(e) => { setval(e); }} onThumbDragEnd={(e) => { setminmax(val); handlePrice(val) }} /> </div>
                                <div className='flex justify-between'>
                                  <div className=" left-2 text-secondary text-sm mt-2"> {val[0]} </div>
                                  <div className=" right-2 text-secondary text-sm mt-2"> {val[1]} </div>
                                </div>
                              </div>
                            </div>

                            <div className="ratingFilter ">
                              <p className='w-full px-4  text-lg font-semibold'>User Rating </p>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Exceptional: 4.5+</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="radio" name='ratingFiltar' value={4.5} filtertype={'User Rating'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Excellent: 3.5+</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="radio" name='ratingFiltar' value={3.5} filtertype={'User Rating'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Good: 2.5+</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="radio" name='ratingFiltar' value={2.5} filtertype={'User Rating'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Pleasant: 1+</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="radio" name='ratingFiltar' value={1} filtertype={'User Rating'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>

                            </div>

                            <div className="facilitiesFilter">
                              <p className='w-full px-4  text-lg font-semibold'>Facilities </p>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Parking</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Parking'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Free WiFi</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Free WiFi'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Gym</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Gym'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Bar</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Bar'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Spa</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Spa'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Restaurant</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Restaurant'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Swimmint Pool</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Swimming Pool'} filtertype={'Facilities'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>

                            </div>

                            <div className="starRatingFilter flex gap-4 px-4 flex-wrap">
                              <p className='w-full  text-lg font-semibold'>Star Rating </p>
                              <span className='relative'> <input id='5star' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' value={'5 Star'} filtertype={'Star Rating'} onChange={(e) => { handleFilterChange(e) }} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor="5star">5 Star</label></span>
                              <span className='relative'> <input id='4star' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' value={'4 Star'} filtertype={'Star Rating'} onChange={(e) => { handleFilterChange(e) }} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor="4star">4 Star</label></span>
                              <span className='relative'> <input id='3star' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' value={'3 Star'} filtertype={'Star Rating'} onChange={(e) => { handleFilterChange(e) }} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor="3star">3 Star</label></span>
                              <span className='relative'> <input id='2star' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' value={'2 Star'} filtertype={'Star Rating'} onChange={(e) => { handleFilterChange(e) }} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor="2star">2 Star</label></span>
                              <span className='relative'> <input id='1star' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' value={'1 Star'} filtertype={'Star Rating'} onChange={(e) => { handleFilterChange(e) }} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor="1star">1 Star</label></span>
                            </div>

                            <div className="propertyType flex gap-4 flex-wrap px-4">
                              <p className='w-full  text-lg font-semibold'>Accommodation Type</p>
                              <span className='relative'> <input id='property1' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Hotel'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property1'>Hotel</label></span>
                              <span className='relative'> <input id='property2' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Resort'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property2'>Resort</label></span>
                              <span className='relative'> <input id='property3' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Bed and Breakfast'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property3'>Bed and Breakfast</label></span>
                              <span className='relative'> <input id='property4' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Entire Apartment'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property4'>Entire Apartment </label></span>
                              <span className='relative'> <input id='property5' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Tent'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property5'>Tent</label></span>
                              <span className='relative'> <input id='property6' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Ryokan'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property6'>Ryokan</label></span>
                              <span className='relative'> <input id='property7' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Country house'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property7'>Country house</label></span>
                              <span className='relative'> <input id='property8' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Serviced apartment'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property8'>Serviced apartment</label></span>
                              <span className='relative'> <input id='property9' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Capsule hotel'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property9'>Capsule hotel</label></span>
                              <span className='relative'><input id='property10' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Hostel'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property10'>Hostel</label></span>
                              <span className='relative'><input id='property11' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Entire house'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property11'>Entire house</label></span>
                              <span className='relative'><input id='property12' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Homestay'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property12'>Homestay</label></span>
                              <span className='relative'><input id='property13' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Lodge'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property13'>Lodge</label></span>
                              <span className='relative'><input id='property14' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Farm stay'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property14'>Farm stay </label></span>
                              <span className='relative'><input id='property15' className='absolute opacity-0 peer' type="radio" name='starRattingFilter' filtertype={'Accomodation Type'} onChange={(e) => { handleFilterChange(e) }} value={'Riad'} /> <label className='w-full h-full rounded-full bg-gray-100 px-6 py-1 peer-checked:bg-blue-100 peer-checked:text-blue-500 peer-checked:outline outline-1' htmlFor='property15'>Riad</label></span>
                            </div>

                            <div className="paymentMode">
                              <p className='w-full px-4  text-lg font-semibold'>Payment Mode</p>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Book with ₹0 payment</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Book with 0 payment'} filtertype={'Payment Mode'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Prepaid</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Prepaid'} filtertype={'Payment Mode'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Pay at hotel</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Pay at hotel'} filtertype={'Payment Mode'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                            </div>

                            <div className="mealsIncluded">
                              <p className='w-full px-4  text-lg font-semibold'>Meals</p>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Breakfast Included</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Breakfast included'} filtertype={'Meals'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Lunch Included</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Lunch included'} filtertype={'Meals'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>
                              <div className=' PriceDrop  w-full flex justify-between items-center px-4 py-2 rounded-md'><span>Dinner Included</span> <span className="shrink-0 inline-flex justify-center items-center w-20 h-20 rounded hover:bg-primary-over "> <input id='' className="filterCheckBox peer  w-full h-full inset-0 cursor-pointer " type="checkbox" value={'Dinner included'} filtertype={'Meals'} onChange={(e) => { handleFilterChange(e) }} />  </span> </div>

                            </div>

                          </div>

                      </div>
                    </div>
                  </div>

                  <div className={`SORT relative flex flex-col justify-center items-center cursor-pointe`} onClick={() => { setActive(!active); setActiveTab('sort') }}>
                    <p><CgSortZa /></p>
                    <p>Sort</p>
                    <div className={`sortpopup bg-white absolute w-[170px] h-[250px] shadow rounded-10 transition-all transform duration-700 ${active == true && activeTab === 'sort' ? '-translate-y-[165px] -translate-x-[50px]  opacity-100 scale-x-100' : 'opacity-0 scale-0'}`}>
                        <div className="  w-full h-full  peer-checked:flex flex-col px-2 py-1 rounded-10 shadow">
                            <span className='cursor-pointer hover:bg-slate-100 px-4 rounded flex flex-col relative' onClick={() => { document.getElementById('scheck').checked = false }}> <input id='sortRadio1' className='absolute opacity-0' type="radio" name='sortRadio' filtertype={'popularity'} value={'1'} onChange={(e) => { handleFilterChange(e); setSort('Popularity') }} /> <label className='font-semibold  flex flex-col' htmlFor="sortRadio1"><p>Popularity</p> <p className='text-gray-400'>Low to High</p> </label> </span>
                            <span className='cursor-pointer hover:bg-slate-100 px-4 rounded flex flex-col relative' onClick={() => { document.getElementById('scheck').checked = false }}> <input id='sortRadio2' className='absolute opacity-0' type="radio" name='sortRadio' filtertype={'price1'} value={'1'} onChange={(e) => { handleFilterChange(e); setSort('Price Low to High') }} /> <label className='font-semibold  flex flex-col' htmlFor="sortRadio2"><p>Price</p> <p className='text-gray-400'>Low to High</p> </label> </span>
                            <span className='cursor-pointer hover:bg-slate-100 px-4 rounded flex flex-col relative' onClick={() => { document.getElementById('scheck').checked = false }}> <input id='sortRadio3' className='absolute opacity-0' type="radio" name='sortRadio' filtertype={'price2'} value={'-1'} onChange={(e) => { handleFilterChange(e); setSort('Price High to Low') }} /> <label className='font-semibold  flex flex-col' htmlFor="sortRadio3"><p>Price</p> <p className='text-gray-400'>High to Low</p> </label> </span>
                            <span className='cursor-pointer hover:bg-slate-100 px-4 rounded flex flex-col relative' onClick={() => { document.getElementById('scheck').checked = false }}> <input id='sortRadio4' className='absolute opacity-0' type="radio" name='sortRadio' filtertype={'rating'} value={'1'} onChange={(e) => { handleFilterChange(e); setSort('User Rating Highest First') }} /> <label className='font-semibold  flex flex-col' htmlFor="sortRadio4"><p>User Rating</p> <p className='text-gray-400'>Highest First</p> </label> </span>
                          </div>
                    </div>
                  </div>

                             </div>

          }

        </div>

      </div>

    </>
  )
})

export default HotelResults