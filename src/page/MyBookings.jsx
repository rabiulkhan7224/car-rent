import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { FaCalendarDays } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import Loader from "../components/Loader";

const MyBookings = () => {
  
    const {user}=useContext(AuthContext)
    const [bookings, setBookings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [newDates, setNewDates] = useState({ pickUpDate: "", dropOffDate: "",bookingDate:new Date() });
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [cancelId,setCancelId]=useState(null)

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_url}/mybookings/${user?.email}`);
        setBookings(response.data);

      } catch (error) {
        toast.error("Error fetching bookings:", error);
      }
    };
  useEffect(() => {
    

    fetchBookings();
  }, [user]);

  const handleModifyBooking =async () => {
    try {
          
      const {data}=await axios.put(`${import.meta.env.VITE_url}/modify/${selectedBooking}`,newDates)
      console.log(data)
      if (data.modifiedCount) {
        toast.success('Booking dates updated successfully. ')
           
         setIsModalOpen(false)
         fetchBookings()
        } else {
              toast.warn("Failed to booking update. Try again.");}
  } catch (error) {
   
  toast.error(error.message)
}};

   // Cancel Booking
   const cancelBooking =  (id) => {

    setIsCancelModalOpen(true)
    setCancelId(id)

    // try {
    //   await axios.delete(`http://localhost:5000/bookings/${id}`);
    //   setBookings((prev) => prev.filter((booking) => booking._id !== id));
    // } catch (error) {
    //   console.error("Error canceling booking:", error);
    // }
  };
  const handleCancelid= async()=>{
    const newstatus={
      status: "Cancaled"
    }
    try {
        await axios.patch(`${import.meta.env.VITE_url}/bookings/${cancelId}`,newstatus);
        toast.success('this Booking canceled')
        setIsCancelModalOpen(false)
        fetchBookings()
      } catch (error) {     
        console.error("Error canceling booking:", error);
      }
  }

  // Modify Booking Date
  const modifyBooking =  (id) => {
    setIsModalOpen(true)
    setSelectedBooking(id)
  }
      
  
  /**{
    {
    "_id": "676ad2e376ea188413951127",
    "name": "Md Rabiul Khan (বাবু)",
    "email": "mdrabiulkhanbabo@gmail.com",
    "phone": "01779893574",
    "pickUpLocation": "dhaka",
    "pickUpDate": "2024-12-24T00:00:00.000Z",
    "dropOffLocation": "comiila ",
    "dropOffDate": "2024-12-31T00:00:00.000Z",
    "message": "fghjhwtrge",
    "carInfo": {
        "id": "6767e163f0592f7ee361da82",
        "carImg": "https://i.ibb.co.com/KWsbBPn/Sapphire-Convertible.png",
        "carModel": "Sapphire Convertible"
    },
    "totalPrice": 183.6,
    "status": "Pending",
    "bookingDate": "2024-12-24T15:27:35.138Z"
}
} */

if(!bookings)
  return<Loader></Loader>

    return (
      <div>

        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-blue-500">
              <tr>
                <th className="border border-gray-300 p-2">Car Image</th>
                <th className="border border-gray-300 p-2">Car Model</th>
                <th className="border border-gray-300 p-2">Booking Date</th>
                <th className="border border-gray-300 p-2">pickUpDate</th>
                <th className="border border-gray-300 p-2">dropOffDate</th>
                <th className="border border-gray-300 p-2">Total Price(2% vat)</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-blue-100">
                  <td className="border border-gray-300 p-2">
                    <img src={booking.carInfo.carImg} alt="Car" className="w-20 rounded-md" />
                  </td>
                  <td className="border border-gray-300 p-2">{booking.carInfo.carModel}</td>
                  <td className="border border-gray-300 p-2">{format(new Date(booking.bookingDate), ' h : mm aaa dd/MM/yyyy ')}</td>
                  <td className="border border-gray-300 p-2">{format(new Date(booking.pickUpDate), 'dd/MM/yyyy')}</td>
                  <td className="border border-gray-300 p-2">{format(new Date(booking.dropOffDate), 'dd/MM/yyyy')}</td>
                  <td className="border border-gray-300 p-2">{booking.totalPrice}</td>
                  <td className={`border border-gray-300 p-2 ${booking.status==='Pending'? 'text-blue-400':'text-red-400'}`}>{booking.status}</td>
                  <td className="border border-gray-300 p-2 space-x-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => modifyBooking(booking._id)}
                      // onClick={()=>setIsModalOpen(true)}
                    >
                      <FaCalendarDays />
                      Modify Date
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => cancelBooking(booking._id)}
                    >
                      <FaRegTrashAlt />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
              {
                isCancelModalOpen && 
                <div className="modal modal-open">
                  <div className="modal-box">
                   <h1>Are you sure you want to cancel this booking?
                   </h1>
                   <button onClick={handleCancelid} className="btn bg-orange-300">Yes</button>
                   <button onClick={()=>setIsCancelModalOpen(false) } className="btn ">NO</button>
                    

                  </div>

                </div>
              }
               {/* Modify Booking Date Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-2">Modify Booking Dates</h2>
           <form>

           </form>
            <div className="mb-4">
              <label className="block text-sm font-medium">Pick Up Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setNewDates({ ...newDates, pickUpDate: new Date(e.target.value) })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Drop Off Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setNewDates({ ...newDates, dropOffDate: new Date(e.target.value) })
                }
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() =>setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={handleModifyBooking}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    );
  };

export default MyBookings;