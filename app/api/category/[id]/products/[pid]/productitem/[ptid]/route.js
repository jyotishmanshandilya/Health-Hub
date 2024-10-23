import conn from "@/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }){
    const { id, pid, ptid } = params;
    const productitemId = parseInt(ptid);
    try {
        const res = await conn.query(`select * from productitems where productitemid = ${productitemId}`);
        const productitemData = res.rows;
        console.log("Retrieved productitem details: ", productitemData);
        return NextResponse.json(productitemData, {status:200});
    } catch (error) {
        console.log("Error in fetching productitem details: ", error);
        return NextResponse.json({err: error}, {status: 500});
    }
}