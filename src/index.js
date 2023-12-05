import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri:
    process.env.REACT_APP_API_ENDPOINT ??
    "https://gateway.lmis.gov.et/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret":
      process.env.REACT_ADMIN_SECRET ?? "8ShURDi6roXj9tmejrWwX992by5S5Q",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
