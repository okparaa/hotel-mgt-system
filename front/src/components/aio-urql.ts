import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Booking = {
  __typename?: 'Booking';
  amount?: Maybe<Scalars['Float']['output']>;
  bookDate?: Maybe<Scalars['String']['output']>;
  canceled?: Maybe<Scalars['Boolean']['output']>;
  days?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  inDate?: Maybe<Scalars['String']['output']>;
  outDate?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  room?: Maybe<Room>;
  syn?: Maybe<Scalars['Boolean']['output']>;
};

export type BookingInput = {
  days?: InputMaybe<Scalars['Int']['input']>;
  guestEmail?: InputMaybe<Scalars['String']['input']>;
  guestName?: InputMaybe<Scalars['String']['input']>;
  guestPhone?: InputMaybe<Scalars['String']['input']>;
  inDate?: InputMaybe<Scalars['String']['input']>;
  outDate?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  roomId?: InputMaybe<Scalars['String']['input']>;
};

export type CurUser = {
  __typename?: 'CurUser';
  fir?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  las?: Maybe<Scalars['String']['output']>;
  pic?: Maybe<Scalars['String']['output']>;
  rol?: Maybe<Scalars['String']['output']>;
  rut?: Maybe<Scalars['String']['output']>;
  slg?: Maybe<Scalars['String']['output']>;
  sur?: Maybe<Scalars['String']['output']>;
  usr?: Maybe<Scalars['String']['output']>;
};

export type DetailInput = {
  cash?: InputMaybe<Scalars['Float']['input']>;
  guestEmail?: InputMaybe<Scalars['String']['input']>;
  guestName?: InputMaybe<Scalars['String']['input']>;
  guestPhone?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  pos?: InputMaybe<Scalars['Float']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  txfa?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type EPurchaseInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
  priceBought?: InputMaybe<Scalars['Float']['input']>;
  qtyBought?: InputMaybe<Scalars['Float']['input']>;
};

export type Item = {
  __typename?: 'Item';
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  orders?: Maybe<Array<Maybe<Order>>>;
  price?: Maybe<Scalars['Float']['output']>;
  purchases?: Maybe<Array<Maybe<Purchase>>>;
  qtyBought?: Maybe<Scalars['Int']['output']>;
  qtySold?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type LoggedUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  message?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignRoute?: Maybe<User>;
  booker?: Maybe<Array<Maybe<Room>>>;
  cancelBooking?: Maybe<Booking>;
  createItem?: Maybe<Item>;
  createOrder?: Maybe<Order>;
  createPurchase?: Maybe<Array<Maybe<Purchase>>>;
  createRoom?: Maybe<Room>;
  createRoute?: Maybe<Route>;
  createUser?: Maybe<User>;
  dRole?: Maybe<Role>;
  dSection?: Maybe<Section>;
  debitStaff?: Maybe<User>;
  eOrderItem?: Maybe<OrderItem>;
  eRole?: Maybe<Role>;
  eSection?: Maybe<Section>;
  itemPrice?: Maybe<Item>;
  newOrderItems?: Maybe<Array<Maybe<OrderItem>>>;
  newRole?: Maybe<Role>;
  newSection?: Maybe<Section>;
  newSession?: Maybe<Session>;
  parentRoute?: Maybe<Route>;
  recover?: Maybe<Order>;
  refreshToken?: Maybe<User>;
  removeItem?: Maybe<Item>;
  removeOrder?: Maybe<Order>;
  removePurchase?: Maybe<Purchase>;
  removeRecov?: Maybe<Order>;
  removeRecovery?: Maybe<User>;
  removeRoom?: Maybe<Room>;
  removeRoute?: Maybe<Route>;
  roomPrice?: Maybe<Room>;
  salary?: Maybe<User>;
  signed?: Maybe<Session>;
  updateItem?: Maybe<Item>;
  updateOrder?: Maybe<Order>;
  updateOrderBook?: Maybe<Booking>;
  updateOtherSlugs?: Maybe<Route>;
  updatePurchase?: Maybe<Purchase>;
  updateRecov?: Maybe<Order>;
  updateRecovery?: Maybe<User>;
  updateRoom?: Maybe<Room>;
  updateRoute?: Maybe<Route>;
  updateUserSlugs?: Maybe<User>;
  verified?: Maybe<User>;
};


export type MutationAssignRouteArgs = {
  user?: InputMaybe<UserInput>;
};


export type MutationBookerArgs = {
  books?: InputMaybe<Array<BookingInput>>;
  detail?: InputMaybe<DetailInput>;
};


export type MutationCancelBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateItemArgs = {
  item: NewItemInput;
};


export type MutationCreateOrderArgs = {
  order: NewOrderInput;
};


export type MutationCreatePurchaseArgs = {
  purchase?: InputMaybe<NewPurchaseInput>;
};


export type MutationCreateRoomArgs = {
  room?: InputMaybe<NewRoomInput>;
};


export type MutationCreateRouteArgs = {
  route?: InputMaybe<NewRouteInput>;
};


export type MutationCreateUserArgs = {
  user: NewUserInput;
};


export type MutationDRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDSectionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDebitStaffArgs = {
  debit: XRecoveryInput;
};


export type MutationEOrderItemArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationERoleArgs = {
  role?: InputMaybe<RoleInput>;
};


export type MutationESectionArgs = {
  section?: InputMaybe<SectionInput>;
};


export type MutationItemPriceArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
};


