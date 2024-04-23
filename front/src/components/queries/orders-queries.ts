import { gql } from "urql";

export const EDIT_ORDER = gql(`
  mutation EOrder($order: OrderInput!) {
    eOrder(order: $order) {
      id
      price
      qty
      item {
        id
        sku
        name
      } 
    }
  }
`);
export const DEL_ORDER = gql(`
  mutation DOrder($id: ID!) {
    dOrder(id: $id) {
      id
    }
  }
`);

export const GET_ORDERS = gql(`
  query Orders {
    orders {
      id
      price
      qty
      item {
        id
        sku
        name
      } 
    }
  }
`);

export const GET_ORDER = gql(`
  query Order($id: ID!) {
    order(id: $id) {
      id,
      price
      qty
      item {
        id
        sku
        name
      }
    }
  }
`);
