import { gql } from "urql";

export const CREATE_ROUTE = gql(`
  mutation CreateRoute($route: NewRouteInput!) {
    createRoute(route: $route) {
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

export const UPDATE_ROUTE = gql(`
  mutation UpdateRoute($route: RouteInput!) {
    updateRoute(route: $route) {
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

export const UPDATE_OTHER_SLUG = gql(`
  mutation UpdateOtherSlug ($route: RouteSlugInput!) {
    updateOtherSlugs(route: $route) {
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

export const REMOVE_ROUTE = gql(`
  mutation RemoveRoute($id: ID!) {
    removeRoute(id: $id) {
      id
    }
  }
`);

export const ROUTES = gql(`
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

export const ROUTE = gql(`
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
