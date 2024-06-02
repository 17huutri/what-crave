import { Outlet } from 'react-router-dom';
import SidebarStaff from '../components/Navigation/SidebarStaff';

export default function StaffLayout() {
    return (
        <div className="flex">
            <SidebarStaff />
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    );
}
