import { gql } from "@apollo/client";

export const barData = [
  {
    id: 1,
    year: 2020,
    sales: 20000,
  },
  {
    id: 2,
    year: 2021,
    sales: 30000,
  },
  {
    id: 3,
    year: 2022,
    sales: 40000,
  },
  {
    id: 4,
    year: 2023,
    sales: 50000,
  },
  {
    id: 5,
    year: 2024,
    sales: 30000,
  },
  {
    id: 6,
    year: 2023,
    sales: 50000,
  },
  {
    id: 7,
    year: 2024,
    sales: 30000,
  },
];

export const pieData = [
  {
    id: 1,
    year: 2020,
    sales: 20000,
  },
  {
    id: 2,
    year: 2021,
    sales: 30000,
  },
];

export const GET_USERS = gql`
  query GET_USERS {
    user_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_MALE_LABORS = gql`
  query GET_MALE_LABORS {
    registration_namespace {
      labors_aggregate(where: { gender: { _nilike: "male" } }) {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_FEMALE_LABORS = gql`
  query GET_FEMALE_LABORS {
    registration_namespace {
      labors_aggregate(where: { gender: { _nilike: "female" } }) {
        aggregate {
          count
        }
      }
    }
  }
`;
