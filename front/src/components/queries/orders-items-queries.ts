import { gql } from "@urql/preact";

export const CREATE_ORDER_ITEMS = gql(`
  mutation NewOrderItems($orderItems: [NewOrderItemInput!], $pos: Int, $cash: Int, $txfa: Int) {
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
