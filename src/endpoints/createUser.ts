import { Request, Response } from "express";
import { connection } from "../data/connection";
import { user } from "../types";

export default async function createUser (req: Request, res: Response) : Promise<void> {
    let statusCode = 400  
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password) {
            statusCode = 422
            throw new Error ("Necessário inserir todos os parâmetros (name, email e password).")
        }

        if (typeof name !== "string" || typeof email !== "string" || typeof password!== "string") {
            statusCode = 422
            throw new Error ("Os parâmetros name, email e password devem ser do tipo string.")
        }

        const users = await connection("labecommerce_users")

        const id: string = (users.length + 1).toString()

        const newUser: user = { id, name, email, password };
        
        await connection("labecommerce_users").insert(newUser);

        res.status(200).send("Usuário criado!")
    }
    catch (error:any) {
        res.status(statusCode).send(error.message)
    }
}