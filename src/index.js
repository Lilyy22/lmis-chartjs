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
  // get the authentication token from session storage if it exists
  const refresh_token = sessionStorage.getItem("refresh_token");
  const access_token = sessionStorage.getItem("access_token");
  if (access_token) {
    return {
      // return the headers to the context
      headers: {
        ...headers,
        Authorization: access_token ? `Bearer ${access_token}` : "",
        "x-hasura-role": "admin",
      },
    };
  } else {
    return "";
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
