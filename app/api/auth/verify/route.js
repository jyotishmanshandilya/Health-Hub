import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET;

export async function POST( req, res ){
    const body = await req.json();
    const { token } = body;
    // console.log("Token in verify route:", token);

    try {
        const decode = jwt.verify(token, secret);
        // console.log("Decode object in server side: ", decode);
        return NextResponse.json(decode, {status: 200});
        
    } catch (error) {
        // console.log("Error to Decode object in server side: ", error);
        return NextResponse.json({ error: 'Internal server error' }, {status: 401});
    }
}