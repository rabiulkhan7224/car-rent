import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCar = () => {
    const { user } = useContext(AuthContext)
    const [carDetails, setCarDetails] = useState({
        model: "",
        price: "",
        availability: "",
        registration: "",
        features: [],
        description: "",
        images: "",
        location: "",
        bookingCount: 0,
        userEmail:user?.email
        
    });
    
 // List of available features
 const featureOptions = ["GPS", "AC", "Bluetooth", "Heated Seats", "Sunroof"];

 // Handle change for checkboxes
 const handleFeatureChange = (e) => {
   const { value, checked } = e.target;

   setCarDetails((prevDetails) => {
     const updatedFeatures = checked
       ? [...prevDetails.features, value] 
       : prevDetails.features.filter((feature) => feature !== value); 

     return { ...prevDetails, features: updatedFeatures };
   });
 };


    const handleChange = (e) => {
        setCarDetails({ ...carDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
            const {data}=await axios.post('http://localhost:5000/add-car',carDetails)
            console.log(data)
            if (data.insertedId) {
                 
                toast.success('added car successful ')
               
              } else {
                    toast.warn("Failed to add car. Try again.");}
        } catch (error) {
         
        toast.error(error)
    }}

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="text"
                    name="model"
                    value={carDetails.model}
                    onChange={handleChange}
                    placeholder="Car Model"
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={carDetails.price}
                    onChange={handleChange}
                    placeholder="Daily Rental Price"
                    className="input input-bordered w-full"
                    required
                />
                {/* <input
            type="text"
            name="availability"
            value={carDetails.availability}
            onChange={handleChange}
            placeholder="Availability (Yes/No)"
            className="input input-bordered w-full"
            required
          /> */}
               <select
          name="availability"
          value={carDetails.availability}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
        >
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>
                <input
                    type="text"
                    name="registration"
                    value={carDetails.registration}
                    onChange={handleChange}
                    placeholder="Vehicle Registration Number"
                    className="input input-bordered w-full"
                    required
                />
                 {/* Feature Checkboxes */}
        <div className="space-y-2">
          <p className="font-medium">Select Features:</p>
          {featureOptions.map((feature) => (
            <label key={feature} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={feature}
                onChange={handleFeatureChange}
                className="checkbox checkbox-primary"
              />
              <span>{feature}</span>
            </label>
          ))}
        </div>
                <textarea
                    name="description"
                    value={carDetails.description}
                    onChange={handleChange}
                    placeholder="Car Description"
                    className="textarea textarea-bordered w-full"
                    required
                />
                <input
                    type="text"
                    name="images"
                    value={carDetails.images}
                    onChange={handleChange}
                    placeholder="Car Images (URLs)"
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={carDetails.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="input input-bordered w-full"
                    required
                />
                <button type="submit" className="btn btn-primary w-full">
                    Save Car Details
                </button>
            </form>
        </div>
    );
};

export default AddCar;