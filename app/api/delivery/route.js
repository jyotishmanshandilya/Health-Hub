import { NextResponse } from 'next/server';
import pool from '../../../db';

export async function GET(req) {
  try {
    const client = await pool.connect();

    // Fetch the last Order_id from the PlacesOrder table
    const orderIdQuery = 'SELECT Order_id FROM PlacesOrder ORDER BY Order_id DESC LIMIT 1';
    const orderIdResult = await client.query(orderIdQuery);
    
    if (orderIdResult.rows.length === 0) {
      console.error('No orders found');
      client.release();
      return NextResponse.json({ message: 'No orders found' }, { status: 404 });
    }

    const orderId = orderIdResult.rows[0].order_id;

    const query = `
      SELECT 
        DeliveryService.Service_name, 
        DeliveryService.Contact_del, 
        Customer.Credit_Card_no, 
        Customer.Delivery_addr 
      FROM 
        DeliveryService 
      JOIN 
        OrderTable ON DeliveryService.Order_id = OrderTable.Order_id 
      JOIN 
        PlacesOrder ON OrderTable.Order_id = PlacesOrder.Order_id 
      JOIN 
        Customer ON PlacesOrder.Cust_id = Customer.Cust_id 
      WHERE 
        OrderTable.Order_id = $1
    `;

    const result = await client.query(query, [orderId]);
    const orderDetails = result.rows;

    client.release();

    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
