import express from "express"
import BaseRoute from "../commons/IBaseRoute";
import ProductsController from "./products.controller";

export default class ProductsRoute extends BaseRoute {
    
    constructor() {
        super("Products");
    }

    registerRoute(app: express.Application): void {
        const controller = ProductsController.getInstance()
        app.route("/products/:productId").get([controller.getById])
        app.route("/products").put([controller.createNew]).get([controller.getList])
    }
}