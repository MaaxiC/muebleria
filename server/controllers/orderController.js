import { OrderDao } from "../daos/index.js";
import { ERROR } from "../utils/index.js";
import { ProductController } from "./index.js";

const OrderApi = new OrderDao()

class OrderController {
  static async getOrders(req, res) {
    try {
      let limit = req.query.limit ? req.query.limit : 20;
      let page = req.query.page ? req.query.page : 1;
      
      if (limit && isNaN(limit))
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.INVALID_LIMIT });
      limit = parseInt(limit)
      if (page && isNaN(page))
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.INVALID_PAGE });
      page = parseInt(page)
      let offset = (page - 1) * limit;
      const orders = await OrderApi.constructor.getAllByDate(limit, offset);
      res.send(orders);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getOrdersFromUser(req, res) {
    try {
      const { dni } = req.params;
      const orders = await OrderApi.getAll();
      const ordersFromUser = orders.filter(order => order.dni == dni);
      if (ordersFromUser.length == 0) return res.status(404).send({ status: "error", error: ERROR.MESSAGE.NO_ORDER });
      res.send(ordersFromUser);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getOrderById(req, res) {
    try {
      const orderID = req.params.id;
      const order = await OrderApi.getById(orderID);
      if (!order || order.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_ORDER });
      res.send(order);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async createOrder(req, res) {
    try {
      const order = req.body;
      const productos = req.body.productos;
      order.estado = 'Pendiente';
      order.productos = JSON.stringify(req.body.productos);
      const orderSaved = await OrderApi.save(order);
      await Promise.all(
        productos.map(async (product) => {
          await ProductController.recalculateStock(product)
        })
      )
      res.send(orderSaved);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const orderSaved = await OrderApi.update(id, req.body);
      
      let order = await OrderApi.getById(id);
      
      if (!order || orderSaved.kind)
        return res
          .status(404)
          .send({ status: "error", error: ERROR.MESSAGE.NO_ORDER });

      order.productos = JSON.parse(order.productos);

      if (req.body.estado == 'Rechazado') { //Si el estado es "Anulado" se resta el stock comprometido
        await Promise.all(
          order.productos.map(async (product) => {
            ProductController.anulateStockCompromise(product)
          })
        )
      }
      if (req.body.estado == 'Confirmado') { //Si el estado es "Confirmado" se resta el stock comprometido y se resta el stock disponible
        await Promise.all(                                 
          order.productos.map(async (product) => {
          ProductController.confirmStockDeliver(product)
        })
        )
      }
      res.send(order);
    } catch (error) {
      res
        .status(500)
        .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
    }
  }

  static async getCountOrders(req, res) {
    try { 
      const response = await OrderApi.constructor.getCount();
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

export { OrderController };