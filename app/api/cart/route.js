import { NextResponse } from 'next/server';
import pool from '../../../db';

export async function POST(req, res){
    const body = await req.json();
    const { product_id } = body;
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

        return NextResponse.json({ message: 'Product quantity updated in cart.' }, {status: 200});
        //res.status(200).json({ message: 'Product quantity updated in cart.' });
      } else {
        const insertQuery = 'INSERT INTO AddsToCart (Cust_id, P_id, Quantity) VALUES ($1, $2, 1)';
        await client.query(insertQuery, [cust_id, product_id]);

        return NextResponse.json({ message: 'Product added to cart.' }, {status: 201});
        //res.status(201).json({ message: 'Product added to cart.' });
      }
      client.release();
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, {status: 500});
      //res.status(500).json({ message: 'Internal server error' });
    }
};

export async function GET(req, res){
    try {
        const client = await pool.connect();

        // Fetch the Cust_id from the last row of the Login table
        const custIdQuery = 'SELECT Cust_id FROM Login ORDER BY Login_id DESC LIMIT 1';
        const custIdResult = await client.query(custIdQuery);
        const custId = custIdResult.rows[0].cust_id;

        // Use the fetched Cust_id in the query
        const query = `SELECT 
          Product.P_id, 
          Product.P_name, 
          AddsToCart.Quantity, 
          Product.Price, 
          Product.Image1 
          FROM Product 
          JOIN AddsToCart 
          ON Product.P_id = AddsToCart.P_id 
          WHERE AddsToCart.Cust_id = ${custId}`;

        const result = await client.query(query);

        const cartItems = result.rows.map((row) => ({
          productId: row.p_id,
          name: row.p_name,
          quantity: row.quantity,
          image1: row.image1,
          price: row.price
        }));
        return NextResponse.json(cartItems, {status:200});
        client.release();
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, {status:500});
      }
}
