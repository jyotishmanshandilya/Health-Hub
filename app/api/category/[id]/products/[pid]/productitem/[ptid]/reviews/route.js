import conn from "@/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }){
    const {id, pid, ptid} = params;
    const productitemId = parseInt(ptid);
    try {
        const res = await conn.query(`select 
                emailid, 
                rating, 
                description, 
                reviewid 
            from reviews
            natural join users
            where productitemid = ${productitemId}`);
        const reviews = res.rows;
        return NextResponse.json(reviews, {status:200});
    } catch (error) {
        console.log("Error in fetching reviews: ", error);
        return NextResponse.json({err: error}, {status:500});
    }
}