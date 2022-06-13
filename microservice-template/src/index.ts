import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import "dotenv/config"
import routes from "./Routes"
import connect from "./utils/connect"
import Logger from "./utils/logger"
import swaggerDocs from "./utils/swagger"
import cors from 'cors';

const app = express()

app.use(express.json())

const options: cors.CorsOptions = {
  origin: '*'
};

app.use(cors(options));

app.get("/", (req: Request, res: Response) => {
  res.send("Microservice is running !")
})

const PORT = process.env.PORT
const db = "mongodb://db/microservices"

connect(db)
routes(app)

app.listen(PORT, () => {
  Logger.info(`App is running on port ! ${PORT}`) 
  
  swaggerDocs(app)
})