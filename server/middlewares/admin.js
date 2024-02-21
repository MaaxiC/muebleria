import { UserDao } from "../daos/index.js";

const Admin = async (req, res, next) => {
  if (!req.session.user)
    return res
      .status(403)
      .send({ status: "error", error: "No autorizado, se requiere ser admin" });
  const userApi = new UserDao();
  const result = await userApi.getById(req.session.user.id);
  if (result) {
    return next();
  }
  return res
    .status(403)
    .send({ status: "error", error: "No autorizado, se requiere ser admin" });
};

export { Admin };