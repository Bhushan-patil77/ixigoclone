import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Payment from './Payment';

// Lazy load the components
const Signup = lazy(() => import('./Signup'));
const BusSearch = lazy(() => import('./buses/BusSearch'));
const FlightSearch = lazy(() => import('./flights/FlightSearch'));
const HotelSearch = lazy(() => import('./hotels/HotelSearch'));
const TrainSearch = lazy(() => import('./trains/TrainSearch'));
const Login = lazy(() => import('./Login'));
const FlightResults = lazy(() => import('./flights/FlightResults'));
const BookFlight = lazy(() => import('./flights/BookFlight'));
const TrainResults = lazy(() => import('./trains/TrainResults'));
const BookTrain = lazy(() => import('./trains/BookTrain'));
const BusResults = lazy(() => import('./buses/BusResults'));
const BookBus = lazy(() => import('./buses/BookBus'));
const HotelResults = lazy(() => import('./hotels/HotelResults'));

function App() {
  return (
    <div className='relative'>
      {/* <div className='sticky top-0 z-40'><Navbar/></div> */}
      <Suspense fallback={<div> <Skeleton className='inset-0 w-screen h-screen' width={screen} height={screen} /></div>}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<FlightSearch />} />
          <Route path='/flightResults' element={<FlightResults />} />
          <Route path='/BookFlight' element={<BookFlight />} />
          <Route path='/hotels' element={<HotelSearch />} />
          <Route path='/HotelResults' element={<HotelResults />} />
          <Route path='/trains' element={<TrainSearch />} />
          <Route path='/TrainResults' element={<TrainResults />} />
          <Route path='/BookTrain' element={<BookTrain />} />
          <Route path='/buses' element={<BusSearch />} />
          <Route path='/BusResults' element={<BusResults />} />
          <Route path='/BookBus' element={<BookBus />} />
          <Route path='/Payment' element={<Payment />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
