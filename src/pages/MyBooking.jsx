import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CiLocationOn } from 'react-icons/ci';
import { getCarImageUrl } from '../../constants';
import { myBookingsAPI } from '../services/allAPI';
import { Link } from 'react-router-dom';




function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [amount, setAmount] = useState();

  const users = JSON.parse(sessionStorage.getItem("user"));
  const userId = users?._id;

  useEffect(() => {
    myBookings();
  }, []);

  const myBookings = async () => {
    try {
      const result = await myBookingsAPI(userId);
      setBookings(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">

        {bookings?.length > 0 ? (
          bookings.map((booking) => {
            const from = new Date(booking?.fromDate);
            const to = new Date(booking?.toDate);

            const diffTime = to - from;
            const days = Math.ceil(
              diffTime / (1000 * 60 * 60 * 24)
            );

            const totalAmount =
              days * booking?.carId?.priceRent;

            return (
              <div
                key={booking._id}
                className="border rounded-lg mb-4 p-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4"
              >
                {/* Left Section */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <img 
                    src={getCarImageUrl(
                      booking?.carId?.images?.[0]
                    )}
                    alt="car"
                    className="w-full sm:w-36 h-32 sm:h-20 object-cover rounded-lg"
                  />

                  <div>
                    <h2 className="font-bold text-lg">
                      {booking?.carId?.title}
                    </h2>

                    <div className="text-gray-500 text-sm">
                      <span>
                        Seats: {booking?.carId?.seats}
                      </span>

                      <span className="ml-4">
                        Total:
                        <span className="font-semibold text-black ml-1">
                          ₹{totalAmount}
                        </span>
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mt-1 flex items-center">
                      <CiLocationOn className="me-1" />
                      {booking?.carId?.address}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-3 text-sm">
                      <p>
                        <span className="font-semibold">
                          Booking ID:
                        </span>{" "}
                        {booking?._id}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Pick-Up:
                        </span>{" "}
                        {booking?.fromDate?.split("T")[0]}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Drop-Off:
                        </span>{" "}
                        {booking?.toDate?.split("T")[0]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 w-full lg:w-auto">
                  <div className="flex flex-wrap items-center gap-3">

                    <div>
                      <span className="font-medium">
                        Payment:
                      </span>

                      <span
                        className={`ml-2 font-semibold ${
                          booking?.paymentStatus === "Paid"
                            ? "text-green-600"
                            : booking?.paymentStatus ===
                              "Pending"
                            ? "text-yellow-500"
                            : "text-gray-500"
                        }`}
                      >
                        {booking?.paymentStatus}
                      </span>
                    </div>

                    {booking?.paymentStatus ===
                      "Pending" && (
                      <Link
                        to="/payment"
                        state={{ booking }}
                        className="bg-cyan-500 text-white px-5 py-2 rounded hover:bg-cyan-600"
                      >
                        Pay Now
                      </Link>
                    )}

                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-10">
            No bookings found
          </div>
        )}

      </div>
    </div>
  );
}

export default MyBooking;