import { NextResponse } from 'next/server';
import pool from '../../../../../db';

export async function GET(req, { params }){
  const productId = params.slug;
  try {
    const client = await pool.connect();
    const reviewsResult = await client.query(
      `SELECT review_id, description, rating FROM review WHERE review_id IN (SELECT review_id FROM has WHERE p_id = $1)`, [productId]
    );
    const reviews = reviewsResult.rows;
    console.log(reviews);
    client.release();
    return NextResponse.json(reviews, {status:200});
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal server error' }, {status:500});
  }
}

export async function POST(req, { params }){  
    const productId = params.slug;
    const body = await req.json();
    const { description, rating, date, newProductDetails } = body;

    try {
      const client = await pool.connect();

      // Check if a review by the same customer for the same product already exists
      const checkReviewExistsResult = await client.query(
        `SELECT * FROM has WHERE p_id = $1 AND review_id IN (SELECT review_id FROM gives WHERE cust_id = (SELECT cust_id FROM login ORDER BY login_id DESC LIMIT 1))`, [productId]
      );

      if (checkReviewExistsResult.rows.length > 0) {
        // If a review already exists, return an error message and stop further execution
        client.release();
        return NextResponse.json({ error: 'A customer can only review a product once.' }, {status:500});
      }

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
      return NextResponse.json({ message: 'Review added successfully.' }, {status:200});
    } catch (error) {
      console.error('Error adding review:', error);
      
      let errorMessage = 'Internal server error';
      if (error.message === 'A customer can only review a product once.') {
        errorMessage = error.message;
      }

      return NextResponse.json({ error: errorMessage }, {status:500});
    }
}