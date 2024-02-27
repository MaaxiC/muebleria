const validateEmpty = (req, res, next) => {
  const { usuario, password } = req.body;
  if (usuario.trim() == "")
    return res
      .status(400)
      .send({ status: "error", error: "Complete el campo usuario" });
  if (password.trim() == "")
    return res
      .status(400)
      .send({ status: "error", error: "Complete el campo contraseña" });
  next();
};

export { validateEmpty };