import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const MyBookings = () => {
    const {user}=useContext(AuthContext)
    const [myBookings, setMyBookings] = useState([]);
  

 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_url}/mybookings/${user?.email}`);
        setMyBookings(response.data);

      } catch (error) {
        toast.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user]);

   // Cancel Booking
   const cancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${id}`);
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  // Modify Booking Date
  const modifyBooking = async (id, newDate) => {
    try {
      const response = await axios.put(`http://localhost:5000/bookings/${id}`, { bookingDate: newDate });
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, bookingDate: newDate } : booking
        )
      );
    } catch (error) {
      console.error("Error modifying booking:", error);
    }
  };


    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">Car Image</th>
                <th className="border border-gray-300 p-2">Car Model</th>
                <th className="border border-gray-300 p-2">Booking Date</th>
                <th className="border border-gray-300 p-2">Total Price</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    <img src={booking.carImage} alt="Car" className="w-20 rounded-md" />
                  </td>
                  <td className="border border-gray-300 p-2">{booking.carModel}</td>
                  <td className="border border-gray-300 p-2">{booking.bookingDate}</td>
                  <td className="border border-gray-300 p-2">{booking.totalPrice}</td>
                  <td className="border border-gray-300 p-2">{booking.status}</td>
                  <td className="border border-gray-300 p-2 space-x-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => modifyBooking(booking._id, "2024-12-23 10:00")}
                    >
                      Modify Date
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => cancelBooking(booking._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default MyBookings;