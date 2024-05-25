import { gql } from "urql";

export const UPDATE_ORDER = gql(`
  mutation updateOrder($order: OrderInput!) {
    updateOrder(order: $order) {
      id
      price
    }
  }
`);

export const REMOVE_ORDER = gql(`
  mutation RemoveOrder($id: ID!) {
    removeOrder(id: $id) {
      id
    }
  }
`);

export const RECOVER = gql(`
  mutation Recover($recovery: RecoveryInput!) {
    recover(recovery: $recovery) {
      id
      amount,
      pos
      cash
      hash
      txfa
      guestName
      guestPhone
      guestEmail
      recoveries {
        id 
        pos
        cash
        txfa
        debitAmt
        deleted
        debitAim
        debitedAt
      }
      user {
        id
        surname
      }
    }
  }
`);

export const REMOVE_RECOVERY = gql(`
  mutation RemoveRecovery($debitId: ID!) {
    removeRecovery(debitId: $debitId) {
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
export const UPDATE_RECOVERY = gql(`
  mutation UpdateRecovery($debit: XRecoveryInput!) {
    updateRecovery(debit: $debit) {
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
export const DEBIT_STAFF = gql(`
  mutation DebitStaff($debit: XRecoveryInput!) {
    debitStaff(debit: $debit) {
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

export const ORDER = gql(`
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
      recoveries {
        id 
        pos
        cash
        txfa
        debitAmt
        debitAim
        debitedAt
        deleted
      }
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
        price
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

export const UPDATE_RECOV = gql(`
  mutation UpdateRecov($recov: RecovInput) {
    updateRecov(recov: $recov) {
      id
      amount,
      pos
      cash
      hash
      txfa
      guestName
      guestPhone
      guestEmail
      recoveries {
        id 
        pos
        cash
        txfa
        debitAmt
        debitAim
        debitedAt
      }
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
        price
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

export const REMOVE_RECOV = gql(`
  mutation RemoveRecov($id: ID) {
    removeRecov(id: $id) {
      id
      amount,
      pos
      cash
      hash
      txfa
      guestName
      guestPhone
      guestEmail
      recoveries {
        id 
        pos
        cash
        txfa
        debitAmt
        debitAim
        debitedAt
      }
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
        price
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
