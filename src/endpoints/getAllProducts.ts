import { Request, Response } from "express";
import { connection } from "../data/connection";

export default async function getAllProducts (req: Request, res: Response) : Promise<void> {
    let statusCode = 400  
    try {
        let order = req.query.order as string
        let search = req.query.search as string

        if (!order) {
            order = "ASC"
        }

        if (!search) {
            search ="%"
        }

        const products = await connection("labecommerce_products")
        .orderBy("id", order)
        .where("name", "like", `%${search}%`)


        if (products.length < 1) {
            res.status(404).send("Não foi encontrado um produto com os parâmetros informados.") 
        }

        res.status(200).send(products)
    }
    catch (error:any) {
        res.status(statusCode).send(error.message)
    }
}