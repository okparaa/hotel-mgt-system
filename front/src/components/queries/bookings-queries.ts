import { gql } from "@urql/preact";

export const CANCEL_BOOKING = gql(`
  mutation CancelBooking($id: ID!) {
    cancelBooking(id: $id) {
      id
      amount
      days
      room {
        id
        name
        description
        createdAt
        deleted
        price
        type
      }
      inDate
      outDate
      bookDate
      canceled
      syn
    }
  }
`);

export const BOOKER = gql(`
  mutation Booker($books: [BookingInput!], $detail: DetailInput! ) {
    booker(books: $books, detail: $detail) {
      id
      name
      description
      price
      sku
      createdAt
      deleted
      status
      type
      booking {
        id
        inDate
        outDate
        canceled
        curPrice
      }
    }
  }
`);
