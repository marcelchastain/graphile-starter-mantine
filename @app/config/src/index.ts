// @ts-ignore
const packageJson = require("../../../package.json");

// TODO: customise this with your own settings!
// When adding new properties, be sure to adjust the shape of appConfig in
// @app/client/src/renderer/types.ts
//
// WARNING: these are public values that will be sent to the browser!

export const fromEmail =
  '"PostGraphile Starter" <no-reply@examples.graphile.org>';
export const awsRegion = "us-east-1";
export const projectName = packageJson.name.replace(/[-_]/g, " ");
export const companyName = projectName; // For copyright ownership
export const emailLegalText =
  // Envvar here so we can override on the demo website
  process.env.LEGAL_TEXT || "<Insert legal email footer text here >";
