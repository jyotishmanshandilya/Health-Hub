import conn from '../../../../db';
import { NextResponse } from "next/server";

export async function POST(req, res){
    const body = await req.json();
    const { password, phone_no, email } = body;
    let userInsertResult;

    try {
        // ------------ hash the password using bycrypt before entering into the database -----------

        userInsertResult = await conn.query(
            'INSERT INTO USERS(emailid, phoneno, pwd) VALUES($1, $2, $3) returning userid',
            [email, phone_no, password]
        );

        const userid = userInsertResult.rows[0].userid;
        // console.log("Userid: ", userid);

        return NextResponse.json({ message: 'Registration Successful', userid }, { status: 200 });
    } catch (error) {

        console.error("Error:", error);

        if (error.message.includes('User with email')) {
            return NextResponse.json({ error: 'User with this username already exists' }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Internal Server error' }, { status: 500 });
        }
    }
};

