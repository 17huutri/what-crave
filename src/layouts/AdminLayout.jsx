import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../components/Navigation/SidebarAdmin';

export default function AdminLayout() {
    return (
        <div className="flex">
            <SidebarAdmin />
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    );
}
