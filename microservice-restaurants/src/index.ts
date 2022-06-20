import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import "dotenv/config"
import router from "./Routes/index"
import connect from "./utils/connect"
import Logger from "./utils/logger"
import swaggerDocs from "./utils/swagger"
import cors from 'cors';
import morganMiddleware from "./utils/morgan"

const app = express()

app.use(express.json())

const options: cors.CorsOptions = {
  origin: '*'
};

app.use(cors(options));
app.use(morganMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Microservice is running !")
})

const PORT = process.env.PORT
const db = "mongodb://mongo/db"

connect(db)

app.use('/', router);

app.listen(PORT, () => {
  Logger.info(`App is running on port ! ${PORT}`) 
  
  swaggerDocs(app)
})