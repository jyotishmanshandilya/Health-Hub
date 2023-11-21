'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Seller = () => {
  // Define the state variables using useState
  const [productName, setProductName] = useState('');
  const [productID, setProductID] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here, including handling image uploads
    console.log('Form submitted with the following data:', {
      productName,
      productID,
      categoryID,
      price,
      description,
      imageLink,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-lg w-full max-w-md bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Seller Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Product Name:</label>
            <input
              type="text"
              name="name"
              className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div><div className="mb-4">
            <label className="block text-sm font-medium">Product ID:</label>
            <input
              type="number"
              name="price"
              className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Category ID:</label>
            <input
              type="number"
              name="price"
              className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Price:</label>
            <input
              type="number"
              name="price"
              className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Quantity:</label>
            <input
              type="number"
              name="price"
              className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description:</label>
            <input
              type="text"
              name="desc"
              className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Image Link:</label>
            <input
              type="text"
              name="imageLink"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <br />
        <button
          onClick={handleGoBack}
          className="bg-gray-500 text-white p-2 rounded w-full hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Seller;
