import pool from '../../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Extract the delivery address from the request body
      const { deliveryAddress } = req.body;

      const client = await pool.connect();

      // Find the next available order_id
      const maxOrderIdQuery = 'SELECT COALESCE(MAX(order_id), 0) + 1 AS next_order_id FROM orders';
      const maxOrderIdResult = await client.query(maxOrderIdQuery);
      const nextOrderId = maxOrderIdResult.rows[0].next_order_id;

      // Insert the order details into the database with the next available order_id
      const insertQuery = 'INSERT INTO orders (order_id, delivery_addr) VALUES ($1, $2)';
      const values = [nextOrderId, deliveryAddress];
      await client.query(insertQuery, values);

      res.status(200).json({ orderId: nextOrderId });
      client.release();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
