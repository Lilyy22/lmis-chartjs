import { ApolloLink, useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "./query/mutation";

export const TokenRefreshLink = new ApolloLink(async (operation, forward) => {
  const [refreshToken, { data, loading }] = useMutation(REFRESH_TOKEN);
  const refresh_token = sessionStorage.getItem("refresh_token");

  try {
    operation.setContext((_, { headers }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${refresh_token}`,
      },
    }));

    await refreshToken();

    const new_access_token = data?.refreshToken?.tokens?.access_token;

    sessionStorage.setItem("access_token", new_access_token);
    sessionStorage.setItem(
      "refresh_token",
      data?.refreshToken?.tokens?.refresh_token
    );

    operation.setContext((_, { headers }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${new_access_token}`,
      },
    }));
  } catch (err) {}

  return forward(operation);
});
