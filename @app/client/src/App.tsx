import "nprogress/nprogress.css";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { MantineProvider, TypographyStylesProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NProgress from "nprogress";
import { client } from "./helpers/apolloClient";
import AppRoutes from "@app/client/src/AppRoutes";

// TODO mc-2022-02-13 Helmet

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
  );
}

export default App;
