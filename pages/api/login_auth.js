// pages/api/login.js

import pool from '../../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password, role } = req.body;

    try {
      const client = await pool.connect();

      let table;
      if (role === 'customer') {
        table = 'customer';
      } else if (role === 'seller') {
        table = 'seller';
      }

      if (table) {
        const result = await client.query(
          `SELECT * FROM ${table} WHERE username = $1 AND password = $2`,
          [username, password]
        );

        if (result.rows.length > 0) {
          // Authentication successful
          res.status(200).json({ message: 'Login successful' });
        } else {
          // Authentication failed
          res.status(401).json({ message: 'Login failed' });
        }
      } else {
        // Role not recognized
        res.status(401).json({ message: 'Role not recognized' });
      }

      client.release();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
