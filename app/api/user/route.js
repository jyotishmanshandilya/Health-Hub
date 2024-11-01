import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
import conn from '@/db';

const secret = process.env.JWT_SECRET;

export async function GET(req, res){
  // get token from cookies
  const token = cookies().get('token');

  if(!token){
    return NextResponse.json({msg: "Jwt Token Not Found"}, {status:404});
  }

  try {
    // decode token and get userid 
    const decode  = jwt.verify(token.value, secret);
    const { userid } = decode;

    // retrieve the user details using the userid
    const res = await conn.query(`select 
        userid, 
        emailid, 
        phoneno, 
        firstname, 
        lastname, 
        unit, 
        street, 
        city, 
        statename, 
        country, 
        pincode 
        from users
      natural join useraddress
      natural join address
      where userid = ${userid}`);

    const userDetails = res.rows[0];
    return NextResponse.json(userDetails, {status:200})
  } catch (error) {
    console.log("Invalid Token: ", error);
    return NextResponse.json({err: error}, {status: 500});
  }
};
