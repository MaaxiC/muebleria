import { Router } from "express";
import { OrderController } from "../controllers/index.js";

const orderRouter = Router();
const { getOrders, getOrdersFromUser, getOrderById, createOrder, updateOrder, getCountOrders } = OrderController;

orderRouter.get("/", getOrders);
orderRouter.get("/count", getCountOrders);
orderRouter.get("/user/:dni", getOrdersFromUser);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.put("/:id", updateOrder);

export { orderRouter };