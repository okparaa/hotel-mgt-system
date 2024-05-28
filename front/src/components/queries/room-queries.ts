import { gql } from "@urql/preact";

export const CREATE_ROOM = gql(`
  mutation CreateRoom($room: CreateRoomInput!) {
    createRoom(room: $room) {
      id
      name
      description
      price
      sku
      createdAt
      deleted
      status
      type
      reason
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

export const UPDATE_ROOM = gql(`
  mutation UpdateRoom($room: RoomInput!) {
    updateRoom(room: $room) {
      id
      name
      description
      price
      sku
      createdAt
      deleted
      status
      type
      reason
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

export const REMOVE_ROOM = gql(`
  mutation RemoveRoom($id: ID!) {
    removeRoom(id: $id) {
      id
    }
  }
`);

export const ROOM_PRICE = gql(`
  mutation RoomPrice($id: ID!, $price: Int) {
    roomPrice(id: $id, price: $price) {
      id
      price
    }
  }
`);
export const ROOMS_CHART = gql(`
  query RoomsChart {
    roomsChart {
      id
      name
      description
      price
      sku
      createdAt
      deleted
      status
      type
      reason
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

export const ROOMS = gql(`
  query Rooms {
    rooms {
      id
      name
      description
      price
      sku
      createdAt
      deleted
      status
      type
      reason
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

export const ROOM = gql(`
  query Room($id: ID!) {
    room (id: $id) {
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
