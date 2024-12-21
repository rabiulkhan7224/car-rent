import { Outlet } from "react-router";
import NavBar from "../components/NavBar";


const MainLayout = () => {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>

            <div className='min-h-[calc(100vh-306px)]'>
                <Outlet />
            </div>

        </div>
    );
};

export default MainLayout;