import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SIGN_IN($secret: String!) {
    signIn(password: $secret, phoneNumber: "+251937675519") {
      tokens {
        access_token
        refresh_token
      }
    }
  }
`;
