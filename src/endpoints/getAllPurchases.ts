import { Request, Response } from "express";
import { connection } from "../data/connection";

export default async function getAllPurchasesByUser (req: Request, res: Response) : Promise<void> {
    let statusCode = 400  
    try {
        let user_id = req.params.user_id as string

        if (!user_id) {
            statusCode = 422
            throw new Error ("Necessário inserir o user_id.")
        }

        const users = await connection("labecommerce_users")

        const userExists = users.find((user)=> user_id === user.id)

        if(typeof userExists === "undefined") {
            statusCode = 422
            throw new Error ("O user_id inserido não existe.")
        }
        
        const purchases = await connection("labecommerce_purchases")
        .where("user_id", "like", `${user_id}`)


        if (purchases.length < 1) {
            res.status(404).send("Nenhuma compra foi encontrada para o usuário informado.") 
        }

        res.status(200).send(purchases)
    }
    catch (error:any) {
        res.status(statusCode).send(error.message)
    }
}