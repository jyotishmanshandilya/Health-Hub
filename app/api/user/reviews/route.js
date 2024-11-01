import conn from "@/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET;

export async function GET(req, res) {
    const token = cookies().get('token');

    if(!token){
        return NextResponse.json({err: "Token not found"}, {status: 404});
    }

    const decode = jwt.verify(token.value, secret);
    const userid = decode?.userid;

    try {
        const res = await conn.query(`
            with productitems_params as (
                select 
                    categoryid as catid, 
                    pi.productid as pid, 
                    productitemid as ptid, 
                    imageurl, 
                    price, 
                    pi.title as productitemtitle
                from productitems pi
                join product pd
                on pd.productid = pi.productid
            )
            select 
                catid, 
                pid, 
                ptid, 
                reviewid, 
                rating, 
                productitemtitle, 
                description, 
                imageurl, 
                price
            from reviews r
            join productitems_params pip
            on r.productitemid = ptid 
            where userid = ${userid}`);
        
            const userReviews = res.rows;
            console.log("User Reviews: ", userReviews);
            return NextResponse.json(userReviews, {status : 200});
    } catch (error) {
        console.log("Error in fetching the user reviews: ", error);
        return NextResponse.json({err: error}, {status: 500});
    }
}