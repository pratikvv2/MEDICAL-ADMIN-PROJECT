

import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import Bookings from '@/pages/Bookings/Bookings'
import ManageNurses from '@/pages/ManageNurses/ManageNurses'
import Header from '@/components/Header/Header'
import AllUsers from '@/pages/AllUsers/AllUsers'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/manage-nurses' element={<ManageNurses />} />
        <Route path='/all-users' element={<AllUsers />} />
      </Routes>
    </>
  )
}

export default App
