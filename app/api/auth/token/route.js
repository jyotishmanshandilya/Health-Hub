import { cookies } from'next/headers'
import { NextResponse } from 'next/server';

export async function GET(){
    const token = cookies().get('token');
    // if(!token){
    //     return NextResponse.json({err: 'Token not found'}, {status: 404});
    // }
    return NextResponse.json({ token }, {status: 200});
}