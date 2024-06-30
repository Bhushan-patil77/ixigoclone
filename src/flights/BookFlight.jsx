import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CiBowlNoodles } from "react-icons/ci";
import { CiWifiOn } from "react-icons/ci";
import { CiPlug1 } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { PiFirstAidKitLight, PiNumberCircleThree, PiNumberCircleTwo } from "react-icons/pi";
import { FaCaretDown, FaCheck } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowDropdownCircle, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineCircle } from 'react-icons/md';
import { GoCircle } from 'react-icons/go';
import { Checkmark } from 'react-checkmark'

const BookFlight = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const obj = location.state && location.state;

  const airlinesCodeNameAndLogo = {
    "65144a1b664a43628887c45d": { name: "Air India", logoUrl: "https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimg%2Fcommon-resources%2Fairline-new%2FAI.png&w=64&q=75" },
    "65144a1b664a43628887c45e": { name: "IndiGo Airlines", logoUrl: "https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimg%2Fcommon-resources%2Fairline-new%2F6E.png&w=64&q=75" },
    "65144a1b664a43628887c45f": { name: "SpiceJet", logoUrl: "https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimg%2Fcommon-resources%2Fairline-new%2FSG.png&w=64&q=75" },
    "65144a1b664a43628887c460": { name: "Vistara", logoUrl: "https://images.ixigo.com/img/common-resources/airline-new/UK.png" },
    "65144a1b664a43628887c461": { name: "GoAir", logoUrl: "https://images.ixigo.com/img/common-resources/airline-new/G8.png" }
  }


  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


  const [flightDetails, setFlightDetails] = useState({})
  const [travellers, setTravellers] = useState({ 'adultsObj': {}, 'childrensObj': {}, 'infantsObj': {}, 'contactDetails': {} })
  const [continueBtnActive, setContinueBtnActive] = useState(false);
  const [adults, setAdults] = useState({})
  const [childrens, setChildrens] = useState({})
  const [infant, setInfants] = useState({})
  const [seatClass, setSeatClass] = useState(obj.seatClass);
  const [contact, setContact] = useState({})
  const [bookingId, setBookingId] = useState()


  useEffect(() => {
    console.log(obj);
  }, [])


  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (e.target.attributes.type.value == 'adultForm') {
      var adultNumber = e.target.attributes.adultnumber.value
      const title = 'Mr'
      const firstName = e.target[0].value;
      const lastName = e.target[1].value;
      const dateOfBirth = e.target[2].value;
      const nationality = e.target[3].value;

      const validate = () => {
        if (title === "" || lastName === "" || dateOfBirth === "" || firstName === "" || nationality === "") { return false } else { return true }
      }

      console.log(lastName)


      if (validate()) {
        const adult = { 'title': title , 'firstName': firstName, 'lastName': lastName, 'dateOfBirth': dateOfBirth, 'nationality': nationality }

        setTravellers(prevState => ({
          ...prevState,
          adultsObj: {
            ...prevState.adultsObj,
            [`adult${adultNumber}`]: adult
          }
        }));

        setAdults((prev) => {
          return { ...prev, [`adult${adultNumber}`]: adult }
        })


        document.getElementById(`adultNameArrow${adultNumber - 1}`).classList.remove('rotate-180');
        hide(`adultForm${adultNumber - 1}`)

      }
      else {
        alert('enter all fields');
        show(`adultForm${adultNumber - 1}`)

      }





    }

    if (e.target.attributes.type.value == 'childForm') {
      var childrenNumber = e.target.attributes.childrennumber.value
      const title = 'Mr'
      const firstName = e.target[0].value;
      const lastName = e.target[1].value;
      const dateOfBirth = e.target[2].value;
      const nationality = e.target[3].value;


      const validate = () => {
        if (title === "" || firstName === "" || lastName === "" || dateOfBirth === "" || firstName === "" || nationality === "") { return false } else { return true }
      }


      if (validate()) {
        const child = { 'title': title, 'firstName': firstName, 'lastName': lastName, 'dateOfBirth': dateOfBirth, 'nationality': nationality }

        setTravellers(prevState => ({
          ...prevState,
          childrensObj: {
            ...prevState.childrensObj,
            [`children${childrenNumber}`]: child
          }
        }));

        setChildrens((prev) => {
          return { ...prev, [`children${childrenNumber}`]: child }
        })

        document.getElementById(`chilNameArrow${childrenNumber - 1}`).classList.remove('rotate-180');
        hide(`childForm${childrenNumber - 1}`)

      }
      else {

        alert('enter all fields')
        show(`childForm${childrenNumber - 1}`)
      }


    }

    if (e.target.attributes.type.value == 'infantForm') {
      var infantNumber = e.target.attributes.infantnumber.value
      const title = 'Mr'
      const firstName = e.target[0].value;
      const lastName = e.target[1].value;
      const dateOfBirth = e.target[2].value;
      const nationality = e.target[3].value;


      const validate = () => {
        if (title === "" || firstName === "" || lastName === "" || dateOfBirth === "" || firstName === "" || nationality === "") { return false } else { return true }
      }


      if (validate()) {
        const infant = { 'title': title, 'firstName': firstName, 'lastName': lastName, 'dateOfBirth': dateOfBirth, 'nationality': nationality }

        setTravellers(prevState => ({
          ...prevState,
          infantsObj: {
            ...prevState.infantsObj,
            [`infant${infantNumber}`]: infant
          }
        }));

        setInfants((prev) => {
          return { ...prev, [`infant${infantNumber}`]: infant }
        })

        document.getElementById(`infantNameArrow${infantNumber - 1}`).classList.remove('rotate-180');
        hide(`infantForm${infantNumber - 1}`)

      }
      else {
        alert('enter all fields');
        show(`infantForm${infantNumber - 1}`)

      }


    }

    if (e.target.attributes.type.value == 'contactDetailsAndBillingAddressForm') {
      const contryCode = e.target[0].value
      const mobileNumber = e.target[1].value
      const gmail = e.target[2].value

      console.log(contryCode);

      const validate = () => {
        if (contryCode === "" || mobileNumber === "" || gmail === "") { return false } else { return true }
      }


      if (validate()) {
        const contactDetails = { 'contryCode': contryCode, 'mobileNumber': mobileNumber, 'gmail': gmail }

        setTravellers(prevState => ({
          ...prevState,
          contactDetails: contactDetails
        }));

        setContact((prev) => {
          return { ...prev, contactDetails: contactDetails }
        })

      }
      else {
        alert('enter all fields');
      }







    }


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

  const generateBookingId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let bookingId = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      bookingId += characters[randomIndex];
    }
    return bookingId;
  };


  useEffect(() => {
    setBookingId(generateBookingId())
  }, [])


  useEffect(() => {
    getFlightDetails();
  }, [travellers])

  const getFlightDetails = async () => {
    const url = `https://academics.newtonschool.co/api/v1/bookingportals/flight/${obj.flightId}`;
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
        setFlightDetails(data)
      }

      if (response.status === "fail") {
        alert(response.message)
      }
    }
    catch (error) {
      console.log(error);
    }


  }

  const toggleShow = (id) => {
    document.getElementById(id).classList.toggle("hidden");
  }

  const hide = (id) => {
    document.getElementById(id).classList.add("hidden");
  }

  const show = (id) => {
    document.getElementById(id).classList.remove("hidden");
  }

  const checkForActive = () => {
    console.log(travellers);
  }




  return (
    <div className=" MAIN DIV relative bg-neutral-60 w-screen ">

      <div className="flex justify-between rounded-b-10 shadow xl:justify-center items-center sticky top-0 z-50 px-4 bg-white w-full h-[50px] py-2">

        <div className="L xl:absolute left-4 top-[10px] w-[40px] xl:w-[60px]"><img src="https://edge.ixigo.com/st/nivas/_next/static/media/logo.7f81a2a8.svg" alt="" /></div>

        <div className="steps flex justify-center  items-center gap-8 xl:gap-24 ">
          <div className="flightSelection flex flex-col justify-center items-center gap-2 text-xs font-semibold xl:text-base"><Checkmark size='16px' /><p>Flight Selection</p></div>
          <div className='review&details flex flex-col justify-center items-center gap-2 text-xs font-semibold xl:text-base'><PiNumberCircleTwo /><p>Review & Details</p></div>
          <div className="payment flex flex-col justify-center items-center gap-2 text-xs font-semibold xl:text-base"><PiNumberCircleThree /><p>Payment</p></div>
        </div>


        <div className="gap-30 absolute right-4 items-center hidden xl:flex">
          <div className="flex items-center cursor-pointer w-[200px] py-15 justify-end dropdownTab">
            <div className="flex items-center cursor-pointer gap-10">
              <div className="relative">
                <img
                  alt="user-avatar"
                  loading="lazy"
                  width={40}
                  height={40}
                  decoding="async"
                  data-nimg={1}
                  className="h-40 w-40 border border-neutral-subtle rounded-full"
                  src="https://images.ixigo.com/node_image/user_pic/6583161ad82e60426cedb09d.jpg"
                  style={{ color: "transparent" }}
                />
              </div>
              <p className="body-md text-neutral-800" />
              <div className="flex items-center gap-5">
                Hey<div className="truncate max-w-[70px]">Bhushan</div>
                <svg
                  width="1em"
                  height="1em"
                  fontSize="1.5rem"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-testid="ExpandMoreIcon"
                  className="h-6 w-6 expandIcon"
                  style={{ userSelect: "none", display: "inline-block" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M17.7707 8.7125c.2983.2905.3066.77.0187 1.0708L12.54 15.2687A.7474.7474 0 0 1 12 15.5a.7474.7474 0 0 1-.54-.2313L6.2106 9.7833c-.288-.3009-.2796-.7803.0187-1.0708a.746.746 0 0 1 1.0613.0188L12 13.6524l4.7094-4.9211a.7459.7459 0 0 1 1.0613-.0188Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p />
            </div>
            <div className="w-[300px] !px-0 !py-10 shadow-500 rounded-20 top-[60px] bg-white absolute hidden z-[100] dropdownContent overflow-hidden">
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
                    <p className="body-md flex group-[.list-lg]:body-lg text-primary">
                      Bhushan
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
                    <p className="body-sm text-secondary">
                      Your virtual currency
                    </p>
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
              <a className="cursor-pointer" href="">
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
        </div>

      </div>

      <div className="HERO CONTAINER mainContainer mx-auto">
        <div className="flex gap-20 relative bg-neutral-60 justify-center min-h-[calc(100vh-70px)]">


          <div className="LEFT hidden xl:flex CONTAINER w-[400px] min-w-[400px]">
            <div className="sticky top-[90px]">
              <div className="rounded-20 mt-20 overflow-hidden shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]">
                <div className="p-20 bg-white" id="fareSummary">
                  <div className="flex gap-15 flex-col">
                    <div className="flex justify-between items-center lg:cursor-pointer">
                      <h5 className="h5 text-primary lg:font-700 font-medium">
                        Fare Summary
                      </h5>
                      <p className="body-sm text-neutral-500">{obj.adults + obj.childrens + obj.infants} Travellers</p>
                    </div>
                    <div className="flex gap-15 flex-col transition-max-height duration-300 ease-in-out overflow-hidden">
                      <div className="flex justify-between ">
                        <div className="flex flex-row gap-1.5 items-center">
                          <p className="body-md text-primary font-normal">
                            Fare Type
                          </p>
                        </div>
                        <div className="flex items-end gap-1">
                          <p className="body-md text-success-500 font-medium">
                            Partially Refundable
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between ">
                        <div className="flex flex-row gap-1.5 items-center">
                          <p className="body-md text-primary font-normal">
                            Base Fare
                          </p>
                        </div>
                        <div className="flex items-end gap-1">
                          <p className="body-md text-primary font-medium">₹{flightDetails.ticketPrice}</p>
                        </div>
                      </div>
                      <div className="flex justify-between ">
                        <div className="flex flex-row gap-1.5 items-center">
                          <p className="body-md text-primary font-normal">
                            Taxes &amp; Fees
                          </p>
                        </div>
                        <div className="flex items-end gap-1">
                          <p className="body-md text-primary font-medium">₹1,888</p>
                        </div>
                      </div>
                      <hr />
                      <div className="flex justify-between ">
                        <div className="flex flex-row gap-1.5 items-center">
                          <p className="body-md text-primary font-normal">
                            Instant Off
                          </p>
                        </div>
                        <div className="flex items-end gap-1">
                          <p className="body-md text-success-500 font-medium">
                            -₹470
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <div className="flex justify-between mb-5">
                          <h5 className="h5 text-primary font-medium">
                            Total Amount
                          </h5>
                          <h5 className="h5 text-primary font-bold">₹{flightDetails.ticketPrice + 1888 - 470}</h5>
                        </div>
                        <div className="flex flex-col gap-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-60 p-20">
                <div className="flex gap-4 items-start mb-10">
                  <p className="body-md text-primary">
                    By clicking on continue, I confirm that I have read, understood,
                    and agree with the{" "}
                    <span className="text-subbrand-500 underline lg:cursor-pointer ">
                      Fare Rules
                    </span>
                    ,&nbsp;
                    <span className="text-subbrand-500 underline lg:cursor-pointer">
                      Privacy Policy
                    </span>{" "}
                    and&nbsp;
                    <span className="text-subbrand-500 underline lg:cursor-pointer">
                      Terms of Use
                    </span>
                    <span className="text-subbrand-500 underline lg:cursor-pointer" />
                    .
                  </p>
                </div>
                <div className="flex flex-col items-center lg:items-start p-20 lg:p-0">
                  <p className="body-sm text-neutral-400 lg:mb-10 lg:body-md">
                    <strong>100%</strong> Safe Payment Process
                  </p>
                  <div className="flex items-center gap-20">
                    <img
                      alt="IxigoMoney"
                      loading="lazy"
                      width={80}
                      height={40}
                      decoding="async"
                      data-nimg={1}
                      className="lg:ml-[-8px]"
                      srcSet="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F8d146989a2403fd876d092663c34a612-opaxg.png&w=96&q=75 1x, /vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F8d146989a2403fd876d092663c34a612-opaxg.png&w=256&q=75 2x"
                      src="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F8d146989a2403fd876d092663c34a612-opaxg.png&w=256&q=75"
                      style={{ color: "transparent" }}
                    />
                    <img
                      alt="IxigoMoney"
                      loading="lazy"
                      width={80}
                      height={40}
                      decoding="async"
                      data-nimg={1}
                      className="lg:ml-[-8px]"
                      srcSet="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F96045f4b10880512eab5feb8b98e5b37-jwhau.png&w=96&q=75 1x, /vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F96045f4b10880512eab5feb8b98e5b37-jwhau.png&w=256&q=75 2x"
                      src="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F96045f4b10880512eab5feb8b98e5b37-jwhau.png&w=256&q=75"
                      style={{ color: "transparent" }}
                    />
                    <img
                      alt="IxigoMoney"
                      loading="lazy"
                      width={80}
                      height={40}
                      decoding="async"
                      data-nimg={1}
                      className="lg:ml-[-8px]"
                      srcSet="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F19c8e55d72d010d307312d8feae3bed3-pwwik.png&w=96&q=75 1x, /vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F19c8e55d72d010d307312d8feae3bed3-pwwik.png&w=256&q=75 2x"
                      src="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F19c8e55d72d010d307312d8feae3bed3-pwwik.png&w=256&q=75"
                      style={{ color: "transparent" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="LAPTOP RIGHT CONTAINER hidden xl:block w-[820px] reviewRightSection">

            <div className="relative">

              <div className="pb-36 min-h-screen">

                <div className="FLIGHT DETAILS CONTAINER rounded-20 mt-20 overflow-hidden shadow pb-20 bg-white">
                  <div className="px-20 bg-white">
                    <div className="">
                      <div className="py-20 flex items-center">
                        <div className="w-full">
                          <div className="flex justify-between items-center">
                            <h5 className="h5 text-primary flex items-center font-medium">
                              <span className="">{obj.sourceCity}</span>
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
                              <span className=""> {obj.destinationCity}</span>
                            </h5>
                          </div>
                          <p className="body-sm text-primary ">
                            <span className="font-500">{weekDays[obj.day]}, {obj.date} {month[obj.month]} •</span> {flightDetails.stops} stops
                            • {flightDetails.duration}h • Economy
                          </p>
                        </div>
                      </div>
                      <div className="">


                        <div className="flex items-center gap-10 mb-10">
                          <div className="flex justify-between ">
                            <div className="flex items-center">
                              {
                                Object.keys(flightDetails).length > 0 && <img src={airlinesCodeNameAndLogo[flightDetails.airline].logoUrl} width={40} height={40} alt="" />
                              }
                              <div className="flex-col items-center ml-5">
                                <p
                                  data-testid="airline-number"
                                  className="body-sm text-secondary truncate max-w-[255px]"
                                >
                                  <span className="body-md text-primary">
                                    {
                                      Object.keys(flightDetails).length > 0 && airlinesCodeNameAndLogo[flightDetails.airline].name
                                    }
                                  </span>{" "}
                                  | {flightDetails.flightID}
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
                                style={{
                                  userSelect: "none",
                                  display: "inline-block"
                                }}
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


                        <div className="flex justify-between gap-20 ">
                          <div className="w-full max-w-[380px]">
                            <div className="flex justify-between">
                              <div className="min-w-[140px] text-left">
                                <p className="body-sm text-secondary">
                                  {weekDays[obj.day]}, {obj.date} {month[obj.month]}
                                </p>
                                <h4 className="h4 text-primary mb-5 font-medium">
                                  {flightDetails.departureTime}
                                </h4>
                                <p className="body-sm text-primary mb-5 font-medium">
                                  {flightDetails.source} - {obj.sourceCity}
                                </p>
                              </div>
                              <div className="min-w-[60px] text-center mt-30">
                                <p className="body-sm text-secondary"> {flightDetails.duration}h </p>
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
                                <p className="body-sm text-secondary">
                                  {weekDays[obj.day]}, {obj.date} {month[obj.month]}
                                </p>
                                <h4 className="h4 text-primary mb-5 font-medium">
                                  {flightDetails.arrivalTime}
                                </h4>
                                <p className="body-sm text-primary mb-5 font-medium">
                                  {flightDetails.destination} - {obj.destinationCity}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between gap-100">
                              <div className="w-[140px] text-left max-h-[34px]">
                                <p className="body-xs text-secondary mb-5">
                                  {obj.from.name}
                                </p>
                              </div>
                              <div className="text-right w-[140px] max-h-[34px]">
                                <p className="body-xs text-secondary mb-5">
                                  {obj.to.name}
                                </p>
                              </div>
                            </div>

                          </div>

                          <div className="min-w-[340px]">
                            <div className="flex gap-20">
                              <div className="flex flex-col min-w-[100px] gap-10">
                                <div className="flex gap-1 items-center">
                                  <p className="body-sm text-charcoal-800 font-medium">
                                    Baggage
                                  </p>
                                </div>
                                <p className="body-sm text-charcoal-800">
                                  Per Traveller
                                </p>
                              </div>
                              <div className="flex flex-col min-w-[100px] gap-10">
                                <div className="flex gap-1 items-center">
                                  <p className="body-sm text-charcoal-800 font-medium">
                                    Cabin
                                  </p>
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
                        <div className="flex items-center gap-10 mt-20">
                          <div className="flex items-center gap-5">
                            <svg
                              width="1em"
                              height="1em"
                              fontSize={20}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              data-testid="FlightEngineFilledIcon"
                              style={{
                                userSelect: "none",
                                display: "inline-block"
                              }}
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
                              style={{
                                userSelect: "none",
                                display: "inline-block"
                              }}
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
                              style={{
                                userSelect: "none",
                                display: "inline-block"
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M9.25 5.5H6a.5.5 0 0 0-.5.5v3.25a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5ZM6 11.25c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2h3.25c1.1046 0 2 .8954 2 2v3.25c0 1.1046-.8954 2-2 2H6ZM11.25 18v-3.25c0-1.1046-.8954-2-2-2H6c-1.1046 0-2 .8954-2 2V18c0 1.1046.8954 2 2 2h3.25c1.1046 0 2-.8954 2-2Zm1.5-12v3.25c0 1.1046.8954 2 2 2H18c1.1046 0 2-.8954 2-2V6c0-1.1046-.8954-2-2-2h-3.25c-1.1046 0-2 .8954-2 2ZM5.5 14.75V18a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5v-3.25a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0-.5.5Zm9.25 3.75H18a.5.5 0 0 0 .5-.5v-3.25a.5.5 0 0 0-.5-.5h-3.25a.5.5 0 0 0-.5.5V18a.5.5 0 0 0 .5.5Zm0-8.75H18a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-3.25a.5.5 0 0 0-.5.5v3.25a.5.5 0 0 0 .5.5Zm0 10.25c-1.1046 0-2-.8954-2-2v-3.25c0-1.1046.8954-2 2-2H18c1.1046 0 2 .8954 2 2V18c0 1.1046-.8954 2-2 2h-3.25Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="body-xs text-primary">
                              Narrow (Limited seat tilt)
                            </p>
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
                </div>


                <div className="TRAVELLERS DETAILS CONTAINER rounded-20 mt-20 overflow-hidden shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)] bg-white">
                  <div className="bg-white pt-20">

                    <h5 className="h5 px-20 font-bold">Traveller Details</h5>

                    <div className="flex justify-between items-center px-20">
                      <p className="body-md text-secondary">
                        Choose from the saved list or add a new passenger{" "}
                      </p>
                      <p className="body-sm text-secondary">{obj.adults + obj.childrens + obj.infants} Travellers</p>
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
                                  <p className="body-sm text-warning-moderate">
                                    Please ensure that your name matches your govt. ID such as
                                    Aadhaar, Passport or Driver's License
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="CHECKED TRAVELLERS NAMES CONTAINER  mx-20 pt-20 border rounded-20 max-h-[260px] overflow-y-scroll no-scrollbar">

                          {
                            obj.adults > 0 ? <div className="ADULTS CHECKED NAMES CONTAINER mx-20 mb-15 pb-10 border-b border-neutral-200 last-of-type:border-none last-of-type:pb-0">
                              <div className="flex justify-between">
                                <p className="body-md text-primary font-medium">
                                  Adults (12 yrs or above)
                                </p>
                              </div>

                              <div className="ADULTS NAMES GRID lg:grid lg:grid-cols-3 lg:gap-x-15 items-start">

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
                                        <div className="NAME DIV flex flex-col flex-auto  !pl-10">
                                          <p className="body-md flex group-[.list-lg]:body-lg text-primary"> {adult.title} {adult.firstName} {adult.lastName} </p>
                                        </div>
                                      </div>
                                    </li>
                                  })
                                }

                              </div>
                            </div>
                              :
                              ""
                          }

                          {
                            obj.childrens > 0 ? <div className="CHILDS CHECKED NAMES CONTAINER mx-20 mb-15 pb-10 border-b border-neutral-200 last-of-type:border-none last-of-type:pb-0">
                              <div className="flex justify-between">
                                <p className="body-md text-primary font-medium">
                                  Child (2-12 yrs)
                                </p>
                              </div>
                              <div className="CHILDRENS NAMES GRID lg:grid lg:grid-cols-3 lg:gap-x-15 items-start">

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
                                            {children.title} {children.firstName} {children.lastName}
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  })
                                }


                              </div>
                            </div>
                              :
                              ""
                          }

                          {
                            obj.infants > 0 ? <div className="INFANTS CHECKED NAMES CONTAINER mx-20 mb-15 pb-10 border-b border-neutral-200 last-of-type:border-none last-of-type:pb-0">
                              <div className="flex justify-between">
                                <p className="body-md text-primary font-medium">Infant (0-2 yrs)</p>
                              </div>
                              <div className="INFANT CHECKED NAME lg:grid lg:grid-cols-3 lg:gap-x-15 items-start">

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
                                            {infant.title} {infant.firstName} {infant.lastName}
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  })
                                }

                              </div>
                            </div>
                              :
                              ""
                          }

                        </div>

                      </div>
                    </div>


                    <div className=" NAMES INPU FORM mx-20 space-y-[5px] lg:rounded-10 lg:bg-neutral-50 my-20">


                      {
                        Array(obj.adults).fill(0).map((adult, index) => {



                          return <div key={index}>
                            <div className="lg:py-5 lg:px-20" id="adult1" >

                              <div className="ADULT FIRST MIDDLE LAST NAME flex justify-between items-center cursor-pointer" >
                                <div className="flex items-center gap-4">
                                  <div className="flex justify-center items-center w-[20px] h-[20px]   rounded-full" onClick={() => { toggleShow(`adultForm${index}`) }}>
                                    <IoIosArrowDropdownCircle id={`adultNameArrow${index}`} className={`w-full h-full transition duration-200`} onClick={() => { document.getElementById(`adultNameArrow${index}`).classList.toggle('rotate-180') }} />
                                  </div>
                                  <p className="body-sm capitalize font-medium">
                                    Adult {index + 1}
                                    <span className="capitalize"> - {Object.keys(travellers.adultsObj).includes(`adult${index + 1}`) && `${travellers.adultsObj[`adult${index + 1}`].title} ${travellers.adultsObj[`adult${index + 1}`].firstName} ${travellers.adultsObj[`adult${index + 1}`].lastName}`}</span>
                                  </p>
                                </div>
                                {Object.keys(travellers.adultsObj).includes(`adult${index + 1}`) ? <IoIosCheckmarkCircleOutline className='w-6 text-green-700  h-6' /> : <GoCircle className='w-[27px] text-green-700  h-[27px] p-1' />}
                              </div>

                              <div id={`adultForm${index}`} className="ADULTS DETAILS INPUT FORM hidden flex flex-col">
                                <div className="bg-white flex-grow">

                                  <form type={"adultForm"} adultnumber={index + 1} onSubmit={(e) => { handleFormSubmit(e) }}>
                                    <div className="grid grid-cols-3 pt-0 gap-15 bg-neutral-50">
                                      <div className="w-full">
                                        <div className="inline-flex flex-col text-secondary w-full">
                                          <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                            <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                            <div className="flex flex-grow items-center">
                                              <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                                Title
                                              </label>
                                              <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                                <option value="Mr" >Mr</option>
                                                <option value="Ms">Ms</option>
                                                <option value="Mrs">Mrs</option>
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
                                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 placeholder:opacity-0 focus:placeholder:opacity-100"
                                                  defaultValue=""
                                                  required
                                                />
                                              </div>
                                            </div>
                                            <div className="body-xs  px-15">
                                              Your first name should have 1-32 characters{" "}
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
                                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 placeholder:opacity-0 focus:placeholder:opacity-100"
                                                  defaultValue=""
                                                  required
                                                />
                                              </div>
                                            </div>
                                            <div className="body-xs px-15">
                                              Your last name should have 2-32 characters
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
                                            <input id={`adultDOBInput${index}`}
                                              placeholder="DD/MM/YYYY"
                                              maxLength={10}
                                              autoComplete="new-password"
                                              className="outline-none w-full bg-transparent placeholder:text-disabled py-3 placeholder:opacity-0 focus:placeholder:opacity-100"
                                              type="text"
                                              defaultValue=""
                                              required
                                            />
                                          </div>
                                        </div>
                                        <div className="body-xs px-15">
                                          Please enter your date of birth
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
                                                <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                                  <option value="Indian" className='w-full'>Indian</option>
                                                  <option value="American">American</option>
                                                </select>
                                              </div>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='VALIDATE & SAVE BUTTON flex justify-center items-center ' >
                                        <button className=' h-[48px] rounded-xl px-4 bg-white shadow-300' onClick={() => { checkForActive() }}>Validate & Save</button>
                                      </div>
                                    </div>

                                  </form>
                                </div>
                              </div>

                            </div>

                          </div>

                        })
                      }


                      {
                        Array(obj.childrens).fill(0).map((child, index) => {

                          return <div key={index}>
                            <div className="lg:py-5 lg:px-20" id="child1" >

                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                  <div className="flex justify-center items-center w-[20px] h-[20px] rounded-full transition duration-300" onClick={() => { toggleShow(`childForm${index}`) }} >
                                    <IoIosArrowDropdownCircle id={`chilNameArrow${index}`} className='w-full h-full transition duration-200' onClick={() => { document.getElementById(`chilNameArrow${index}`).classList.toggle('rotate-180') }} />
                                  </div>
                                  <p className="body-sm capitalize font-medium">
                                    Child {index + 1}<span className="capitalize"> - {Object.keys(travellers.childrensObj).includes(`children${index + 1}`) && `${travellers.childrensObj[`children${index + 1}`].title} ${travellers.childrensObj[`children${index + 1}`].firstName} ${travellers.childrensObj[`children${index + 1}`].lastName}  `}</span>
                                  </p>
                                </div>
                                {Object.keys(travellers.childrensObj).includes(`children${index + 1}`) ? <IoIosCheckmarkCircleOutline className='w-6 text-green-700  h-6' /> : <GoCircle className='w-[27px] text-green-700  h-[27px] p-1' />}

                              </div>

                              <div id={`childForm${index}`} className="CHILD DETAILS INPUT FORM hidden flex flex-col">
                                <div className="bg-white flex-grow">
                                  <form type={'childForm'} childrennumber={index + 1} onSubmit={(e) => { handleFormSubmit(e) }}>
                                    <div className="grid grid-cols-3 pt-0 gap-15 bg-neutral-50">

                                      <div className="TITLE INPUT w-full">
                                        <div className="inline-flex flex-col text-secondary w-full">
                                          <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                            <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                            <div className="flex flex-grow items-center">
                                              <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                                Title
                                              </label>
                                              <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                                <option value="Mr" >Mr</option>
                                                <option value="Ms">Ms</option>
                                                <option value="Mrs">Mrs</option>
                                              </select>
                                            </div>

                                          </div>
                                        </div>
                                      </div>
                                      <div className='FIRST & MIDDLE NAME INPUT'>
                                        <div className="w-auto">
                                          <div className="inline-flex flex-col text-secondary w-full">
                                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10 " />
                                              <div className="flex flex-grow items-center">
                                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                                  First &amp; Middle Name
                                                </label>
                                                <input
                                                  autoComplete="new-password"
                                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 placeholder:opacity-0 focus:placeholder:opacity-100"
                                                  defaultValue=""
                                                  required
                                                />
                                              </div>
                                            </div>
                                            <div className="body-xs px-15">
                                              Your first name should have 1-32 characters{" "}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='LAST NAME INPUT'>
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
                                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 placeholder:opacity-0 focus:placeholder:opacity-100"
                                                  defaultValue=""
                                                  required
                                                />
                                              </div>
                                            </div>
                                            <div className="body-xs  px-15">
                                              Your last name should have 2-32 characters
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="DOB INPUT inline-flex flex-col text-secondary w-full">
                                        <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                          <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10" />
                                          <div className="flex flex-grow items-center">
                                            <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                              Date of Birth
                                            </label>
                                            <input
                                              placeholder="DD/MM/YYYY"
                                              maxLength={10}
                                              autoComplete="new-password"
                                              className="outline-none w-full bg-transparent placeholder:text-disabled py-3 placeholder:opacity-0 focus:placeholder:opacity-100"
                                              type="text"
                                              defaultValue=""
                                              required
                                            />
                                          </div>
                                        </div>
                                        <div className="body-xs  px-15">
                                          Please enter your date of birth
                                        </div>
                                      </div>
                                      <div className='NATIONALITY INPUT'>
                                        <div className="w-auto">
                                          <div className="inline-flex flex-col text-secondary w-full">
                                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                              <div className="flex flex-grow items-center">
                                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                                  Nationality
                                                </label>
                                                <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                                  <option value="Indian" className='w-full'>Indian</option>
                                                  <option value="American">American</option>
                                                </select>
                                              </div>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='VALIDATE & SAVE BUTTON flex justify-center items-center '>
                                        <button className=' h-[48px] rounded-xl px-4 bg-white shadow-300'>Validate & Save</button>
                                      </div>


                                    </div>
                                  </form>
                                </div>
                              </div>

                            </div>

                          </div>

                        })
                      }


                      {
                        Array(obj.infants).fill(0).map((infant, index) => {
                          return <div key={index}>

                            <div className=" INFANT lg:py-5 lg:px-20" id="infant1">

                              <div className="INFANT NUMBER AND NAME IF CHECKED flex justify-between items-center" >
                                <div className="flex items-center gap-4">
                                  <div className="flex justify-center items-center w-[20px] h-[20px] rounded-full " >
                                    <IoIosArrowDropdownCircle id={`infantNameArrow${index}`} className={`w-full h-full transition duration-200`} onClick={() => { document.getElementById(`infantNameArrow${index}`).classList.toggle('rotate-180'); toggleShow(`infantForm${index}`) }} />
                                  </div>
                                  <p className="body-sm capitalize font-medium">
                                    Infant {index + 1}-<span className='capitalize'> {Object.keys(travellers.infantsObj).includes(`infant${index + 1}`) && `${travellers.infantsObj[`infant${index + 1}`].title} ${travellers.infantsObj[`infant${index + 1}`].firstName} ${travellers.infantsObj[`infant${index + 1}`].lastName} `} </span>
                                  </p>
                                </div>
                                <button className="inline-flex justify-center items-center text-brand hover:bg-brand-over gap-[2px] rounded-10 min-h-[30px] button-sm py-[3px] px-5 hover:bg-transparent">
                                  {Object.keys(travellers.infantsObj).includes(`infant${index + 1}`) ? <IoIosCheckmarkCircleOutline className='w-6 text-green-700  h-6' /> : <GoCircle className='w-[27px] text-green-700  h-[27px] p-1' />}

                                </button>
                              </div>

                              <div id={`infantForm${index}`} className="INFANT DETAILS INPUT FORM hidden  flex-col">
                                <div className="bg-white flex-grow">
                                  <form type={'infantForm'} infantnumber={index + 1} onSubmit={(e) => { handleFormSubmit(e) }}>
                                    <div className="grid grid-cols-3 pt-0 gap-15 bg-neutral-50">

                                      <div className="INFANT TITLE w-full">
                                        <div className="inline-flex flex-col text-secondary w-full">
                                          <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                            <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                            <div className="flex flex-grow items-center">
                                              <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                                Title
                                              </label>
                                              <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                                <option value="Mr" >Mr</option>
                                                <option value="Ms">Ms</option>
                                                <option value="Mrs">Mrs</option>
                                              </select>
                                            </div>

                                          </div>
                                        </div>
                                      </div>

                                      <div className='INFANT FIRST NAME'>
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
                                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 placeholder:opacity-0 focus:placeholder:opacity-100"
                                                  defaultValue=""
                                                  required
                                                />
                                              </div>
                                            </div>
                                            <div className="body-xs  px-15">
                                              Your first name should have 1-32 characters{" "}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className='INFANT LAST NAME'>
                                        <div className="w-auto">
                                          <div className="inline-flex flex-col text-secondary w-full">
                                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10 " />
                                              <div className="flex flex-grow items-center">
                                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white ">
                                                  Last Name
                                                </label>
                                                <input
                                                  autoComplete="new-password"
                                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 placeholder:opacity-0 focus:placeholder:opacity-100"
                                                  defaultValue=""
                                                  required
                                                />
                                              </div>
                                            </div>
                                            <div className="body-xs px-15">
                                              Your last name should have 2-32 characters
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className=" INFANT DOB inline-flex flex-col text-secondary w-full">
                                        <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                          <div className="absolute inset-0 transition-[border] select-none pointer-events-none border-2 rounded-10" />
                                          <div className="flex flex-grow items-center">
                                            <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                              Date of Birth
                                            </label>
                                            <input
                                              placeholder="DD/MM/YYYY"
                                              maxLength={10}
                                              autoComplete="new-password"
                                              className="outline-none w-full bg-transparent placeholder:text-disabled py-3 placeholder:opacity-0 focus:placeholder:opacity-100"
                                              type="text"
                                              defaultValue=""
                                              required
                                            />
                                          </div>
                                        </div>
                                        <div className="body-xs px-15">
                                          Please enter your date of birth
                                        </div>
                                      </div>

                                      <div className='INFANT NATIONALITY'>
                                        <div className="w-auto">
                                          <div className="inline-flex flex-col text-secondary w-full">
                                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                              <div className="flex flex-grow items-center">
                                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                                  Nationality
                                                </label>
                                                <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                                  <option value="Indian" className='w-full'>Indian</option>
                                                  <option value="American">American</option>
                                                </select>
                                              </div>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className='VALIDATE & SAVE BUTTON flex justify-center items-center '>
                                        <button className=' h-[48px] rounded-xl px-4 bg-white shadow-300'>Validate & Save</button>
                                      </div>

                                    </div>
                                  </form>
                                </div>
                              </div>

                            </div>

                          </div>
                        })
                      }



                    </div>

                  </div>
                </div>

                <div className="CONTACT DETAILS CONTAINER mt-20 rounded-20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)] bg-white overflow-hidden">

                  <form type={"contactDetailsAndBillingAddressForm"} onSubmit={(e) => { handleFormSubmit(e) }}>

                    <div className="CONTACT DETAILS p-20">
                      <h5 className="h5 font-bold">Contact Details</h5>
                      <p className="body-md text-secondary">
                        Your ticket &amp; flight information will be sent here
                      </p>
                      <div className="bg-white p-20 lg:mt-20 lg:rounded-20 lg:bg-charcoal-20">
                        <div className="flex flex-col mt-15 lg:mt-0 lg:gap-20 lg:grid lg:grid-cols-3">
                          <div className="w-auto">
                            <div className="inline-flex flex-col text-secondary w-full text-primary">
                              <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                <div className="flex flex-grow items-center">
                                  <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                    Country Code
                                  </label>
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
                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                  Mobile Number
                                </label>
                                <input
                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100"
                                  type="number"
                                  defaultValue={9834832178}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="inline-flex flex-col text-secondary w-full text-primary">
                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                              <div className="flex flex-grow items-center">
                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                  Email
                                </label>
                                <input
                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100"
                                  defaultValue="bhushanravindrapatil77@gmail.com"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="GST BILLING ADDRESS DETAILS p-20">
                              <h5 className="h5 font-bold">GST Details</h5>
                              <p className="body-md text-secondary">
                                To claim credit for the GST charged by airlines, please enter
                                your GST details
                              </p>
                              <div className="flex items-center pt-10 pb-10">
                                <span className="relative shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary">
                                  <input
                                    className="absolute opacity-0 w-full h-full inset-0 cursor-pointer"
                                    type="checkbox"
                                    defaultValue="gst"
                                    name="optgst"
                                  />
                                </span>
                                <p className="body-lg pl-10">
                                  I would like to add my GST Number
                                </p>
                              </div>
                              <div className="flex">
                                <div className="flex-1 hidden">
                                  <div className="flex flex-col p-20 gap-15 lg:gap-20 lg:grid lg:grid-cols-3 lg:rounded-20 lg:bg-charcoal-20">
                                    <div className="inline-flex flex-col text-secondary">
                                      <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                        <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                        <div className="flex flex-grow items-center">
                                          <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center]">
                                            GSTIN
                                          </label>
                                          <input
                                            placeholder="GSTIN"
                                            className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100 uppercase"
                                            type="text"
                                            defaultValue=""
                                            name="gstin"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="inline-flex flex-col text-secondary">
                                      <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                        <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                        <div className="flex flex-grow items-center">
                                          <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center]">
                                            Company Name
                                          </label>
                                          <input
                                            placeholder="Company Name"
                                            className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100"
                                            type="text"
                                            defaultValue=""
                                            name="name"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="inline-flex flex-col text-secondary">
                                      <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                        <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                        <div className="flex flex-grow items-center">
                                          <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center]">
                                            Address
                                          </label>
                                          <input
                                            placeholder="Company Address"
                                            className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100"
                                            type="text"
                                            defaultValue=""
                                            name="address"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="inline-flex flex-col text-secondary">
                                      <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                        <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                        <div className="flex flex-grow items-center">
                                          <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center]">
                                            Pincode
                                          </label>
                                          <input
                                            placeholder="Pincode"
                                            className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100"
                                            type="number"
                                            defaultValue=""
                                            name="pin"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="inline-flex flex-col text-secondary">
                                      <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                        <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                        <div className="flex flex-grow items-center">
                                          <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center]">
                                            City
                                          </label>
                                          <input
                                            placeholder="City"
                                            className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100"
                                            type="text"
                                            defaultValue=""
                                            name="city"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-auto">
                                      <div className="inline-flex flex-col text-secondary w-full text-primary">
                                        <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                          <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                          <div className="flex flex-grow items-center">
                                            <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center]">
                                              State
                                            </label>
                                            <input type="text"  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100" />
                                          </div>
                                      
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-1 block">
                                  <h5 className="h5 pt-20 font-bold">Billing Address</h5>
                                  <p className="body-md text-secondary">
                                    As per the latest govt. regulations, it’s mandatory to
                                    provide your address.
                                  </p>
                                  <div
                                    className="bg-white p-20 mt-10 lg:rounded-20 lg:bg-charcoal-20"
                                    data-testid="billingAddress"
                                  >
                                    <div className="border-b border-tertiary last-of-type:border-b-transparent border-none">
                                      <div className="pt-5 pb-15 !pt-0 !pb-0">
                                        <div className="flex flex-col mt-5 gap-y-15 lg:flex-row lg:flex-wrap lg:justify-between">
                                          <div className="inline-flex flex-col text-secondary lg:basis-[48%]">
                                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                              <div className="flex flex-grow items-center">
                                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                                  Pincode
                                                </label>
                                                <input
                                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100"
                                                  type="number"
                                                  defaultValue={411032}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="inline-flex flex-col text-secondary lg:basis-[48%]">
                                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                              <div className="flex flex-grow items-center">
                                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center]">
                                                  Address
                                                </label>
                                                <input type="text" className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100" />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="inline-flex flex-col text-secondary lg:basis-[48%]">
                                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                              <div className="flex flex-grow items-center">
                                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center]">
                                                  city
                                                </label>
                                                <input type="text" className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100" />
                                              </div>
                                            </div>
                                        </div>
                                        <div className="inline-flex flex-col text-secondary lg:basis-[48%]">
                                          <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                            <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                            <div className="flex flex-grow items-center">
                                              <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center]">
                                                state
                                              </label>
                                              <input type="text" className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="h-auto overflow-visible"
                                      style={{ minHeight: 0 }}
                                    >
                                      <div className="flex w-full">
                                        <div className="w-full" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}

                    <div className='VALIDATE & SAVE BUTTON flex justify-center items-center ' >
                      <button className=' h-[48px] rounded-xl px-4 bg-white shadow-300 mb-4'>Validate & Save</button>
                    </div>
                  </form>

                </div>



              </div>

              <div className="FINAL AMOUNT AND SAVE TRAVELLERS CONTAINER sticky bottom-0 z-[11] md:right-0 xl:right-[inherit] w-full lg:shadow-300 lg:rounded-t-20 lg:overflow-hidden">
                <div className="flex border-t lg:border-0 w-full border-neutral-100 px-20 py-10 items-center justify-between bg-white z-5">
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-5 lg:flex-row-reverse items-center lg:items-baseline lg:justify-end">
                      <p className="body-sm text-secondary decoration-slice">
                        • {obj.adults + obj.childrens + obj.infants} Travellers
                      </p>
                      <p className="body-sm decoration-slice text-secondary  line-through">
                        ₹{flightDetails.ticketPrice + 3000 - 470}
                      </p>
                      <h5 className="h5 lg:font-500">₹{flightDetails.ticketPrice + 1888 - 470}</h5>
                    </div>
                    <div className="flex items-center gap-1" />
                  </div>
                  <button className={`inline-flex justify-center items-center  text-brand-solid  gap-5 rounded-10 min-h-[50px] button-lg py-[13px] px-15 ${(Object.keys(adults).length == obj.adults && Object.keys(childrens).length == obj.childrens && Object.keys(infant).length == obj.infants && Object.keys(contact).length > 0) ? `bg-orange-700 text-white cursor-pointer` : `bg-gray-200 text-gray-400 cursor-not-allowed `} `} onClick={() => { navigate('/Payment', { state: { 'bookingId': bookingId, 'travellers': travellers, 'flightDetails': obj, 'paymentFor': 'flight' } }) }}>
                    Pay Now
                    <svg
                      width="1em"
                      height="1em"
                      fontSize="1.5rem"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      data-testid="ChevronRightIcon"
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

          <div className="MOBILE xl:hidden RIGHT CONTAINER w-screen reviewRightSection ">

            <div className="relative">

              <div className="pb-36 min-h-screen">

                <div className="FLIGHT DETAILS CONTAINER rounded-20 mt-20 overflow-hidden shadow pb-20 bg-white">
                    

                      <div className=" flex flex-col p-4 gap-4">

                        <div className="QUICK DETAILS w-full  ">
                          <div className="flex justify-between items-center">
                            <h5 className="h5 text-primary flex items-center font-medium">
                              <span className="">{obj.sourceCity}</span>
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
                              <span className=""> {obj.destinationCity}</span>
                            </h5>
                          </div>
                          <p className="body-sm text-primary ">
                            <span className="font-500">{weekDays[obj.day]}, {obj.date} {month[obj.month]} •</span> {flightDetails.stops} stops
                            • {flightDetails.duration}h • {seatClass}
                          </p>
                        </div>

                        <div className="LOGO&FLIGHTNAME flex items-center gap-10  ">
                          <div className="flex justify-between ">
                            <div className="flex items-center">
                              {
                                Object.keys(flightDetails).length > 0 && <img src={airlinesCodeNameAndLogo[flightDetails.airline].logoUrl} width={40} height={40} alt="" />
                              }
                              <div className="flex-col items-center ml-5">
                                <p
                                  data-testid="airline-number"
                                  className="body-sm text-secondary truncate max-w-[255px]"
                                >
                                  <span className="body-md text-primary">
                                    {
                                      Object.keys(flightDetails).length > 0 && airlinesCodeNameAndLogo[flightDetails.airline].name
                                    }
                                  </span>{" "}
                                  | {flightDetails.flightID}
                                </p>
                              </div>
                            </div>
                          </div>
                     
                        </div>

                          <div className=" FLIGHT DETAILS w-full  ">
                            <div className="flex justify-between">
                              <div className="min-w-[140px] text-left">
                                <p className="body-sm text-secondary">
                                  {weekDays[obj.day]}, {obj.date} {month[obj.month]}
                                </p>
                                <h4 className="h4 text-primary mb-5 font-medium">
                                  {flightDetails.departureTime}
                                </h4>
                                <p className="body-sm text-primary mb-5 font-medium">
                                  {flightDetails.source} - {obj.sourceCity}
                                </p>
                              </div>
                              <div className="min-w-[60px] text-center mt-30">
                                <p className="body-sm text-secondary"> {flightDetails.duration}h </p>
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
                                <p className="body-sm text-secondary">
                                  {weekDays[obj.day]}, {obj.date} {month[obj.month]}
                                </p>
                                <h4 className="h4 text-primary mb-5 font-medium">
                                  {flightDetails.arrivalTime}
                                </h4>
                                <p className="body-sm text-primary mb-5 font-medium">
                                  {flightDetails.destination} - {obj.destinationCity}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between gap-100">
                              <div className="w-[140px] text-left max-h-[34px]">
                                <p className="body-xs text-secondary mb-5">
                                  {obj.from.name}
                                </p>
                              </div>
                              <div className="text-right w-[140px] max-h-[34px]">
                                <p className="body-xs text-secondary mb-5">
                                  {obj.to.name}
                                </p>
                              </div>
                            </div>

                          </div>

                          <div className="BAGAGES w-full ">
                            <div className="flex gap-20">
                              <div className="flex flex-col min-w-[100px] gap-10">
                                <div className="flex gap-1 items-center">
                                  <p className="body-sm text-charcoal-800 font-medium">
                                    Baggage
                                  </p>
                                </div>
                                <p className="body-sm text-charcoal-800">
                                  Per Traveller
                                </p>
                              </div>
                              <div className="flex flex-col min-w-[100px] gap-10">
                                <div className="flex gap-1 items-center">
                                  <p className="body-sm text-charcoal-800 font-medium">
                                    Cabin
                                  </p>
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

                        <div className="AMENITIES flex flex-col  gap-4  ">
                           
                           <div className='flex gap-4'>
                           <div className="flex items-center gap-5">
                            <svg
                              width="1em"
                              height="1em"
                              fontSize={20}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              data-testid="FlightEngineFilledIcon"
                              style={{
                                userSelect: "none",
                                display: "inline-block"
                              }}
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
                              style={{
                                userSelect: "none",
                                display: "inline-block"
                              }}
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
                              style={{
                                userSelect: "none",
                                display: "inline-block"
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M9.25 5.5H6a.5.5 0 0 0-.5.5v3.25a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5ZM6 11.25c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2h3.25c1.1046 0 2 .8954 2 2v3.25c0 1.1046-.8954 2-2 2H6ZM11.25 18v-3.25c0-1.1046-.8954-2-2-2H6c-1.1046 0-2 .8954-2 2V18c0 1.1046.8954 2 2 2h3.25c1.1046 0 2-.8954 2-2Zm1.5-12v3.25c0 1.1046.8954 2 2 2H18c1.1046 0 2-.8954 2-2V6c0-1.1046-.8954-2-2-2h-3.25c-1.1046 0-2 .8954-2 2ZM5.5 14.75V18a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5v-3.25a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0-.5.5Zm9.25 3.75H18a.5.5 0 0 0 .5-.5v-3.25a.5.5 0 0 0-.5-.5h-3.25a.5.5 0 0 0-.5.5V18a.5.5 0 0 0 .5.5Zm0-8.75H18a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-3.25a.5.5 0 0 0-.5.5v3.25a.5.5 0 0 0 .5.5Zm0 10.25c-1.1046 0-2-.8954-2-2v-3.25c0-1.1046.8954-2 2-2H18c1.1046 0 2 .8954 2 2V18c0 1.1046-.8954 2-2 2h-3.25Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="body-xs text-primary">
                              Narrow (Limited seat tilt)
                            </p>
                          </div>
                           </div>

                          <div className=' flex gap-4'>
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

                <div className="TRAVELLERS DETAILS CONTAINER rounded-20 mt-20 overflow-hidden shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)] bg-white">
                  <div className="bg-white pt-20">

                    <h5 className="h5 px-20 font-bold">Traveller Details</h5>

                    <div className="flex justify-end items-center px-20">
                    
                      <p className="body-sm font-semibold">{obj.adults + obj.childrens + obj.infants} Travellers</p>
                    </div>

                    <div className="flex flex-col">
                      <div className="bg-white flex-grow  pb-4 lg:pb-0">
                        
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
                                  <p className="body-sm text-warning-moderate">
                                    Please ensure that your name matches your govt. ID such as
                                    Aadhaar, Passport or Driver's License
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="CHECKED TRAVELLERS NAMES CONTAINER  mx-20 pt-20 border rounded-20 max-h-[260px]  overflow-y-scroll no-scrollbar">

                          {
                            obj.adults > 0 ? <div className="ADULTS CHECKED NAMES CONTAINER mx-20 mb-15 pb-10 border-b border-neutral-200 last-of-type:border-none last-of-type:pb-0">
                              <div className="flex justify-between">
                                <p className="body-md text-primary font-medium">
                                  Adults (12 yrs or above)
                                </p>
                              </div>

                              <div className="ADULTS NAMES GRID lg:grid lg:grid-cols-3 lg:gap-x-15 items-start">

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
                                        <div className="NAME DIV flex flex-col flex-auto  !pl-10">
                                          <p className="body-md flex group-[.list-lg]:body-lg text-primary"> {adult.title} {adult.firstName} {adult.lastName} </p>
                                        </div>
                                      </div>
                                    </li>
                                  })
                                }

                              </div>
                            </div>
                              :
                              ""
                          }

                          {
                            obj.childrens > 0 ? <div className="CHILDS CHECKED NAMES CONTAINER mx-20 mb-15 pb-10 border-b border-neutral-200 last-of-type:border-none last-of-type:pb-0">
                              <div className="flex justify-between">
                                <p className="body-md text-primary font-medium">
                                  Child (2-12 yrs)
                                </p>
                              </div>
                              <div className="CHILDRENS NAMES GRID lg:grid lg:grid-cols-3 lg:gap-x-15 items-start">

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
                                            {children.title} {children.firstName} {children.lastName}
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  })
                                }


                              </div>
                            </div>
                              :
                              ""
                          }

                          {
                            obj.infants > 0 ? <div className="INFANTS CHECKED NAMES CONTAINER mx-20 mb-15 pb-10 border-b border-neutral-200 last-of-type:border-none last-of-type:pb-0">
                              <div className="flex justify-between">
                                <p className="body-md text-primary font-medium">Infant (0-2 yrs)</p>
                              </div>
                              <div className="INFANT CHECKED NAME lg:grid lg:grid-cols-3 lg:gap-x-15 items-start">

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
                                            {infant.title} {infant.firstName} {infant.lastName}
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  })
                                }

                              </div>
                            </div>
                              :
                              ""
                          }

                        </div>

                      </div>
                    </div>


                    <div className=" NAMES INPU FORM mx-20  lg:rounded-10 lg:bg-neutral-50 pb-4 ">


                      {
                        Array(obj.adults).fill(0).map((adult, index) => {



                          return <div key={index} className='flex flex-col gap-4'>


                                          <input type="radio" id={`adultradio${index}`} className='peer opacity-0' name='adultradio'/>

                                          <div className="ADULT FIRST MIDDLE LAST NAME flex justify-between items-center cursor-pointer  " >
                                            <div className="flex items-center gap-4">
                                              <label htmlFor={`adultradio${index}`} className="flex justify-center items-center w-[20px] h-[20px]   rounded-full" onClick={() => { toggleShow(`adultForm${index}`) }}><IoIosArrowDropdownCircle id={`adultNameArrow${index}`} className={`w-full h-full transition duration-200`} onClick={() => { document.getElementById(`adultNameArrow${index}`).classList.toggle('rotate-180') }} /></label>
                                              <p className="body-sm capitalize font-medium">Adult {index + 1}<span className="capitalize"> - {Object.keys(travellers.adultsObj).includes(`adult${index + 1}`) && `${travellers.adultsObj[`adult${index + 1}`].title} ${travellers.adultsObj[`adult${index + 1}`].firstName} ${travellers.adultsObj[`adult${index + 1}`].lastName}`}</span></p>
                                            </div>
                                            <button className="inline-flex justify-center items-center text-brand hover:bg-brand-over gap-[2px] rounded-10 min-h-[30px] button-sm py-[3px] px-5 hover:bg-transparent ">
                                               {Object.keys(travellers.adultsObj).includes(`adult${index + 1}`) ? <Checkmark size='16px' className='w-6 text-green-700  h-6' /> : <GoCircle className='w-[27px] text-green-700  h-[27px] p-1' />}
                                           </button>
                                          </div>

                                          <div id={`adultForm${index}`} className="ADULTS DETAILS INPUT FORM hidden peer-checked:flex flex-col   ">

                                              <form type={"adultForm"} adultnumber={index + 1} onSubmit={(e) => { handleFormSubmit(e) }}>
                                                <div className="flex flex-col gap-2 p-2 border rounded-10">

                                                  <div className='flex gap-1'>

                                                          <div className="flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]">
                                                      
                                                            <input
                                                              type='text'
                                                              placeholder='First Name'
                                                              className="outline-none w-full py-3 bg-transparent"
                                                              defaultValue=""
                                                              required
                                                            />
                                                          </div>
                                                      

                                                          <div className="flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]">
                                                        
                                                            <input
                                                              type='text'
                                                              placeholder='Last Name'
                                                              className="outline-none w-full py-3 bg-transparent"
                                                              defaultValue=""
                                                              required
                                                            />
                                                          </div>

                                                  </div>

                                                  <div className="flex gap-1">

                                                          <div className=" flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]">
                                                                <input id={`adultDOBInput${index}`}
                                                                  placeholder="DD/MM/YYYY"
                                                                  className='bg-transparent py-3 outline-none'
                                                                  type="text"
                                                                  defaultValue="17/09/1994"
                                                                  required
                                                                />
                                                          </div>



                                                          <div className="flex  items-center w-[50%] border-[1px] rounded-10 h-[40px]">
                                                        
                                                            <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                                              <option value="Indian" className='w-full'>Indian</option>
                                                              <option value="American">American</option>
                                                            </select>
                                                          </div>


                                                  </div>

                                                
                                                
                                                  <div className='VALIDATE & SAVE BUTTON flex justify-center items-center ' >
                                                    <button className=' h-[35px] rounded-md px-6 bg-gray-300 ' onClick={() => { checkForActive(); document.getElementById(`adultradio${index}`).checked = false }}>Save</button>
                                                  </div>
                                                </div>

                                              </form>
                                          </div>


                                 </div>

                        })
                      }


                      {
                        Array(obj.childrens).fill(0).map((child, index) => {

                          return <div key={index}>
                            <div className="lg:py-5 lg:px-20" id="child1" >

                            <input type="radio" id={`childrenradio${index}`} className='peer opacity-0' name='childrenradio'/>


                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                  <label htmlFor={`childrenradio${index}`} className="flex justify-center items-center w-[20px] h-[20px] rounded-full transition duration-300" onClick={() => { toggleShow(`childForm${index}`) }} >
                                    <IoIosArrowDropdownCircle id={`chilNameArrow${index}`} className='w-full h-full transition duration-200' onClick={() => { document.getElementById(`chilNameArrow${index}`).classList.toggle('rotate-180') }} />
                                  </label>
                                  <p className="body-sm capitalize font-medium">
                                    Child {index + 1}<span className="capitalize"> - {Object.keys(travellers.childrensObj).includes(`children${index + 1}`) && `${travellers.childrensObj[`children${index + 1}`].title} ${travellers.childrensObj[`children${index + 1}`].firstName} ${travellers.childrensObj[`children${index + 1}`].lastName}  `}</span>
                                  </p>
                                </div>

                                <button className="inline-flex justify-center items-center text-brand hover:bg-brand-over gap-[2px] rounded-10 min-h-[30px] button-sm py-[3px] px-5 hover:bg-transparent ">
                                {Object.keys(travellers.childrensObj).includes(`children${index + 1}`) ? <Checkmark size='16px' className='w-6 text-green-700  h-6' /> : <GoCircle className='w-[27px] text-green-700  h-[27px] p-1' />}
                                </button>
                              </div>

                              <div id={`childForm${index}`} className="CHILD DETAILS INPUT FORM hidden peer-checked:flex flex-col">
                                  <form type={'childForm'} childrennumber={index + 1} onSubmit={(e) => { handleFormSubmit(e) }}>

                                    <div className='flex flex-col gap-2 p-2 border rounded-10'>

                                         <div className="flex gap-1">

                                            <div className="flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]">
                                              <input
                                                type='text'
                                                placeholder='First Name'
                                                className="outline-none py-3 bg-transparent"
                                                defaultValue=""
                                                required
                                              />
                                            </div>

                                            <div className="flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]">
                                              <input
                                                type='text'
                                                placeholder='Last Name'
                                                className='outline-none py-3 bg-transparent'
                                                defaultValue=""
                                                required
                                              />
                                            </div>

                                        </div>

                                        <div className="flex gap-1">

                                        <div className="flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]">
                                        <input
                                        placeholder="DD/MM/YYYY"
                                        className='py-3 outline-none bg-transparent'
                                        type="text"
                                        defaultValue=""
                                        required
                                        />
                                        </div>

                                        <div className="flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]">
                                        <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                        <option value="Indian" className='w-full'>Indian</option>
                                        <option value="American">American</option>
                                        </select>
                                        </div>

                                        </div>

                                    </div>

                                    <div className='VALIDATE & SAVE BUTTON flex justify-center items-center '>
                                      <button className='  h-[35px] rounded-md px-6 bg-gray-300 ' onClick={()=>{document.getElementById(`childrenradio${index}`).checked=false}}>Save</button>
                                    </div>


                                  </form>
                              </div>

                            </div>

                          </div>

                        })
                      }


                      {
                        Array(obj.infants).fill(0).map((infant, index) => {
                          return <div key={index}>

                            <div className=" INFANT lg:py-5 lg:px-20" id="infant1">

                              <input type="radio" id={`infantradio${index}`} className='peer opacity-0' name='infantradio'/>


                              <div className="INFANT NUMBER AND NAME IF CHECKED flex justify-between items-center" >
                                <div className="flex items-center gap-4">
                                  <label htmlFor={`infantradio${index}`} className="flex justify-center items-center w-[20px] h-[20px] rounded-full " >
                                    <IoIosArrowDropdownCircle id={`infantNameArrow${index}`} className={`w-full h-full transition duration-200`} onClick={() => { document.getElementById(`infantNameArrow${index}`).classList.toggle('rotate-180'); toggleShow(`infantForm${index}`) }} />
                                  </label>
                                  <p className="body-sm capitalize font-medium">
                                    Infant {index + 1}-<span className='capitalize'> {Object.keys(travellers.infantsObj).includes(`infant${index + 1}`) && `${travellers.infantsObj[`infant${index + 1}`].title} ${travellers.infantsObj[`infant${index + 1}`].firstName} ${travellers.infantsObj[`infant${index + 1}`].lastName} `} </span>
                                  </p>
                                </div>
                                <button className="inline-flex justify-center items-center text-brand hover:bg-brand-over gap-[2px] rounded-10 min-h-[30px] button-sm py-[3px] px-5 hover:bg-transparent ">
                                  {Object.keys(travellers.infantsObj).includes(`infant${index + 1}`) ? <Checkmark size='16px' className='w-6 text-green-700  h-6' /> : <GoCircle className='w-[27px] text-green-700  h-[27px] p-1' />}
                                </button>
                              </div>

                              <div id={`infantForm${index}`} className="INFANT DETAILS INPUT FORM hidden peer-checked:flex flex-col">
                                  <form type={'infantForm'} infantnumber={index + 1} onSubmit={(e) => { handleFormSubmit(e) }}>
                                    <div className="flex flex-col gap-4 bg-neutral-50">

                                      <div className="flex gap-1">

                                      <div className='INFANT FIRST NAME flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]'>
                                                <input
                                                  className="outline-none py-3 bg-transparent"
                                                  placeholder='First Name'
                                                  defaultValue=""
                                                  required
                                                />
                                      </div>

                                      <div className='INFANT LAST NAME flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]'>
                                                <input
                                                  className="outline-none py-3 bg-transparent"
                                                  placeholder='Last Name'
                                                  defaultValue=""
                                                  required
                                                />
                                      </div>

                                      </div>

                                      <div className="flex gap-1">

                                      <div className=" INFANT DOB flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]">
                                            <input
                                              placeholder="DD/MM/YYYY"
                                              className="outline-none py-3 bg-transparent"
                                              type="text"
                                              defaultValue=""
                                              required
                                            />
                                      </div>

                                      <div className='INFANT NATIONALITY flex pl-2 items-center w-[50%] rounded-10 border-[1px] h-[40px]'>
                                                <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                                  <option value="Indian" className='w-full'>Indian</option>
                                                  <option value="American">American</option>
                                                </select>
                                      </div>
                                     
                                      </div>

                                     

                                     

                                      <div className='VALIDATE & SAVE BUTTON flex justify-center items-center '>
                                        <button className='h-[35px] rounded-md px-6 bg-gray-300' onClick={()=>{document.getElementById(`infantradio${index}`).checked=false}}>Save</button>
                                      </div>

                                    </div>
                                  </form>
                              </div>

                            </div>

                          </div>
                        })
                      }



                    </div>

                  </div>
                </div>

                <div className="CONTACT DETAILS CONTAINER mt-20 rounded-20 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)] bg-white overflow-hidden  p-4">

                  <form className='flex flex-col ' type={"contactDetailsAndBillingAddressForm"} onSubmit={(e) => { handleFormSubmit(e) }} >

                    <div className="CONTACT DETAILS ">
                      <h5 className="h5 font-bold">Contact Details</h5>
                      <p className="body-md text-sm text-secondary">
                        Your ticket &amp; flight information will be sent here
                      </p>
                      <div className="bg-white p-20 lg:mt-20 lg:rounded-20 lg:bg-charcoal-20">
                        <div className="flex flex-col mt-15 lg:mt-0 lg:gap-20 lg:grid lg:grid-cols-3">

                          <div className='flex gap-1'>

                          <div className="w-[200px]">
                            <div className="inline-flex flex-col text-secondary w-full text-primary">
                              <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                                <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                                <div className="flex flex-grow items-center">
                                  <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                    Country Code
                                  </label>
                                  <select name="" id="adultTitleInput" className="outline-none w-full bg-transparent  py-3 text-primary ">
                                    <option value="India (+91)">+91</option>
                                    <option value="America (+93)">+93</option>
                                  </select>

                                </div>

                              </div>
                            </div>
                          </div>

                          <div className="inline-flex flex-col text-secondary w-full text-primary">
                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                              <div className="flex flex-grow items-center">
                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                  Mobile Number
                                </label>
                                <input
                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100"
                                  type="number"
                                  defaultValue={9834832178}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          </div>

                         

                          <div className="inline-flex flex-col text-secondary w-full text-primary">
                            <div className="flex relative transition-all group/input px-15 rounded-10 items-center mt-2">
                              <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 border-primary" />
                              <div className="flex flex-grow items-center">
                                <label className="body-md select-none pointer-events-none absolute transition-all flex origin-[left_center] scale-75 top-0 left-[13px] px-[3px] -translate-y-1/2 bg-white">
                                  Email
                                </label>
                                <input
                                  className="outline-none w-full bg-transparent placeholder:text-disabled py-3 text-primary placeholder:opacity-0 focus:placeholder:opacity-100"
                                  defaultValue="bhushanravindrapatil77@gmail.com"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>


                    <div className='VALIDATE & SAVE BUTTON flex justify-center items-center ' >
                      <button className='h-[35px] rounded-md px-6 bg-gray-300'>Save</button>
                    </div>
                  </form>

                </div>

                <div className="">
                  <div className="rounded-20 mt-20 overflow-hidden shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]">
                    <div className="p-20 bg-white" id="fareSummary">
                      <div className="flex gap-15 flex-col">
                        <div className="flex justify-between items-center lg:cursor-pointer">
                          <h5 className="h5 text-primary lg:font-700 font-medium">
                            Fare Summary
                          </h5>
                          <p className="body-sm text-neutral-500">{obj.adults + obj.childrens + obj.infants} Travellers</p>
                        </div>
                        <div className="flex gap-15 flex-col transition-max-height duration-300 ease-in-out overflow-hidden">
                          <div className="flex justify-between ">
                            <div className="flex flex-row gap-1.5 items-center">
                              <p className="body-md text-primary font-normal">
                                Fare Type
                              </p>
                            </div>
                            <div className="flex items-end gap-1">
                              <p className="body-md text-success-500 font-medium">
                                Partially Refundable
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between ">
                            <div className="flex flex-row gap-1.5 items-center">
                              <p className="body-md text-primary font-normal">
                                Base Fare
                              </p>
                            </div>
                            <div className="flex items-end gap-1">
                              <p className="body-md text-primary font-medium">₹{flightDetails.ticketPrice}</p>
                            </div>
                          </div>
                          <div className="flex justify-between ">
                            <div className="flex flex-row gap-1.5 items-center">
                              <p className="body-md text-primary font-normal">
                                Taxes &amp; Fees
                              </p>
                            </div>
                            <div className="flex items-end gap-1">
                              <p className="body-md text-primary font-medium">₹1,888</p>
                            </div>
                          </div>
                          <hr />
                          <div className="flex justify-between ">
                            <div className="flex flex-row gap-1.5 items-center">
                              <p className="body-md text-primary font-normal">
                                Instant Off
                              </p>
                            </div>
                            <div className="flex items-end gap-1">
                              <p className="body-md text-success-500 font-medium">
                                -₹470
                              </p>
                            </div>
                          </div>
                          <hr />
                          <div>
                            <div className="flex justify-between mb-5">
                              <h5 className="h5 text-primary font-medium">
                                Total Amount
                              </h5>
                              <h5 className="h5 text-primary font-bold">₹{flightDetails.ticketPrice + 1888 - 470}</h5>
                            </div>
                            <div className="flex flex-col gap-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-neutral-60 p-20">
                    <div className="flex gap-4 items-start mb-10">
                      <p className="body-md text-primary">
                        By clicking on continue, I confirm that I have read, understood,
                        and agree with the{" "}
                        <span className="text-subbrand-500 underline lg:cursor-pointer ">
                          Fare Rules
                        </span>
                        ,&nbsp;
                        <span className="text-subbrand-500 underline lg:cursor-pointer">
                          Privacy Policy
                        </span>{" "}
                        and&nbsp;
                        <span className="text-subbrand-500 underline lg:cursor-pointer">
                          Terms of Use
                        </span>
                        <span className="text-subbrand-500 underline lg:cursor-pointer" />
                        .
                      </p>
                    </div>
                    <div className="flex flex-col items-center lg:items-start p-20 lg:p-0">
                      <p className="body-sm text-neutral-400 lg:mb-10 lg:body-md">
                        <strong>100%</strong> Safe Payment Process
                      </p>
                      <div className="flex items-center gap-20">
                        <img
                          alt="IxigoMoney"
                          loading="lazy"
                          width={80}
                          height={40}
                          decoding="async"
                          data-nimg={1}
                          className="lg:ml-[-8px]"
                          srcSet="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F8d146989a2403fd876d092663c34a612-opaxg.png&w=96&q=75 1x, /vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F8d146989a2403fd876d092663c34a612-opaxg.png&w=256&q=75 2x"
                          src="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F8d146989a2403fd876d092663c34a612-opaxg.png&w=256&q=75"
                          style={{ color: "transparent" }}
                        />
                        <img
                          alt="IxigoMoney"
                          loading="lazy"
                          width={80}
                          height={40}
                          decoding="async"
                          data-nimg={1}
                          className="lg:ml-[-8px]"
                          srcSet="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F96045f4b10880512eab5feb8b98e5b37-jwhau.png&w=96&q=75 1x, /vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F96045f4b10880512eab5feb8b98e5b37-jwhau.png&w=256&q=75 2x"
                          src="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F96045f4b10880512eab5feb8b98e5b37-jwhau.png&w=256&q=75"
                          style={{ color: "transparent" }}
                        />
                        <img
                          alt="IxigoMoney"
                          loading="lazy"
                          width={80}
                          height={40}
                          decoding="async"
                          data-nimg={1}
                          className="lg:ml-[-8px]"
                          srcSet="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F19c8e55d72d010d307312d8feae3bed3-pwwik.png&w=96&q=75 1x, /vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F19c8e55d72d010d307312d8feae3bed3-pwwik.png&w=256&q=75 2x"
                          src="/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fimages%2F19c8e55d72d010d307312d8feae3bed3-pwwik.png&w=256&q=75"
                          style={{ color: "transparent" }}
                        />
                      </div>
                    </div>
                  </div>
               </div>

              </div>

              <div className="FINAL AMOUNT AND SAVE TRAVELLERS CONTAINER sticky bottom-0 z-[11] md:right-0 xl:right-[inherit] w-full lg:shadow-300 lg:rounded-t-20 lg:overflow-hidden">
                <div className="flex border-t lg:border-0 w-full border-neutral-100 px-20 py-10 items-center justify-between bg-white z-5">
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-5 lg:flex-row-reverse items-center lg:items-baseline lg:justify-end">
                      <p className="body-sm text-secondary decoration-slice">
                        • {obj.adults + obj.childrens + obj.infants} Travellers
                      </p>
                      <p className="body-sm decoration-slice text-secondary  line-through">
                        ₹{flightDetails.ticketPrice + 3000 - 470}
                      </p>
                      <h5 className="h5 lg:font-500">₹{flightDetails.ticketPrice + 1888 - 470}</h5>
                    </div>
                    <div className="flex items-center gap-1" />
                  </div>
                  <button className={`inline-flex justify-center items-center  text-brand-solid  gap-5 rounded-10 min-h-[50px] button-lg py-[13px] px-15 ${(Object.keys(adults).length == obj.adults && Object.keys(childrens).length == obj.childrens && Object.keys(infant).length == obj.infants && Object.keys(contact).length > 0) ? `bg-orange-700 text-white cursor-pointer` : `bg-gray-200 text-gray-400 cursor-not-allowed `} `} onClick={() => { navigate('/Payment', { state: { 'bookingId': bookingId, 'travellers': travellers, 'flightDetails': obj, 'paymentFor': 'flight' } }) }}>
                    Pay Now
                    <svg
                      width="1em"
                      height="1em"
                      fontSize="1.5rem"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      data-testid="ChevronRightIcon"
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

        </div>
      </div>

    </div>

  )
})

export default BookFlight