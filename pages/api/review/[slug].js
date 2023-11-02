import pool from '../../../db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const productId = req.query.slug;
    try {
      const client = await pool.connect();
      const reviewsResult = await client.query(
        `SELECT review_id, description, rating FROM review WHERE review_id IN (SELECT review_id FROM product WHERE p_id = ${productId})`
      );
      const reviews = reviewsResult.rows;
      console.log(reviews);
      client.release();

      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const productId = req.query.slug;
    const { description, rating, date, newProductDetails } = req.body;

    // Log the request body
    console.log('Request Body:', {
      description,
      rating,
      date,
      newProductDetails,
    });

    try {
      const client = await pool.connect();
const getLastreviewIdResult = await client.query(
  'SELECT MAX(review_id) FROM review'
);
const lastreviewId = getLastreviewIdResult.rows[0].max || 0;
const newreview = lastreviewId + 1;
const insertReviewQuery = `
  INSERT INTO review (review_id, description, rating, date)
  VALUES ($1, $2, $3, $4)
`;

const result = await client.query(insertReviewQuery, [newreview, description, rating, date]);

const newReviewId = result.rows[0]?.review_id;

if (newReviewId !== undefined) {
  // Now, increment p_id for each new product
        const getLastProductIdResult = await client.query(
            'SELECT MAX(p_id) FROM product'
        );
        const lastProductId = getLastProductIdResult.rows[0].max || 0;
        const newProductId = lastProductId + 1;

        const insertProductQuery = `
        INSERT INTO product (p_id, seller_id, p_name, cat_id, price, description, image1_url, review_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *; 
        `;

        const insertedProduct = await client.query(insertProductQuery, [
        newProductId,  // New p_id
        productId,     // Existing seller_id (assuming it's associated with the product)
        newProductDetails.p_name,  // Use the product name from your state
        newProductDetails.cat_id,  // Use the category ID from your state
        newProductDetails.price,   // Use the price from your state
        newProductDetails.description,  // Use the description from your state
        newProductDetails.image1_url,  // Use the image URL from your state
        newReviewId  // New review_id
        ]);

        // Log the inserted product
        console.log('Inserted Product:', insertedProduct.rows[0]);

} else {
  console.error('Added');
  res.status(500).json({ error: 'Internal server error' });
}}
 catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}