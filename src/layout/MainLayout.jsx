import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
        <div className="container mx-auto bg-base-200 ">
            <div className="">
                <NavBar></NavBar>
            </div>

            <div className='container mx-auto mt-28 min-h-[calc(100vh-306px)] '>
                <Outlet />
            </div>
            <Footer></Footer>

        </div>
    );
};

export default MainLayout;