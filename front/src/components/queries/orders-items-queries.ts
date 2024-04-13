import { gql } from "../../__generated__";

export const CREATE_ORDER_ITEMS = gql(`
  mutation NewOrderItems($orderItems: [NewOrderItemInput!], $pos: String, $cash: String, $txfa: String) {
    newOrderItems(orderItems: $orderItems, pos: $pos, cash: $cash, txfa: $txfa) {
      items {
        id
      }
      order{
        id
      }
    }
  }
`);
