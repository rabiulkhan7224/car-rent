import React from 'react';
import bannerimage from '../assets/bannerimg.jpg'
import { motion } from "motion/react"
const Banner = () => {
    return (
        <div className='relative h-screen bg-cover bg-center ' style={{ backgroundImage: `url(${bannerimage})` }}>
           <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Drive Your Dreams Today!
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Find the perfect ride, from budget-friendly options to luxury cars.
          </motion.p>
          <a href="/available-cars">

          <motion.button
          
            className="mt-6 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-800   shadow-lg transition"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            View Available Cars
          </motion.button>
          </a>
        </div> 
        </div>
    );
};

export default Banner;