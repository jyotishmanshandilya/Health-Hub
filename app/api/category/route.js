import conn from "@/db";
import { NextResponse } from "next/server";

export async function GET(req, res){
    try {
        const res = await conn.query(`select * from category`);
        const categories = res.rows;
        return NextResponse.json(categories, {status: 200});
    } catch (error) {
        console.log("Error in fetching the categories");
        return NextResponse.json({err: error}, {status: 500});
    }
}