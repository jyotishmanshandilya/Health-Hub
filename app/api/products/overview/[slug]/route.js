import { NextResponse } from 'next/server';
import pool from '../../../../../db';

export async function GET(req, {params}){
  const productId = params.slug;
    try {
      const client = await pool.connect();
      const productResult = await client.query(`SELECT p_id, p_name, description, cat_id, price, image1 FROM product WHERE p_id=${productId}`);
      const product = productResult.rows[0];
      // console.log(product);
      client.release();

      return NextResponse.json(product, {status:200});
    } catch (error) {
    //   console.error('Error fetching product:', error);
      return NextResponse.json({error: 'Internal Server Error'}, {status:500});
    }
};
