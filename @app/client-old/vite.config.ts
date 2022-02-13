import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import react from "@vitejs/plugin-react";
import { UserConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import ssr from "vite-plugin-ssr/plugin";

const config: UserConfig = {
  plugins: [
    EnvironmentPlugin(["ROOT_URL"]),
    // This seems to still be needed for @app/config
    viteCommonjs(),
    react({
      // Without this, the production build on React 17 throws the error
      // `jsxDevRuntime.jsxDEV is not a function`
      jsxRuntime: "classic",
    }),
    ssr(),
  ],
  optimizeDeps: {
    include: ["@app/config", "@app/graphql", "@app/lib"],
  },
};

export default config;
