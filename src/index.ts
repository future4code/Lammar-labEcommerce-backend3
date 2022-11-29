import { app } from "./app";
import createProduct from "./endpoints/createProduct";
import createUser from "./endpoints/createUser";
import getAllProducts from "./endpoints/getAllProducts";
import getAllUsers from "./endpoints/getAllUsers";

// Cadastrar usuário
app.post("/users", createUser);

// Buscar todos os usuários
app.get("/users", getAllUsers)

// Cadastrar produto
app.post("/products", createProduct)

// Buscar todos os produtos
app.get("/products", getAllProducts)