import { gql } from "@urql/preact";

export const CREATE_ITEM = gql(`
  mutation NewItem($item: NewItemInput!) {
    newItem(item: $item) {
      id
      name
      description
      type
      price
      sku
      createdAt
      updatedAt
      deleted
    }
  }
`);

export const EDIT_ITEM = gql(`
  mutation EItem($item: ItemInput!) {
    eItem(item: $item) {
      id
      name
      description
      type
      price
      sku
      createdAt
      updatedAt
      deleted
    }
  }
`);

export const DEL_ITEM = gql(`
  mutation DItem($id: ID!) {
    dItem(id: $id) {
      id
    }
  }
`);
export const ITEM_PRICE = gql(`
  mutation ItemPrice($id: ID!, $price: String) {
    itemPrice(id: $id, price: $price) {
      id
      price
    }
  }
`);

export const GET_ITEMS_CHART = gql(`
  query ItemsChart {
    itemsChart {
      id
      name
      deleted
      qtyBought
      updatedAt
      createdAt
    }
  }
`);

export const GET_ITEMS = gql(`
  query Items {
    items {
      id
      name
      description
      type
      price
      sku
      createdAt
      updatedAt
      deleted
      qtyBought
    }
  }
`);

export const GET_ITEM = gql(`
  query Item($id: ID!) {
    item(id: $id) {
      id
      name
      description
      type
      price
      sku
      updatedAt
      createdAt
      deleted
    }
  }
`);
