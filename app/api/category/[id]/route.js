import conn from "@/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }){
    const { id } = params;
    const categoryId = parseInt(id)
    try {
        const res = await conn.query(`select * from product where categoryid = ${categoryId}`);
        const products = res.rows;
        console.log("Category products: ", products)
        return NextResponse.json(products, {status: 200})
    } catch (error) {
        console.log("Error in fetching products: ", error);
        return NextResponse.json({err: error}, {status: 500});
    }
}