export type MutationNewOrderItemsArgs = {
  cash?: InputMaybe<Scalars['Int']['input']>;
  orderItems?: InputMaybe<Array<NewOrderItemInput>>;
  pos?: InputMaybe<Scalars['Int']['input']>;
  txfa?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationNewRoleArgs = {
  role?: InputMaybe<NewRoleInput>;
};


export type MutationNewSectionArgs = {
  section?: InputMaybe<NewSectionInput>;
};


export type MutationNewSessionArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationParentRouteArgs = {
  route?: InputMaybe<ParentRouteInput>;
};


export type MutationRecoverArgs = {
  recovery: RecoveryInput;
};


export type MutationRefreshTokenArgs = {
  user?: InputMaybe<UserTokenInput>;
};


export type MutationRemoveItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveOrderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePurchaseArgs = {
  id: Scalars['ID']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveRecovArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRemoveRecoveryArgs = {
  debitId: Scalars['ID']['input'];
};


export type MutationRemoveRoomArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRouteArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRoomPriceArgs = {
  id: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSalaryArgs = {
  id: Scalars['ID']['input'];
  salary?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSignedArgs = {
  user: LoggedUserInput;
};


export type MutationUpdateItemArgs = {
  item: ItemInput;
};


export type MutationUpdateOrderArgs = {
  order: OrderInput;
};


export type MutationUpdateOrderBookArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateOtherSlugsArgs = {
  route?: InputMaybe<RouteSlugInput>;
};


export type MutationUpdatePurchaseArgs = {
  purchase?: InputMaybe<EPurchaseInput>;
};


export type MutationUpdateRecovArgs = {
  recov?: InputMaybe<RecovInput>;
};


export type MutationUpdateRecoveryArgs = {
  debit?: InputMaybe<XRecoveryInput>;
};


export type MutationUpdateRoomArgs = {
  room?: InputMaybe<RoomInput>;
};


export type MutationUpdateRouteArgs = {
  route?: InputMaybe<RouteInput>;
};


export type MutationUpdateUserSlugsArgs = {
  user?: InputMaybe<UserSlugInput>;
};


export type MutationVerifiedArgs = {
  kode: Scalars['String']['input'];
};

export type NewItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type NewOrderInput = {
  guestEmail?: InputMaybe<Scalars['String']['input']>;
  guestPhone?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  qty?: InputMaybe<Scalars['String']['input']>;
};

export type NewOrderItemInput = {
  hash?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priceSold?: InputMaybe<Scalars['Float']['input']>;
  qtySold?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type NewPurchaseInput = {
  hash?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<InputMaybe<PurchaseItem>>>;
};

export type NewRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type NewRoomInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type NewRouteInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isSxn?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  section?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
};

export type NewSectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isSxn?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type NewUserInput = {
  address: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  password2: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  amount?: Maybe<Scalars['Float']['output']>;
  bookings?: Maybe<Array<Maybe<Booking>>>;
  cash?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  guestEmail?: Maybe<Scalars['String']['output']>;
  guestName?: Maybe<Scalars['String']['output']>;
  guestPhone?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pos?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  recoveries?: Maybe<Array<Maybe<Recovery>>>;
  status?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  txfa?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type OrderInput = {
  guestEmail?: InputMaybe<Scalars['String']['input']>;
  guestPhone?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  qty?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<Item>>>;
  order?: Maybe<Order>;
  priceSold?: Maybe<Scalars['Float']['output']>;
  qtySold?: Maybe<Scalars['Int']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
};

export type ParentRouteInput = {
  id: Scalars['String']['input'];
  routeId?: InputMaybe<Scalars['String']['input']>;
};

export type Purchase = {
  __typename?: 'Purchase';
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  item?: Maybe<Item>;
  priceBought?: Maybe<Scalars['Float']['output']>;
  qtyBought?: Maybe<Scalars['Float']['output']>;
  section?: Maybe<Section>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type PurchaseDate = {
  __typename?: 'PurchaseDate';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type PurchaseItem = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  priceBought?: InputMaybe<Scalars['Float']['input']>;
  qtyBought?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  curUser?: Maybe<CurUser>;
  currentNumber?: Maybe<Scalars['Int']['output']>;
  dates?: Maybe<Array<Maybe<PurchaseDate>>>;
  item?: Maybe<Item>;
  items?: Maybe<Array<Maybe<Item>>>;
  itemsChart?: Maybe<Array<Maybe<Item>>>;
  loggedIn?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  logout?: Maybe<Message>;
  miniSearch?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  orderItems?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  order_books?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  orders?: Maybe<Array<Maybe<Order>>>;
  purchase?: Maybe<Purchase>;
  purchases?: Maybe<Array<Maybe<Purchase>>>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  room?: Maybe<Room>;
  rooms?: Maybe<Array<Maybe<Room>>>;
  roomsChart?: Maybe<Array<Maybe<Room>>>;
  route?: Maybe<Route>;
  routes?: Maybe<Array<Maybe<Route>>>;
  search?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Section>;
  sections?: Maybe<Array<Maybe<Section>>>;
  session?: Maybe<Session>;
  store?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLogoutArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPurchaseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPurchasesArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRouteArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySectionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type RecovInput = {
  cash?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  pos?: InputMaybe<Scalars['Float']['input']>;
  txfa?: InputMaybe<Scalars['Float']['input']>;
};

export type Recovery = {
  __typename?: 'Recovery';
  cash?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  debitAim?: Maybe<Scalars['String']['output']>;
  debitAmt?: Maybe<Scalars['Float']['output']>;
  debitedAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  order?: Maybe<Order>;
  pos?: Maybe<Scalars['Float']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  txfa?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type RecoveryInput = {
  cash?: InputMaybe<Scalars['Float']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  pos?: InputMaybe<Scalars['Float']['input']>;
  txfa?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Role = {
  __typename?: 'Role';
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type RoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Room = {
  __typename?: 'Room';
  booking?: Maybe<Booking>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Int']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type RoomInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Route = {
  __typename?: 'Route';
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSxn?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  otherSlugs?: Maybe<Scalars['String']['output']>;
  route?: Maybe<Route>;
  section?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type RouteInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isSxn?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  section?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type RouteSlugInput = {
  id: Scalars['String']['input'];
  otherSlugs?: InputMaybe<Scalars['String']['input']>;
};

export type Section = {
  __typename?: 'Section';
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSxn?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type SectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isSxn?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Session = {
  __typename?: 'Session';
  accessToken?: Maybe<Scalars['String']['output']>;
  auth?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  exp?: Maybe<Scalars['String']['output']>;
  iat?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kode?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  valid?: Maybe<Scalars['Boolean']['output']>;
  vfy?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  numberIncremented?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  active?: Maybe<Scalars['Boolean']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  recoveries?: Maybe<Array<Maybe<Recovery>>>;
  role?: Maybe<Scalars['String']['output']>;
  route?: Maybe<Route>;
  routeSlugs?: Maybe<Scalars['String']['output']>;
  salary?: Maybe<Scalars['Float']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  id: Scalars['String']['input'];
  routeId?: InputMaybe<Scalars['String']['input']>;
};

export type UserSlugInput = {
  id: Scalars['String']['input'];
  routeSlugs?: InputMaybe<Scalars['String']['input']>;
};

export type UserTokenInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type XRecoveryInput = {
  debitAim?: InputMaybe<Scalars['String']['input']>;
  debitAmt?: InputMaybe<Scalars['Float']['input']>;
  debitId?: InputMaybe<Scalars['String']['input']>;
  debitedAt?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  staffId?: InputMaybe<Scalars['String']['input']>;
};

export type RefreshCredentialsMutationVariables = Exact<{
  user: UserTokenInput;
}>;


export type RefreshCredentialsMutation = { __typename?: 'Mutation', refreshToken?: { __typename?: 'User', id: string, token?: string | null } | null };

export type CancelBookingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CancelBookingMutation = { __typename?: 'Mutation', cancelBooking?: { __typename?: 'Booking', id: string, amount?: number | null, days?: number | null, inDate?: string | null, outDate?: string | null, bookDate?: string | null, canceled?: boolean | null, syn?: boolean | null, room?: { __typename?: 'Room', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: string | null, price?: number | null, type?: string | null } | null } | null };

export type BookerMutationVariables = Exact<{
  books?: InputMaybe<Array<BookingInput> | BookingInput>;
  detail: DetailInput;
}>;


export type BookerMutation = { __typename?: 'Mutation', booker?: Array<{ __typename?: 'Room', id: string, name: string, description?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, deleted?: string | null, status?: string | null, type?: string | null, booking?: { __typename?: 'Booking', id: string, inDate?: string | null, outDate?: string | null, canceled?: boolean | null } | null } | null> | null };

export type CreateItemMutationVariables = Exact<{
  item: NewItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem?: { __typename?: 'Item', id: string, name: string, description?: string | null, type?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, updatedAt?: string | null, deleted?: boolean | null } | null };

export type UpdateItemMutationVariables = Exact<{
  item: ItemInput;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem?: { __typename?: 'Item', id: string, name: string, description?: string | null, type?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, updatedAt?: string | null, deleted?: boolean | null } | null };

export type RemoveItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveItemMutation = { __typename?: 'Mutation', removeItem?: { __typename?: 'Item', id: string } | null };

export type ItemPriceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['String']['input']>;
}>;


export type ItemPriceMutation = { __typename?: 'Mutation', itemPrice?: { __typename?: 'Item', id: string, price?: number | null } | null };

export type ItemsChartQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsChartQuery = { __typename?: 'Query', itemsChart?: Array<{ __typename?: 'Item', id: string, name: string, deleted?: boolean | null, qtyBought?: number | null, updatedAt?: string | null, createdAt?: string | null } | null> | null };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items?: Array<{ __typename?: 'Item', id: string, name: string, description?: string | null, type?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, updatedAt?: string | null, deleted?: boolean | null, qtyBought?: number | null } | null> | null };

export type ItemQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ItemQuery = { __typename?: 'Query', item?: { __typename?: 'Item', id: string, name: string, description?: string | null, type?: string | null, price?: number | null, sku?: string | null, updatedAt?: string | null, createdAt?: string | null, deleted?: boolean | null } | null };

export type NewOrderItemsMutationVariables = Exact<{
  orderItems?: InputMaybe<Array<NewOrderItemInput> | NewOrderItemInput>;
  pos?: InputMaybe<Scalars['Int']['input']>;
  cash?: InputMaybe<Scalars['Int']['input']>;
  txfa?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NewOrderItemsMutation = { __typename?: 'Mutation', newOrderItems?: Array<{ __typename?: 'OrderItem', items?: Array<{ __typename?: 'Item', id: string } | null> | null, order?: { __typename?: 'Order', id: string } | null } | null> | null };

export type UpdateOrderMutationVariables = Exact<{
  order: OrderInput;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder?: { __typename?: 'Order', id: string, price?: number | null } | null };

export type RemoveOrderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveOrderMutation = { __typename?: 'Mutation', removeOrder?: { __typename?: 'Order', id: string } | null };

export type RecoverMutationVariables = Exact<{
  recovery: RecoveryInput;
}>;


export type RecoverMutation = { __typename?: 'Mutation', recover?: { __typename?: 'Order', id: string, amount?: number | null, pos?: number | null, cash?: number | null, hash?: string | null, txfa?: number | null, guestName?: string | null, guestPhone?: string | null, guestEmail?: string | null, recoveries?: Array<{ __typename?: 'Recovery', id: string, pos?: number | null, cash?: number | null, txfa?: number | null, debitAmt?: number | null, deleted?: boolean | null, debitAim?: string | null, debitedAt?: string | null } | null> | null, user?: { __typename?: 'User', id: string, surname?: string | null } | null } | null };

export type RemoveRecoveryMutationVariables = Exact<{
  debitId: Scalars['ID']['input'];
}>;


export type RemoveRecoveryMutation = { __typename?: 'Mutation', removeRecovery?: { __typename?: 'User', id: string, surname?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, salary?: number | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, recoveries?: Array<{ __typename?: 'Recovery', id: string, debitAmt?: number | null, deleted?: boolean | null, debitAim?: string | null, debitedAt?: string | null } | null> | null } | null };

export type UpdateRecoveryMutationVariables = Exact<{
  debit: XRecoveryInput;
}>;


export type UpdateRecoveryMutation = { __typename?: 'Mutation', updateRecovery?: { __typename?: 'User', id: string, surname?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, salary?: number | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, recoveries?: Array<{ __typename?: 'Recovery', id: string, debitAmt?: number | null, deleted?: boolean | null, debitAim?: string | null, debitedAt?: string | null } | null> | null } | null };

export type DebitStaffMutationVariables = Exact<{
  debit: XRecoveryInput;
}>;


export type DebitStaffMutation = { __typename?: 'Mutation', debitStaff?: { __typename?: 'User', id: string, surname?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, salary?: number | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, routeSlugs?: string | null, recoveries?: Array<{ __typename?: 'Recovery', id: string, debitAmt?: number | null, deleted?: boolean | null, debitAim?: string | null, debitedAt?: string | null } | null> | null } | null };

export type OrderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrderQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id: string, price?: number | null } | null };

export type OrdersQueryVariables = Exact<{
  date?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrdersQuery = { __typename?: 'Query', orders?: Array<{ __typename?: 'Order', id: string, amount?: number | null, pos?: number | null, cash?: number | null, hash?: string | null, txfa?: number | null, guestName?: string | null, guestPhone?: string | null, guestEmail?: string | null, recoveries?: Array<{ __typename?: 'Recovery', id: string, pos?: number | null, cash?: number | null, txfa?: number | null, debitAmt?: number | null, debitAim?: string | null, debitedAt?: string | null, deleted?: boolean | null } | null> | null, user?: { __typename?: 'User', id: string, surname?: string | null } | null, bookings?: Array<{ __typename?: 'Booking', id: string, inDate?: string | null, outDate?: string | null, days?: number | null, canceled?: boolean | null, amount?: number | null, bookDate?: string | null, price?: number | null, room?: { __typename?: 'Room', id: string, name: string, price?: number | null, type?: string | null, deleted?: string | null } | null } | null> | null } | null> | null };

export type UpdateRecovMutationVariables = Exact<{
  recov?: InputMaybe<RecovInput>;
}>;


export type UpdateRecovMutation = { __typename?: 'Mutation', updateRecov?: { __typename?: 'Order', id: string, amount?: number | null, pos?: number | null, cash?: number | null, hash?: string | null, txfa?: number | null, guestName?: string | null, guestPhone?: string | null, guestEmail?: string | null, recoveries?: Array<{ __typename?: 'Recovery', id: string, pos?: number | null, cash?: number | null, txfa?: number | null, debitAmt?: number | null, debitAim?: string | null, debitedAt?: string | null } | null> | null, user?: { __typename?: 'User', id: string, surname?: string | null } | null, bookings?: Array<{ __typename?: 'Booking', id: string, inDate?: string | null, outDate?: string | null, days?: number | null, canceled?: boolean | null, amount?: number | null, bookDate?: string | null, price?: number | null, room?: { __typename?: 'Room', id: string, name: string, price?: number | null, type?: string | null, deleted?: string | null } | null } | null> | null } | null };

export type RemoveRecovMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type RemoveRecovMutation = { __typename?: 'Mutation', removeRecov?: { __typename?: 'Order', id: string, amount?: number | null, pos?: number | null, cash?: number | null, hash?: string | null, txfa?: number | null, guestName?: string | null, guestPhone?: string | null, guestEmail?: string | null, recoveries?: Array<{ __typename?: 'Recovery', id: string, pos?: number | null, cash?: number | null, txfa?: number | null, debitAmt?: number | null, debitAim?: string | null, debitedAt?: string | null } | null> | null, user?: { __typename?: 'User', id: string, surname?: string | null } | null, bookings?: Array<{ __typename?: 'Booking', id: string, inDate?: string | null, outDate?: string | null, days?: number | null, canceled?: boolean | null, amount?: number | null, bookDate?: string | null, price?: number | null, room?: { __typename?: 'Room', id: string, name: string, price?: number | null, type?: string | null, deleted?: string | null } | null } | null> | null } | null };

export type CreatePurchaseMutationVariables = Exact<{
  purchase: NewPurchaseInput;
}>;


export type CreatePurchaseMutation = { __typename?: 'Mutation', createPurchase?: Array<{ __typename?: 'Purchase', id: string, qtyBought?: number | null, priceBought?: number | null, deleted?: boolean | null, createdAt?: string | null, item?: { __typename?: 'Item', id: string, sku?: string | null, name: string } | null } | null> | null };

export type UpdatePurchaseMutationVariables = Exact<{
  purchase: EPurchaseInput;
}>;


export type UpdatePurchaseMutation = { __typename?: 'Mutation', updatePurchase?: { __typename?: 'Purchase', id: string, qtyBought?: number | null, priceBought?: number | null, deleted?: boolean | null, createdAt?: string | null } | null };

export type RemovePurchaseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
}>;


export type RemovePurchaseMutation = { __typename?: 'Mutation', removePurchase?: { __typename?: 'Purchase', id: string, qtyBought?: number | null, priceBought?: number | null, deleted?: boolean | null, createdAt?: string | null, item?: { __typename?: 'Item', id: string, sku?: string | null, name: string } | null } | null };

export type PurchasesItemsQueryVariables = Exact<{
  date?: InputMaybe<Scalars['String']['input']>;
}>;


export type PurchasesItemsQuery = { __typename?: 'Query', purchases?: Array<{ __typename?: 'Purchase', id: string, priceBought?: number | null, qtyBought?: number | null, deleted?: boolean | null, createdAt?: string | null, userId?: string | null, item?: { __typename?: 'Item', id: string, sku?: string | null, type?: string | null, name: string, price?: number | null, description?: string | null, qtyBought?: number | null, qtySold?: number | null, deleted?: boolean | null } | null } | null> | null, items?: Array<{ __typename?: 'Item', id: string, sku?: string | null, type?: string | null, name: string, price?: number | null, description?: string | null, qtyBought?: number | null, qtySold?: number | null, deleted?: boolean | null } | null> | null, dates?: Array<{ __typename?: 'PurchaseDate', id: string, createdAt?: string | null } | null> | null };

export type PurchasesQueryVariables = Exact<{
  date?: InputMaybe<Scalars['String']['input']>;
}>;


export type PurchasesQuery = { __typename?: 'Query', purchases?: Array<{ __typename?: 'Purchase', id: string, priceBought?: number | null, qtyBought?: number | null, deleted?: boolean | null, createdAt?: string | null, userId?: string | null, item?: { __typename?: 'Item', id: string, sku?: string | null, name: string } | null } | null> | null };

export type CreateRoomMutationVariables = Exact<{
  room: NewRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom?: { __typename?: 'Room', id: string, name: string, description?: string | null, price?: number | null, sku?: string | null, reason?: string | null, createdAt?: string | null, deleted?: string | null, status?: string | null, type?: string | null, booking?: { __typename?: 'Booking', id: string, inDate?: string | null, outDate?: string | null, canceled?: boolean | null } | null } | null };

export type UpdateRoomMutationVariables = Exact<{
  room: RoomInput;
}>;


export type UpdateRoomMutation = { __typename?: 'Mutation', updateRoom?: { __typename?: 'Room', id: string, name: string, description?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, deleted?: string | null, status?: string | null, type?: string | null, reason?: string | null, booking?: { __typename?: 'Booking', id: string, inDate?: string | null, outDate?: string | null, canceled?: boolean | null } | null } | null };

export type RemoveRoomMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveRoomMutation = { __typename?: 'Mutation', removeRoom?: { __typename?: 'Room', id: string } | null };

export type RoomPriceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RoomPriceMutation = { __typename?: 'Mutation', roomPrice?: { __typename?: 'Room', id: string, price?: number | null } | null };

export type RoomsChartQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsChartQuery = { __typename?: 'Query', roomsChart?: Array<{ __typename?: 'Room', id: string, name: string, price?: number | null, deleted?: string | null, status?: string | null, type?: string | null, reason?: string | null, booking?: { __typename?: 'Booking', id: string, inDate?: string | null, outDate?: string | null, canceled?: boolean | null } | null } | null> | null };

export type RoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQuery = { __typename?: 'Query', rooms?: Array<{ __typename?: 'Room', id: string, name: string, description?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, deleted?: string | null, status?: string | null, type?: string | null, reason?: string | null, booking?: { __typename?: 'Booking', id: string, inDate?: string | null, outDate?: string | null, canceled?: boolean | null } | null } | null> | null };

export type RoomQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RoomQuery = { __typename?: 'Query', room?: { __typename?: 'Room', id: string, name: string, description?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, deleted?: string | null, status?: string | null, type?: string | null, booking?: { __typename?: 'Booking', id: string, inDate?: string | null, outDate?: string | null, canceled?: boolean | null } | null } | null };

export type CreateRouteMutationVariables = Exact<{
  route: NewRouteInput;
}>;


export type CreateRouteMutation = { __typename?: 'Mutation', createRoute?: { __typename?: 'Route', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, slug?: string | null, section?: string | null, isSxn?: boolean | null, otherSlugs?: string | null } | null };

export type UpdateRouteMutationVariables = Exact<{
  route: RouteInput;
}>;


export type UpdateRouteMutation = { __typename?: 'Mutation', updateRoute?: { __typename?: 'Route', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, section?: string | null, slug?: string | null, isSxn?: boolean | null, otherSlugs?: string | null } | null };

export type UpdateOtherSlugMutationVariables = Exact<{
  route: RouteSlugInput;
}>;


export type UpdateOtherSlugMutation = { __typename?: 'Mutation', updateOtherSlugs?: { __typename?: 'Route', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, section?: string | null, slug?: string | null, isSxn?: boolean | null, otherSlugs?: string | null } | null };

export type ParentRouteMutationVariables = Exact<{
  route: ParentRouteInput;
}>;


export type ParentRouteMutation = { __typename?: 'Mutation', parentRoute?: { __typename?: 'Route', id: string, otherSlugs?: string | null, route?: { __typename?: 'Route', id: string, name: string, section?: string | null, slug?: string | null } | null } | null };

export type RemoveRouteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveRouteMutation = { __typename?: 'Mutation', removeRoute?: { __typename?: 'Route', id: string } | null };

export type RoutesQueryVariables = Exact<{ [key: string]: never; }>;


export type RoutesQuery = { __typename?: 'Query', routes?: Array<{ __typename?: 'Route', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, slug?: string | null, otherSlugs?: string | null, section?: string | null, isSxn?: boolean | null, route?: { __typename?: 'Route', id: string, slug?: string | null } | null } | null> | null };

export type RouteQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RouteQuery = { __typename?: 'Query', route?: { __typename?: 'Route', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, slug?: string | null, otherSlugs?: string | null, section?: string | null, isSxn?: boolean | null, route?: { __typename?: 'Route', id: string, name: string, slug?: string | null, section?: string | null, isSxn?: boolean | null } | null } | null };

export type NewSectionMutationVariables = Exact<{
  section: NewSectionInput;
}>;


export type NewSectionMutation = { __typename?: 'Mutation', newSection?: { __typename?: 'Section', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, isSxn?: boolean | null, slug?: string | null } | null };

export type ESectionMutationVariables = Exact<{
  section: SectionInput;
}>;


export type ESectionMutation = { __typename?: 'Mutation', eSection?: { __typename?: 'Section', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, isSxn?: boolean | null, slug?: string | null } | null };

export type DSectionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DSectionMutation = { __typename?: 'Mutation', dSection?: { __typename?: 'Section', id: string } | null };

export type SectionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SectionQuery = { __typename?: 'Query', section?: { __typename?: 'Section', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, isSxn?: boolean | null, slug?: string | null } | null };

export type SectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SectionsQuery = { __typename?: 'Query', sections?: Array<{ __typename?: 'Section', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, isSxn?: boolean | null, slug?: string | null } | null> | null };

export type VerifiedMutationVariables = Exact<{
  kode: Scalars['String']['input'];
}>;


export type VerifiedMutation = { __typename?: 'Mutation', verified?: { __typename?: 'User', id: string, surname?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, token?: string | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, message?: string | null, routeSlugs?: string | null, role?: string | null, route?: { __typename?: 'Route', id: string, name: string, section?: string | null, slug?: string | null } | null } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, surname?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, salary?: number | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, routeSlugs?: string | null, route?: { __typename?: 'Route', id: string, section?: string | null, name: string, slug?: string | null } | null, recoveries?: Array<{ __typename?: 'Recovery', id: string, debitAmt?: number | null, deleted?: boolean | null, debitAim?: string | null, debitedAt?: string | null } | null> | null } | null> | null };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, surname?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, salary?: number | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, routeSlugs?: string | null, route?: { __typename?: 'Route', id: string, name: string, section?: string | null, slug?: string | null } | null, recoveries?: Array<{ __typename?: 'Recovery', id: string, debitAmt?: number | null, deleted?: boolean | null, debitAim?: string | null, debitedAt?: string | null } | null> | null } | null };

export type CreateUserMutationVariables = Exact<{
  user: NewUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string, surname?: string | null, token?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, updatedAt?: string | null, routeSlugs?: string | null } | null };

export type SalaryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  salary?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SalaryMutation = { __typename?: 'Mutation', salary?: { __typename?: 'User', id: string, salary?: number | null, routeSlugs?: string | null } | null };

export type UpdateUserSlugsMutationVariables = Exact<{
  user: UserSlugInput;
}>;


export type UpdateUserSlugsMutation = { __typename?: 'Mutation', updateUserSlugs?: { __typename?: 'User', id: string, routeSlugs?: string | null } | null };

export type LoginMutationVariables = Exact<{
  user: LoggedUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', signed?: { __typename?: 'Session', id: string, accessToken?: string | null } | null };

export type AssignRouteMutationVariables = Exact<{
  user: UserInput;
}>;


export type AssignRouteMutation = { __typename?: 'Mutation', assignRoute?: { __typename?: 'User', id: string, routeSlugs?: string | null, route?: { __typename?: 'Route', id: string, name: string, section?: string | null, slug?: string | null } | null } | null };


export const RefreshCredentialsDocument = gql`
    mutation RefreshCredentials($user: UserTokenInput!) {
  refreshToken(user: $user) {
    id
    token
  }
}
    `;

export function useRefreshCredentialsMutation() {
  return Urql.useMutation<RefreshCredentialsMutation, RefreshCredentialsMutationVariables>(RefreshCredentialsDocument);
};
export const CancelBookingDocument = gql`
    mutation CancelBooking($id: ID!) {
  cancelBooking(id: $id) {
    id
    amount
    days
    room {
      id
      name
      description
      createdAt
      deleted
      price
      type
    }
    inDate
    outDate
    bookDate
    canceled
    syn
  }
}
    `;

export function useCancelBookingMutation() {
  return Urql.useMutation<CancelBookingMutation, CancelBookingMutationVariables>(CancelBookingDocument);
};
export const BookerDocument = gql`
    mutation Booker($books: [BookingInput!], $detail: DetailInput!) {
  booker(books: $books, detail: $detail) {
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
    }
  }
}
    `;

export function useBookerMutation() {
  return Urql.useMutation<BookerMutation, BookerMutationVariables>(BookerDocument);
};
export const CreateItemDocument = gql`
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
  }
}
    `;

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument);
};
export const UpdateItemDocument = gql`
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
    `;

export function useUpdateItemMutation() {
  return Urql.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument);
};
export const RemoveItemDocument = gql`
    mutation RemoveItem($id: ID!) {
  removeItem(id: $id) {
    id
  }
}
    `;

export function useRemoveItemMutation() {
  return Urql.useMutation<RemoveItemMutation, RemoveItemMutationVariables>(RemoveItemDocument);
};
export const ItemPriceDocument = gql`
    mutation ItemPrice($id: ID!, $price: String) {
  itemPrice(id: $id, price: $price) {
    id
    price
  }
}
    `;

export function useItemPriceMutation() {
  return Urql.useMutation<ItemPriceMutation, ItemPriceMutationVariables>(ItemPriceDocument);
};
export const ItemsChartDocument = gql`
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
    `;

export function useItemsChartQuery(options?: Omit<Urql.UseQueryArgs<ItemsChartQueryVariables>, 'query'>) {
  return Urql.useQuery<ItemsChartQuery, ItemsChartQueryVariables>({ query: ItemsChartDocument, ...options });
};
export const ItemsDocument = gql`
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
    `;

export function useItemsQuery(options?: Omit<Urql.UseQueryArgs<ItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<ItemsQuery, ItemsQueryVariables>({ query: ItemsDocument, ...options });
};
export const ItemDocument = gql`
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
    `;

export function useItemQuery(options: Omit<Urql.UseQueryArgs<ItemQueryVariables>, 'query'>) {
  return Urql.useQuery<ItemQuery, ItemQueryVariables>({ query: ItemDocument, ...options });
};
export const NewOrderItemsDocument = gql`
    mutation NewOrderItems($orderItems: [NewOrderItemInput!], $pos: Int, $cash: Int, $txfa: Int) {
  newOrderItems(orderItems: $orderItems, pos: $pos, cash: $cash, txfa: $txfa) {
    items {
      id
    }
    order {
      id
    }
  }
}
    `;

export function useNewOrderItemsMutation() {
  return Urql.useMutation<NewOrderItemsMutation, NewOrderItemsMutationVariables>(NewOrderItemsDocument);
};
export const UpdateOrderDocument = gql`
    mutation updateOrder($order: OrderInput!) {
  updateOrder(order: $order) {
    id
    price
  }
}
    `;

export function useUpdateOrderMutation() {
  return Urql.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument);
};
export const RemoveOrderDocument = gql`
    mutation RemoveOrder($id: ID!) {
  removeOrder(id: $id) {
    id
  }
}
    `;

export function useRemoveOrderMutation() {
  return Urql.useMutation<RemoveOrderMutation, RemoveOrderMutationVariables>(RemoveOrderDocument);
};
export const RecoverDocument = gql`
    mutation Recover($recovery: RecoveryInput!) {
  recover(recovery: $recovery) {
    id
    amount
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
    `;

export function useRecoverMutation() {
  return Urql.useMutation<RecoverMutation, RecoverMutationVariables>(RecoverDocument);
};
export const RemoveRecoveryDocument = gql`
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
    recoveries {
      id
      debitAmt
      deleted
      debitAim
      debitedAt
    }
  }
}
    `;

export function useRemoveRecoveryMutation() {
  return Urql.useMutation<RemoveRecoveryMutation, RemoveRecoveryMutationVariables>(RemoveRecoveryDocument);
};
export const UpdateRecoveryDocument = gql`
    mutation UpdateRecovery($debit: XRecoveryInput!) {
  updateRecovery(debit: $debit) {
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
    recoveries {
      id
      debitAmt
      deleted
      debitAim
      debitedAt
    }
  }
}
    `;

export function useUpdateRecoveryMutation() {
  return Urql.useMutation<UpdateRecoveryMutation, UpdateRecoveryMutationVariables>(UpdateRecoveryDocument);
};
export const DebitStaffDocument = gql`
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
    recoveries {
      id
      debitAmt
      deleted
      debitAim
      debitedAt
    }
  }
}
    `;

export function useDebitStaffMutation() {
  return Urql.useMutation<DebitStaffMutation, DebitStaffMutationVariables>(DebitStaffDocument);
};
export const OrderDocument = gql`
    query Order($id: ID!) {
  order(id: $id) {
    id
    price
  }
}
    `;

export function useOrderQuery(options: Omit<Urql.UseQueryArgs<OrderQueryVariables>, 'query'>) {
  return Urql.useQuery<OrderQuery, OrderQueryVariables>({ query: OrderDocument, ...options });
};
export const OrdersDocument = gql`
    query Orders($date: String) {
  orders(date: $date) {
    id
    amount
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
      deleted
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
      price
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
    `;

export function useOrdersQuery(options?: Omit<Urql.UseQueryArgs<OrdersQueryVariables>, 'query'>) {
  return Urql.useQuery<OrdersQuery, OrdersQueryVariables>({ query: OrdersDocument, ...options });
};
export const UpdateRecovDocument = gql`
    mutation UpdateRecov($recov: RecovInput) {
  updateRecov(recov: $recov) {
    id
    amount
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
      price
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
    `;

export function useUpdateRecovMutation() {
  return Urql.useMutation<UpdateRecovMutation, UpdateRecovMutationVariables>(UpdateRecovDocument);
};
export const RemoveRecovDocument = gql`
    mutation RemoveRecov($id: ID) {
  removeRecov(id: $id) {
    id
    amount
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
      price
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
    `;

export function useRemoveRecovMutation() {
  return Urql.useMutation<RemoveRecovMutation, RemoveRecovMutationVariables>(RemoveRecovDocument);
};
export const CreatePurchaseDocument = gql`
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
    `;

export function useCreatePurchaseMutation() {
  return Urql.useMutation<CreatePurchaseMutation, CreatePurchaseMutationVariables>(CreatePurchaseDocument);
};
export const UpdatePurchaseDocument = gql`
    mutation UpdatePurchase($purchase: EPurchaseInput!) {
  updatePurchase(purchase: $purchase) {
    id
    qtyBought
    priceBought
    deleted
    createdAt
  }
}
    `;

export function useUpdatePurchaseMutation() {
  return Urql.useMutation<UpdatePurchaseMutation, UpdatePurchaseMutationVariables>(UpdatePurchaseDocument);
};
export const RemovePurchaseDocument = gql`
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
    `;

export function useRemovePurchaseMutation() {
  return Urql.useMutation<RemovePurchaseMutation, RemovePurchaseMutationVariables>(RemovePurchaseDocument);
};
export const PurchasesItemsDocument = gql`
    query PurchasesItems($date: String) {
  purchases(date: $date) {
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
  dates {
    id
    createdAt
  }
}
    `;

export function usePurchasesItemsQuery(options?: Omit<Urql.UseQueryArgs<PurchasesItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<PurchasesItemsQuery, PurchasesItemsQueryVariables>({ query: PurchasesItemsDocument, ...options });
};
export const PurchasesDocument = gql`
    query Purchases($date: String) {
  purchases(date: $date) {
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
    `;

export function usePurchasesQuery(options?: Omit<Urql.UseQueryArgs<PurchasesQueryVariables>, 'query'>) {
  return Urql.useQuery<PurchasesQuery, PurchasesQueryVariables>({ query: PurchasesDocument, ...options });
};
export const CreateRoomDocument = gql`
    mutation CreateRoom($room: NewRoomInput!) {
  createRoom(room: $room) {
    id
    name
    description
    price
    sku
    reason
    createdAt
    deleted
    status
    type
    booking {
      id
      inDate
      outDate
      canceled
    }
  }
}
    `;

export function useCreateRoomMutation() {
  return Urql.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument);
};
export const UpdateRoomDocument = gql`
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
    }
  }
}
    `;

export function useUpdateRoomMutation() {
  return Urql.useMutation<UpdateRoomMutation, UpdateRoomMutationVariables>(UpdateRoomDocument);
};
export const RemoveRoomDocument = gql`
    mutation RemoveRoom($id: ID!) {
  removeRoom(id: $id) {
    id
  }
}
    `;

export function useRemoveRoomMutation() {
  return Urql.useMutation<RemoveRoomMutation, RemoveRoomMutationVariables>(RemoveRoomDocument);
};
export const RoomPriceDocument = gql`
    mutation RoomPrice($id: ID!, $price: Int) {
  roomPrice(id: $id, price: $price) {
    id
    price
  }
}
    `;

export function useRoomPriceMutation() {
  return Urql.useMutation<RoomPriceMutation, RoomPriceMutationVariables>(RoomPriceDocument);
};
export const RoomsChartDocument = gql`
    query RoomsChart {
  roomsChart {
    id
    name
    price
    deleted
    status
    type
    reason
    booking {
      id
      inDate
      outDate
      canceled
    }
  }
}
    `;

export function useRoomsChartQuery(options?: Omit<Urql.UseQueryArgs<RoomsChartQueryVariables>, 'query'>) {
  return Urql.useQuery<RoomsChartQuery, RoomsChartQueryVariables>({ query: RoomsChartDocument, ...options });
};
export const RoomsDocument = gql`
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
    }
  }
}
    `;

export function useRoomsQuery(options?: Omit<Urql.UseQueryArgs<RoomsQueryVariables>, 'query'>) {
  return Urql.useQuery<RoomsQuery, RoomsQueryVariables>({ query: RoomsDocument, ...options });
};
export const RoomDocument = gql`
    query Room($id: ID!) {
  room(id: $id) {
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
    }
  }
}
    `;

export function useRoomQuery(options: Omit<Urql.UseQueryArgs<RoomQueryVariables>, 'query'>) {
  return Urql.useQuery<RoomQuery, RoomQueryVariables>({ query: RoomDocument, ...options });
};
export const CreateRouteDocument = gql`
    mutation CreateRoute($route: NewRouteInput!) {
  createRoute(route: $route) {
    id
    name
    description
    createdAt
    deleted
    slug
    section
    isSxn
    otherSlugs
  }
}
    `;

export function useCreateRouteMutation() {
  return Urql.useMutation<CreateRouteMutation, CreateRouteMutationVariables>(CreateRouteDocument);
};
export const UpdateRouteDocument = gql`
    mutation UpdateRoute($route: RouteInput!) {
  updateRoute(route: $route) {
    id
    name
    description
    createdAt
    deleted
    section
    slug
    isSxn
    otherSlugs
  }
}
    `;

export function useUpdateRouteMutation() {
  return Urql.useMutation<UpdateRouteMutation, UpdateRouteMutationVariables>(UpdateRouteDocument);
};
export const UpdateOtherSlugDocument = gql`
    mutation UpdateOtherSlug($route: RouteSlugInput!) {
  updateOtherSlugs(route: $route) {
    id
    name
    description
    createdAt
    deleted
    section
    slug
    isSxn
    otherSlugs
  }
}
    `;

export function useUpdateOtherSlugMutation() {
  return Urql.useMutation<UpdateOtherSlugMutation, UpdateOtherSlugMutationVariables>(UpdateOtherSlugDocument);
};
export const ParentRouteDocument = gql`
    mutation ParentRoute($route: ParentRouteInput!) {
  parentRoute(route: $route) {
    id
    otherSlugs
    route {
      id
      name
      section
      slug
    }
  }
}
    `;

export function useParentRouteMutation() {
  return Urql.useMutation<ParentRouteMutation, ParentRouteMutationVariables>(ParentRouteDocument);
};
export const RemoveRouteDocument = gql`
    mutation RemoveRoute($id: ID!) {
  removeRoute(id: $id) {
    id
  }
}
    `;

export function useRemoveRouteMutation() {
  return Urql.useMutation<RemoveRouteMutation, RemoveRouteMutationVariables>(RemoveRouteDocument);
};
export const RoutesDocument = gql`
    query Routes {
  routes {
    id
    name
    description
    createdAt
    deleted
    slug
    otherSlugs
    section
    isSxn
    route {
      id
      slug
    }
  }
}
    `;

export function useRoutesQuery(options?: Omit<Urql.UseQueryArgs<RoutesQueryVariables>, 'query'>) {
  return Urql.useQuery<RoutesQuery, RoutesQueryVariables>({ query: RoutesDocument, ...options });
};
export const RouteDocument = gql`
    query Route($id: ID!) {
  route(id: $id) {
    id
    name
    description
    createdAt
    deleted
    slug
    otherSlugs
    section
    isSxn
    route {
      id
      name
      slug
      section
      isSxn
    }
  }
}
    `;

export function useRouteQuery(options: Omit<Urql.UseQueryArgs<RouteQueryVariables>, 'query'>) {
  return Urql.useQuery<RouteQuery, RouteQueryVariables>({ query: RouteDocument, ...options });
};
export const NewSectionDocument = gql`
    mutation NewSection($section: NewSectionInput!) {
  newSection(section: $section) {
    id
    name
    description
    createdAt
    deleted
    isSxn
    slug
  }
}
    `;

export function useNewSectionMutation() {
  return Urql.useMutation<NewSectionMutation, NewSectionMutationVariables>(NewSectionDocument);
};
export const ESectionDocument = gql`
    mutation ESection($section: SectionInput!) {
  eSection(section: $section) {
    id
    name
    description
    createdAt
    deleted
    isSxn
    slug
  }
}
    `;

export function useESectionMutation() {
  return Urql.useMutation<ESectionMutation, ESectionMutationVariables>(ESectionDocument);
};
export const DSectionDocument = gql`
    mutation DSection($id: ID!) {
  dSection(id: $id) {
    id
  }
}
    `;

export function useDSectionMutation() {
  return Urql.useMutation<DSectionMutation, DSectionMutationVariables>(DSectionDocument);
};
export const SectionDocument = gql`
    query Section($id: ID!) {
  section(id: $id) {
    id
    name
    description
    createdAt
    deleted
    isSxn
    slug
  }
}
    `;

export function useSectionQuery(options: Omit<Urql.UseQueryArgs<SectionQueryVariables>, 'query'>) {
  return Urql.useQuery<SectionQuery, SectionQueryVariables>({ query: SectionDocument, ...options });
};
export const SectionsDocument = gql`
    query Sections {
  sections {
    id
    name
    description
    createdAt
    deleted
    isSxn
    slug
  }
}
    `;

export function useSectionsQuery(options?: Omit<Urql.UseQueryArgs<SectionsQueryVariables>, 'query'>) {
  return Urql.useQuery<SectionsQuery, SectionsQueryVariables>({ query: SectionsDocument, ...options });
};
export const VerifiedDocument = gql`
    mutation Verified($kode: String!) {
  verified(kode: $kode) {
    id
    surname
    firstname
    lastname
    phone
    address
    active
    token
    username
    photoUrl
    createdAt
    message
    routeSlugs
    role
    route {
      id
      name
      section
      slug
    }
  }
}
    `;

export function useVerifiedMutation() {
  return Urql.useMutation<VerifiedMutation, VerifiedMutationVariables>(VerifiedDocument);
};
export const UsersDocument = gql`
    query Users {
  users {
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
    route {
      id
      section
      name
      slug
    }
    recoveries {
      id
      debitAmt
      deleted
      debitAim
      debitedAt
    }
  }
}
    `;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
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
    route {
      id
      name
      section
      slug
    }
    recoveries {
      id
      debitAmt
      deleted
      debitAim
      debitedAt
    }
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};
export const CreateUserDocument = gql`
    mutation CreateUser($user: NewUserInput!) {
  createUser(user: $user) {
    id
    surname
    token
    firstname
    lastname
    phone
    address
    active
    username
    photoUrl
    createdAt
    updatedAt
    routeSlugs
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const SalaryDocument = gql`
    mutation Salary($id: ID!, $salary: Int) {
  salary(id: $id, salary: $salary) {
    id
    salary
    routeSlugs
  }
}
    `;

export function useSalaryMutation() {
  return Urql.useMutation<SalaryMutation, SalaryMutationVariables>(SalaryDocument);
};
export const UpdateUserSlugsDocument = gql`
    mutation UpdateUserSlugs($user: UserSlugInput!) {
  updateUserSlugs(user: $user) {
    id
    routeSlugs
  }
}
    `;

export function useUpdateUserSlugsMutation() {
  return Urql.useMutation<UpdateUserSlugsMutation, UpdateUserSlugsMutationVariables>(UpdateUserSlugsDocument);
};
export const LoginDocument = gql`
    mutation Login($user: LoggedUserInput!) {
  signed(user: $user) {
    id
    accessToken
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const AssignRouteDocument = gql`
    mutation AssignRoute($user: UserInput!) {
  assignRoute(user: $user) {
    id
    routeSlugs
    route {
      id
      name
      section
      slug
    }
  }
}
    `;

export function useAssignRouteMutation() {
  return Urql.useMutation<AssignRouteMutation, AssignRouteMutationVariables>(AssignRouteDocument);
};