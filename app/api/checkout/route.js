import { NextResponse } from 'next/server';
import pool from '../../../db';

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
      //res.status(200).json(cartItems);
      client.release();
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, {status:500});
      //res.status(500).json({ message: 'Internal server error' });
    }
};
