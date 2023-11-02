import pool from '../../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const client = await pool.connect();

      const query = 'SELECT quantity, p_name, price, image1_url FROM contains NATURAL JOIN product';

      const result = await client.query(query);

      const cartItems = result.rows.map((row) => ({
        quantity: row.quantity,
        name: row.p_name,
        price: row.price,
        imageSrc: row.image1_url,
      }));

      res.status(200).json(cartItems);
      client.release();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
