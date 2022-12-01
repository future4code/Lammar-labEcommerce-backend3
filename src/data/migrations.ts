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
      CREATE TABLE IF NOT EXISTS labecommerce_purchases (
         id VARCHAR(255) NOT NULL PRIMARY KEY,
         user_id VARCHAR(255) NOT NULL,
         product_id VARCHAR(255) NOT NULL,
         quantity FLOAT NOT NULL,
         total_price FLOAT NOT NULL,
         FOREIGN KEY (user_id) REFERENCES labecommerce_users(id),
         FOREIGN KEY (product_id) REFERENCES labecommerce_products(id)
      );
   `)
   .then(() => { console.log("Tabelas criadas!") })
   .catch(printError)


createTables()