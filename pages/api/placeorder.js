import pool from '../../db';

export default async (req, res) => {
  let client;
  try {
    const { deliveryAddress } = req.body;

    client = await pool.connect();
    await client.query('BEGIN');

    // Fetch the last Cust_id from the Login table
    const custIdQuery = 'SELECT Cust_id FROM Login ORDER BY Login_id DESC LIMIT 1';
    const custIdResult = await client.query(custIdQuery);
    const custId = custIdResult.rows[0].cust_id; // Check the case here

    // Find the next available order_id
    const maxOrderIdQuery = 'SELECT COALESCE(MAX(order_id), 0) + 1 AS next_order_id FROM OrderTable';
    const maxOrderIdResult = await client.query(maxOrderIdQuery);
    const nextOrderId = maxOrderIdResult.rows[0].next_order_id;

    // Calculate total price of the order
    const totalPriceQuery = 'SELECT SUM(P.price * A.quantity) AS total_price FROM AddsToCart A JOIN Product P ON A.P_id = P.P_id WHERE A.Cust_id = $1';
    const totalPriceResult = await client.query(totalPriceQuery, [custId]);
    const totalPrice = totalPriceResult.rows[0].total_price;

    // Insert the order details into the OrderTable
    const insertOrderQuery = 'INSERT INTO OrderTable (Order_id, Price) VALUES ($1, $2)';
    await client.query(insertOrderQuery, [nextOrderId, totalPrice]);

    // Insert the order details into the PlacesOrder table for each product in the cart
    const insertPlacesOrderQuery = `
      INSERT INTO PlacesOrder (Cust_id, Order_id, P_id, Quantity, Price)
      SELECT $1, $2, A.P_id, A.Quantity, P.Price * A.Quantity
      FROM AddsToCart A
      JOIN Product P ON A.P_id = P.P_id
      WHERE A.Cust_id = $1`;
    await client.query(insertPlacesOrderQuery, [custId, nextOrderId]);

    // Clear the AddsToCart entries for the customer
    const clearCartQuery = 'DELETE FROM AddsToCart WHERE Cust_id = $1';
    await client.query(clearCartQuery, [custId]);

    await client.query('COMMIT');

    res.status(200).json({ orderId: nextOrderId });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error in placing order:', error); // Log the specific error
    res.status(500).json({ error: 'Database error' });
  } finally {
    client.release();
  }
};
