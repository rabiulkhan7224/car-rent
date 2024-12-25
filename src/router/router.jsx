import { createBrowserRouter } from 'react-router';
import MainLayout from '../layout/MainLayout';
import Home from '../page/Home';
import Login from '../authentication/Login';
import Register from '../authentication/Register';
import ErrorPage from '../error/ErrorPage';
import AvailableCars from '../page/AvailableCars';
import AddCar from '../page/AddCar';
import CarDetails from '../page/CarDetails';
import MyBookings from '../page/MyBookings';

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/available-cars',
                element:<AvailableCars />
            },
            {
                path:'/add-car',
                element:<AddCar />
            },
            {
                path:'/car-details/:id',
                element:<CarDetails />,
                loader: async({params})=> await fetch(`${import.meta.env.VITE_url}/car-details/${params.id}`)
            },
            {
                path:'/mybookings',
                element:<MyBookings />,
               
            },
        ]

    }
])

export default router;