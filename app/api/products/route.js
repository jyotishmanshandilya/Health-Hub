import pool from '../../../db';
import { NextResponse } from 'next/server';

export async function GET(req, res){
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT p_id, p_name, description, price, image1 FROM product');
    const products = result.rows;
    client.release();

    // res.status(200).json(products);
    return NextResponse.json(products, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    // res.status(500).json({ error: 'Internal server error' });
  }
};
