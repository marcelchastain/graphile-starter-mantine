import cors from "cors";
import { Express } from "express";

export default (app: Express) => {
  const isDev = process.env.NODE_ENV === "development";
  const port = process.env.CRA_DEVSERVER_PORT || 3001;

  if (isDev) {
    app.use(
      cors({
        origin: `http://localhost:${port}`,
        credentials: true,
      })
    );
  }
};
