import React, { useEffect, useState } from 'react'
import { BiHome } from 'react-icons/bi'
import { CgMoreO } from 'react-icons/cg'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

function BottomRibbon({setisloggedin,setpopupshow}) {
    const navigat = useNavigate()
    const [activeTab, setActiveTab]=useState('')
    const [active, setActive]=useState(false)
  const [popupShow, setPopupShow] = useState();


    console.log(localStorage.getItem('user'));

    useEffect(()=>{
        setActive(true)
    },[activeTab])

    useEffect(()=>{console.log(activeTab, active);},[activeTab, active])

    
  return (
    <div className='RIBBON1 xl:hidden fixed -bottom-1 flex justify-center items-center h-[69px] w-screen z-40'>
    <div className='RIBBON2 relative flex justify-between items-center bg-gray-200 border-t-2 border-gray-300 h-full w-full'>
            
            <div className=' w-[33%]  h-full flex justify-center items-center'>
                <label htmlFor="homecheckbox" className='flex flex-col items-center justify-between' onClick={()=>{navigat('/')}}>
                <BiHome className='w-7 h-7'/>
                </label>
            </div>
             
            <div className="MORE  flex items-center justify-center w-[33%]  h-full " onClick={()=>{setActiveTab('more'); setActive(!active)}}>
                <label htmlFor='morecheckbox' className="flex flex-col peer g items-center cursor-pointer relative " >
                    <CgMoreO className='w-7 h-7' />
                </label>
                <div id='moreDropdown' className={`rounded-10 bg-white shadow w-[300px] z-40 transform  absolute transition-all duration-700 ease-in-out ${activeTab==='more' && active==true ? 'opacity-100 -translate-y-[94px] -translate-x-2' : 'opacity-0 scale-0 ' }`}>
                    <div>
                        <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm h-[44px] cursor-pointer">
                            <div className="inline-flex shrink-0 group-[.list-lg]:h-[50px] group-[.list-lg]:w-[50px] h-40 w-40 items-center">
                                <img alt="user" loading="lazy" width={24} height={24} decoding="async" data-nimg={1} className="h-6 w-6" src="https://edge.ixigo.com/st/vimaan/_next/static/media/visa.dc084e1b.svg" style={{ color: "transparent" }} />
                            </div>
                            <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                                <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                    Book Visa
                                </p>
                            </div>
                        </li>
                    </div>
                    <a
                        className="cursor-pointer"
                        target="_blank"
                        href="https://rocket.ixigo.com/group/index.html?p=app_search_form"
                    >
                        <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm h-[44px] cursor-pointer">
                            <div className="inline-flex shrink-0 group-[.list-lg]:h-[50px] group-[.list-lg]:w-[50px] h-40 w-40 items-center">
                              <img alt="user" loading="lazy" width={24} height={24} decoding="async" data-nimg={1} className="h-6 w-6" src="https://edge.ixigo.com/st/vimaan/_next/static/media/groupBooking.e587db9a.svg" style={{ color: "transparent" }} />
                            </div>
                            <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                                <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                    Group Booking
                                </p>
                            </div>
                        </li>
                    </a>
                    <a
                        className="cursor-pointer"
                        target="_blank"
                        href="https://www.ixigo.com/plan?ref=home_mweb"
                    >
                        <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm h-[44px] cursor-pointer">
                            <div className="inline-flex shrink-0 group-[.list-lg]:h-[50px] group-[.list-lg]:w-[50px] h-40 w-40 items-center">
                            <img alt="user" loading="lazy" width={24} height={24} decoding="async" data-nimg={1} className="h-6 w-6" src="https://edge.ixigo.com/st/vimaan/_next/static/media/plan.ff0ec0aa.svg" style={{ color: "transparent" }} />
                            </div>
                            <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                                <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                    Plan
                                </p>
                            </div>
                        </li>
                    </a>
                </div>
            </div>

            {
                localStorage.getItem('user') ?   <div className=" PROFILE flex items-center  justify-center  cursor-pointer w-[33%]  h-full  " >
                                                       

                                                        <label htmlFor='profilecheckbox' id='profileDropdownTag' className=" flex flex-col items-center justify-center cursor-pointer h-full z-50" onClick={()=>{setActiveTab(`profile`), setActive(!active)}}>
                                                            <div className="relative"><FaRegCircleUser  className='w-7 h-7'/></div>
                                                        </label>

                                                        <div className={`Dropdown rounded-10 bg-white shadow w-[300px] z-50 transform  absolute transition-all duration-700 ease-in-out ${activeTab==='profile' && active==true ? 'opacity-100 -translate-y-[186px] -translate-x-24' : 'opacity-0 scale-0 ' }`} >
                                                            <a className="cursor-pointer" href="/account">
                                                                <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm">
                                                                    <div className="inline-flex shrink-0 group-[.list-lg]:h-[50px] group-[.list-lg]:w-[50px] h-40 w-40 items-center">
                                                                        <img
                                                                            alt="user"
                                                                            loading="lazy"
                                                                            width={24}
                                                                            height={24}
                                                                            decoding="async"
                                                                            data-nimg={1}
                                                                            className="h-6 w-6"
                                                                            src="https://edge.ixigo.com/st/vimaan/_next/static/media/userFilledIcon.a0fdd65e.svg"
                                                                            style={{ color: "transparent" }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                                                                        <p className="body-md flex group-[.list-lg]:body-lg text-primary capitalize">
                                                                        {JSON.parse(localStorage.getItem('user')).name}
                                                                        </p>
                                                                        <p className="body-sm text-secondary">My Profile</p>
                                                                    </div>
                                                                </li>
                                                            </a>
                                                            <a className="cursor-pointer" href="/account/trips#flights">
                                                                <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm">
                                                                    <div className="inline-flex shrink-0 group-[.list-lg]:h-[50px] group-[.list-lg]:w-[50px] h-40 w-40 items-center">
                                                                        <svg
                                                                            width="1em"
                                                                            height="1em"
                                                                            fontSize="1.5rem"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            data-testid="LuggageFilledIcon"
                                                                            className="text-charcoal-500"
                                                                            style={{ userSelect: "none", display: "inline-block" }}
                                                                        >
                                                                            <path d="M18.5 6.3892h.5c1.1046 0 2 .8955 2 2v8c0 1.1046-.8954 2-2 2h-.5v-12Z" />
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M17 6.3892h-1.7167V5.029c0-1.1206-.7163-2.029-1.6-2.029h-3.8c-.8836 0-1.6.9084-1.6 2.029v1.3602H7v12h10v-12Zm-7.3452 0h4.2571V5.029c0-.1601-.1023-.2899-.2286-.2899h-3.8c-.1262 0-.2286.1298-.2286.2899v1.3602Z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                            <path d="M5.5 6.3892v12H5c-1.1046 0-2-.8954-2-2v-8c0-1.1045.8954-2 2-2h.5Z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                                                                        <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                                                            My Trips
                                                                        </p>
                                                                        <p className="body-sm text-secondary">
                                                                            View &amp; manage bookings
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            </a>
                                                            <a className="cursor-pointer" href="/finance/home">
                                                                <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm">
                                                                    <div className="inline-flex shrink-0 group-[.list-lg]:h-[50px] group-[.list-lg]:w-[50px] h-40 w-40 items-center">
                                                                        <img
                                                                            alt="Iximoney"
                                                                            loading="lazy"
                                                                            width={24}
                                                                            height={24}
                                                                            decoding="async"
                                                                            data-nimg={1}
                                                                            className="h-6 w-6"
                                                                            src="https://edge.ixigo.com/st/vimaan/_next/static/media/ixigoMoney.db8f52f9.svg"
                                                                            style={{ color: "transparent" }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                                                                        <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                                                            ixigo money
                                                                        </p>
                                                                        <p className="body-sm text-secondary">Your virtual currency</p>
                                                                    </div>
                                                                </li>
                                                            </a>
                                                            <a className="cursor-pointer" href="/account/travellers">
                                                                <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm">
                                                                    <div className="inline-flex shrink-0 group-[.list-lg]:h-[50px] group-[.list-lg]:w-[50px] h-40 w-40 items-center">
                                                                        <img
                                                                            alt="user"
                                                                            loading="lazy"
                                                                            width={24}
                                                                            height={24}
                                                                            decoding="async"
                                                                            data-nimg={1}
                                                                            className="h-6 w-6"
                                                                            src="https://edge.ixigo.com/st/vimaan/_next/static/media/multipleUser.c67d06eb.svg"
                                                                            style={{ color: "transparent" }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
                                                                        <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                                                            My Travellers
                                                                        </p>
                                                                        <p className="body-sm text-secondary">
                                                                            View all saved travellers
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            </a>
                                                            <a className="cursor-pointer" href="" onClick={()=>{localStorage.removeItem('user')}}>
                                                                <li className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm">
                                                                    <div className="inline-flex shrink-0 group-[.list-lg]:h-[50px] group-[.list-lg]:w-[50px] h-40 w-40 items-center">
                                                                        <img
                                                                            alt="Logout"
                                                                            loading="lazy"
                                                                            width={24}
                                                                            height={24}
                                                                            decoding="async"
                                                                            data-nimg={1}
                                                                            className="h-6 w-6"
                                                                            src="https://edge.ixigo.com/st/vimaan/_next/static/media/logoutFilled.ba2355a2.svg"
                                                                            style={{ color: "transparent" }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]" >
                                                                        <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                                                            Log out
                                                                        </p>
                                                                        <p className="body-sm text-secondary" />
                                                                    </div>
                                                                </li>
                                                            </a>
                                                        </div>
                                                </div>
                                                    :
                                                <div className=' flex justify-center items-center gap-4 w-[33%]'>
                                                        <button className='lOGIN BUTTON border px-6 font-bold  py-1 rounded-lg' onClick={()=>{setpopupshow('signinShow')}}>Login</button>
                                                </div>
            }

    </div>        
</div>
  )
}

export default BottomRibbon