import cors from "cors";
import { Express } from "express";

export default (app: Express) => {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    app.use(
      cors({
        origin: "http://localhost:3001",
        credentials: true,
      })
    );
  }
};
