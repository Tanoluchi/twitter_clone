import { Outlet } from "react-router-dom";
import Sidebar from './SideBar';
import Search from "./Search";
import { Toaster } from 'react-hot-toast';

export const Layout = () => {
    return (
        <>
            <Toaster />
            <div className="flex justify-center">
                <div className="shrink w-14 sm:w-64 lg:w-[350px] xl:w-350px">
                    <Sidebar />
                </div>

                <div className="shrink w-[500px] pr-6">
                    <Outlet/>
                </div>

                <div className="shrink w-0 sm:w-14 md:w64 lg:2-[450px] xl:w-[450px]">
                    <Search/>
                </div>
            </div>
        </>
    )
}
