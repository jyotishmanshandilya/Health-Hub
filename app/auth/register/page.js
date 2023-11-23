'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [name, setName] = useState('');
  const [p_no, setPNo] = useState('');
  const [email, setEmail] = useState('');
  const [credit_card_no, setCreditCardNo] = useState('');
  const [delivery_addr, setDeliveryAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role, p_no, email, credit_card_no, delivery_addr }),
      });

      if (response.ok) {
        alert('Registration successful');
        router.push('/auth/login');
      } else {
        alert('User with this username already exists');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center " style={{ backgroundImage: "url('/Bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-gray-100 m-16" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px' }}>
        <h1 className="text-2xl font-semibold mb-4 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#888' }}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-4 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#888' }}>Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:border-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-4 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#888' }}>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:border-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-4 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#888' }}>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:border-white"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          {role === 'customer' && (
    <>
        <div className="mb-4">
            <label className="block text-sm font-medium">Name:</label>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                pattern="[A-Za-z ]{1,}"
                title="Please enter a valid name (only letters and spaces)"
                className="border border-gray-300 rounded w-full p-2"
                required
            />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Phone Number:</label>
                    <input
                        type="tel"
                        placeholder="Phone number"
                        value={p_no}
                        onChange={(e) => setPNo(e.target.value)}
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        title="Please enter a valid phone number (###-###-####)"
                        className="border border-gray-300 rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Credit Card Number:</label>
                    <input
                        type="number"
                        placeholder="CCN"
                        value={credit_card_no}
                        onChange={(e) => setCreditCardNo(e.target.value)}
                        className="border border-gray-300 rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Delivery Address:</label>
                    <input
                        type="text"
                        placeholder="Address"
                        value={delivery_addr}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="border border-gray-300 rounded w-full p-2"
                        required
                    />
                </div>
            </>
        )}
         <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

