import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import { IoGrid } from 'react-icons/io5';
import { FaListUl } from 'react-icons/fa6';

const AvailableCars = () => {
    const [cars, setCars] = useState([])
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [grid,setGrid]=useState(true)
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_url}/cars?search=${search}&sortBy=${sort}`)
            .then(res => {
                setCars(res.data)
            })

    }, [search,sort])
    

    return (
        <div>
            <div>
                <div className="flex justify-between items-center mb-4">

                    <input
                        type="text"
                        placeholder="Search by model,location"
                        className="p-2  border rounded-md"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                        <div>

                        </div>
                        <button onClick={()=>setGrid(!grid)} className="btn hidden md:flex">{grid?<IoGrid />:<FaListUl />}</button>
                    <select
                        className="p-2 border rounded-md"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value='price_lowest'>Price (Lowest First)</option>
                        <option value='price_highest'>Price (Highest First)</option>
                    </select>
                </div>


            </div>
            <div className={`${grid?'grid':'space-y-6'} gap-2  grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
                {
                    cars.map(car => <CarCard key={car._id} car={car}></CarCard>)
                }
            </div>
        </div>
    );
};

export default AvailableCars;