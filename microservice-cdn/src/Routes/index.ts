import { Express, NextFunction, Request, Response } from "express";
import path from "path";
import Logger from "../utils/logger"
import upload from "../middleware/upload";

function routes(app: Express) {
  /**
   * @openapi
   * /api/v1/microservice/healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/api/v1/microservice/healthcheck", async (req: Request, res: Response) => {
    return res.sendStatus(200)
  })

  app.post("/api/v1/microservice/products/upload", upload.single("recfile"), async(req: Request, res: Response, next: NextFunction) => {
    Logger.info("Uploading images");
    if(req.file) {
      Logger.info(req.file.filename);
      return res.send({
        message: "File uploaded successfully",
        file: req.file.filename
      });
    } else {
      Logger.info("No file uploaded");
      return res.send({
        message: "No file uploaded"
      });
    }
  })

  app.get("/api/v1/microservice/products/upload/:id", async function(req, res) {
    await res.sendFile((`./uploads/${req.params.id.toString()}`), {root: './'});
  })
}

export default routes;