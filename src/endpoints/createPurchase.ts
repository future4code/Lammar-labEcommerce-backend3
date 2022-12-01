import { Request, Response } from "express";
import { connection } from "../data/connection";
import { purchase } from "../types";

export default async function createPurchase (req: Request, res: Response) : Promise<void> {
    let statusCode = 400  
    try {
        const {user_id, product_id, quantity} = req.body

        if (!user_id || !product_id || !quantity) {
            statusCode = 422
            throw new Error ("Necessário inserir todos os parâmetros (user_id, product_id e quantity).")
        }

        if (typeof user_id !== "string" || typeof product_id!== "string") {
            statusCode = 422
            throw new Error ("Os parâmetros user_id e product_id devem ser do tipo string.")
        }

        if (typeof quantity !== "number") {
            statusCode = 422
            throw new Error ("O parâmetro quantity deve ser do tipo number.")
        }

        const users = await connection("labecommerce_users")

        const userExists = users.find((user)=> user_id === user.id)

        if(typeof userExists === "undefined") {
            statusCode = 422
            throw new Error ("O user_id inserido não existe.")
        }

        const products = await connection("labecommerce_products")

        const productExists = products.find((product)=> product_id === product.id)

        if(typeof productExists === "undefined") {
            statusCode = 422
            throw new Error ("O product_id inserido não existe.")
        }

        let total_price = 0

        function returnProductPrice () {
            for (let i=0; i<products.length; i++) {
                if (product_id === products[i].id) {
                    return products[i].price
                } 
            }
        }

        total_price = returnProductPrice() * quantity

        const purchases = await connection("labecommerce_purchases")

        const id: string = (purchases.length + 1).toString()

        const newPurchase: purchase = { id, user_id, product_id, quantity, total_price};
        
        await connection("labecommerce_purchases").insert(newPurchase);

        res.status(200).send("Compra registrada!")
    }
    catch (error:any) {
        res.status(statusCode).send(error.message)
    }
}