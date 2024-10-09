import conn from '../../../db';
import { NextResponse } from 'next/server';

export async function GET(req, res){
  try {
    const result = await conn.query(`select productitemid, 
        pd.productid, 
        imageurl, 
        sku, 
        quantity, 
        price, 
        pd.title as producttitle, 
        pi.title as productitemtitle, 
        pd.description as productdesc, 
        pi.description as productitemdesc, 
        categoryid               
      from productitems pi
      join product pd
      on pd.productid = pi.productid`
    );
    const products = result.rows;
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
