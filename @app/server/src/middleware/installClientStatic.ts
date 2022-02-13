import { Express, static as staticMiddleware } from "express";

export default (app: Express) => {
  const isDev = process.env.NODE_ENV === "development";
  const port = process.env.CRA_DEVSERVER_PORT || 3001;

  if (isDev) {
    app.get("*", (req, res) => {
      res.redirect(`http://localhost:${port}` + req.url);
    });
  } else {
    app.use(staticMiddleware(`${__dirname}/../../../client/build`));
    app.get("*", (_req, res) => {
      res.sendFile(`${__dirname}/../../../client/build`, "index.html");
    });
  }
};
