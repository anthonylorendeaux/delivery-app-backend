import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import "dotenv/config"
import routes from "./Routes"
import Logger from "./utils/logger"
import swaggerDocs from "./utils/swagger"
import cors from 'cors';
import morganMiddleware from "./utils/morgan"
import router from "./Routes/index"

const app = express()

app.use(express.json())



app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(morganMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Authentification service is running !")
})

const PORT = process.env.PORT || 3000

app.use('/', router);

app.listen(PORT, () => {
  Logger.info(`App is running on port ! ${PORT}`) 
  
  swaggerDocs(app)
})