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
export const CHANGE_RECOVERY = gql(`
  mutation ChangeRecovery($debit: XRecoveryInput!) {
    changeRecovery(debit: $debit) {
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

export const CHANGE_ORDER_RECOV = gql(`
  mutation ChangeOrderRecov($recov: RecovInput) {
    changeOrderRecov(recov: $recov) {
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

export const REMOVE_ORDER_RECOV = gql(`
  mutation RemoveOrderRecov($id: ID) {
    removeOrderRecov(id: $id) {
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
