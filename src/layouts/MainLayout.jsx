
import { Outlet } from 'react-router-dom'
import '../App.css'
import Navbar from '../components/Navigation/Navbar'

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}