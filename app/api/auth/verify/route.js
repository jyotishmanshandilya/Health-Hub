import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET;

export async function POST( req, res ){
    const body = await req.json();
    const { token } = body;

    try {
        const decode = jwt.verify(token, secret);
        return NextResponse.json(decode, {status: 200});
        
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, {status: 401});
    }
}