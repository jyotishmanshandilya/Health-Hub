import pool from '../../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { product_id } = req.body;
    try {
      const client = await pool.connect();

      const fetchCustIdQuery = 'SELECT Cust_id FROM Login ORDER BY Login_id DESC LIMIT 1';
      const custIdResult = await client.query(fetchCustIdQuery);
      const cust_id = custIdResult.rows[0].cust_id;

      const selectQuery = 'SELECT * FROM AddsToCart WHERE P_id = $1 AND Cust_id = $2';
      const result = await client.query(selectQuery, [product_id, cust_id]);

      if (result.rows.length > 0) {
        const updateQuery = 'UPDATE AddsToCart SET Quantity = Quantity + 1 WHERE P_id = $1 AND Cust_id = $2';
        await client.query(updateQuery, [product_id, cust_id]);
        res.status(200).json({ message: 'Product quantity updated in cart.' });
      } else {
        const insertQuery = 'INSERT INTO AddsToCart (Cust_id, P_id, Quantity) VALUES ($1, $2, 1)';
        await client.query(insertQuery, [cust_id, product_id]);
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
