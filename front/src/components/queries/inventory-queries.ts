import { gql } from "../../__generated__";

export const CREATE_INVENTORY = gql(`
  mutation NewInventory($inventory: NewInventoryInput!) {
    newInventory(inventory: $inventory) {
      id
      qtyBought
      priceBought
      deleted
      createdAt
      item {
        id
        sku
        name
      }
    }
  }
`);
export const EDIT_INVENTORY = gql(`
  mutation EInventory($inventory: EInventoryInput!) {
    eInventory(inventory: $inventory) {
      id
      qtyBought
      priceBought
      deleted
      createdAt
    }
  }
`);
export const DEL_INVENTORY = gql(`
  mutation DInventory($id: ID!, $itemId: String) {
    dInventory(id: $id, itemId: $itemId) {
      id
      qtyBought
      priceBought
      deleted
      createdAt
      item {
        id
        sku
        name
      }
    }
  }
`);

export const GET_ITEM_INVENTORIES = gql(`
  query InventoriesItems($date: String) {
    inventories(date: $date){
      id
      priceBought
      qtyBought
      deleted
      createdAt
      item {
        id
        sku
        name
      }
    }
    items {
      id
      sku
      type
      name
      price
      description
      deleted
    }
    dates{
      id
      createdAt
    }
  }
`);

export const GET_INVENTORIES = gql(`
  query Inventories($date: String) {
    inventories(date: $date){
      id
      priceBought
      qtyBought
      deleted
      createdAt
      item {
        id
        sku
        name
      }
    }
  }
`);
