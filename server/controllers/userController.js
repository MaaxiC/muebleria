import { UserDao } from "../daos/index.js";
import { ERROR, joiValidator } from "../utils/index.js";

const UserApi = new UserDao();

const getUsers = async (req, res) => {
  try {
    const users = await UserApi.getAll();
    res.send(users);
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserApi.getById(id);
    if (!user || user.kind)
      return res
        .status(404)
        .send({ status: "error", error: ERROR.MESSAGE.NO_USER });
    res.send(user);
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
  }
};

const changeActiveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.body.activo;
    if (isActive !== 0 && isActive !== 1)
      return res
        .status(400)
        .send({ status: "error", error: ERROR.MESSAGE.INVALID_ACTIVE });
    const user = await UserApi.update(id, req.body);
    if (!user || user.kind)
      return res
        .status(404)
        .send({ status: "error", error: ERROR.MESSAGE.NO_USER });
    res.send({
      status: "success",
      response: "Estado actualizado correctamente",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, direccion, telefono, genero } = req.body;
    console.log(id, req.body);
    const user = await joiValidator.updateUser.validateAsync({
      nombre,
      apellido,
      direccion,
      telefono,
      genero,
    });
    const userSaved = await UserApi.update(id, user);
    if (!userSaved || userSaved.kind)
      return res
        .status(404)
        .send({ status: "error", error: ERROR.MESSAGE.NO_USER });
    res.send({
      status: "success",
      response: "Usuario actualizado correctamente",
    });
  } catch (error) {
    if (error._original)
      return res
        .status(400)
        .send({ status: "error", error: error.details[0].message });
    res
      .status(500)
      .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
  }
};

export { getUsers, changeActiveUser, updateUser, getUserById };
