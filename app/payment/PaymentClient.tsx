import React, { useState } from 'react';
import axios from 'axios'; // Assuming you use Axios for HTTP requests

const PaymentPage: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Assuming you have an API endpoint for processing payments
      const response = await axios.post('/payment', {
        cardNumber,
        expiryDate,
        cvv,
      });
      setPaymentStatus(response.data.message);
    } catch (error) {
      setPaymentStatus('An error occurred while processing your payment.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
          className="border border-gray-400 p-2 block w-full mb-4"
        />
        <label htmlFor="expiryDate">Expiry Date</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          className="border border-gray-400 p-2 block w-full mb-4"
        />
        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={(e) => setCVV(e.target.value)}
          required
          className="border border-gray-400 p-2 block w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentPage;
