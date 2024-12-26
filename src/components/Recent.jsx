import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import Loader from './Loader';

const Recent = () => {
    const [cars,setCars]=useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_url}/recent`)
        .then(res=>setCars(res.data))
    },[])
    if(!cars)return<Loader></Loader>
    
    return (
        <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                cars.map(car=><CarCard key={car._id} car={car}></CarCard>)
            }
        </div>
    );
};

export default Recent;