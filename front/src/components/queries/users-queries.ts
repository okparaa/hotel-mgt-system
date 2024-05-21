import { gql } from "@urql/preact";

export const ACCESS_KODE = gql(`
  mutation Verified($kode: String!) {
    verified(kode: $kode) {
        id
        surname
        firstname
        lastname
        phone
        address
        active
        token
        username
        photoUrl
        createdAt
        message
        routeSlugs
        route {
            id
            name
            section
            slug
        }
      }
    }
`);

export const GET_USERS = gql(`
  query Users {
    users {
        id
        surname
        firstname
        lastname
        phone
        address
        active
        salary
        username
        photoUrl
        createdAt
        routeSlugs
        route {
            id
            section
            name
            slug
        }
        recoveries{
            id
            debitAmt
            deleted
            debitAim
            debitedAt
        }
    }
  }
`);

export const USERS = gql(`
  query User($id: ID!) {
    user(id: $id) {
        id
        surname
        firstname
        lastname
        phone
        address
        active
        salary
        username
        photoUrl
        createdAt
        routeSlugs
        route {
            id
            name
            section
            slug
        }
        recoveries{
            id
            debitAmt
            deleted
            debitAim
            debitedAt
        }
    }
  }
`);

export const CREATE_USER = gql(`
  mutation NewUser($user: NewUserInput!) {
    newUser(user: $user) {
      id
      surname
      token
      firstname
      lastname
      phone
      address
      active
      username
      photoUrl
      createdAt
      updatedAt
      routeSlugs
    }
  }
`);
export const SALARY = gql(`
  mutation Salary($id: ID!, $salary: Int) {
    salary(id: $id, salary: $salary) {
      id
      salary
      routeSlugs
    }
  }
`);

export const EDIT_USER_SLUGS = gql(`
  mutation EditUserSlugs($user: UserSlugInput!) {
    eUserSlugs(user: $user) {
      id
      routeSlugs
    }
  }
`);

export const LOGIN = gql(`
  mutation Login($user: LoggedUserInput!) {
    signed(user: $user) {
      id
      accessToken
    }
  }
`);

export const ASSIGN_ROUTE = gql(`
  mutation AssignRoute($user: UserInput!) {
    assignRoute(user: $user) {
        id
        routeSlugs
        route {
            id
            name
            section
            slug
        }
      }
    }
`);
