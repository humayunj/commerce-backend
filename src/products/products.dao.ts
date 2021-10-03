import mongoose from "mongoose";
import { MongooseService } from "../commons/mongoose.service";

const ProductsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sizes: [Number],
    description: {
      type: String,
      default: "",
    },
    details: {
      type: [String],
      default: [""],
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export interface IProduct extends mongoose.Document {
  title: string;
  sizes: [number];
  description: string;
  details: [string];
  price: number;
  images: [string];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductFields {
  title: IProduct["title"];
  sizes: IProduct["sizes"];
  description: IProduct["sizes"];
  price: IProduct["price"];
  stock: IProduct["stock"];
  images: IProduct["images"];
  details: IProduct["details"];
}

export default class ProductsDAO {
  static Product = MongooseService.getInstance()
    .getMongoose()
    .model<IProduct>("Product", ProductsSchema);

  static instance: ProductsDAO;

  static getInstance(): ProductsDAO {
    if (!ProductsDAO.instance) {
      ProductsDAO.instance = new ProductsDAO();
    }
    return ProductsDAO.instance;
  }

  async create(fields: IProductFields): Promise<IProduct> {
    const p = new ProductsDAO.Product(fields);
    await p.save();
    return p;
  }

  async find(
    filter: mongoose.FilterQuery<IProduct>,
    limit: number,
    skip: number
  ): Promise<IProduct[]> {
    const p = await ProductsDAO.Product.find(filter)
      .limit(limit)
      .skip(skip)
      .exec();
    return p;
  }
  async findOne(
    filter: mongoose.FilterQuery<IProduct>
  ): Promise<IProduct | null> {
    const p = await ProductsDAO.Product.findOne(filter);
    return p;
  }
}
