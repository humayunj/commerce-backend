import mongoose, { Mongoose } from "mongoose";
import logger from "../util/logger";

export class MongooseService {
  private static instance: MongooseService;
  options = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  count = 0;
  constructor() {
    this.connectWithRetry();
  }
  public static getInstance(): MongooseService {
    if (!this.instance) {
      this.instance = new MongooseService();
    }
    return this.instance;
  }
  getMongoose(): Mongoose {
    return mongoose;
  }
  connectWithRetry(): void {
    logger.info("MongoDB connection with retry");
    mongoose
      .connect(process.env.DB_URL as string, this.options)
      .then(() => {
        logger.info("MongoDB is connected");
      })
      .catch((_err) => {
        logger.warn(
          "MongoDB connection unsuccessful, retry after 5 seconds. ",
          ++this.count
        );
        setTimeout(this.connectWithRetry, 5000);
      });
  }
}
