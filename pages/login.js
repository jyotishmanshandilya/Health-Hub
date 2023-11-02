import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login_auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (response.ok) {
        router.push('/');
        alert('Login successful');
      } else if (response.status === 401) {
        alert('Login failed...try again');
      } else if (response.status === 401) {
        alert('Role not recognized');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
