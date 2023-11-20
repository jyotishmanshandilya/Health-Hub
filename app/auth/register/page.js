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
                alert('Registration failed');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during registration.');
        }
    };

    return (
        <div className="bg-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 p-8 rounded shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2"
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Phone Number:</label>
                                <input
                                    type="text"
                                    value={p_no}
                                    onChange={(e) => setPNo(e.target.value)}
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>
                       
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Credit Card Number:</label>
                        <input
                            type="text"
                            value={credit_card_no}
                            onChange={(e) => setCreditCardNo(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Delivery Address:</label>
                        <input
                            type="text"
                            value={delivery_addr}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>
                    </>
                )}
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
