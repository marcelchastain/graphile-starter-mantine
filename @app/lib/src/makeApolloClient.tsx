// Duplicate in @app/client/src/renderer
import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  HttpLink,
  InMemoryCache,
  Observable,
  Operation,
  split,
} from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types";
import { onError } from "@apollo/client/link/error";
import { getOperationAST, GraphQLError, print } from "graphql";
import { Client, createClient } from "graphql-ws";

import { GraphileApolloLink } from "./GraphileApolloLink";

// TODO mc-2022-02-01 don't use module-level vars to store state in esm on serverside
let wsClient: Client | null = null;

class WebSocketLink extends ApolloLink {
  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      if (!wsClient) {
        sink.error(new Error("No websocket connection"));
        return;
      }
      return wsClient.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (err instanceof Error) {
              sink.error(err);
            } else if (err instanceof CloseEvent) {
              sink.error(
                new Error(
                  `Socket closed with event ${err.code}` + err.reason
                    ? `: ${err.reason}` // reason will be available on clean closes
                    : ""
                )
              );
            } else {
              sink.error(
                new Error(
                  (err as GraphQLError[])
                    .map(({ message }) => message)
                    .join(", ")
                )
              );
            }
          },
        }
      );
    });
  }
}

let _rootURL: string | null = null;
function createWsClient() {
  if (!_rootURL) {
    throw new Error("No ROOT_URL");
  }
  const url = `${_rootURL.replace(/^http/, "ws")}/graphql`;
  return createClient({
    url,
  });
}

export function resetWebsocketConnection(): void {
  if (wsClient) {
    wsClient.dispose();
  }
  wsClient = createWsClient();
}

function makeServerSideLink(req: any, res: any) {
  return new GraphileApolloLink({
    req,
    res,
    postgraphileMiddleware: req.app.get("postgraphileMiddleware"),
  });
}

function makeClientSideLink(ROOT_URL: string) {
  if (_rootURL) {
    throw new Error("Must only makeClientSideLink once");
  }
  _rootURL = ROOT_URL;
  // Get csrf token from vite-ssr pageContext
  const viteDataEl = document.getElementById("vite-plugin-ssr_pageContext");
  if (!viteDataEl || !viteDataEl.textContent) {
    throw new Error("Cannot read from vite-plugin-ssr_pageContext element");
  }
  const data = JSON.parse(viteDataEl.textContent);
  const CSRF_TOKEN = data.pageContext.csrfToken;
  const httpLink = new HttpLink({
    uri: `${ROOT_URL}/graphql`,
    credentials: "same-origin",
    headers: {
      "CSRF-Token": CSRF_TOKEN,
    },
  });
  wsClient = createWsClient();
  const wsLink = new WebSocketLink();

  // Using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent.
  const mainLink = split(
    // split based on operation type
    ({ query, operationName }) => {
      const op = getOperationAST(query, operationName);
      return (op && op.operation === "subscription") || false;
    },
    wsLink,
    httpLink
  );
  return mainLink;
}

export const makeApolloClient = ({
  initialState,
  req,
  res,
  ROOT_URL,
}: {
  initialState?: NormalizedCacheObject;
  req?: any;
  res?: any;
  ROOT_URL: string;
}) => {
  const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: message: ${message}, location: ${JSON.stringify(
            locations
          )}, path: ${JSON.stringify(path)}`
        )
      );
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const isServer = typeof window === "undefined";
  const mainLink =
    isServer && req && res
      ? makeServerSideLink(req, res)
      : makeClientSideLink(ROOT_URL);

  const client = new ApolloClient({
    link: ApolloLink.from([onErrorLink, mainLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          queryType: true,
        },
      },
    }).restore(initialState || {}),
  });
  return client;
};
