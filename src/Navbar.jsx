import { split } from 'postcss/lib/list';
import React, { useEffect, useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';

function Navbar({activeLink, shadow, device}) {

    const handleLogout = ()=>{
        localStorage.clear()
    
      }

      useEffect(()=>{

      },[])

    
    return (

        <div className='flex justify-between items-center w-screen px-4  gap-16  '>

                         <div className='LOGO w-[90px] h-full  hidden xl:flex justify-center items-center '>
                          <a className='w-full' href="/">
                           <img alt="ixigo.com" loading="lazy" width={82} height={40} decoding="async" data-nimg={1} className="w-full cursor-pointer" src="https://edge.ixigo.com/st/vimaan/_next/static/media/logo.44edf9f1.svg" style={{ color: "transparent" }} />
                          </a>
                         </div>

                        <div className="TABS w-full xl:w-[40%]  ">
                        <ul className=" TABS relative flex justify-between items-center ">

                            <li className=" FLIGHTS relative pb-2 text-primary w-[100px] h-[70px] text-sm text-center font-medium xl:text-charcoal-800   flex flex-col  justify-center items-center " onClick={()=>{document.getElementById('bottomBar1').classList.toggle('hidden')}}>
                                <Link to={'/'} className=" font-medium flex flex-col xl:flex-row xl:gap-2  items-center  h-[50px] xl:h-full cursor-pointer" >
                                    <div className="w-[97%] h-[70%]  flex justify-center ">
                                        <img alt="ixigo Flights" title="ixigo Flights" loading="eager" decoding="async" data-nimg={1} className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]" src="https://edge.ixigo.com/st/vimaan/_next/static/media/flight.f515b25a.svg" style={{ color: "transparent" }} />
                                    </div>
                                    <p className=" bottom-[14%]">Flights</p>
                                    <p id='bottomBar1' className={` w-[100%] bg-subbrand-500 absolute bottom-0 rounded left-0 h-5 ${activeLink == 0 ? "flex" : "hidden"}`} />
                                </Link>
                            </li>

                            <li className=" HOTELS relative pb-2 text-primary w-[100px] h-[70px] text-sm text-center font-medium xl:text-charcoal-800   flex flex-col  justify-center items-center " onClick={()=>{document.getElementById('bottomBar1').classList.toggle('hidden')}}>
                                <Link to={'/hotels'} className=" font-medium flex flex-col xl:flex-row xl:gap-2  items-center  h-[50px] xl:h-full cursor-pointer" >
                                    <div className="w-[97%] h-[70%]  flex justify-center ">
                                        <img alt="ixigo Flights" title="ixigo Flights" loading="eager" decoding="async" data-nimg={1} className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]" src="https://edge.ixigo.com/st/nivas/_next/static/media/hotel.4b63222d.svg" style={{ color: "transparent" }} />
                                    </div>
                                    <p className=" bottom-[14%]">Hotels</p>
                                    <p id='bottomBar1' className={` w-[100%] bg-subbrand-500 absolute bottom-0 rounded left-0 h-5 ${activeLink == 1 ? "flex" : "hidden"}`} />
                                </Link>
                            </li>

                            <li className=" TRAINS relative pb-2 text-primary w-[100px] h-[70px] text-sm text-center font-medium xl:text-charcoal-800   flex flex-col  justify-center items-center " onClick={()=>{document.getElementById('bottomBar1').classList.toggle('hidden')}}>
                                <Link to={'/trains'} className=" font-medium flex flex-col xl:flex-row xl:gap-2  items-center  h-[50px] xl:h-full cursor-pointer" >
                                    <div className="w-[97%] h-[70%]  flex justify-center ">
                                        <img alt="ixigo Flights" title="ixigo Flights" loading="eager" decoding="async" data-nimg={1} className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]" src="https://edge.ixigo.com/st/nivas/_next/static/media/train.d3e3d1e5.svg" style={{ color: "transparent" }} />
                                    </div>
                                    <p className=" bottom-[14%]">Trains</p>
                                    <p id='bottomBar1' className={` w-[100%] bg-subbrand-500 absolute bottom-0 rounded left-0 h-5 ${activeLink == 2 ? "flex" : "hidden"}`} />
                                </Link>
                            </li>

                            <li className=" BUSES relative pb-2 text-primary w-[100px] h-[70px] text-sm text-center font-medium xl:text-charcoal-800   flex flex-col  justify-center items-center " onClick={()=>{document.getElementById('bottomBar1').classList.toggle('hidden')}}>
                                <Link to={'/buses'} className=" font-medium flex flex-col xl:flex-row xl:gap-2  items-center  h-[50px] xl:h-full cursor-pointer" >
                                    <div className="w-[97%] h-[70%]  flex justify-center ">
                                        <img alt="ixigo Flights" title="ixigo Flights" loading="eager" decoding="async" data-nimg={1} className="w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]" src="https://edge.ixigo.com/st/nivas/_next/static/media/bus.1942c5dd.svg" style={{ color: "transparent" }} />
                                    </div>
                                    <p className=" bottom-[14%]">Buses</p>
                                    <p id='bottomBar1' className={` w-[100%] bg-subbrand-500 absolute bottom-0 rounded left-0 h-5 ${activeLink == 3 ? "flex" : "hidden"}`} />
                                </Link>
                            </li>

                        
                        </ul>
                        </div>

                        <div className={`MORE & OFFERS & DROPDOWN  hidden xl:flex gap-30 h-[70px] items-center  `}>
                        <div className="MORE  flex items-center relative !pb-2 dropdownTab ">
                            <div className="flex peer gap-5 items-center cursor-pointer relative  !h-[70px]" >
                                <img alt="ixigo-more" loading="lazy"  decoding="async" data-nimg={1} className='peer' src="https://edge.ixigo.com/st/vimaan/_next/static/media/more.b80ac91c.svg" style={{ color: "transparent" }} />
                                <p className="peer body-md text-secondary font-medium">More</p>
                                <MdKeyboardArrowDown className='' />
                            </div>
                            <div id='moreDropdown' className="hidden z-50 peer-hover:block hover:block w-300 !px-0 shadow-500 rounded-20 top-40 bg-white absolute   overflow-hidden py-10 mt-4 ">
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
                        <div className="OFFERS flex gap-30 py-10">
                    <a className="flex gap-5 cursor-pointer text-secondary hover:text-primary"  >
                            <svg width="1em" height="1em" fontSize="1.5rem" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-testid="DiscountFilledIcon" className="h-6 w-6" style={{ userSelect: "none", display: "inline-block" }} >
                               <path fillRule="evenodd" d="M21 12.0001c0-.6711-.9202-1.2277-1.0597-1.8556-.144-.6483.4459-1.5573.1701-2.1423-.2803-.5947-1.3451-.6877-1.7436-1.1985-.4004-.5132-.2559-1.598-.755-2.0058-.4991-.4079-1.4973-.022-2.0783-.309-.5716-.2822-.8972-1.3243-1.5308-1.4717-.6135-.1427-1.347.6484-2.0027.6484s-1.3893-.7911-2.0029-.6484c-.6335.1474-.9591 1.1895-1.5306 1.4717-.581.287-1.5766-.101-2.0782.3088-.5015.4099-.3567 1.4952-.7551 2.006-.3985.5106-1.4633.6036-1.7436 1.1983-.2758.585.314 1.494.17 2.1424C3.9201 10.7724 3 11.3288 3 11.9999c0 .6712.92 1.2276 1.0595 1.8556.144.6483-.4458 1.5573-.17 2.1423.2803.5947 1.3451.6877 1.7436 1.1985.4004.5132.256 1.598.755 2.0058.499.4079 1.4972.0221 2.0783.309.5716.2822.8972 1.3243 1.5307 1.4717.6136.1426 1.3472-.6484 2.0029-.6484s1.3893.7911 2.0028.6484c.6336-.1474.9592-1.1895 1.5307-1.4717.5809-.2869 1.5766.101 2.0782-.3088.5015-.4099.3567-1.4952.7551-2.0059.3985-.5107 1.4633-.6037 1.7436-1.1984.2758-.5851-.314-1.494-.1699-2.1424.1393-.628 1.0595-1.1844 1.0595-1.8555Zm-5.0255-2.6213c.8105-.7927-.4187-2.0494-1.2291-1.2568l-6.6655 6.5189c-.8104.7926.4187 2.0494 1.2291 1.2568l6.6655-6.519Zm-.1751 5.1581c0 .6068-.4919 1.0987-1.0987 1.0987s-1.0987-.4919-1.0987-1.0987.4919-1.0987 1.0987-1.0987 1.0987.4919 1.0987 1.0987Zm-6.3725-3.9553c.6068 0 1.0987-.4919 1.0987-1.0987s-.4919-1.0987-1.0987-1.0987-1.0987.4919-1.0987 1.0987.492 1.0987 1.0987 1.0987Z" clipRule="evenodd"/>
                            </svg>
                            <p className="body-md text-charcoal-800">Offers</p>
                        </a>
                        <a
                            className="flex gap-5 cursor-pointer text-secondary hover:text-primary"
                            href="/help-center"
                        >
                            <svg className="w-[1em] h-[1em] text-inherit hover:text-inherit text-2xl">
                                <use xlinkHref="/st/vimaan/_next/static/media/customerSupportFilled.8ee0b872.svg#root" />
                            </svg>
                            <p className="body-md text-charcoal-800">Customer Service</p>
                        </a>
                       </div>

                        {
                            localStorage.getItem('user') ?   <div className=" flex items-center cursor-pointer w-[200px] h-full justify-end " >

                                                                    <div id='profileDropdownTag' className="peer flex items-center cursor-pointer h-full gap-10" >
                                                                        <div className="relative"><FaRegCircleUser  className=' h-[30px] w-[30px] text-gray-500'/></div>
                                                                        <h4 className=''>Hey {JSON.parse(localStorage.getItem('user')).name}</h4>
                                                                        <IoIosArrowDown id='profileDropdownArrow' />

                                                                    </div>

                                                                    <div className="DROPDOWN hidden peer-hover:block hover:block w-[300px] !px-0 !py-10 shadow-500 rounded-20 top-[60px] bg-white absolute  z-[100]   overflow-hidden">
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
                                                                        <a className="cursor-pointer" href="" onClick={()=>{handleLogout()}}>
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
                                                                                <div className="flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px]">
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
                                                            <div className=' flex justify-center items-center gap-4'>
                                                                    <FaRegCircleUser className=' h-[30px] w-[30px]'/>
                                                                    <button className='lOGIN BUTTON border px-6 font-bold  py-1 rounded-lg'><Link className='link' to={'/login'}>Login</Link></button>
                                                            </div>
                        }
                        </div>

                         

        </div>

  


    )
}

export default Navbar