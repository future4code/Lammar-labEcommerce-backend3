import { Request, Response } from "express";
import { connection } from "../data/connection";
import { user, userModified } from "../types";

export default async function getAllUsersModified (req: Request, res: Response) : Promise<void> {
    let statusCode = 400  
    try {

        const users = await connection("labecommerce_users")
        const purchases = await connection("labecommerce_purchases")

        const usersModified: userModified[] = []

        for(let x=0; x<purchases.length; x++) {
            for(let i=0; i<users.length; i++) {
                if (purchases[x].user_id === users[i].id) {
                    usersModified.push ({
                        id: users[i].id,
                        name: users[i].name,
                        email: users[i].email,
                        password: users[i].password,
                        purchases: purchases[x]
                    })
                }
            }
        }

        res.status(200).send(usersModified)
    }
    catch (error:any) {
        res.status(statusCode).send(error.message)
    }
}