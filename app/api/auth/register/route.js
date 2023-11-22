import pool from '../../../../db';
import { NextResponse } from "next/server";

export async function POST(req, res){
    const body = await req.json();
    const { username, password, role, p_no, email, credit_card_no, delivery_addr } = body;
    let userInsertResult;

    try {
        const client = await pool.connect();

        if (role === 'customer') {
            const getLastCustIdResult = await client.query(
                'SELECT MAX(cust_id) FROM customer'
            );
            const lastCustId = getLastCustIdResult.rows[0].max || 0;
            const newCustId = lastCustId + 1;

            userInsertResult = await client.query(
                'INSERT INTO customer (cust_id, username, password, p_no, email, credit_card_no, delivery_addr) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING cust_id',
                [newCustId, username, password, p_no, email, credit_card_no, delivery_addr]
            );
        } else if (role === 'seller') {
            const getLastSellerIdResult = await client.query(
                'SELECT MAX(seller_id) FROM seller'
            );
            const lastSellerId = getLastSellerIdResult.rows[0].max || 0;
            const newSellerId = lastSellerId + 1;

            userInsertResult = await client.query(
                'INSERT INTO seller (seller_id, username, password) VALUES ($1, $2, $3) RETURNING seller_id',
                [newSellerId, username, password]
            );
        }

        const user_id = userInsertResult.rows[0][role + '_id'];

        client.release();
        return NextResponse.json({ message: 'Registration Successful', user_id }, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error.message.includes('User with email')) {
            return NextResponse.json({ error: 'User with this username already exists' }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Internal Server error' }, { status: 500 });
        }
    }
};

