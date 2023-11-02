import pool from '../../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { product_id } = req.body;
    try {
      const client = await pool.connect();

      // Check if the product exists in the cart
      const selectQuery = 'SELECT * FROM Contains WHERE P_id = $1 AND Order_id = 2';
      const result = await client.query(selectQuery, [product_id]);

      if (result.rows.length > 0) {
        // If the product exists, remove it from the cart
        const deleteQuery = 'DELETE FROM Contains WHERE P_id = $1 AND Order_id = 2';
        await client.query(deleteQuery, [product_id]);
        res.status(200).json({ message: 'Product removed from the cart.' });
      } else {
        // If the product is not in the cart, return a message indicating that it couldn't be removed
        res.status(404).json({ message: 'Product not found in the cart.' });
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
