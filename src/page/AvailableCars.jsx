import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';

const AvailableCars = () => {
    const [cars,setCars]=useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_url}/cars`)
        .then(res=>{
            setCars(res.data)
        })

    },[])


    return (
        <div>
            <div>
                <h1>sort</h1>
            </div>
            <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    cars.map(car=><CarCard key={car._id} car={car}></CarCard>)
                }
            </div>
        </div>
    );
};

export default AvailableCars;