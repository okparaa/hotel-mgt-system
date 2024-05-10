import { gql } from "urql";

export const EDIT_ORDER = gql(`
  mutation EOrder($order: OrderInput!) {
    eOrder(order: $order) {
      id
      price
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

export const GET_ORDER = gql(`
  query Order($id: ID!) {
    order(id: $id) {
      id,
      price
      
    }
  }
`);
export const ORDERS = gql(`
  query Orders($date: String) {
    orders(date: $date) {
      id
      amount,
      pos
      cash
      hash
      txfa
      guestName
      guestPhone
      guestEmail
      user {
        id
        surname
      }
      bookings {
        id
        inDate
        outDate
        days
        canceled
        amount 
        bookDate
        room {
          id
          name
          price
          type
          deleted
        }
      }
    }
  }
`);
