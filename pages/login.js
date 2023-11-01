import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Added role state

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
        // Successful login
        router.push('/');
        alert('Login successful');
      } else if (response.status === 401) {
        // Failed login
        alert('Login failed...try again');
      } else if (response.status === 401) {
        // Role not recognized
        alert('Role not recognized');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
