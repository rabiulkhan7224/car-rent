import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_url}`,
    withCredentials: true
})

    const useAxiosSecure = () => {

        const{logoutUser}=useContext(AuthContext)
    const navigate=useNavigate()
    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('api response error', error.status)
            if (error.status === 401 || error.status === 403) {
                logoutUser()
                .then(()=>{
                    console.log('logout user')
                    navigate('/login')
                    
                })
                .catch(err=>console.log(err))
            }
            return Promise.reject(error)
        })

    }, [])
    return axiosInstance;
    };
            

export default useAxiosSecure;