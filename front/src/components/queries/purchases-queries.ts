import { gql } from "@urql/preact";

export const CREATE_INVENTORY = gql(`
  mutation CreatePurchase($purchase: NewPurchaseInput!) {
    createPurchase(purchase: $purchase) {
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
export const UPDATE_INVENTORY = gql(`
  mutation UpdatePurchase($purchase: EPurchaseInput!) {
    updatePurchase(purchase: $purchase) {
      id
      qtyBought
      priceBought
      deleted
      createdAt
    }
  }
`);
export const REMOVE_INVENTORY = gql(`
  mutation RemovePurchase($id: ID!, $itemId: String) {
    removePurchase(id: $id, itemId: $itemId) {
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

export const ITEM_PURCHASES = gql(`
  query PurchasesItems($date: String) {
    purchases(date: $date){
      id
      priceBought
      qtyBought
      deleted
      createdAt
      userId
      item {
        id
        sku
        type
        name
        price
        description
        qtyBought
        qtySold
        deleted
      }
    }
    items {
      id
      sku
      type
      name
      price
      description
      qtyBought
      qtySold
      deleted
    }
    dates{
      id
      createdAt
    }
  }
`);

export const PURCHASES = gql(`
  query Purchases($date: String) {
    purchases(date: $date){
      id
      priceBought
      qtyBought
      deleted
      createdAt
      userId
      item {
        id
        sku
        name
      }
    }
  }
`);
