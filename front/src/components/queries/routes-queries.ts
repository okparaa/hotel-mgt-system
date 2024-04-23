import { gql } from "urql";

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
      isSxn
      otherSlugs
    }
  }
`);

export const EDIT_ROUTE = gql(`
  mutation EditRoute($route: RouteInput!) {
    eRoute(route: $route) {
      id
      name
      description
      createdAt
      deleted
      section
      slug
      isSxn
      otherSlugs
    }
  }
`);

export const EDIT_OTHER_SLUG = gql(`
  mutation EditOtherSlug ($route: RouteSlugInput!) {
    otherSlugs(route: $route) {
      id
      name
      description
      createdAt
      deleted
      section
      slug
      isSxn
      otherSlugs
    }
  }
`);

export const PARENT_ROUTE = gql(`
  mutation ParentRoute($route: ParentRouteInput!) {
    parentRoute(route: $route) {
        id
        otherSlugs
        route {
            id
            name
            section
            slug
        }
      }
    }
`);

export const DEL_ROUTE = gql(`
  mutation DelRoute($id: ID!) {
    dRoute(id: $id) {
      id
    }
  }
`);

export const GET_ROUTES = gql(`
  query Routes {
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
      route{
        id
        slug
      }
    }
  }
`);

export const GET_ROUTE = gql(`
  query Route($id: ID!) {
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
      route {
        id
        name
        slug
        section
        isSxn
      }
    }
  }
`);
