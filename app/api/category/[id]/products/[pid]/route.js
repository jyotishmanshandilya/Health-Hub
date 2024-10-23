import conn from "@/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { pid } = params;
    console.log("Slug: ", pid);
    try {
        const res = await conn.query(`select * from productitems where productid = ${pid}`);
        const productitems = res.rows;
        return NextResponse.json(productitems, {status: 200});
    } catch (error) {
        console.log("Error in fetching productitems");
        return NextResponse.json("Error: ", error)
    }
}