import pool from '../../../../../db';

export async function GET(req, res){
  if (req.method === 'GET') {
    const productId = req.query.slug;
    try {
      const client = await pool.connect();
      const reviewsResult = await client.query(
        `SELECT review_id, description, rating FROM review WHERE review_id IN (SELECT review_id FROM has WHERE p_id = $1)`, [productId]
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
        INSERT INTO review (review_id, description, rating)
        VALUES ($1, $2, $3)
      `;

      await client.query(insertReviewQuery, [newreview, description, rating]);

      const insertGivesQuery = `
        INSERT INTO gives (cust_id, review_id, rdate)
        VALUES ((SELECT cust_id FROM login ORDER BY login_id DESC LIMIT 1), $1, $2)
      `;

      await client.query(insertGivesQuery, [newreview, date]);

      const insertHasQuery = `
        INSERT INTO has (p_id, review_id)
        VALUES ($1, $2)
      `;

      await client.query(insertHasQuery, [productId, newreview]);

      client.release();

      res.status(200).json({ message: 'Review added successfully.' });
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
