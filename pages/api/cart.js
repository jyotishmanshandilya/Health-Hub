import pool from '../../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { product_id } = req.body;
    try {
      const client = await pool.connect();

      // Use parameterized queries with placeholders
      const selectQuery = 'SELECT * FROM Contains WHERE P_id = $1 AND Order_id = 2';
      const result = await client.query(selectQuery, [product_id]);

      if (result.rows.length > 0) {
        const updateQuery = 'UPDATE Contains SET quantity = quantity + 1 WHERE p_id = $1 AND order_id = 2';
        await client.query(updateQuery, [product_id]);
        res.status(200).json({ message: 'Product added to cart.' });
      } else {
        const insertQuery = 'INSERT INTO Contains (Order_id, P_id, Quantity) VALUES (2, $1, 1)';
        await client.query(insertQuery, [product_id]);
        res.status(201).json({ message: 'Product added to cart.' });
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
