import passport from "passport";
import local from "passport-local";
import { UserDao } from "../daos/userDao.js";
import { createHash, validatePassword } from "../utils.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "usuario" },
      async (req, usuario, password, done) => {
        try {
          const existsUsername = await UserDao.getByUser(usuario);
          if (existsUsername) {
            return done(null, false);
          }
          const existsEmail = await UserDao.getByEmail(req.body.email);
          if (existsEmail) {
            return done(null, false);
          }
          req.body.usuario = usuario;
          req.body.password = createHash(password);
          const UserApi = new UserDao();
          const savedUser = await UserApi.save(req.body);
          req.body.id = savedUser[0].id
          return done(null, req.body);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "usuario" },
      async (usuario, password, done) => {
        try {
          const user = await UserDao.getByUser(usuario);
          if (!user) {
            return done(null, false, {
              message: "no existe el usuario en la base de datos",
            });
          }
          if (!validatePassword(user[0], password)) {
            return done(null, false, { message: "contraseña incorrecta" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user.usuario);
  });

  passport.deserializeUser(async (user, done) => {
    return done(null, user);
  });
};

export { initializePassport };
