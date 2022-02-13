import "nprogress/nprogress.css";
import "./App.css";
import logoUrl from "./logo.svg";
import { ApolloProvider } from "@apollo/client";
import { MantineProvider, TypographyStylesProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NProgress from "nprogress";
import { client } from "./helpers/apolloClient";
import AppRoutes from "@app/client/src/AppRoutes";
import { Helmet, HelmetProvider } from "react-helmet-async";

NProgress.configure({
  showSpinner: false,
});

const Loading: React.FC = () => {
  useEffect(() => {
    console.log("Start");
    NProgress.start();
    return () => {
      console.log("Stop");
      NProgress.done();
    };
  }, []);
  return null;
};

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="UTF-8" />
        <link rel="icon" href={logoUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Graphile Starter (Mantine + CRA) app</title>
      </Helmet>

      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme: "dark" }}
      >
        <NotificationsProvider>
          <TypographyStylesProvider>
            <div className="App">
              <ApolloProvider client={client}>
                <Router>
                  <Suspense fallback={<Loading />}>
                    <AppRoutes />
                  </Suspense>
                </Router>
              </ApolloProvider>
            </div>
          </TypographyStylesProvider>
        </NotificationsProvider>
      </MantineProvider>
    </HelmetProvider>
  );
}

export default App;
