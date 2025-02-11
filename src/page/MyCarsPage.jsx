import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../provider/AuthProvider';
import { div } from 'motion/react-client';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyCarsPage = () => {
    const axiosSecure=useAxiosSecure()
    const [cars, setCars] = useState([]);
    const [sortOption, setSortOption] = useState('date_newest');
    const [ddata, setDdata] = useState(null)
    const [idd, setIdd] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [isdeleteModalOpen, setisdeleteModalOpen] = useState(false);
    const { user } = useContext(AuthContext)
    /**
_id
67680e65a7e7a8f42a5d2d33
model
"TurboMax Speedster"
price
"30"
availability
"Available"
registration
"MN012OPyy"

features
Array (5)
description
"A compact car with sporty handling and great fuel economy."
images
"https://i.ibb.co.com/k57F81F/Turbo-Max-Speedster.png"
location
"Miami, FL"
bookingCount
0
addedDate
"2024-12-22T13:00:02.598Z"
defaultBookingStatus
"available"
_id
676c1879d141520270900742
model
"Voyager Hybrid"
price
"45"
availability
""
registration
"MN012OPr"

features
Array (5)
description
"A sleek electric vehicle with cutting-edge technology and autopilot"
images
"https://i.ibb.co.com/PxLZ3Sk/Nova-Glide.png"
location
"bd"
bookingCount
0
userEmail
"mdrabiulkhanbabo@gmail.com"
addedDate
"2024-12-25T14:33:05.055Z"
defaultBookingStatus
"available" */
    const newinfo = {

        sortBy: sortOption
    }
   
    const fetchCars = async () => {
        try {
            const response = await axiosSecure.get(`${import.meta.env.VITE_url}/mycars/${user?.email}?sortBy=${sortOption}`);
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const deleteCar = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await axios.delete(`/api/my-cars/${id}`);
                toast.success('Car deleted successfully');
                fetchCars(); // Refresh table
            } catch (error) {
                toast.error('Failed to delete the car');
            }
        }
    };

    const handleDeleteid= async()=>{
        try {
            await axios.delete(`${import.meta.env.VITE_url}/deletecars/${idd}`);
            toast.success('Car deleted successfully');
            setisdeleteModalOpen(false)
            fetchCars(); // Refresh table
        } catch (error) {
            toast.error('Failed to delete the car');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;


        const carDetails = {
            model: form.model.value,
            price: parseInt(form.price.value),
            availability: form.availability.value,
            registration: form.registration.value,

            description: form.description.value,
            images: form.images.value,
            location: form.location.value,


            addedDate: new Date(),

        };

        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_url}/update-cars/${ddata._id}`,
                carDetails
            );
            
            if (data.matchedCount) {
                toast.success("Car Update successfully!");
                form.reset();
                fetchCars()
                setShowModal(false)
            }
        } catch (error) {
            toast.error("Error update car.");
        }
    };




    const updateCar = async (id,) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_url}/car-details/${id}`);
            setDdata(data)
            setShowModal(true)
            // toast.success('Car updated successfully');
            // setShowModal(false);
            // fetchCars(); // Refresh table
        } catch (error) {
            // toast.error('Failed to update the car');
            console.log(error)
        }
    };
    
    useEffect(() => {
        fetchCars();
    }, [sortOption, user]);
    return (
        <div className="container mx-auto p-6 ">
            <h1 className="text-3xl font-bold mb-6">My Cars</h1>


            <div className="mb-4">
                <label className="mr-2">Sort By:</label>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border px-2 py-1 rounded"
                >
                    <option value='date_newest'>Date Added (Newest First)</option>
                    <option value='date_oldest'>Date Added (Oldest First)</option>
                    <option value='price_lowest'>Price (Lowest First)</option>
                    <option value='price_highest'>Price (Highest First)</option>
                </select>
            </div>
            <div className="overflow-x-auto"> 

            <table className="w-full border-collapse ">
                <thead>
                    <tr>
                        <th className="border py-2 px-4">Car Image</th>
                        <th className="border py-2 px-4">Car Model</th>
                        <th className="border py-2 px-4">Daily Price</th>
                        <th className="border py-2 px-4">Availability</th>
                        <th className="border py-2 px-4">Date Added</th>
                        <th className="border py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car._id}>
                            <td className="border py-2 px-4">
                                <img src={car.images} alt={car.model} className="w-20 rounded-md" />
                            </td>
                            <td className="border py-2 px-4">{car.model}</td>
                            <td className="border py-2 px-4">${car.price}/day</td>
                            <td className="border py-2 px-4">{car.availability ? 'Available' : 'Unavailable'}</td>
                            <td className="border py-2 px-4">{new Date(car.addedDate).toLocaleDateString()}</td>
                            <td className="border py-2 px-4">
                                <button
                                    onClick={() =>updateCar(car._id)}
                                    className="text-blue-500 mr-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() =>{ 
                                        setisdeleteModalOpen(true) 
                                        setIdd(car._id)   
                                        }}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {
                isdeleteModalOpen &&
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h1>Are you sure you want to Delete this car?
                        </h1>
                        <button onClick={handleDeleteid} className="btn bg-orange-300">Yes</button>
                        <button onClick={() => setisdeleteModalOpen(false)} className="btn ">NO</button>


                    </div>

                </div>
            }


            {showModal &&
                <div className='modal modal-open '>
                    <div className='modal-box'>
                        <div className="max-w-2xl mx-auto p-6">
                            <button onClick={() => setShowModal(false)} className="btn right-0">close</button>
                            <h2 className="text-2xl font-bold mb-6 text-center">update  Car</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        name="model"
                                        defaultValue={ddata.model}
                                        placeholder="Car Model"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        defaultValue={ddata.price}
                                        placeholder="Daily Rental Price"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                    <input
                                        type="text"
                                        defaultValue={ddata.availability}
                                        name="availability"
                                        placeholder="Available or Not Available"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="registration"
                                        defaultValue={ddata.registration}
                                        placeholder="Vehicle Registration Number"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>



                                <textarea
                                    name="description"
                                    defaultValue={ddata.description}
                                    placeholder="Car Description"
                                    className="textarea textarea-bordered w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    name="images"
                                    defaultValue={ddata.images}
                                    placeholder="Car Images (URLs)"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={ddata.location}
                                    placeholder="Location"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <button type="submit" className="btn btn-accent w-full">
                                    Update Car Details
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default MyCarsPage;
