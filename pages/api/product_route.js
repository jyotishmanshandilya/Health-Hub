import pool from '../../db';

export default async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT p_id, p_name, description, price, image1_url FROM product');
    const products = result.rows;
    client.release();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
