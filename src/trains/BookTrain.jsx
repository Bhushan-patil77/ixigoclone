import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { FaMale } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { IoIosArrowDropdownCircle, IoIosArrowForward, IoMdAddCircle } from 'react-icons/io';
import { IoCheckmarkCircleSharp, IoClose } from 'react-icons/io5';
import { LiaUserEditSolid } from 'react-icons/lia';
import { MdDeleteOutline, MdOutlineDeleteOutline } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../Login';
import { Checkmark } from 'react-checkmark'


const BookTrain = React.memo(() => {
  const location = useLocation();
  const obj = location.state;
  console.log(obj);
  const navigate = useNavigate();
  const [trainDetails, setTrainDetails] = useState([{}]);
  const [travellers, setTravellers] = useState({ 'adultsObj': {}, 'childrensObj': {}, 'infantsObj': {}, 'contactDetails': {} })


  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


  const tripObj = {
    'selection':obj,
    'trainDetail':trainDetails,
    'travellers':travellers,
  }

 

  useEffect(() => {
    getTrainDetails()
  }, [])

  console.log(trainDetails);

  const getTrainDetails = async () => {

    const url = `https://academics.newtonschool.co/api/v1/bookingportals/train/${obj.trainID}`
    const projectId = '8bropwptza4g';

    console.log(url);

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
        setTrainDetails(data);
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


  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (e.target.attributes.type.value == 'adultForm') {
      // var adultNumber = e.target.attributes.adultnumber.value
      const title = e.target[0].value;
      const firstName = e.target[1].value;
      const lastName = e.target[2].value;
      const dateOfBirth = e.target[3].value;
      const nationality = e.target[4].value;

      const validate = () => {
        if (title === "" || firstName === "" || lastName === "" || dateOfBirth === "" || firstName === "" || nationality === "") { return false } else { return true }
      }


      if (validate()) {
        const adult = { 'title': title, 'firstName': firstName, 'lastName': lastName, 'dateOfBirth': dateOfBirth, 'nationality': nationality }

        setTravellers(prevState => ({
          ...prevState,
          adultsObj: {
            ...prevState.adultsObj,
            [`adult${Object.keys(travellers.adultsObj).length + 1}`]: adult

          }
        }));


        // document.getElementById(`adultNameArrow${adultNumber-1}`).classList.remove('rotate-180');
        hide(`adultForm`)

      }
      else {
        alert('enter all fields');
        //  show(`adultForm${adultNumber-1}`)

      }







    }

    if (e.target.attributes.type.value == 'childForm') {
      // var childrenNumber = e.target.attributes.childrennumber.value
      const title = e.target[0].value;
      const firstName = e.target[1].value;
      const lastName = e.target[2].value;
      const dateOfBirth = e.target[3].value;
      const nationality = e.target[4].value;


      const validate = () => {
        if (title === "" || firstName === "" || lastName === "" || dateOfBirth === "" || firstName === "" || nationality === "") { return false } else { return true }
      }


      if (validate()) {
        const child = { 'title': title, 'firstName': firstName, 'lastName': lastName, 'dateOfBirth': dateOfBirth, 'nationality': nationality }

        setTravellers(prevState => ({
          ...prevState,
          childrensObj: {
            ...prevState.childrensObj,
            [`children${Object.keys(travellers.childrensObj).length + 1}}`]: child
          }
        }));

        // document.getElementById(`chilNameArrow${childrenNumber-1}`).classList.remove('rotate-180');
        hide(`childForm`)

      }
      else {

        alert('enter all fields')
        show(`childForm`)
      }


    }

    if (e.target.attributes.type.value == 'infantForm') {
      //  var infantNumber = e.target.attributes.infantnumber.value
      const title = e.target[0].value;
      const firstName = e.target[1].value;
      const lastName = e.target[2].value;
      const dateOfBirth = e.target[3].value;
      const nationality = e.target[4].value;


      const validate = () => {
        if (title === "" || firstName === "" || lastName === "" || dateOfBirth === "" || firstName === "" || nationality === "") { return false } else { return true }
      }


      if (validate()) {
        const infant = { 'title': title, 'firstName': firstName, 'lastName': lastName, 'dateOfBirth': dateOfBirth, 'nationality': nationality }

        setTravellers(prevState => ({
          ...prevState,
          infantsObj: {
            ...prevState.infantsObj,
            [`infant${Object.keys(travellers.infantsObj).length + 1}`]: infant
          }
        }));

        // document.getElementById(`infantNameArrow${infantNumber-1}`).classList.remove('rotate-180');
        hide(`infantForm`)

      }
      else {
        alert('enter all fields');
        show(`infantForm`)

      }


    }

    if (e.target.attributes.type.value == 'contactDetails') {
      const contryCode = e.target[0].value
      const mobileNumber = e.target[1].value
      const gmail = e.target[2].value


      const validate = () => {
        if (contryCode === "" || mobileNumber === "" || gmail === "") { return false } else { return true }
      }


      if (validate()) {
        const contactDetails = { 'contryCode': contryCode, 'mobileNumber': mobileNumber, 'gmail': gmail }

        setTravellers(prevState => ({
          ...prevState,
          contactDetails: contactDetails
        }));


      }
      else {
        alert('enter all fields');
      }







    }
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


  return (



    <div id='scrollable' className=" w-screen h-screen overflow-y-scroll transition duration-500 no-scrollbar">

    <div id='popup' className='hidden'>
      <span><IoClose /></span>
      <Login/>
     </div>

      <div id='section1' className=" relative ravellers w-screen xl:h-full h-screen overflow-y-auto ">

        <div className="TRAVELLERS DETAILS CONTAINER rounded-20 xl:mt-20 overflow-hidden shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)] bg-white">
          <div className="bg-white pt-20">
            <h5 className="h5 px-20 font-bold">Traveller Details</h5>
            <div className="flex xl:justify-between justify-end items-center px-20">
              <p className="text-sm hidden xl:block xl:text-base text-secondary">
                Choose from the saved list or add a new passenger{" "}
              </p>
              <p className="body-sm text-secondary hidden xl:block">3 Travellers</p>
            </div>
            <div className="flex flex-col min-h-full">
              <div className="bg-white flex-grow pb-[70px] lg:pb-0">
                <div
                  className="bg-white pb-15 pt-20 mx-20"
                  data-testid="traveller-description"
                >
                  <div className="inline-alert flex h-auto w-full border-solid rounded-10 p-10 bg-warning-moderate text-warning-moderate bg-warning-subtle ">
                    <div className="left-content flex items-start pt-px">
                      <div className="flex items-center w-20 h-20">
                        <svg
                          width="1em"
                          height="1em"
                          fontSize="1.5rem"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          data-testid="IdFilledIcon"
                          style={{ userSelect: "none", display: "inline-block" }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 5c-1.1046 0-2 .8954-2 2v10c0 1.1046.8954 2 2 2h14c1.1046 0 2-.8954 2-2V7c0-1.1046-.8954-2-2-2H5Zm3.4088 6.6972c.9229 0 1.671-.7474 1.671-1.6693 0-.922-.7481-1.6694-1.671-1.6694-.9228 0-1.671.7474-1.671 1.6694 0 .9219.7482 1.6693 1.671 1.6693Zm3.007 1.6373c-1.7154-1.4568-4.2725-1.4555-5.9924-.0064-.8267.6966-.3708 2.0894.7448 2.0894h4.4953c1.1086 0 1.5782-1.3817.7523-2.083ZM13.7987 8.5a.75.75 0 0 0 0 1.5h4.4201a.75.75 0 0 0 0-1.5h-4.4201Zm0 3a.75.75 0 0 0 0 1.5h2.6114a.75.75 0 0 0 0-1.5h-2.6114Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="right-content flex w-full pl-5">
                      <div className="grow">
                        <div className="body-sm text-primary">
                          <p className="xl:body-sm xl:text-sm text-xs text-warning-moderate">
                            Please ensure that your name matches your govt. ID
                            such as Aadhaar, Passport or Driver's License
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="CHECKED TRAVELLERS NAMES CONTAINER  mx-20  pt-20 border rounded-20 shadow">


                  <div className="ADULTS CHECKED NAMES CONTAINER mx-20 mb-15 pb-10 border-b border-neutral-200 last-of-type:border-none last-of-type:pb-0">

                    <div className="flex justify-between ">

                      <p className="body-md text-primary font-medium"> Adults (12 yrs or above) </p>
                      <div className=''> <button className='w-[25px] h-[25px]' onClick={() => { document.getElementById('adultForm').classList.toggle('hidden') }}> <IoMdAddCircle className='w-full h-full' /> </button> </div>

                    </div>

                    <div id="adultForm" className="ADULTS DETAILS INPUT FORM flex flex-col hidden " >
                      <div className="bg-white flex-grow">
                        <form type={"adultForm"} onSubmit={(e) => { handleFormSubmit(e) }}>
                          <div className="flex flex-col gap-1 ">
                            <div className="w-full">
                              <div className="inline-flex flex-col text-secondary w-full">
                                <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                  <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                  <div className="flex flex-grow items-center">
                                    <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                      Gender
                                    </label>
                                    <select
                                      name=""
                                      id="adultTitleInput"
                                      className="outline-none focus:outline-none w-full bg-transparent  py-2 text-primary "
                                    >
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="w-auto">
                                <div className="inline-flex flex-col text-secondary w-full">
                                  <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                    <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10 " />
                                    <div className="flex flex-grow items-center">
                                      <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white ">
                                        First &amp; Middle Name
                                      </label>
                                      <input
                                        autoComplete="new-password"
                                        className="outline-none w-full bg-transparent placeholder:text-disabled py-2 placeholder:opacity-0 focus:placeholder:opacity-100"
                                        defaultValue=""
                                      />
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="w-auto">
                                <div className="inline-flex flex-col text-secondary w-full">
                                  <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                    <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10 " />
                                    <div className="flex flex-grow items-center">
                                      <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                        Last Name
                                      </label>
                                      <input
                                        autoComplete="new-password"
                                        className="outline-none w-full bg-transparent placeholder:text-disabled py-2 placeholder:opacity-0 focus:placeholder:opacity-100"
                                        defaultValue=""
                                      />
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                            <div className="inline-flex flex-col text-secondary w-full">
                              <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10" />
                                <div className="flex flex-grow items-center">
                                  <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white ">
                                    Date of Birth
                                  </label>
                                  <input
                                    id="adultDOBInput0"
                                    placeholder="DD/MM/YYYY"
                                    maxLength={10}
                                    autoComplete="new-password"
                                    className="outline-none w-full  placeholder:text-disabled py-2 placeholder:opacity-0 focus:placeholder:opacity-100"
                                    type="text"
                                    defaultValue=""
                                  />
                                </div>
                              </div>

                            </div>
                            <div>
                              <div className="w-auto">
                                <div className="inline-flex flex-col text-secondary w-full">
                                  <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                    <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                    <div className="flex flex-grow items-center">
                                      <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                        Nationality
                                      </label>
                                      <select
                                        name=""
                                        id="adultTitleInput"
                                        className="outline-none w-full bg-transparent  py-2 text-primary "
                                      >
                                        <option value="Indian" className="w-full">
                                          Indian
                                        </option>
                                        <option value="American">American</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="VALIDATE & SAVE BUTTON flex justify-center items-center ">
                              <button className=" h-[40px] rounded-xl px-4 bg-orange-300 text-white shadow-300" >
                                Validate &amp; Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="ADULTS NAMES GRID lg:grid lg:grid-cols-4 lg:gap-x-1 items-start">

                      {
                        Object.keys(travellers.adultsObj).map((key, index) => {
                          const adult = travellers.adultsObj[key];

                          return <li key={index} className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm justify-between hover:!bg-white !px-0 lg:w-full]">
                            <div className="relative flex items-center  grow">
                              <div className="CHECKBOX DIV inline-flex shrink-0 flex items-start h-full">
                                <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-selection-solid-over text-selection-solid bg-selection-solid" >
                                  <input className="absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" defaultValue="undefined" />
                                  <FaCheck />
                                </span>
                              </div>
                              <div className="NAME DIV flex flex-col flex-auto  pl-4">
                                <p className="flex  text-primary"> {adult.firstName} {adult.lastName} </p>
                              </div>
                            </div>
                          </li>
                        })
                      }

                    </div>

                  </div>


                  <div className="CHILDS CHECKED NAMES CONTAINER mx-20 mb-15 pb-10 border-b border-neutral-200 last-of-type:border-none last-of-type:pb-0">

                    <div className="flex justify-between">

                      <p className="body-md text-primary font-medium"> Child (2-12 yrs) </p>
                      <div className=''> <button className='w-[25px] h-[25px]' onClick={() => { document.getElementById('childForm').classList.toggle('hidden') }}> <IoMdAddCircle className='w-full h-full' /> </button> </div>

                    </div>

                    < div id="childForm" className="ADULTS DETAILS INPUT FORM flex flex-col hidden " >
                      <div className="bg-white flex-grow">
                        <form type={"childForm"} childnumber={1} onSubmit={(e) => { handleFormSubmit(e) }}>
                          <div className="flex flex-col gap-1 bg-neutral-50">
                            <div className="w-full">
                              <div className="inline-flex flex-col text-secondary w-full">
                                <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                  <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                  <div className="flex flex-grow items-center">
                                    <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                      Gender
                                    </label>
                                    <select
                                      name=""
                                      id="adultTitleInput"
                                      className="outline-none w-full bg-transparent  py-2 text-primary "
                                    >
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="w-auto">
                                <div className="inline-flex flex-col text-secondary w-full">
                                  <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                    <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10 " />
                                    <div className="flex flex-grow items-center">
                                      <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white ">
                                        First &amp; Middle Name
                                      </label>
                                      <input
                                        autoComplete="new-password"
                                        className="outline-none w-full bg-transparent placeholder:text-disabled py-2 placeholder:opacity-0 focus:placeholder:opacity-100"
                                        defaultValue=""
                                      />
                                    </div>
                                  </div>
                                 
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="w-auto">
                                <div className="inline-flex flex-col text-secondary w-full">
                                  <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                    <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10 " />
                                    <div className="flex flex-grow items-center">
                                      <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                        Last Name
                                      </label>
                                      <input
                                        autoComplete="new-password"
                                        className="outline-none w-full bg-transparent placeholder:text-disabled py-2 placeholder:opacity-0 focus:placeholder:opacity-100"
                                        defaultValue=""
                                      />
                                    </div>
                                  </div>
                               
                                </div>
                              </div>
                            </div>
                            <div className="inline-flex flex-col text-secondary w-full">
                              <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10" />
                                <div className="flex flex-grow items-center">
                                  <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white ">
                                    Date of Birth
                                  </label>
                                  <input
                                    id="adultDOBInput0"
                                    placeholder="DD/MM/YYYY"
                                    maxLength={10}
                                    autoComplete="new-password"
                                    className="outline-none w-full bg-transparent placeholder:text-disabled py-2 placeholder:opacity-0 focus:placeholder:opacity-100"
                                    type="text"
                                    defaultValue=""
                                  />
                                </div>
                              </div>
                             
                            </div>
                            <div>
                              <div className="w-auto">
                                <div className="inline-flex flex-col text-secondary w-full">
                                  <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                    <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                    <div className="flex flex-grow items-center">
                                      <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                        Nationality
                                      </label>
                                      <select
                                        name=""
                                        id="adultTitleInput"
                                        className="outline-none w-full bg-transparent  py-2 text-primary "
                                      >
                                        <option value="Indian" className="w-full">
                                          Indian
                                        </option>
                                        <option value="American">American</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="VALIDATE & SAVE BUTTON flex justify-center items-center ">
                              <button className=" h-[40px] rounded-xl px-4 bg-orange-300 text-white shadow-300">
                                Validate &amp; Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="CHILDRENS NAMES GRID lg:grid lg:grid-cols-4 lg:gap-x-1 items-start">

                      {
                        Object.keys(travellers.childrensObj).map((key, index) => {
                          const children = travellers.childrensObj[key]

                          return <li key={index} className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm justify-between hover:!bg-white !px-0 lg:w-full]">
                            <div className="relative flex items-center  grow">

                              <div className=" CHILDREN CHECKBOX inline-flex shrink-0 flex items-start h-full">
                                <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-selection-solid-over text-selection-solid bg-selection-solid">
                                  <input className="absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" defaultValue="undefined" defaultChecked="" />
                                  <FaCheck />
                                </span>
                              </div>

                              <div className=" CHILDRENS CHECKED NAME flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] !pl-10">
                                <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                  {children.firstName} {children.lastName}
                                </p>
                              </div>
                            </div>
                          </li>
                        })
                      }


                    </div>

                  </div>


                  <div className="INFANTS CHECKED NAMES CONTAINER mx-20 mb-15 pb-10 border-b border-neutral-200 last-of-type:border-none last-of-type:pb-0">

                    <div className="flex justify-between">
                      <p className="body-md text-primary font-medium"> Infant (0-2 yrs) </p>
                      <div className=''> <button className='w-[25px] h-[25px]' onClick={() => { document.getElementById('infantForm').classList.toggle('hidden') }}> <IoMdAddCircle className='w-full h-full' /> </button> </div>

                    </div>

                    < div id="infantForm" className="ADULTS DETAILS INPUT FORM  flex-col hidden " >
                      <div className="bg-white flex-grow">
                        <form type={"infantForm"} infantnumber={1} onSubmit={(e) => { handleFormSubmit(e) }}>
                          <div className="flex flex-col gap-1 bg-neutral-50">
                            <div className="w-full">
                              <div className="inline-flex flex-col text-secondary w-full">
                                <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                  <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                  <div className="flex flex-grow items-center">
                                    <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                      Gender
                                    </label>
                                    <select
                                      name=""
                                      id="adultTitleInput"
                                      className="outline-none w-full bg-transparent  py-2 text-primary "
                                    >
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="w-auto">
                                <div className="inline-flex flex-col text-secondary w-full">
                                  <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                    <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10 " />
                                    <div className="flex flex-grow items-center">
                                      <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white ">
                                        First &amp; Middle Name
                                      </label>
                                      <input
                                        autoComplete="new-password"
                                        className="outline-none w-full bg-transparent placeholder:text-disabled py-2 placeholder:opacity-0 focus:placeholder:opacity-100"
                                        defaultValue=""
                                      />
                                    </div>
                                  </div>
                                  
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="w-auto">
                                <div className="inline-flex flex-col text-secondary w-full">
                                  <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                    <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10 " />
                                    <div className="flex flex-grow items-center">
                                      <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                        Last Name
                                      </label>
                                      <input
                                        autoComplete="new-password"
                                        className="outline-none w-full bg-transparent placeholder:text-disabled py-2 placeholder:opacity-0 focus:placeholder:opacity-100"
                                        defaultValue=""
                                      />
                                    </div>
                                  </div>
                              
                                </div>
                              </div>
                            </div>
                            <div className="inline-flex flex-col text-secondary w-full">
                              <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10" />
                                <div className="flex flex-grow items-center">
                                  <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white ">
                                    Date of Birth
                                  </label>
                                  <input
                                    id="adultDOBInput0"
                                    placeholder="DD/MM/YYYY"
                                    maxLength={10}
                                    autoComplete="new-password"
                                    className="outline-none w-full bg-transparent placeholder:text-disabled py-2 placeholder:opacity-0 focus:placeholder:opacity-100"
                                    type="text"
                                    defaultValue=""
                                  />
                                </div>
                              </div>
                            
                            </div>
                            <div>
                              <div className="w-auto">
                                <div className="inline-flex flex-col text-secondary w-full">
                                  <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                    <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                    <div className="flex flex-grow items-center">
                                      <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                        Nationality
                                      </label>
                                      <select
                                        name=""
                                        id="adultTitleInput"
                                        className="outline-none w-full bg-transparent  py-2 text-primary "
                                      >
                                        <option value="Indian" className="w-full">
                                          Indian
                                        </option>
                                        <option value="American">American</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="VALIDATE & SAVE BUTTON flex justify-center items-center ">
                              <button className=" h-[40px] rounded-xl px-4 bg-orange-300 text-white shadow-300">
                                Validate &amp; Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="INFANT CHECKED NAME lg:grid lg:grid-cols-4 lg:gap-x-1 items-start">

                      {
                        Object.keys(travellers.infantsObj).map((key, index) => {
                          const infant = travellers.infantsObj[key];

                          return <li key={index} className="flex items-center relative hover:bg-primary-over px-20 py-10 gap-10 group list-sm justify-between hover:!bg-white !px-0 lg:w-full]">
                            <div className="relative flex items-center  grow">
                              <div className="CHECKBOX inline-flex shrink-0 flex items-start h-full">
                                <span className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-selection-solid-over text-selection-solid bg-selection-solid" >
                                  <input className="absolute opacity-0 w-full h-full inset-0 cursor-pointer" type="checkbox" defaultValue="undefined" defaultChecked="" />
                                  <FaCheck />
                                </span>
                              </div>
                              <div className="INFANT NAME flex flex-col flex-auto pt-1 pb-5 group-[.list-sm]:py-[1px] !pl-10">
                                <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                                  {infant.firstName} {infant.lastName}
                                </p>
                              </div>
                            </div>
                          </li>
                        })
                      }

                    </div>

                  </div>


                </div>

              </div>
            </div>

          </div>
        </div>

        <div className="CONTACT DETAILS CONTAINER xl:mt-20 rounded-20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)] bg-white overflow-hidden border">
          <form id='contactDetails' className='' type="contactDetails" onSubmit={(e) => { handleFormSubmit(e) }}>
            <div className="CONTACT DETAILS p-20">
              <h5 className="h5 font-bold">Contact Details</h5>
              <p className="body-md xl:text-balance text-sm text-secondary pt-2">Your ticket &amp; flight information will be sent here</p>

              <div className='flex xl:flex-row flex-col  xl:gap-8 items-center gap-3 p-4 mt-4 rounded-lg'>

                 <div className="flex xl:gap-8 gap-1">

                  <div className="relative xl:w-[200px] w-[40%]">
                    <select name="" id="adultTitleInput" className="p-2 w-full border rounded-lg bg-white border-slate-300 ">
                      <option value="India (+91)">India (+91)</option>
                      <option value="America (+93)">America (+93)</option>
                    </select>
                  </div>


                  <div className="relative xl:w-[300px] w-[60%]">
                    <label className="absolute -top-2 left-2 text-xs font-semibold bg-white  ">Mobile Number</label>
                    <input className="p-2 w-full border rounded-lg border-slate-300" type="number" defaultValue={9834832178} onFocus={() => { show('contactSaveBtn'); hide('contactSavedCheck') }} />
                  </div>

                 </div>
              


                <div className="relative xl:w-[300px] w-full">
                  <label className="absolute -top-2 left-2 text-xs font-semibold bg-white ">Email</label>
                  <input className="p-2 w-full outline-none border rounded-lg border-slate-300" defaultValue="bhushanravindrapatil77@gmail.com" onFocus={() => { travellers.contactDetails = null }} />
                </div>

                <span id='contactSavedCheck' className=' text-green-600 flex gap-6  text-xl hidden'><Checkmark size='25px' /> </span>
                <button id='contactSaveBtn' className='bg-[#fc790d] text-white font-semibold rounded-lg px-12  py-2 active:bg-orange-800' disabled={travellers.contactDetails == undefined} onClick={() => { hide('contactSaveBtn'); show('contactSavedCheck') }}>save</button>


              </div>




              {/* <div className="bg-white p-20 mt-4 lg:rounded-20 lg:bg-charcoal-20 border border-black">
                        <div className="flex ">
                          <div className="w-auto">
                            <div className="inline-flex flex-col text-secondary w-full text-primary">
                              <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                <div className="flex flex-grow items-center">
                                  <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">Country Code</label>
                                  <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                    <option value="India (+91)">India (+91)</option>
                                    <option value="America (+93)">America (+93)</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="inline-flex flex-col text-secondary w-full text-primary">
                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                              <div className="flex flex-grow items-center">
                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">Mobile Number</label>
                                <input className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100" type="number" defaultValue={9834832178} />
                              </div>
                            </div>
                          </div>
                          <div className="inline-flex flex-col text-secondary w-full text-primary">
                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                              <div className="flex flex-grow items-center">
                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">Email</label>
                                <input className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100" defaultValue="bhushanravindrapatil77@gmail.com" />
                              </div>
                            </div>
                          </div>
                        </div>
                      
                      </div> */}



            </div>

          </form>
        </div>

        <div className="FINAL AMOUNT AND SAVE TRAVELLERS CONTAINER shadow sticky bottom-0   w-full">
          <div className="flex border-t lg:border-0 w-full border-neutral-100 px-20 py-10 items-center justify-between bg-white z-5">
            <div className="flex flex-col justify-center">
              <div className="flex gap-5 lg:flex-row-reverse items-center lg:items-baseline lg:justify-end">
                <p className="body-sm text-secondary decoration-slice"> • {Object.keys(travellers.adultsObj).length + Object.keys(travellers.childrensObj).length + Object.keys(travellers.infantsObj).length} Travellers </p>
              </div>
              <div className="flex items-center gap-1" />
            </div>
            <button className={`inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-5 rounded-10 min-h-[50px] button-lg py-[13px] px-15 ${(Object.keys(travellers.adultsObj).length > 0 && Object.keys(travellers.contactDetails).length > 0 ? 'cursor-pointer' : `${'opacity-50 cursor-not-allowed'}`)}`} disabled={!(Object.keys(travellers.adultsObj).length > 0 && Object.keys(travellers.contactDetails).length > 0)} onClick={() => { show('section2'); document.getElementById('section2').scrollIntoView({ behavior: 'smooth' }) }}>
              Save Traveller{" "}
              <IoIosArrowForward />
            </button>
          </div>
        </div>

      </div>


      <div id='section2' className=' REVIEW w-screen h-screen px-2 xl:mt-0 mt-24  hidden bg-white'>

        <div className='review flex flex-col items-center pt-12 xl:gap-0 gap-4  w-full '>

          <div className=" xl:w-[60%] w-full xl:shadow xl:rounded-b-none rounded-10 flex flex-col gap-4 xl:p-8 xl:border-slate-400 xl:border ">

            <div className="trainDetails flex flex-col  xl:p-12 gap-4 p-2 border xl:rounded-none rounded-10 xl:border xl:border-slate-400">

              <div className='flex justify-between   '>
                <div className='flex items-center gap-[3px] xl:text-base text-[12px]'>  <span>{obj.coach}</span> < div className='w-[5px] h-[5px] bg-black rounded-full' /> <span>Tatkal Quota</span> < div className='w-[5px] h-[5px] bg-black rounded-full' /> <span>{trainDetails.trainNumber}</span> < div className='w-[5px] h-[5px] bg-black rounded-full' /> <span>{trainDetails.trainName}</span> </div>
                <div className='border px-2 text-green-700  rounded font-semibold xl:text-base text-sm'><span>AVL {obj.numberOfSeats}</span></div>
              </div>

              <div className="tainDetails  flex  justify-between ">

                <div className="fromInfo flex flex-col gap-2 items-start">
                  <span className="from font-bold text-[#ec5b24] truncate xl:text-base text-sm">{trainDetails.source}</span>{" "}
                  <span className="font-bold text-xl">{trainDetails.departureTime}</span>{" "}
                  <span className="text-slate-400 text-sm font-bold">{weekDays[new Date(obj.date).getDay()]}, {new Date(obj.date).getDate()} {month[new Date(obj.date).getMonth()]}</span>
                </div>

                <div className="duration flex flex-col justify-center items-center px-6">
                  <span>{trainDetails.travelDuration}</span>
                  <div className="flex items-center text-slate-400">
                    <div className="w-[5px] h-[5px]   rounded-full bg-slate-400" />{" "}
                    <div className="w-14 h-[2px] bg-slate-400" />{" "}
                    <div className="w-[5px] h-[5px]   rounded-full bg-slate-400" />
                  </div>
                </div>

                <div className="toInfo flex flex-col gap-2 items-end">
                  <span className="to font-bold text-[#ec5b24] truncate xl:text-base text-sm">{trainDetails.destination}</span>
                  <span className="font-bold text-xl">{trainDetails.arrivalTime}</span>
                  <span className="text-slate-400 text-sm font-bold">{weekDays[new Date(obj.date).getDay()]}, {new Date(obj.date).getDate()} {month[new Date(obj.date).getMonth()]}</span>
                </div>
              </div>

            </div>

            <div className="travellersDetails pt-6 pb-12 xl:px-12 flex p-4 xl:rounded-none rounded-10 flex-col gap-4 border xl:border xl:border-slate-400 ">

              <span className='text-lg font-semibold tracking-wider'>Travellers</span>
              {

                Object.keys(travellers.adultsObj).map((key, index) => {
                  const fullName = travellers.adultsObj[key].firstName + " " + travellers.adultsObj[key].lastName
                  const gender = travellers.adultsObj[key].title;
                  return <div key={index} className='flex items-center justify-between rounded-lg'>

                    <div className='flex items-center gap-2 xl:text-base text-sm '>
                      <span className='capitalize'>{fullName}</span>
                      <div className='w-1 h-1 bg-black rounded-full' />
                      <span>{gender}</span>
                      <div className='w-1 h-1 bg-black rounded-full' />
                      <span>Adult</span>
                    </div>

                    <div className='h-[2px] hidden  xl:flex flex-grow px-4'><span className='w-full h-[1px] border'></span></div>

                    <div className='flex gap-4 text-lg'>
                      <div className='cursor-pointer'><MdDeleteOutline /></div>
                      <div className='cursor-pointer'><LiaUserEditSolid /></div>
                    </div>

                  </div>
                })
              }

              {

                  Object.keys(travellers.childrensObj).map((key, index) => {
                  const fullName = travellers.childrensObj[key].firstName + " " + travellers.childrensObj[key].lastName
                  const gender = travellers.childrensObj[key].title;
                  return <div key={index} className='flex items-center justify-between rounded-lg'>

                    <div className='flex items-center gap-2 xl:text-base text-sm'>
                      <span className='capitalize'>{fullName}</span>
                      <div className='w-1 h-1 bg-black rounded-full' />
                      <span>{gender}</span>
                      <div className='w-1 h-1 bg-black rounded-full' />
                      <span>Child</span>
                    </div>

                    <div className='h-[2px] hidden xl:flex flex-grow px-4'><span className='w-full h-[1px] border'></span></div>

                    <div className='flex gap-4 text-lg'>
                      <div className='cursor-pointer'><MdDeleteOutline /></div>
                      <div className='cursor-pointer'><LiaUserEditSolid /></div>
                    </div>

                  </div>
                })
              }

              {
                Object.keys(travellers.infantsObj).map((key, index) => {
                  const fullName = travellers.infantsObj[key].firstName + " " + travellers.infantsObj[key].lastName
                  const gender = travellers.infantsObj[key].title;
                  return <div key={index} className='flex items-center justify-between rounded-lg'>

                    <div className='flex items-center gap-2  xl:text-base text-sm'>
                      <span className='capitalize'>{fullName}</span>
                      <div className='w-1 h-1 bg-black rounded-full' />
                      <span>{gender}</span>
                      <div className='w-1 h-1 bg-black rounded-full' />
                      <span>Infant</span>
                    </div>

                    <div className='h-[2px] hidden xl:flex flex-grow px-4 '><span className='w-full h-[1px] border'></span></div>

                    <div className='flex gap-4 text-lg'>
                      <div><MdDeleteOutline /></div>
                      <div><LiaUserEditSolid /></div>
                    </div>

                  </div>
                })
              }

              <span className='text-lg font-semibold tracking-wider pt-4'>Contact</span>
              <div className='flex flex-col gap-2 xl:text-base text-[15px]'>
                <span> Mobile No :  {travellers.contactDetails.mobileNumber}</span>
                <span>Email id : {travellers.contactDetails.gmail}</span>
              </div>
 
            </div>

          </div>

          <div className="checkOut shadow w-full rounded-10 xl:rounded-t-none xl:w-[60%] flex justify-center py-2 font-bold text-white bg-[#ec5b24] xl:rounded-b-lg cursor-pointer" onClick={()=>{navigate('/Payment', {state:{'tripObj':tripObj, 'bookingId': generateBookingId(), 'paymentFor': 'train'}})}}>REVIEW AND PAY</div>

        </div>

      </div>

    </div>












  )
})

export default BookTrain