import { openDB } from "idb";

const database = "__aio__";
const table = "__i_o__";

const dbPromise = openDB(database, 1, {
  upgrade(db) {
    db.createObjectStore(table);
  },
});

export async function getItem(key: string): Promise<string | null> {
  return (await dbPromise).get(table, key);
}
export async function setItem(
  key: string,
  val: object
): Promise<string | null> {
  return (await dbPromise).put(table, val, key) as Promise<string | null>;
}
export async function removeItem(key: string): Promise<void> {
  return (await dbPromise).delete(table, key);
}
export async function clear() {
  return (await dbPromise).clear(table);
}
export async function keys() {
  return (await dbPromise).getAllKeys(table);
}
