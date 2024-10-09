import { generateToken } from '@/utils/jwt';
import conn from '../../../../db';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const body = await req.json();
  const { email, password } = body;

  try {

    const result = await conn.query(
      `SELECT * FROM USERS WHERE emailid = $1 AND pwd = $2`,
      [email, password]
    );

    // console.log("Login result: ", result);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Login Failed' }, { status: 401 });
    } 
    const user = result.rows[0];

    // ----------- implement JWT auth here --------
    const tokenData = {
      userid: user.userid,
      emailid: user.emailid,
    }
    const token = generateToken(tokenData);

    const response = NextResponse.json({ message: 'Login Successful', token: token}, { status: 200 });
    
    response.cookies.set({
      name: 'token', 
      value: token,
      httpOnly: true, 
      secure: true,
      path: '/',
      maxAge: 3600,
      sameSite: 'strict',
    });

    return response;
  }catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
