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

export const GET_CHECKERS = gql`
  query GET_CHECKERS {
    employees_aggregate {
      aggregate {
        count
      }
    }
  }
`;
