import { Request, Response } from "express";
import { connection } from "../data/connection";
import { user } from "../types";

export default async function getAllUsers (req: Request, res: Response) : Promise<void> {
    let statusCode = 400  
    try {
        const users = await connection("labecommerce_users")
        res.status(200).send(users)
    }
    catch (error:any) {
        res.status(statusCode).send(error.message)
    }
}