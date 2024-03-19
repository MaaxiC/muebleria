import express from "express";
import morgan from "morgan";
import {
  productRouter,
  categoryRouter,
  authRouter,
  userRouter,
  orderRouter,
} from "./routes/index.js";
import { config } from "./config/config.js";
import cors from "cors";
import session from "express-session";
import knexSessionStore from "connect-session-knex";
import knex from 'knex'
import passport from "passport";
import { initializePassport } from "./config/passport.js";
import path from "path";
import { __dirname } from "./utils.js";

const app = express();
const KnexSessionStore = knexSessionStore(session);
initializePassport();

var whitelist = ['http://localhost:3000', 'http://localhost:5173']
var corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    } 
  }
}

//Middlewares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new KnexSessionStore({
      knex: knex(config.SQL_DB),
      tablename: "sesiones",
      sidfieldname: "id_sesion",
      createtable: true,
      clearInterval: 28800,
    }),
    secret: config.server.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: true }
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Archivos estaticos
app.use('/img', express.static(path.join(__dirname, "public/uploads")));

//Rutas
app.use(config.server.routes.products, productRouter);
app.use(config.server.routes.categories, categoryRouter);
app.use(config.server.routes.auth, authRouter);
app.use(config.server.routes.users, userRouter);
app.use(config.server.routes.orders, orderRouter);

export default app;
