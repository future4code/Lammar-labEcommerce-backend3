import { app } from "./app";
import createProduct from "./endpoints/createProduct";
import createPurchase from "./endpoints/createPurchase";
import createUser from "./endpoints/createUser";
import getAllProducts from "./endpoints/getAllProducts";
import getAllPurchasesByUser from "./endpoints/getAllPurchasesByUser";
import getAllUsers from "./endpoints/getAllUsers";
import getAllUsersModified from "./endpoints/getAllUsersModified";

// Cadastrar usuário
app.post("/users", createUser);

// Buscar todos os usuários
app.get("/users", getAllUsers)

// Cadastrar produto
app.post("/products", createProduct)

// Buscar todos os produtos
app.get("/products", getAllProducts)

// Gerar compra
app.post("/purchases", createPurchase)

// Buscar todos os produtos
app.get("/users/:user_id/purchases", getAllPurchasesByUser)

// Buscar todos os usuários + compras
app.get("/usersModified", getAllUsersModified)
