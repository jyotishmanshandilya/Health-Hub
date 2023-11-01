import { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [name, setName] = useState('');
  const [p_no, setPNo] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register_route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role, name, p_no, email }),
      });

      if (response.ok) {
        alert('Registration successful');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
        {role === 'customer' && (
          <>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Phone Number:
              <input
                type="text"
                value={p_no}
                onChange={(e) => setPNo(e.target.value)}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
          </>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
