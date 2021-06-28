import DocumentNotFound from "../commons/errors/DocumentNotFound.error";
import ProductsDAO, { IProduct, IProductFields } from "./products.dao";


export default class ProductsService {
    
    static instance : ProductsService;

    dao = ProductsDAO.getInstance()

    static getInstance() : ProductsService {
        if (!ProductsService.instance ) {
            ProductsService.instance = new ProductsService();
        }
        return ProductsService.instance;
    }

    async createProduct(fields: IProductFields) :Promise<IProduct> {
            const p = await this.dao.create(fields);
            return p;
    }

    async getList(limit:number,offset:number) : Promise<IProduct[]> {
        const p = await this.dao.find({},limit,offset);
        return p;
    }

    async getById(id : IProduct['_id']) : Promise<IProduct> {
        const p = await this.dao.findOne({_id:id});
        if (!p)  {
            throw new DocumentNotFound(id);
        }
        return p;
    }


}