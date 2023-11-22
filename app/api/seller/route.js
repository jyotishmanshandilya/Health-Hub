import pool from '../../../db';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const body = await req.json();
  const { productName, productID, categoryID, price, description, imageLink  } = body;

    try {
        const client = await pool.connect();
        const insertQuery = 'INSERT INTO Product (p_id, p_name, cat_id, price, description, image1) VALUES ($1, $2, $3, $4, $5, $6)';
        await client.query(insertQuery, [productID, productName, categoryID, price, description, imageLink]);
        console.log('Inserted New Product');
        client.release();
        return NextResponse.json({ message: 'Inserted New Product'}, { status: 200 });
    } catch (error) {
        console.log('Product insertion failed');
        return NextResponse.json({ message: 'Failed Insertion' }, { status: 500 });
    }
}