import { openDB } from "idb";

const dbPromise = openDB("keyval-store", 1, {
  upgrade(db) {
    db.createObjectStore("keyval");
  },
});

export async function getItem(key: string): Promise<string | null> {
  return (await dbPromise).get("keyval", key);
}
export async function setItem(
  key: string,
  val: object
): Promise<string | null> {
  return (await dbPromise).put("keyval", val, key) as Promise<string | null>;
}
export async function removeItem(key: string): Promise<void> {
  return (await dbPromise).delete("keyval", key);
}
export async function clear() {
  return (await dbPromise).clear("keyval");
}
export async function keys() {
  return (await dbPromise).getAllKeys("keyval");
}
