import pool from '../../../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const productId = req.query.slug;
    try {
      const client = await pool.connect();
      const productResult = await client.query(`SELECT p_id, p_name, description, cat_id, price, image1_url FROM product WHERE p_id=${productId}`);
      const product = productResult.rows[0];
      console.log(product);
      client.release();

      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
