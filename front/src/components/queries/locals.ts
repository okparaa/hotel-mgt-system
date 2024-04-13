import { gql } from "@apollo/client";

export const STORE = gql(`
  query Store {
    store @client
  }
`);

export const ORDER_ITEMS = gql(`
  query OrderItems {
    order_items @client
  }
`);

export const SEARCH = gql(`
  query Search {
    search @client
  }
`);

export const MINI_SEARCH = gql(`
  query MiniSearch {
    mini_search @client
  }
`);

export const SESSION = gql(`
  query Session {
    session @client {
      id
      auth
      ver
      iat
      exp
    }
  }
`);

export const ROUTES = gql(`
  query Routes {
    routes @client {
      id
      name
      slug
      otherSlugs
    }
  }
`);

export const CUR_USER = gql(`
  query CurUser {
    cur_user @client {
      id
      sur
      fir
      las
      pic
      usr
      slg
      rut
    }
  }
`);
