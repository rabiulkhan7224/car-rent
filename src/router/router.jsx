import { createBrowserRouter } from 'react-router';
import MainLayout from '../layout/MainLayout';
import Home from '../page/Home';
import Login from '../authentication/Login';
import Register from '../authentication/Register';
import ErrorPage from '../error/ErrorPage';
import AvailableCars from '../page/AvailableCars';
import AddCar from '../page/AddCar';

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
        ]

    }
])

export default router;