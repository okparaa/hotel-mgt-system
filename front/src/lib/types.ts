export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};
export type UserPermissions = {
  [resource: string]: string[];
};

export type Permissions = {
  [role: string]: UserPermissions;
};

export type GetDaysProps = {
  date?: Date;
  inDate: string;
  outDate: string;
};
export type ChestUser = {
  id: string;
  sur: string;
  fir: string;
  las: string;
  pic: string;
  usr: string;
  rol: string;
  rut: string;
  slg: string;
};

export type ChestBookItem = {
  priceBought?: number;
  qtyBought?: number;
  itemId: string;
  createdAt: string;
  userId?: string;
  sku?: string;
  name?: string;
};

export type ChestPurchase = {
  total?: number;
  hash: string;
  items: Array<ChestBookItem>;
};

export type ChestStore = {
  id?: string;
  open?: boolean;
  name?: string;
  neu?: boolean;
  value?: string | number;
  prevDate?: string;
  delMsg?: string;
  __typename?: string;
};

export type ChestDebit = Omit<ChestStore, "neu"> & {
  staffId?: string;
};

export type ChestOrderItem = {
  itemId: string;
  priceSold: number;
  qtySold: number;
  name: string;
  userId: string;
  sku: string;
};

export type ChestOrderItems = {
  hash: string;
  cash: number;
  txfa: number;
  pos: number;
  total: number;
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
  items: Array<ChestOrderItem>;
};

export type ChestBook = {
  roomId: string;
  price: number;
  inDate: string;
  outDate: string;
  type: number;
  name: string;
};

export type ChestBooker = {
  hash: string;
  cash: number;
  txfa: number;
  pos: number;
  total: number;
  orderId?: string;
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
  bookables: Array<ChestBook>;
};

export type ChestSearch = string;

export type ChestMiniSearch = string;

export type ChestSession = {
  id: string;
  auth: string;
  vfy: string;
  iat: string;
  exp: string;
};

export type ChestRow = {
  id: string;
  __typename: string;
};

export interface ChestAppState {
  user: ChestUser;
  store: ChestStore;
  debit: ChestDebit;
  orderItems: ChestOrderItems;
  search: ChestSearch;
  miniSearch: ChestMiniSearch;
  session: ChestSession;
  booker: ChestBooker;
  purchase: ChestPurchase;
  row: ChestRow;
}
