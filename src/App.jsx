import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navigation/Navbar'
import Footer from './components/Navigation/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}