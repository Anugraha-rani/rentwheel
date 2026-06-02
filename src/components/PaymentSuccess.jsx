import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from "axios";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();

const bookingId = searchParams.get("bookingId");



  return (
    <div className="text-center mt-20">
      <h1>Payment Successful 🎉</h1>
    </div>
  )
}

export default PaymentSuccess