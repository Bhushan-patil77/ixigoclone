import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineSwapHorizontalCircle } from 'react-icons/md'
import { RangeSlider } from 'range-slider-input'
import { IoIosArrowDown } from 'react-icons/io';

function Trainresult() {
  const [dateArray, setDateArray] = useState([]);

  useEffect(() => {
    generateDateArray();
  }, [])


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


  return (
    <>
       <div className='sticky top-0 z-40'>
        <Navbar/>
       </div>

      <div className="searchbar  flex gap-[50px] pl-16 pt-[19px] pb-6 items-end bg-gradient-to-r from-[#751152] to-[#ab2d42]">

        <div className="from flex flex-col gap-2">
          <label htmlFor="inputfrom" className='text-gray-400 text-sm'>From</label>
          <input id='inputfrom' className=' outline-none border-b-2 border-white bg-transparent text-white' type="text" placeholder='Leaving from' />
        </div>

        <div className=" w-[30px] h-[30px]"><MdOutlineSwapHorizontalCircle className='w-full h-full text-white' /></div>

        <div className="to flex flex-col gap-2">
          <label htmlFor="inputto" className='text-gray-400 text-sm'>To</label>
          <input id='inputto' className='outline-none border-b-2 border-white bg-transparent text-white' type="text" placeholder='Going to' />
        </div>

        <div className="date flex flex-col gap-2">
          <label htmlFor="inputto" className='text-gray-400 text-sm'>Date</label>
          <input id='inputto' className='outline-none border-b-2 border-white bg-transparent text-white' type="date" />
        </div>

        <div className="searchBtn  px-[70px] py-2 bg-orange-700 text-white font">SEARCH</div>

      </div>


      <div className="filters flex  p-4 shadow  divide-x divide-dashed">

        <div className="coachClasses flex flex-col gap-4 px-4">
          <div className="headingAndAllBtn flex justify-between"><span>Class</span>  <span><input id='all' type="checkbox" /> <p className='inline'>all</p></span></div>
          <div className="classes flex flex-col gap-4 ">
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="sl" value={'sl'} type="checkbox" /> <label htmlFor="sl">SL</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="3A" value={'3A'} type="checkbox" /> <label htmlFor="3A">3A</label></span>
            </div>
            <div className='flex gap-12'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="2A" value={'2A'} type="checkbox" /> <label htmlFor="2A">2A</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="1A" value={'1A'} type="checkbox" /> <label htmlFor="1A">1A</label></span>
            </div>
          </div>
        </div>

        <div className="quota flex flex-col gap-4 px-4">
          <span className='text-xl'>Quota</span>
          <div className="classes flex flex-col gap-4 ">
            <div className='flex justify-between gap-16'>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="general" value={'General'} name='quota' type="radio" /> <label htmlFor="general">General</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="tatkal" value={'Tatkal'} name='quota' type="radio" /> <label htmlFor="tatkal">Tatkal</label></span>
            </div>
            <div className='flex justify-between '>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="lowerberth" value={'Lower Berth'} name='quota' type="radio" /> <label htmlFor="lowerberth">Lower Berth</label></span>
              <span className='flex items-center gap-2'><input className='w-4 h-4' id="ladies" value={'Ladies'} name='quota' type="radio" /> <label htmlFor="ladies">Ladies</label></span>
            </div>
          </div>
        </div>

        <div className="departureTime flex flex-col gap-4 px-4">
          <span className='text-xl'>Departure from</span>
          <div className='text-xs font-semibold  flex gap-3 '>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="departureCheckBox1" type="checkbox" value={'Early Morning'} /><label htmlFor='departureCheckBox1' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 00:00 - 06:00</label> <span>Early Morning</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="departureCheckBox2" type="checkbox" value={'Morning'} /><label htmlFor='departureCheckBox2' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 06:00 - 12:00</label> <span>Morning</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="departureCheckBox3" type="checkbox" value={'Mid Day'} /><label htmlFor='departureCheckBox3' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 12:00 - 18:00</label> <span>Mid Day</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="departureCheckBox4" type="checkbox" value={'Night'} /><label htmlFor='departureCheckBox4' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 18:00 - 24:00</label> <span>Night</span></span>
          </div>
        </div>

        <div className="arrivalTime flex flex-col gap-4 px-4">
          <span className='text-xl'>Arrival at</span>
          <div className='text-xs font-semibold flex gap-3 '>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="arrivalRadio1" type="checkbox" name='arrival' value={'Early Morning'} /><label htmlFor='arrivalRadio1' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 00:00 - 06:00</label> <span>Early Morning</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="arrivalRadio2" type="checkbox" name='arrival' value={'Morning'} /><label htmlFor='arrivalRadio2' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 06:00 - 12:00</label> <span>Morning</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="arrivalRadio3" type="checkbox" name='arrival' value={'Mid Day'} /><label htmlFor='arrivalRadio3' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 12:00 - 18:00</label> <span>Mid Day</span></span>
            <span className='flex flex-col items-center gap-1'><input className='hidden peer' id="arrivalRadio4" type="checkbox" name='arrival' value={'Night'} /><label htmlFor='arrivalRadio4' className="timeSlot border border-gray-400  py-1 px-2 font-semibold flex justify-center items-center peer-checked:bg-[#ec5b24] peer-checked:text-white"> 18:00 - 24:00</label> <span>Night</span></span>
          </div>
        </div>

        <div className="relative flex items-end px-4">
          <div className='flex justify-center items-center gap-2'> <span>MORE FILTERS</span> <span> <IoIosArrowDown/></span> </div>
        </div>

      </div>


      <div className="resultsAndAddContainer px-[60px] pt-4 flex gap-11">

        <div className="results w-[73%]">

          <div className="suggestionBar text-black bg-white ">
            <div className=" w-full flex flex-col gap-10 ">
              <div className="SUGGESTION BAR flex bg-white  h-[70px] w-full items-center shadow ">
                <div className="LEFT ARROW flex shrink-0 justify-center py-10 items-center w-8 h-full border-r border-neutral-100 cursor-pointer rounded-l-10 " onClick={() => { document.getElementById('suggestionScrollDiv').scrollLeft += 400 }}> <MdKeyboardArrowLeft /> </div>

                <div id='suggestionScrollDiv' className="SUGGESTION CELLS CONTAINER  flex no-scrollbar overflow-auto scroll-smooth w-full  transition duration-1000 ">
                  {
                    dateArray.map((d, index) => {
                      return <a key={index} className="SUGGESTION CELL flex flex-col gap-1 shrink-0 justify-center items-center h-[50px] cursor-pointer w-[123px] outlookList border-r" rel="nofollow">
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

          <div className="sortBarAndRadio flex justify-between flex-row  py-6">

            <div className="sortBar flex items-center py-2 tracking-wide shadow">

              <span className='text-gray-400 pl-6 py-2'>Sort by:</span>

              <div className='  flex divide-x font-semibold divide-solid text-slate-500 p-1'>
                <span className='px-6'> <input className='hidden peer' id='sortRadio1' type="radio" name='sortRadio' /> <label className='peer-checked:text-[#ec5b24]' htmlFor="sortRadio1">DEPARTURE TIME</label></span>
                <span className='px-4'> <input className='hidden peer' id='sortRadio2' type="radio" name='sortRadio' /> <label className='peer-checked:text-[#ec5b24]' htmlFor="sortRadio2">ARRIVAL TIME</label></span>
                <span className='px-4'> <input className='hidden peer' id='sortRadio3' type="radio" name='sortRadio' /> <label className='peer-checked:text-[#ec5b24]' htmlFor="sortRadio3">DURATION</label></span>
                <span className='px-4'> <input className='hidden ' id='sortRadio4' type="radio" name='sortRadio1111' /> <label className='peer-checked:text-[#ec5b24]' htmlFor="sortRadio4">NAME</label></span>
              </div>

            </div>

            <div className="radioForShowTrainsConfirmSeats text-lg text-slate-500 tracking-wider flex gap-4 px-4 shadow">
              <span className='flex justify-center items-center'>Show trains with confirmed seats</span>
              <span className='flex justify-center items-center'><input className=' peer' id="showtrainswithconfirm" type="checkbox" /> <label htmlFor="showtrainswithconfirm"></label></span>
            </div>
          </div>

          <div className="getFullRefundCheckBoxDiv"></div>

          <div className="resultCards flex flex-col gap-6">

            <div className='trainCard divide-y divide-dashed divide-slate-300 border shadow'>

              <div className="upper px-6 mb-6 mt-8 flex items-center justify-between divide-x divide-dashed divide-slate-300">

                <div className="left flex flex-col gap-3   ">
                  <div className="nameAndNumber text-[#ec5824]">
                    <span>18519</span> <span>VSKP LTT EXPRES</span>
                  </div>
                  <div className="runningDays text-sm flex items-center gap-2"> <span>Runs on:</span> <div className="workingDays"> S M T W T F S</div> <div className='w-[7px] h-[7px] rounded-full  border-2 border-black bg-black'></div>  <span className='text-[#ec5b24]'>Special (18519 Running Status)</span></div>
                </div>

                <div className="right  flex  ">

                  <div className="fromInfo flex flex-col pl-12"> <span className='from text-[#ec5b24]'>PUNE</span> <span className='font-bold text-xl'>00:45</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>

                  <div className="duration flex flex-col justify-center items-center px-6">
                    <span>3hr 30min</span>
                    <div className='flex items-center text-slate-400'><div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /> <div className='w-24 h-[2px] bg-slate-400' /> <div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /></div>
                  </div>

                  <div className="toInfo flex flex-col pr-12">
                    <div className="fromInfo flex flex-col"> <span className='from text-[#ec5b24]'>LTT</span> <span className='font-bold text-xl'>04:15</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>
                  </div>

                  <div className="showAvailabilitybtn flex justify-center items-center">
                    <button className='flex items-center gap-1 bg-[#ec5b24] text-white font-semibold text-sm  px-[12px] py-[11px] rounded-sm '><span>SHOW AVAILABILITY</span> <span className='text-xl font-bold'><IoIosArrowDown /></span></button>
                  </div>

                </div>


              </div>

              <div className="lower  max-w-full ">

                <div className="scrollableDiv flex items-center mt-4 gap-4 overflow-x-auto no-scrollbar  ">

                  <div className='cellsContainer flex gap-6 py-4 px-6 '>




                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>



                  </div>

                </div>

              </div>

            </div>

            <div className='trainCard divide-y divide-slate-400 border shadow'>

              <div className="upper px-6 mb-6 mt-8 flex items-center justify-between divide-x divide-slate-400">

                <div className="left flex flex-col gap-3   ">
                  <div className="nameAndNumber text-[#ec5824]">
                    <span>18519</span> <span>VSKP LTT EXPRES</span>
                  </div>
                  <div className="runningDays text-sm flex items-center gap-2"> <span>Runs on:</span> <div className="workingDays"> S M T W T F S</div> <div className='w-[7px] h-[7px] rounded-full  border-2 border-black bg-black'></div>  <span className='text-[#ec5b24]'>Special (18519 Running Status)</span></div>
                </div>

                <div className="right  flex  ">

                  <div className="fromInfo flex flex-col pl-12"> <span className='from text-[#ec5b24]'>PUNE</span> <span className='font-bold text-xl'>00:45</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>

                  <div className="duration flex flex-col justify-center items-center px-6">
                    <span>3hr 30min</span>
                    <div className='flex items-center text-slate-400'><div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /> <div className='w-24 h-[2px] bg-slate-400' /> <div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /></div>
                  </div>

                  <div className="toInfo flex flex-col pr-12">
                    <div className="fromInfo flex flex-col"> <span className='from text-[#ec5b24]'>LTT</span> <span className='font-bold text-xl'>04:15</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>
                  </div>

                  <div className="showAvailabilitybtn flex justify-center items-center">
                    <button className='flex items-center gap-1 bg-[#ec5b24] text-white font-semibold text-sm  px-[12px] py-[11px] rounded-sm '><span>SHOW AVAILABILITY</span> <span className='text-xl font-bold'><IoIosArrowDown /></span></button>
                  </div>

                </div>


              </div>

              <div className="lower  max-w-full ">

                <div className="scrollableDiv flex items-center mt-4 gap-4 overflow-x-auto no-scrollbar  ">

                  <div className='cellsContainer flex gap-4 p-4 '>




                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>



                  </div>

                </div>

              </div>

            </div>

            <div className='trainCard divide-y divide-slate-400 border shadow'>

              <div className="upper px-6 mb-6 mt-8 flex items-center justify-between divide-x divide-slate-400">

                <div className="left flex flex-col gap-3   ">
                  <div className="nameAndNumber text-[#ec5824]">
                    <span>18519</span> <span>VSKP LTT EXPRES</span>
                  </div>
                  <div className="runningDays text-sm flex items-center gap-2"> <span>Runs on:</span> <div className="workingDays"> S M T W T F S</div> <div className='w-[7px] h-[7px] rounded-full  border-2 border-black bg-black'></div>  <span className='text-[#ec5b24]'>Special (18519 Running Status)</span></div>
                </div>

                <div className="right  flex  ">

                  <div className="fromInfo flex flex-col pl-12"> <span className='from text-[#ec5b24]'>PUNE</span> <span className='font-bold text-xl'>00:45</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>

                  <div className="duration flex flex-col justify-center items-center px-6">
                    <span>3hr 30min</span>
                    <div className='flex items-center text-slate-400'><div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /> <div className='w-24 h-[2px] bg-slate-400' /> <div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /></div>
                  </div>

                  <div className="toInfo flex flex-col pr-12">
                    <div className="fromInfo flex flex-col"> <span className='from text-[#ec5b24]'>LTT</span> <span className='font-bold text-xl'>04:15</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>
                  </div>

                  <div className="showAvailabilitybtn flex justify-center items-center">
                    <button className='flex items-center gap-1 bg-[#ec5b24] text-white font-semibold text-sm  px-[12px] py-[11px] rounded-sm '><span>SHOW AVAILABILITY</span> <span className='text-xl font-bold'><IoIosArrowDown /></span></button>
                  </div>

                </div>


              </div>

              <div className="lower  max-w-full ">

                <div className="scrollableDiv flex items-center mt-4 gap-4 overflow-x-auto no-scrollbar  ">

                  <div className='cellsContainer flex gap-4 p-4 '>




                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>



                  </div>

                </div>

              </div>

            </div>

            <div className='trainCard divide-y divide-slate-400 border shadow'>

              <div className="upper px-6 mb-6 mt-8 flex items-center justify-between divide-x divide-slate-400">

                <div className="left flex flex-col gap-3   ">
                  <div className="nameAndNumber text-[#ec5824]">
                    <span>18519</span> <span>VSKP LTT EXPRES</span>
                  </div>
                  <div className="runningDays text-sm flex items-center gap-2"> <span>Runs on:</span> <div className="workingDays"> S M T W T F S</div> <div className='w-[7px] h-[7px] rounded-full  border-2 border-black bg-black'></div>  <span className='text-[#ec5b24]'>Special (18519 Running Status)</span></div>
                </div>

                <div className="right  flex  ">

                  <div className="fromInfo flex flex-col pl-12"> <span className='from text-[#ec5b24]'>PUNE</span> <span className='font-bold text-xl'>00:45</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>

                  <div className="duration flex flex-col justify-center items-center px-6">
                    <span>3hr 30min</span>
                    <div className='flex items-center text-slate-400'><div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /> <div className='w-24 h-[2px] bg-slate-400' /> <div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /></div>
                  </div>

                  <div className="toInfo flex flex-col pr-12">
                    <div className="fromInfo flex flex-col"> <span className='from text-[#ec5b24]'>LTT</span> <span className='font-bold text-xl'>04:15</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>
                  </div>

                  <div className="showAvailabilitybtn flex justify-center items-center">
                    <button className='flex items-center gap-1 bg-[#ec5b24] text-white font-semibold text-sm  px-[12px] py-[11px] rounded-sm '><span>SHOW AVAILABILITY</span> <span className='text-xl font-bold'><IoIosArrowDown /></span></button>
                  </div>

                </div>


              </div>

              <div className="lower  max-w-full ">

                <div className="scrollableDiv flex items-center mt-4 gap-4 overflow-x-auto no-scrollbar  ">

                  <div className='cellsContainer flex gap-4 p-4 '>




                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>



                  </div>

                </div>

              </div>

            </div>

            <div className='trainCard divide-y divide-slate-400 border shadow'>

              <div className="upper px-6 mb-6 mt-8 flex items-center justify-between divide-x divide-slate-400">

                <div className="left flex flex-col gap-3   ">
                  <div className="nameAndNumber text-[#ec5824]">
                    <span>18519</span> <span>VSKP LTT EXPRES</span>
                  </div>
                  <div className="runningDays text-sm flex items-center gap-2"> <span>Runs on:</span> <div className="workingDays"> S M T W T F S</div> <div className='w-[7px] h-[7px] rounded-full  border-2 border-black bg-black'></div>  <span className='text-[#ec5b24]'>Special (18519 Running Status)</span></div>
                </div>

                <div className="right  flex  ">

                  <div className="fromInfo flex flex-col pl-12"> <span className='from text-[#ec5b24]'>PUNE</span> <span className='font-bold text-xl'>00:45</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>

                  <div className="duration flex flex-col justify-center items-center px-6">
                    <span>3hr 30min</span>
                    <div className='flex items-center text-slate-400'><div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /> <div className='w-24 h-[2px] bg-slate-400' /> <div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /></div>
                  </div>

                  <div className="toInfo flex flex-col pr-12">
                    <div className="fromInfo flex flex-col"> <span className='from text-[#ec5b24]'>LTT</span> <span className='font-bold text-xl'>04:15</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>
                  </div>

                  <div className="showAvailabilitybtn flex justify-center items-center">
                    <button className='flex items-center gap-1 bg-[#ec5b24] text-white font-semibold text-sm  px-[12px] py-[11px] rounded-sm '><span>SHOW AVAILABILITY</span> <span className='text-xl font-bold'><IoIosArrowDown /></span></button>
                  </div>

                </div>


              </div>

              <div className="lower  max-w-full ">

                <div className="scrollableDiv flex items-center mt-4 gap-4 overflow-x-auto no-scrollbar  ">

                  <div className='cellsContainer flex gap-4 p-4 '>




                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>



                  </div>

                </div>

              </div>

            </div>

            <div className='trainCard divide-y divide-slate-400 border shadow'>

              <div className="upper px-6 mb-6 mt-8 flex items-center justify-between divide-x divide-slate-400">

                <div className="left flex flex-col gap-3   ">
                  <div className="nameAndNumber text-[#ec5824]">
                    <span>18519</span> <span>VSKP LTT EXPRES</span>
                  </div>
                  <div className="runningDays text-sm flex items-center gap-2"> <span>Runs on:</span> <div className="workingDays"> S M T W T F S</div> <div className='w-[7px] h-[7px] rounded-full  border-2 border-black bg-black'></div>  <span className='text-[#ec5b24]'>Special (18519 Running Status)</span></div>
                </div>

                <div className="right  flex  ">

                  <div className="fromInfo flex flex-col pl-12"> <span className='from text-[#ec5b24]'>PUNE</span> <span className='font-bold text-xl'>00:45</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>

                  <div className="duration flex flex-col justify-center items-center px-6">
                    <span>3hr 30min</span>
                    <div className='flex items-center text-slate-400'><div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /> <div className='w-24 h-[2px] bg-slate-400' /> <div className='w-[5px] h-[5px]   rounded-full bg-slate-400' /></div>
                  </div>

                  <div className="toInfo flex flex-col pr-12">
                    <div className="fromInfo flex flex-col"> <span className='from text-[#ec5b24]'>LTT</span> <span className='font-bold text-xl'>04:15</span> <span className='text-slate-400 text-sm'>Mon, 29 Apr</span></div>
                  </div>

                  <div className="showAvailabilitybtn flex justify-center items-center">
                    <button className='flex items-center gap-1 bg-[#ec5b24] text-white font-semibold text-sm  px-[12px] py-[11px] rounded-sm '><span>SHOW AVAILABILITY</span> <span className='text-xl font-bold'><IoIosArrowDown /></span></button>
                  </div>

                </div>


              </div>

              <div className="lower  max-w-full ">

                <div className="scrollableDiv flex items-center mt-4 gap-4 overflow-x-auto no-scrollbar  ">

                  <div className='cellsContainer flex gap-4 p-4 '>




                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center flex-nowrap w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>

                    <div className="cell flex flex-col justify-center items-center w-[120px]">
                      <div className='quota-class-availability relative flex flex-col items-center  border border-slate-300 w-full  pt-2'>
                        <span className='absolute -top-3 border text-sm bg-[#550f5d] text-white flex justify-center items-center rounded px-2 '>Tatkal</span>
                        <span className='class w-full flex justify-center'>SL</span>
                        <span className='availability text-slate-400 w-full flex justify-center'>NOT AVL</span>
                      </div>

                      <div className="updatedTime"></div>
                      <span className='text-slate-400 text-sm'>a moment ago</span>
                    </div>



                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>




        <div className="adds w-[30%] flex justify-center ">

          <div className='pt-24'>
            <img src="https://tpc.googlesyndication.com/simgad/17232132750874073794" alt="" />
          </div>
        </div>

      </div>




    </>
  )
}

export default Trainresult