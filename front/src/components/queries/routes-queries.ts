import { gql } from "../../__generated__";

export const CREATE_ROUTE = gql(`
  mutation NewRoute($route: NewRouteInput!) {
    newRoute(route: $route) {
      id
      name
      description
      createdAt
      deleted
      slug
      section
      otherSlugs
    }
  }
`);

export const EDIT_ROUTE = gql(`
  mutation ERoute($route: RouteInput!) {
    eRoute(route: $route) {
      id
      name
      description
      createdAt
      deleted
      section
      slug
      otherSlugs
    }
  }
`);

export const EDIT_OTHER_SLUG = gql(`
  mutation EOtherSlug($route: RouteSlugInput!) {
    otherSlugs(route: $route) {
      id
      name
      description
      createdAt
      deleted
      section
      slug
      otherSlugs
    }
  }
`);
export const DEL_ROUTE = gql(`
  mutation DRoute($id: ID!) {
    dRoute(id: $id) {
      id
    }
  }
`);

export const GET_ROUTES = gql(`
  query GetRoutes {
    routes {
      id
      name
      description
      createdAt
      deleted
      slug
      otherSlugs
      section
      isSxn
    }
  }
`);

export const GET_ROUTE = gql(`
  query GetRoute($id: ID!) {
    route(id: $id) {
      id
      name
      description
      createdAt
      deleted
      slug
      otherSlugs
      section
      isSxn
    }
  }
`);
