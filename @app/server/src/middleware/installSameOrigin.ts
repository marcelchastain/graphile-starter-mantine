import { Express, RequestHandler } from "express";

import { getWebsocketMiddlewares } from "../app";

declare module "express-serve-static-core" {
  interface Request {
    /**
     * True if either the request 'Origin' header matches our ROOT_URL, or if
     * there was no 'Origin' header (in which case we must give the benefit of
     * the doubt; for example for normal resource GETs), or if we're in dev
     * mode and accessing the site via CRA localhost port/url
     */
    isSameOrigin?: boolean;
  }
}

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.CRA_DEVSERVER_PORT || 3001;

export default (app: Express) => {
  const middleware: RequestHandler = (req, res, next) => {
    req.isSameOrigin = Boolean(
      !req.headers.origin ||
        req.headers.origin === process.env.ROOT_URL ||
        (isDev &&
          process.env.ROOT_URL &&
          req.headers.origin ===
            process.env.ROOT_URL.replace("5678", `${port}`))
    );
    next();
  };
  app.use(middleware);
  getWebsocketMiddlewares(app).push(middleware);
};
