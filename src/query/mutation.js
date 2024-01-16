import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SIGN_IN($secret: String!, $phone_no: String!) {
    signIn(password: $secret, phoneNumber: $phone_no) {
      tokens {
        access_token
        refresh_token
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation REFRESH_TOKEN {
    refreshToken {
      tokens {
        access_token
        refresh_token
      }
      data {
        email
        id
        phoneNumber
        role
      }
    }
  }
`;
