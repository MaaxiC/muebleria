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
  },
  mongo_db: {
    URL: process.env.URL ?? "mongodb://localhost/p11",
    SECRET: process.env.SECRET ?? "secretKeySessionDefault"
  },
  SQL_DB: {
    client: 'sqlite3',
        connection: {
          filename: path.join(path.join(__dirname, "db"), "muebleria.sqlite"),
    },
    useNullAsDefault: true,
  },
  mailing: {
    EMAIL: process.env.EMAIL ?? "test@test.com",
    EMAIL_PASS: process.env.EMAIL_PASS ?? "test",
  },
  server: {
    PORT: process.env.PORT ?? PORT,
    routes: {
      auth: "/auth/api",
      products: "/api/productos",
      categories: "/api/categorias",
      users: "/api/usuarios",
    },
  },
};

export { config };