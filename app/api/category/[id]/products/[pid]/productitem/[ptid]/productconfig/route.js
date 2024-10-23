import conn from "@/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }){
    const { id, pid, ptid } = params;
    const productitemId = parseInt(ptid);
    try {
        const res = await conn.query(`select productitemid, variationvalue, variationname 
            from productconfig
            natural join variationoptions 
            natural join variations
            where productitemid = ${productitemId}`);
        
        const data = res.rows;
        console.log("Data: ", data);

        let productConfig = {};
        
        data.forEach((dataItem) => {
            if(!productConfig[dataItem.variationname]){
                productConfig[dataItem.variationname] = [];
            }
            productConfig[dataItem.variationname].push(dataItem.variationvalue);
        });

        console.log("Product config dict: ", productConfig);

        return NextResponse.json(productConfig, { status:200 });
    } catch (error) {
        console.log("Error in fetching product config: ", error);
        return NextResponse.json({err:error}, { status:500 });
    }
}