import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { ServerMessages } from "./enums/enum";
import "./helpers/dbconnect";
import apiRouter from "./routes";

interface CustomError extends Error {
  status?: number;
}

const app = express();
const port = 8080;
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// "/api"ルートは apiRouterで管理
app.use("/api", apiRouter);

// 存在しないURLの場合
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(ServerMessages.NOT_FOUND) as CustomError;
  error.status = 404;
  next(error);
});

// エラー発生時のミドルウェア
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const error = err as CustomError;
  const statusCode = error.status || 500;
  res
    .status(statusCode)
    .send({ message: error.message || ServerMessages.INTERNAL_SERVER_ERROR });
});

app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});
