import { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const CarDetails = () => {
    const {user}=useContext(AuthContext)
    const data=useLoaderData()
    const [car,setCar]=useState(data)
    console.log(data)



    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [messageSent, setMessageSent] = useState(false);
        const parse=parseInt(car.price)
    const totalPricevat=parse*0.02+parse
    console.log(totalPricevat)
  
    const handleFormSubmit = async (e) => {
      e.preventDefault(); 
      const form = e.target;
  
      
      const formData = {
        name: form.name.value || user?.displayName || "",
        email: form.email.value || user?.email || "",
        phone: form.phone.value,
        pickUpLocation: form.pickUpLocation.value,
        pickUpDate: new Date(form.pickUpDate.value), 
        dropOffLocation: form.dropOffLocation.value,
        dropOffDate: new Date(form.dropOffDate.value), 
        message: form.message.value,
        
        
        carInfo:{id:data?._id,
        carImg:car?.images,
        carModel:car?.model
        },
        totalPrice: totalPricevat,
        status: 'Pending',
        bookingDate: new Date()
      };
  
      console.log("Submitted Data:", formData);

      try {
          
        const {data}=await axios.post(`${import.meta.env.VITE_url}/booking`,formData)
        
        if (data.insertedId) {
             
            toast.success('booking successful ')
           
          } else {
                toast.warn("Failed to booking. Try again.");}
    } catch (error) {
     
    toast.error(error.message)
}

  
     
      setMessageSent(true);
      setTimeout(() => setMessageSent(false), 3000); 
  
      setIsModalOpen(false); 
    };
  
    return (
      <div>

        <div className="flex flex-col lg:flex-row gap-6">

                {/* left sidbar */}
                <div className="card bg-base-100 shadow-xl lg:w-1/3 lg:sticky top-4 p-4  rounded-lg  h-fit">
  <div className="card-body">
    <h2 className="text-2xl "><span className="font-bold text-3xl lg:text-5xl">${car.price}</span>/per day</h2>
    <hr />
    <h2 className="text-2xl font-bold">{car?.model}</h2>
    <ul>
        
        <li className="flex justify-between p-2 ">
            <span>Features:</span>
            <span className=""> {car.features.map((feature, index) => (
                <li className="badge " key={index}>{feature}</li>
              ))}</span>
        </li>
        <li className="flex justify-between p-2 ">
            <span>Availability :</span>
            <span>{car?.availability}</span>
        </li>
        <li className="flex justify-between p-2 ">
            <span>location</span>
            <span>{car?.location}</span>
        </li>
    </ul>

    <div className="card-actions justify-end">
      <button  onClick={() => setIsModalOpen(true)} className="btn bg-orange-600 text-white hover:bg-green-800">book Now</button>
    </div>
  </div>
</div>
  {/* right side */}
<div className=" bg-base-100 lg:w-2/3 space-y-4 max-h-screen lg:overflow-y-scroll  shadow-xl">
  <figure>
    <img
      src={car?.images}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
    {car.model}</h2>
    <p>{car.description}</p>
   
    <div className="card-actions justify-end">
   
    </div>
  </div>
</div>
            
        </div>

        <div className="p-4">
     

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open  ">
          <div className="modal-box ">
            <h2 className="text-2xl font-bold mb-4">Reserve Your Vehicle Today!</h2>
            <p className="mb-4">
              Fill out the form below to reserve your vehicle. Complete the
              necessary details to ensure a smooth rental experience.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium">Enter Full Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                
                  readOnly
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Enter Your Email</label>
                <input
                  type="email"
                  name="email"
                 defaultValue={user.email}
                  readOnly
                  placeholder="Email Address"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium">Enter Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                 
                  required
                 
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Pick Up Location */}
              <div>
                <label className="block text-sm font-medium">Pick Up Location</label>
                <input
                  type="text"
                  name="pickUpLocation"
                 
                  required
                  placeholder="Pick Up Location"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Pick Up Date */}
              <div>
                <label className="block text-sm font-medium">Pick Up Date</label>
                <input
                  type="date"
                  name="pickUpDate"
                 
                  required
                  className="input input-bordered w-full"
                />
              </div>

              {/* Drop Off Location */}
              <div>
                <label className="block text-sm font-medium">Drop Off Location</label>
                <input
                  type="text"
                  name="dropOffLocation"
                 
                  required
                  placeholder="Drop Off Location"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Drop Off Date */}
              <div>
                <label className="block text-sm font-medium">Drop Off Date</label>
                <input
                  type="date"
                  name="dropOffDate"
                 
                  required
                  className="input input-bordered w-full"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium">Write Your Message</label>
                <textarea
                  name="message"
                 
                  placeholder="Write your message"
                  className="textarea textarea-bordered w-full"
                  rows="3"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>

            {/* Message Sent Confirmation */}
            {messageSent && (
              <div className="mt-4 text-green-500 text-center">
                Thank you for your message. It has been sent.
              </div>
            )}

            {/* Close Button */}
            <div className="modal-action">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      </div>
    );
};

export default CarDetails;