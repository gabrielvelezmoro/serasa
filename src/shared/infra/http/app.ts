import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "@shared/container";
import { AppError } from "@shared/errors/app-error";
import createConnection from "@shared/infra/typeorm";
import { router } from "./routes";

createConnection();
const app = express();

// @ts-ignore
app.use(express.json());

const options: cors.CorsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

app.use(cors(options));

app.use(router);

// @ts-ignore

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
