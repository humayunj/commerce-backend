require('dotenv').config()

import express from "express"
import morgan from "morgan"
import AppError from "./commons/errors/AppError"
import ProductsRoute from "./products/products.routes"
import logger from "./util/logger"


const routesList = []

routesList.push(new ProductsRoute())

const PORT = 3001

const app = express()

app.use(express.urlencoded())
app.use(express.json())
app.use(morgan('tiny',{stream:{write: (msg)=>{logger.http(msg)}}}))

app.get('/',(req,res)=>{
    res.json({data:"hello, world!"})
})


for (const route of routesList) {
    route.registerRoute(app);
    logger.debug(`Added routes from ${route.name}`)
}



app.use(
    async (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): Promise<void> => {
      logger.info(err.toString());
      if (err instanceof AppError) {
        res.status(err.statusCode).json({
          status: "error",
          statusCode: err.statusCode,
          error: {
            name: err.name,
            msg: err.message,
            meta: Object.keys(err.meta).length == 0 ? undefined : err.meta,
          },
        });
      } else
        res.status(500).json({
          status: "error",
          statusCode: 500,
  
          error: {
            name: err.name,
            msg: err.message,
          },
        });
    }
  );

app.listen(PORT,()=>{
    logger.info(`Server listening on ${PORT}`)
})