import pool from '../../../db';

export default async (req, res) => {
    const productId = req.query.slug;
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT p_id, p_name, description, cat_id, price, image1_url FROM product WHERE p_id=${productId}`);
    const product = result.rows;
    console.log("Product details: ", product[0]);
    client.release();

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
    return ;
  }
};