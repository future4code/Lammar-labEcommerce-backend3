import { Request, Response } from "express";
import { connection } from "../data/connection";
import { user, userModified } from "../types";

export default async function getAllUsersModified (req: Request, res: Response) : Promise<void> {
    let statusCode = 400  
    try {

        const users = await connection("labecommerce_users")
        const purchases = await connection("labecommerce_purchases")

        const usersModified: userModified[] = []
        
        users.map ((user) => {
            usersModified.push ({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                purchases: []
            })
        })

        purchases.map((purchase) => {
            for (let i=0; i<usersModified.length; i++) {
                if(purchase.user_id === usersModified[i].id) {
                    usersModified[i].purchases.push(purchase)
                }
            }
        })

        res.status(200).send(usersModified)
    }
    catch (error:any) {
        res.status(statusCode).send(error.message)
    }
}