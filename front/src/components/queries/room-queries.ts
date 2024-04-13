import { gql } from "../../__generated__";

export const CREATE_ROOM = gql(`
  mutation NewRoom($room: NewRoomInput!) {
    newRoom(room: $room) {
      id
      name
      description
      price
      sku
      createdAt
      deleted
      type
    }
  }
`);

export const EDIT_ROOM = gql(`
  mutation ERoom($room: RoomInput!) {
    eRoom(room: $room) {
      id
      name
      description
      price
      sku
      createdAt
      deleted
      type
    }
  }
`);

export const DEL_ROOM = gql(`
  mutation DRoom($id: ID!) {
    dRoom(id: $id) {
      id
    }
  }
`);
export const ROOM_PRICE = gql(`
  mutation RoomPrice($id: ID!, $price: String) {
    roomPrice(id: $id, price: $price) {
      id
      price
    }
  }
`);

export const GET_ROOMS_CHART = gql(`
  query RoomsChart {
    roomsChart {
      id
      name
      deleted
      inDate
      outDate
      bookDate
      status
      type
    }
  }
`);

export const GET_ROOMS = gql(`
  query Rooms {
    rooms {
      id
      name
      description
      price
      sku
      createdAt
      deleted
      inDate
      outDate
      bookDate
      status
      type
    }
  }
`);

export const GET_ROOM = gql(`
  query Room($id: ID!) {
    room(id: $id) {
      id
      sku
    }
  }
`);
