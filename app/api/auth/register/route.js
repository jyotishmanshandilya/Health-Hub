import pool from '../../../../db';
import { NextResponse } from "next/server";

export async function POST(req, res){
    const body = await req.json();
    const { username, password, role, name, p_no, email } = body;
    let userInsertResult; // Declare the variable here

    try {
      const client = await pool.connect();

      if (role === 'customer') {
        const getLastCustIdResult = await client.query(
          'SELECT MAX(cust_id) FROM customer'
        );
        const lastCustId = getLastCustIdResult.rows[0].max || 0;
        const newCustId = lastCustId + 1;

        userInsertResult = await client.query(
          'INSERT INTO customer (cust_id, username, p_no, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING cust_id',
          [newCustId, username, p_no, email, password]
        );
      } else if (role === 'seller') {
        const getLastSellerIdResult = await client.query(
          'SELECT MAX(seller_id) FROM seller'
        );
        const lastSellerId = getLastSellerIdResult.rows[0].max || 0;
        const newSellerId = lastSellerId + 1;

        userInsertResult = await client.query(
          'INSERT INTO seller (seller_id, username, password) VALUES ($1, $2, $3) RETURNING seller_id',
          [newSellerId, username, password]
        );
      }

      const user_id = userInsertResult.rows[0][role + '_id'];

      client.release();
      return NextResponse.json({ message: 'Registration Successful', user_id }, { status: 200 });
    //   res.status(200).json({ message: 'Registration successful', user_id });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server error', user_id }, { status: 200 });
    //   res.status(500).json({ message: 'Internal server error' });
    }
};
