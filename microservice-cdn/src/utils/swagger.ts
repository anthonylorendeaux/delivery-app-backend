import {Express, Request, Response} from "express";
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import {version} from "../../package.json"
import Logger from "./logger"

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Microservice Template",
            version,
            description: "Microservice Template",
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [{
            bearerAuth: [],
        }]
    },
    apis: ['./src/types/*.ts','./src/Routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in Json Format
    app.get('/api-docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    Logger.info(`Swagger Docs is available !`);
}

export default swaggerDocs;