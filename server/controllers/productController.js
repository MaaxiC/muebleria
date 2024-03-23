import { ProductDao } from "../daos/index.js";
import { ERROR, joiValidator } from "../utils/index.js";
import { Upload } from "../middlewares/upload.js";

const ProductApi = new ProductDao();

class ProductController {
  static async getProducts(req, res) {
    try {
      let limit = req.query.limit ? req.query.limit : 10;
      let page = req.query.page ? req.query.page : 1;
      if (limit && isNaN(limit))
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.INVALID_LIMIT });
      limit = parseInt(limit);
      if (page && isNaN(page))
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.INVALID_PAGE });
      page = parseInt(page);
      let offset = (page - 1) * limit;
      const products = await ProductApi.getAll(limit, offset);
      products.sort((a, b) => {
        var textA = a.nombre.toUpperCase();
        var textB = b.nombre.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      products.forEach((product) => {
        product.foto = JSON.parse(product.foto);
      });
      res.send(products);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getProductById(req, res) {
    try {
      const productID = req.params.id;
      const product = await ProductApi.getById(productID);
      if (!product || product.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_PRODUCT });
      product.foto = JSON.parse(product.foto);
      res.send(product);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async createProduct(req, res) {
    try {
      Upload(req, res, async (err) => {
        if (!err && req.files == "") {
          return res
            .status(400)
            .send({
              status: "error",
              error: "Seleccione al menos una imagen para subir",
            });
        }
        if (err) {
          return res
            .status(400)
            .send({ status: "error", error: "Solo se permiten imagenes" });
        }
        const { nombre, descripcion, codigo, precio, stock, categoria } =
          req.body;
        const product = await joiValidator.product.validateAsync({
          nombre,
          descripcion,
          codigo,
          precio,
          stock,
          categoria,
        });
        product.foto = req.files.map((file) => file.filename);
        product.foto = JSON.stringify(product.foto);
        product.stockComprometido = 0;
        const productSaved = await ProductApi.save(product);
        res.send(productSaved);
      });
    } catch (error) {
      if (error._original)
        return res
          .status(400)
          .send({ status: "error", error: error.details[0].message });
      res.status(500).send({ status: "error", error: error });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, codigo, precio, categoria } = req.body;
      const product = await joiValidator.product.validateAsync({
        nombre,
        descripcion,
        codigo,
        precio,
        categoria,
      });
      const productSaved = await ProductApi.update(id, product);
      if (!productSaved || productSaved.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_PRODUCT });
      res.send({ success: "Actualizado correctamente" });
    } catch (error) {
      if (error._original)
        return res
          .status(400)
          .send({ status: "error", error: error.details[0].message });
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const productID = req.params.id;
      const response = await ProductApi.deleteById(productID);
      if (response == 0 || response.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_PRODUCT });
      res.send({
        status: "success",
        response: "Producto eliminado correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async updateStock(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductApi.getById(id);
      if (product.stock + req.body.stock < 0)
        return res
          .status(400)
          .send({ status: "error", error: ERROR.MESSAGE.NO_STOCK });
      product.stock += req.body.stock;
      if (product.stock < product.stockComprometido)
        return res
          .status(400)
          .send({ status: "error", error: ERROR.MESSAGE.NO_STOCK_COMPROMISE });
      const productSaved = await ProductApi.update(id, product);
      if (!productSaved || productSaved.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_PRODUCT });
      res.send(productSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async recalculateStock({ id, cantidad }) {
    try {
      const product = await ProductApi.getById(id);
      product.stockComprometido += cantidad;
      const response = await ProductApi.update(id, product);
    } catch (error) {
      return error;
    }
  }

  static async anulateStockCompromise({ id, cantidad }) {
    try {
      const product = await ProductApi.getById(id);
      product.stockComprometido -= cantidad;
      ProductApi.update(product.id, product);
    } catch (error) {
      return error;
    }
  }

  static async confirmStockDeliver({ id, cantidad }) {
    try {
      const product = await ProductApi.getById(id);
      product.stockComprometido -= cantidad;
      product.stock -= cantidad;
      ProductApi.update(product.id, product);
    } catch (error) {
      return error;
    }
  }

  static async getRecProducts(req, res) {
    try {
      let limit = req.query.limit ? req.query.limit : 4;
      if (limit && isNaN(limit))
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.INVALID_LIMIT });
      limit = parseInt(limit);
      const products = await ProductApi.constructor.getRandom(limit);
      products.forEach((product) => {
        product.foto = JSON.parse(product.foto);
      });
      res.send(products);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getFavProducts(req, res) {
    try {
      const products = await ProductApi.constructor.getFavorites();
      products.forEach((product) => {
        product.foto = JSON.parse(product.foto);
      });
      res.send(products);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getCatProducts(req, res) {
    try {
      let limit = req.query.limit ? req.query.limit : 10;
      let page = req.query.page ? req.query.page : 1;
      let categoryId = req.params.id;
      if (limit && isNaN(limit))
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.INVALID_LIMIT });
      limit = parseInt(limit);
      if (page && isNaN(page))
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.INVALID_PAGE });
      page = parseInt(page);
      let offset = (page - 1) * limit;
      const products = await ProductApi.constructor.getProdByCategories(limit, offset, categoryId);
      products.sort((a, b) => {
        var textA = a.nombre.toUpperCase();
        var textB = b.nombre.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      products.forEach((product) => {
        product.foto = JSON.parse(product.foto);
      });
      res.send(products);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getCountCatProducts(req, res) {
    try {
      let categoryId = req.params.id;
      if (categoryId && isNaN(categoryId))
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
      categoryId = parseInt(categoryId);    
      const response = await ProductApi.constructor.getCountByCategories(categoryId);
      const entry = response[0];
      const value = entry['COUNT(*)']
      const maxPages = Math.ceil(value / 10) //dividido la cantidad de elementos por pagina
      res.send({ maxPages });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }
}

export { ProductController };