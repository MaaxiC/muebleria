import { Router } from "express";
import { ProductController } from "../controllers/index.js";
import { Admin } from "../middlewares/index.js";

const productRouter = Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, updateStock, getRecProducts, getFavProducts, getCatProducts, getCountCatProducts } = ProductController;

productRouter.get("/", getProducts);
productRouter.get("/recommended", getRecProducts);
productRouter.get("/favorites", getFavProducts);
productRouter.get("/category=:id", getCatProducts);
productRouter.get("/count/category=:id", getCountCatProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", Admin, createProduct);
productRouter.put("/:id", Admin, updateProduct);
productRouter.put("/:id/stock", Admin, updateStock);
productRouter.delete("/:id", Admin, deleteProduct);

export { productRouter };