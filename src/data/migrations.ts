import { connection } from "./connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`
      CREATE TABLE IF NOT EXISTS labecommerce_users (
         id VARCHAR(255) NOT NULL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         password VARCHAR(255)
      );
      CREATE TABLE IF NOT EXISTS labecommerce_products (
         id VARCHAR(255) NOT NULL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         price FLOAT NOT NULL,
         image_url VARCHAR(255) NOT NULL
      );
   `)
   .then(() => { console.log("Tabelas criadas!") })
   .catch(printError)


createTables()