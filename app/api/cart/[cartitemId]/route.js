import conn from "@/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }){
    const { cartitemId } = params;
    const url = req.nextUrl;
    const qty = url.searchParams.get('qty');
    const productitemId = url.searchParams.get('productitemId');
    console.log("ProductitemId: ", productitemId)
    try {
        //  delete the productitem from cartitems table
        const resDeleteCartitem = await conn.query(`delete 
            from cartitem
            where cartitemid=${cartitemId}`
        );
        console.log("Deleted the item successfully", resDeleteCartitem);

        // add the qty back into the productitems table
        const resUpdateProductitem = await conn.query(`update productitems
            set quantity = quantity + ${qty}
            where productitemid=${productitemId}`
        );
        console.log("Deleted the item suscessfully", resDeleteCartitem);
        return NextResponse.json({ message: `You have removed ${qty} item(s) of ${productitemId} from your cart`}, {status: 200});
    } catch (error) {
        console.log("Error in removing item from cart: ", error);
        return NextResponse.json({err: error}, {status:500})
    }
}