import mongoose, { ConnectOptions } from "mongoose"
import Logger from "./logger"

async function connect(dbUri: string) {
  try {
    await mongoose.connect(dbUri);
    Logger.info("Successfully connected to MongoDB !");
  } catch (error) {
    Logger.error("Error during connection with MongoDB", error);
    process.exit(1);
  }
}

export default connect;