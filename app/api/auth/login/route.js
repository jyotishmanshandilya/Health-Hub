import pool from '../../../../db';
import { NextResponse } from "next/server";

export async function POST(req, res){
    const body = await req.json();
    const { username, password, role } = body;

    try {
      const client = await pool.connect();

      let table;
      if (role === 'customer') {
        table = 'customer';
      } else if (role === 'seller') {
        table = 'seller';
      }

      if (table) {
        const result = await client.query(
          `SELECT * FROM ${table} WHERE username = $1 AND password = $2`,
          [username, password]
        );

        if (result.rows.length > 0) {
          // Authentication successful
          console.log("logged in succesfully");
          return NextResponse.json({ message: 'Login Successful' }, { status: 200 });
        } else {
          // Authentication failed
          console.log("logged in failed");
          return NextResponse.json({ error: 'Login Failed' }, { status: 401 })
        }
      } else {
        // Role not recognized
        return NextResponse.json({ error: 'Role not recognized' }, { status: 401 })
      }

      client.release();
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  
};
