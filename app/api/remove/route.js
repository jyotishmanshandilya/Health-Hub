import { NextResponse } from 'next/server';
import pool from '../../../db';

export async function DELETE(req, res){
    const body = await req.json();
    const { product_id } = body;
    
    try {
      const client = await pool.connect();
      
      // Fetch the customer ID
      const fetchCustIdQuery = 'SELECT Cust_id FROM Login ORDER BY Login_id DESC LIMIT 1';
      const custIdResult = await client.query(fetchCustIdQuery);
      const cust_id = custIdResult.rows[0].cust_id;
      
      // Check if the item exists in the cart
      const selectQuery = 'SELECT * FROM AddsToCart WHERE P_id = $1 AND Cust_id = $2';
      const result = await client.query(selectQuery, [product_id, cust_id]);
      
      if (result.rows.length > 0) {
        // If quantity > 1, decrement the quantity
        if (result.rows[0].quantity > 1) {
          const updateQuery = 'UPDATE AddsToCart SET Quantity = Quantity - 1 WHERE P_id = $1 AND Cust_id = $2';
          await client.query(updateQuery, [product_id, cust_id]);
          return NextResponse.json({ message: 'Product quantity decremented in cart.' }, {status: 200});
        } else {
          // If quantity is 1, remove the item from the cart
          const deleteQuery = 'DELETE FROM AddsToCart WHERE P_id = $1 AND Cust_id = $2';
          await client.query(deleteQuery, [product_id, cust_id]);
          return NextResponse.json({ message: 'Product removed from cart.' }, {status: 200});
        }
      } else {
        // If the item is not found in the cart
        return NextResponse.json({ message: 'Product not found in the cart.' }, {status: 404});
      }
      
      client.release();
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, {status: 500});
    }
  }
  