import conn from '../../../../db';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const body = await req.json();
  const { email, password } = body;

  try {

    // ------------- hash the new password with the same hashing salt -------------
    
    let result = await conn.query(
      `UPDATE USERS SET pwd = $1 WHERE emailid = $2`,
      [password, email]
    );

    if (result.rowCount > 0) {
      return NextResponse.json({ message: 'Password change successful' }, { status: 200 });
    } 
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
