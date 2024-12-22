import { Outlet } from "react-router";
import NavBar from "../components/NavBar";


const MainLayout = () => {
    return (
        <div>
            <div className="">
                <NavBar></NavBar>
            </div>

            <div className='mt-28 min-h-[calc(100vh-306px)]'>
                <Outlet />
            </div>

        </div>
    );
};

export default MainLayout;