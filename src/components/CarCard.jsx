import { Link } from "react-router";
import useFormatDate from "../hooks/useFormatDate";
import { motion } from "motion/react"
const CarCard = ({car}) => {

const data =useFormatDate(car?.addedDate)
    /**{
    "_id": "6767c9bc98b489e7d9c633cb",
    "model": "toyota",
    "price": "54654",
    "availability": "Not Available",
    "registration": "dfdkjgksg",
    "features": [
        "GPS",
        "AC"
    ],
    "description": "gfjhdfj",
    "images": "http://localhost:5173/add-car",
    "location": "bd",
    "bookingCount": 0,
    "userEmail": "mdrabiulkhanbabo@gmail.com"
} */
    return (
        <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
        className="card bg-base-100 shadow-xl hover:bg-blue-100 ">
  <figure className="px-10 pt-10">
    <img
      src={car?.images}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body  ">
    <h2 className="font-bold text-3xl">{car?.model}</h2>
    <p>Location: {car?.location}</p>
      <p>post: {data}</p>
   <p className={`badge ${car.availability==='Available' ? 'text-green-500':''} ${car.availability==='Not Available' ? 'text-red-500':''}`}> {car.availability}</p>
    <hr />
    <div className="flex justify-between items-center">
    <p> <span className="font-bold text-3xl
    ">${car?.price}</span>/Per Day</p>
      <Link to={`/car-details/${car._id}`} className="btn  hover:bg-gray-500">book now</Link>
    </div>
  </div>
</motion.div>
    );
};

export default CarCard;