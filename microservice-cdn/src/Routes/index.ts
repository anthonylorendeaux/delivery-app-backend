import { Express, NextFunction, Request, Response } from "express";
import path from "path";
import Logger from "../utils/logger"
import upload from "../middleware/upload";

function routes(app: Express) {
  /**
   * @openapi
   * /api/v1/cdn/healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/api/v1/cdn/healthcheck", async (req: Request, res: Response) => {
    return res.sendStatus(200)
  })

/**
 * @openapi
 * '/api/v1/cdn/upload':
 *  post:
 *     tags: [CDN]
 *     summary: Upload a new file
 *     requestBody:
 *      required: true
 *      content:
 *       multipart/form-data:  
 *        schema: 
 *          type: object
 *          properties:
 *           recfile: 
 *            type: string
 *            format: binary
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                file: 
 *                  type: string
 *                message: 
 *                  type: string        
 *       413:
 *         description: File too large
 *       400:
 *         description: Bad request
 * */
  app.post("/api/v1/cdn/upload", upload.single("recfile"), async(req: Request, res: Response, next: NextFunction) => {
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

  /**
 * @openapi
 * '/api/v1/cdn/{id}':
 *  get:
 *     tags: [CDN]
 *     summary: Get a file by id
 *     parameters:
 *      - in: path
 *        name: id
 *        description: file id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *          description: File not found
*/
  app.get("/api/v1/cdn/:id", async function(req, res) {
    await res.sendFile((`./uploads/${req.params.id.toString()}`), {root: './'});
  })
}

export default routes;