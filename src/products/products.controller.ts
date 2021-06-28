import express from "express";
import APIResponder from "../commons/APIResponder";
import { IProductFields } from "./products.dao";
import ProductsService from "./products.service";

export default class ProductsController extends APIResponder {
  static instance: ProductsController;

  service = ProductsService.getInstance();

  static getInstance(): ProductsController {
    if (!ProductsController.instance)
      ProductsController.instance = new ProductsController();

    return ProductsController.instance;
  }

  createNew = async (
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ): Promise<void> => {
    const f: IProductFields = req.body;
    const product = await this.service.createProduct({
      ...f,
    });
    res.json({
      status: "ok",
      statusCode: 200,
      data: {
        id: product._id,
      },
    });
  };

  getById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const id = req.params.productId;
    try {
        const p = await this.service.getById(id);
        this.sendResponse(res,{
            id: p._id,
            title: p.title,
            description:p.description,
            images:p.images,
            stock:p.stock,
            details:p.details,
            sizes:p.sizes,
        })
    } catch (err) {
        next(err)
    }
}
  getList = async (
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ): Promise<void> => {
    const limit = parseInt((req.query.limit as string) || "10");
    const skip = parseInt((req.query.skip as string) || "0");
    const p = await this.service.getList(limit, skip);

    this.sendResponse(res, {
      count: p.length,
      list: p.map((item) => ({
        id: item._id,
        title: item.title,
      })),
    });
  };
}
