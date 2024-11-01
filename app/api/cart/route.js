import conn from '@/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET;

export async function POST(req, res){
  const body = await req.json();
  const { id, pid, ptid } = body;
  try {
      // Check if user is logged in/token exists
      const token  = cookies().get('token');
      if (!token) {
        return NextResponse.json({msg: "User not authenticated"}, {status: 403})
      }
      // Check the quantity in the Productitems table
      const resQty = await conn.query(`select quantity 
        from productitems 
        where productitemid = ${ptid}`);
      const quantity = resQty.rows[0].quantity;

      // If the quantity is less than 1, return an error message
      if (quantity < 1) {
          return NextResponse.json({ msg: 'Product is out of stock' }, { status: 409 });
      }

      // Get users cartid
      const decodedToken = jwt.verify(token, secret);
      const { userid } = decodedToken;
      const resCid = await conn.query(`select cartid
        from cart
        where userid = ${userid}`);
      const cartid = resCid.row[0].cartid;


      // Insert into cartitem

      // Decrement the qty in the productitems table

  } catch (error) {
      console.error("Error in adding productitem to cart: ".error);
      return NextResponse.json({ message: 'Internal server error' }, {status: 500});
  }
};

export async function GET(req, res){
    try {  
        // Fetch the userId from the browser

        // Get cartId using userId
  
        // Fetch the cart items using cartId
      
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, {status:500});
      }
}
