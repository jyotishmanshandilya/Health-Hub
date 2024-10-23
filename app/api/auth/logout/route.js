import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(){
    try {
        cookies().delete('token');
        return NextResponse.json({message: "Cookie deleted successfully"}, {status: 200});
    } catch (error) {
        return NextResponse.json({err: "Failed to delete cookie"}, {status: 500});
    }
}