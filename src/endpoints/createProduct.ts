import { Request, Response } from "express";
import { connection } from "../data/connection";
import { user, product } from "../types";

export default async function createProduct (req: Request, res: Response) : Promise<void> {
    let statusCode = 400  
    try {
        const {name, price, image_url} = req.body

        if (!name || !price || !image_url) {
            statusCode = 422
            throw new Error ("Necessário inserir todos os parâmetros (name, price e image_url).")
        }

        if (typeof name !== "string" || typeof image_url!== "string") {
            statusCode = 422
            throw new Error ("Os parâmetros name e image_url devem ser do tipo string.")
        }

        if (typeof price !== "number") {
            statusCode = 422
            throw new Error ("O parâmetro price deve ser do tipo number.")
        }

        const products = await connection("labecommerce_products")

        const id: string = (products.length + 1).toString()

        const newProduct: product = { id, name, price, image_url};
        
        await connection("labecommerce_products").insert(newProduct);

        res.status(200).send("Produto cadastrado!")
    }
    catch (error:any) {
        res.status(statusCode).send(error.message)
    }
}