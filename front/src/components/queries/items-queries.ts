import { gql } from "@urql/preact";

export const CREATE_ITEM = gql(`
  mutation CreateItem($item: NewItemInput!) {
    createItem(item: $item) {
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

export const UPDATE_ITEM = gql(`
  mutation UpdateItem($item: ItemInput!) {
    updateItem(item: $item) {
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

export const REMOVE_ITEM = gql(`
  mutation RemoveItem($id: ID!) {
    removeItem(id: $id) {
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
