import dotenv from "dotenv";
import { __dirname } from "../utils.js";
import path from "path";

dotenv.config();

const PORT = 4000;

const config = {
  collection: {
    products: "productos",
    users: "usuarios",
    roles: "roles",
    categories: "categorias",
    orders: "ordenes",
  },
  SQL_DB: {
    client: 'sqlite3',
        connection: {
          filename: path.join(path.join(__dirname, "db"), "muebleria.sqlite"),
        },
    useNullAsDefault: true,
  },
  server: {
    PORT: process.env.PORT ?? PORT,
    SECRET: process.env.SECRET ?? "secretKeySessionDefault",
    routes: {
      auth: "/auth/api",
      products: "/api/productos",
      categories: "/api/categorias",
      users: "/api/usuarios",
      orders: "/api/ordenes",
    },
  },
};

export { config };