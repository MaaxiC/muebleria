import passport from "passport";

const signUp = async (req, res) => {
  res.send({ status: "success", payload: req.user.id });
};

const registerFail = async (req, res) => {
  res
    .status(401)
    .send({
      status: "error",
      error: "El usuario o el mail ya se encuentra registrado",
    });
};

const validateSignIn = async (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).send({ status: "error", error: info.message });
    }
    const { nombre, apellido, email, usuario, fechaNacimiento, direccion, telefono, dni, genero, activo, id, createdAt } = user[0];
    req.session.user = {
      nombre,
      apellido,
      email,
      usuario,
      fechaNacimiento,
      direccion,
      telefono,
      dni,
      genero,
      activo,
      id,
      createdAt
    };
    next();
  })(req, res, next);
};

const signIn = async (req, res) => {
  res.send({ status: "success", payload: req.session.user });
};

const loginFail = async (req, res) => {
  res.status(500).send({ status: "error", error: "Fallo al iniciar sesion" });
};

export { signUp, signIn, registerFail, loginFail, validateSignIn };