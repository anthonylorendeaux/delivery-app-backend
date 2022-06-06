import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import "dotenv/config"
import Routes from "./Routes"
import Connect from "./connect"

const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
  res.send("TS App is Running !")
})

const PORT = process.env.PORT
const db = "mongodb://db/microservices"

Connect({ db })
Routes({ app })

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})