import pool from '../../../db';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const body = await req.json();
  const { username, newPassword } = body;

  try {
    const client = await pool.connect();

    // Update the password in the 'customer' table
    let result = await client.query(
      `UPDATE customer SET password = $1 WHERE username = $2`,
      [newPassword, username]
    );

    if (result.rowCount === 0) {
      // If no rows were updated in the 'customer' table, try updating the 'seller' table
      result = await client.query(
        `UPDATE seller SET password = $1 WHERE username = $2`,
        [newPassword, username]
      );
    }

    client.release();

    if (result.rowCount > 0) {
      // If a row was updated in either table, the password change was successful
      return NextResponse.json({ message: 'Password change successful' }, { status: 200 });
    } else {
      // If no rows were updated in either table, the user does not exist
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
