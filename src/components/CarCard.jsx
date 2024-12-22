import { Link } from "react-router";

const CarCard = ({car}) => {

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
        <div className="card bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src={car?.images}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body  ">
    <h2 className="font-bold text-3xl">{car?.model}</h2>
    <p>Location: {car?.location}</p>
   
    <hr />
    <div className="flex justify-between items-center">
    <p> <span className="font-bold text-3xl
    ">${car?.price}</span>/Per Day</p>
      <Link to={`/car-details/${car._id}`} className="btn  hover:bg-gray-500">book now</Link>
    </div>
  </div>
</div>
    );
};

export default CarCard;