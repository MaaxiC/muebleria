import express from "express";
import morgan from "morgan";
import {
  productRouter,
  categoryRouter,
  authRouter,
  userRouter,
} from "./routes/index.js";
import { config } from "./config/config.js";
import cors from "cors";
import session from "express-session";
import knexSessionStore from "connect-session-knex";
import knex from 'knex'
import passport from "passport";
import { initializePassport } from "./config/passport.js";

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
    secret: config.mongo_db.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: true }
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Archivos estaticos
//app.use(express.static(path.join(__dirname, "public")));

//Rutas
app.use(config.server.routes.products, productRouter);
app.use(config.server.routes.categories, categoryRouter);
app.use(config.server.routes.auth, authRouter);
app.use(config.server.routes.users, userRouter);

app.use((req, res) => {
  res.status(404).send({ status: "error", error: "Invalid Request" });
});

export default app;
