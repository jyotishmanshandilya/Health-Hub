import conn from '@/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET;

export async function POST(req, res){
  const body = await req.json();
  const { productitemId, qty, productConfig } = body;
  try {
    // Check if user is logged in/token exists
    const token  = cookies().get('token');
    if (!token) {
      return NextResponse.json({msg: "User not authenticated"}, {status: 403})
    }

    // Get users cartid
    const decodedToken = jwt.verify(token.value, secret);
    const { userid } = decodedToken;
    const resCid = await conn.query(`select cartid
      from cart
      where userid = ${userid}`
    );
    const cartid = resCid.rows[0]?.cartid;

    // get the variationId and variationoptionId from the body
    const variationId = productConfig[Object.keys(productConfig)[0]].variationId;
    const variationOptionId = productConfig[Object.keys(productConfig)[0]].data?.id;

    // Insert into cartitem
    const resInsertProductitem = await conn.query(`insert into cartitem(cartid, qty, variationid, variationoptionid, productitemid)
      values(${cartid}, ${qty}, ${variationId}, ${variationOptionId}, ${productitemId})`
    );

    // Decrement the qty in the productitems table
    const resUpdateQty = await conn.query(`update productitems
      set quantity = quantity-${qty}
      where productitemid = ${productitemId}`);
    return NextResponse.json(resInsertProductitem, {status: 200});
  } catch (error) {
    console.error("Error in adding productitem to cart: ", error);
    return NextResponse.json({ message: 'Internal server error' }, {status: 500});
  }
};

export async function GET(req, res){
    try {  
      // Fetch the userId from the browser
      const token  = cookies().get('token');
      if (!token) {
        return NextResponse.json({msg: "User not authenticated"}, {status: 403})
      }

      // Get cartId using userId
      const decodedToken = jwt.verify(token.value, secret);
      const { userid } = decodedToken;
      const resCid = await conn.query(`select cartid
        from cart
        where userid = ${userid}`
      );
      const cartid = resCid.rows[0]?.cartid;

      // Fetch the cart items using cartId
      const resFetchCartItems = await conn.query(`select 
          cartitemid, 
          qty, 
          pc.productconfigid, 
          ci.productitemid, 
          pi.productid, 
          pi.imageurl, 
          pi.sku, 
          pi.price, 
          pi.title, 
          pi.description, 
          v.variationname, 
          vo.variationvalue, 
          (pi.price * qty) as total_productitem_cost 
        from cartitem ci
        join productitems pi
        on ci.productitemid = pi.productitemid
        join variations v
        on ci.variationid = v.variationid
        join variationoptions vo
        on ci.variationoptionid = vo.variationoptionid
        join productconfig pc
        on pc.productitemid = ci.productitemid and pc.variationoptionid = vo.variationoptionid 
        where cartid = ${cartid}`)

        const cartItems = resFetchCartItems.rows
        console.log("Cart items in the server side: ", cartItems)
      return NextResponse.json(cartItems, {status: 200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, {status:500});
    }
}
