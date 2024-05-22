// payment.tsx
'use client';
import React, { useState } from 'react';

interface FormData {
    amount: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    billingAddress: string;
}

const PaymentPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      amount: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Basic validation
      if (!formData.amount || !formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.billingAddress) {
          alert('Please fill in all fields.');
          return;
      }

      // Assuming you have some payment processing logic here
      // For demonstration purposes, let's just log the data
      console.log('Payment Details:');
      console.log('Amount:', formData.amount);
      console.log('Card Number:', formData.cardNumber);
      console.log('Expiry Date:', formData.expiryDate);
      console.log('CVV:', formData.cvv);
      console.log('Billing Address:', formData.billingAddress);

      // You can redirect to a success page or do further processing here
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-500">Payment Form</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="amount" className="block font-medium text-blue-500">Amount</label>
                            <input type="number" id="amount" name="amount" className="form-input mt-1 block w-full border-blue-500" value={formData.amount} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label htmlFor="cardNumber" className="block font-medium text-blue-500">Card Number</label>
                            <input type="text" id="cardNumber" name="cardNumber" className="form-input mt-1 block w-full border-blue-500" value={formData.cardNumber} onChange={handleInputChange} required />
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="expiryDate" className="block font-medium text-blue-500">Expiry Date</label>
                                <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" className="form-input mt-1 block w-full border-blue-500" value={formData.expiryDate} onChange={handleInputChange} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label htmlFor="cvv" className="block font-medium text-blue-500">CVV</label>
                                <input type="text" id="cvv" name="cvv" className="form-input mt-1 block w-full border-blue-500" value={formData.cvv} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="billingAddress" className="block font-medium text-blue-500">Billing Address</label>
                            <textarea id="billingAddress" name="billingAddress" rows={3} className="form-textarea mt-1 block w-full border-blue-500" value={formData.billingAddress} onChange={handleInputChange} required />
                        </div>
                        <div className="text-right">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Pay Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
