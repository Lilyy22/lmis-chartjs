import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri:
    process.env.REACT_APP_API_ENDPOINT ??
    "https://gateway.lmis.gov.et/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("access_token");
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
        "x-hasura-role": "admin",
      },
    };
  } else {
    return;
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
