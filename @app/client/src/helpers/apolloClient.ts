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
import { onError } from "@apollo/client/link/error";
import { getOperationAST, GraphQLError, print } from "graphql";
import { Client, createClient } from "graphql-ws";

let wsClient: Client | null = null;
let _rootURL: string | null = null;

function createWsClient() {
  if (!_rootURL) {
    throw new Error("client createWsClient No ROOT_URL");
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

function makeMainLink(ROOT_URL: string) {
  const httpLink = new HttpLink({
    uri: `${ROOT_URL}/graphql`,
    credentials: "same-origin",
  });
  _rootURL = ROOT_URL;
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

function createApolloClient() {
  const ROOT_URL = process.env.ROOT_URL;
  if (!ROOT_URL) {
    throw new Error("ROOT_URL envvar is not set");
  }
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        queryType: true,
      },
    },
  });
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
  const mainLink = makeMainLink(ROOT_URL);
  const link = ApolloLink.from([onErrorLink, mainLink]);
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
}

export const client = createApolloClient();
