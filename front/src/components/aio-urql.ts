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

export type CurUser = {
  __typename?: 'CurUser';
  fir?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  las?: Maybe<Scalars['String']['output']>;
  pic?: Maybe<Scalars['String']['output']>;
  rut?: Maybe<Scalars['String']['output']>;
  slg?: Maybe<Scalars['String']['output']>;
  sur?: Maybe<Scalars['String']['output']>;
  usr?: Maybe<Scalars['String']['output']>;
};

export type DeductInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  ddate?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type Deduction = {
  __typename?: 'Deduction';
  amount?: Maybe<Scalars['String']['output']>;
  ddate?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
};

export type EInventoryInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
  priceBought?: InputMaybe<Scalars['String']['input']>;
  qtyBought?: InputMaybe<Scalars['String']['input']>;
};

export type Inventory = {
  __typename?: 'Inventory';
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  item?: Maybe<Item>;
  priceBought?: Maybe<Scalars['Float']['output']>;
  qtyBought?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Section>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type InventoryDate = {
  __typename?: 'InventoryDate';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type Item = {
  __typename?: 'Item';
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inventories?: Maybe<Array<Maybe<Inventory>>>;
  name: Scalars['String']['output'];
  orders?: Maybe<Array<Maybe<Order>>>;
  price?: Maybe<Scalars['String']['output']>;
  qtyBought?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
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
  dInventory?: Maybe<Inventory>;
  dItem?: Maybe<Item>;
  dOrder?: Maybe<Order>;
  dRole?: Maybe<Role>;
  dRoom?: Maybe<Room>;
  dRoute?: Maybe<Route>;
  dSection?: Maybe<Section>;
  deduct?: Maybe<Deduction>;
  eDeduct?: Maybe<Deduction>;
  eInventory?: Maybe<Inventory>;
  eItem?: Maybe<Item>;
  eOrder?: Maybe<Order>;
  eOrderItem?: Maybe<OrderItem>;
  eRole?: Maybe<Role>;
  eRoom?: Maybe<Room>;
  eRoute?: Maybe<Route>;
  eSection?: Maybe<Section>;
  eUserSlugs?: Maybe<User>;
  itemPrice?: Maybe<Item>;
  newInventory?: Maybe<Inventory>;
  newItem?: Maybe<Item>;
  newOrder?: Maybe<Order>;
  newOrderItems?: Maybe<Array<Maybe<OrderItem>>>;
  newRole?: Maybe<Role>;
  newRoom?: Maybe<Room>;
  newRoute?: Maybe<Route>;
  newSection?: Maybe<Section>;
  newSession?: Maybe<Session>;
  newUser?: Maybe<User>;
  otherSlugs?: Maybe<Route>;
  parentRoute?: Maybe<Route>;
  refreshToken?: Maybe<User>;
  roomPrice?: Maybe<Room>;
  salary?: Maybe<User>;
  signed?: Maybe<Session>;
  verified?: Maybe<User>;
};


export type MutationAssignRouteArgs = {
  user?: InputMaybe<UserInput>;
};


export type MutationDInventoryArgs = {
  id: Scalars['ID']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDOrderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDRoomArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDRouteArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDSectionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeductArgs = {
  deduct: DeductInput;
};


export type MutationEDeductArgs = {
  deduct: DeductInput;
};


export type MutationEInventoryArgs = {
  inventory?: InputMaybe<EInventoryInput>;
};


export type MutationEItemArgs = {
  item: ItemInput;
};


export type MutationEOrderArgs = {
  order?: InputMaybe<OrderInput>;
};


export type MutationEOrderItemArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationERoleArgs = {
  role?: InputMaybe<RoleInput>;
};


export type MutationERoomArgs = {
  room?: InputMaybe<RoomInput>;
};


export type MutationERouteArgs = {
  route?: InputMaybe<RouteInput>;
};


export type MutationESectionArgs = {
  section?: InputMaybe<SectionInput>;
};


export type MutationEUserSlugsArgs = {
  user?: InputMaybe<UserSlugInput>;
};


export type MutationItemPriceArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
};


export type MutationNewInventoryArgs = {
  inventory?: InputMaybe<NewInventoryInput>;
};


export type MutationNewItemArgs = {
  item: NewItemInput;
};


export type MutationNewOrderArgs = {
  order?: InputMaybe<NewOrderInput>;
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


export type MutationNewRoomArgs = {
  room?: InputMaybe<NewRoomInput>;
};


export type MutationNewRouteArgs = {
  route?: InputMaybe<NewRouteInput>;
};


export type MutationNewSectionArgs = {
  section?: InputMaybe<NewSectionInput>;
};


export type MutationNewSessionArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationNewUserArgs = {
  user: NewUserInput;
};


export type MutationOtherSlugsArgs = {
  route?: InputMaybe<RouteSlugInput>;
};


export type MutationParentRouteArgs = {
  route?: InputMaybe<ParentRouteInput>;
};


export type MutationRefreshTokenArgs = {
  user?: InputMaybe<UserTokenInput>;
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


export type MutationVerifiedArgs = {
  kode: Scalars['String']['input'];
};

export type NewInventoryInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  priceBought?: InputMaybe<Scalars['String']['input']>;
  qtyBought?: InputMaybe<Scalars['String']['input']>;
  sectionId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type NewItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type NewOrderInput = {
  customerEmail?: InputMaybe<Scalars['String']['input']>;
  customerPhone?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  qty?: InputMaybe<Scalars['String']['input']>;
};

export type NewOrderItemInput = {
  hash?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priceSold?: InputMaybe<Scalars['String']['input']>;
  qtySold?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
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
  amount?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  customerEmail?: Maybe<Scalars['String']['output']>;
  customerPhone?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  item?: Maybe<Array<Maybe<Item>>>;
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['String']['output']>;
  qty?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type OrderInput = {
  customerEmail?: InputMaybe<Scalars['String']['input']>;
  customerPhone?: InputMaybe<Scalars['String']['input']>;
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
  priceSold?: Maybe<Scalars['String']['output']>;
  qtySold?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
};

export type ParentRouteInput = {
  id: Scalars['String']['input'];
  routeId?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  cur_user?: Maybe<CurUser>;
  currentNumber?: Maybe<Scalars['Int']['output']>;
  dates?: Maybe<Array<Maybe<InventoryDate>>>;
  deduction?: Maybe<Deduction>;
  inventories?: Maybe<Array<Maybe<Inventory>>>;
  inventory?: Maybe<Inventory>;
  item?: Maybe<Item>;
  items?: Maybe<Array<Maybe<Item>>>;
  itemsChart?: Maybe<Array<Maybe<Item>>>;
  loggedIn?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  logout?: Maybe<Message>;
  mini_search?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  order_items?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  orders?: Maybe<Array<Maybe<Order>>>;
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


export type QueryDeductionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInventoriesArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
};


export type QueryInventoryArgs = {
  id: Scalars['ID']['input'];
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
  bookDate?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  guestEmail?: Maybe<Scalars['String']['output']>;
  guestName?: Maybe<Scalars['String']['output']>;
  guestPhone?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inDate?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  outDate?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  syn?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type RoomInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
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
  deductions?: Maybe<Array<Maybe<Deduction>>>;
  firstname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  route?: Maybe<Route>;
  routeSlugs?: Maybe<Scalars['String']['output']>;
  salary?: Maybe<Scalars['String']['output']>;
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

export type NewInventoryMutationVariables = Exact<{
  inventory: NewInventoryInput;
}>;


export type NewInventoryMutation = { __typename?: 'Mutation', newInventory?: { __typename?: 'Inventory', id: string, qtyBought?: string | null, priceBought?: number | null, deleted?: boolean | null, createdAt?: string | null, item?: { __typename?: 'Item', id: string, sku?: string | null, name: string } | null } | null };

export type EInventoryMutationVariables = Exact<{
  inventory: EInventoryInput;
}>;


export type EInventoryMutation = { __typename?: 'Mutation', eInventory?: { __typename?: 'Inventory', id: string, qtyBought?: string | null, priceBought?: number | null, deleted?: boolean | null, createdAt?: string | null } | null };

export type DInventoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
}>;


export type DInventoryMutation = { __typename?: 'Mutation', dInventory?: { __typename?: 'Inventory', id: string, qtyBought?: string | null, priceBought?: number | null, deleted?: boolean | null, createdAt?: string | null, item?: { __typename?: 'Item', id: string, sku?: string | null, name: string } | null } | null };

export type InventoriesItemsQueryVariables = Exact<{
  date?: InputMaybe<Scalars['String']['input']>;
}>;


export type InventoriesItemsQuery = { __typename?: 'Query', inventories?: Array<{ __typename?: 'Inventory', id: string, priceBought?: number | null, qtyBought?: string | null, deleted?: boolean | null, createdAt?: string | null, item?: { __typename?: 'Item', id: string, sku?: string | null, name: string } | null } | null> | null, items?: Array<{ __typename?: 'Item', id: string, sku?: string | null, type?: string | null, name: string, price?: string | null, description?: string | null, deleted?: boolean | null } | null> | null, dates?: Array<{ __typename?: 'InventoryDate', id: string, createdAt?: string | null } | null> | null };

export type InventoriesQueryVariables = Exact<{
  date?: InputMaybe<Scalars['String']['input']>;
}>;


export type InventoriesQuery = { __typename?: 'Query', inventories?: Array<{ __typename?: 'Inventory', id: string, priceBought?: number | null, qtyBought?: string | null, deleted?: boolean | null, createdAt?: string | null, item?: { __typename?: 'Item', id: string, sku?: string | null, name: string } | null } | null> | null };

export type NewItemMutationVariables = Exact<{
  item: NewItemInput;
}>;


export type NewItemMutation = { __typename?: 'Mutation', newItem?: { __typename?: 'Item', id: string, name: string, description?: string | null, type?: string | null, price?: string | null, sku?: string | null, createdAt?: string | null, deleted?: boolean | null } | null };

export type EItemMutationVariables = Exact<{
  item: ItemInput;
}>;


export type EItemMutation = { __typename?: 'Mutation', eItem?: { __typename?: 'Item', id: string, name: string, description?: string | null, type?: string | null, price?: string | null, sku?: string | null, createdAt?: string | null, deleted?: boolean | null } | null };

export type DItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DItemMutation = { __typename?: 'Mutation', dItem?: { __typename?: 'Item', id: string } | null };

export type ItemPriceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['String']['input']>;
}>;


export type ItemPriceMutation = { __typename?: 'Mutation', itemPrice?: { __typename?: 'Item', id: string, price?: string | null } | null };

export type ItemsChartQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsChartQuery = { __typename?: 'Query', itemsChart?: Array<{ __typename?: 'Item', id: string, name: string, deleted?: boolean | null, qtyBought?: string | null } | null> | null };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items?: Array<{ __typename?: 'Item', id: string, name: string, description?: string | null, type?: string | null, price?: string | null, sku?: string | null, createdAt?: string | null, deleted?: boolean | null, qtyBought?: string | null } | null> | null };

export type ItemQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ItemQuery = { __typename?: 'Query', item?: { __typename?: 'Item', id: string, name: string, description?: string | null, type?: string | null, price?: string | null, sku?: string | null, createdAt?: string | null, deleted?: boolean | null } | null };

export type NewOrderItemsMutationVariables = Exact<{
  orderItems?: InputMaybe<Array<NewOrderItemInput> | NewOrderItemInput>;
  pos?: InputMaybe<Scalars['Int']['input']>;
  cash?: InputMaybe<Scalars['Int']['input']>;
  txfa?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NewOrderItemsMutation = { __typename?: 'Mutation', newOrderItems?: Array<{ __typename?: 'OrderItem', items?: Array<{ __typename?: 'Item', id: string } | null> | null, order?: { __typename?: 'Order', id: string } | null } | null> | null };

export type EOrderMutationVariables = Exact<{
  order: OrderInput;
}>;


export type EOrderMutation = { __typename?: 'Mutation', eOrder?: { __typename?: 'Order', id: string, price?: string | null, qty?: string | null, item?: Array<{ __typename?: 'Item', id: string, sku?: string | null, name: string } | null> | null } | null };

export type DOrderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DOrderMutation = { __typename?: 'Mutation', dOrder?: { __typename?: 'Order', id: string } | null };

export type OrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type OrdersQuery = { __typename?: 'Query', orders?: Array<{ __typename?: 'Order', id: string, price?: string | null, qty?: string | null, item?: Array<{ __typename?: 'Item', id: string, sku?: string | null, name: string } | null> | null } | null> | null };

export type OrderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrderQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id: string, price?: string | null, qty?: string | null, item?: Array<{ __typename?: 'Item', id: string, sku?: string | null, name: string } | null> | null } | null };

export type NewRoomMutationVariables = Exact<{
  room: NewRoomInput;
}>;


export type NewRoomMutation = { __typename?: 'Mutation', newRoom?: { __typename?: 'Room', id: string, name: string, description?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, deleted?: string | null, type?: string | null } | null };

export type ERoomMutationVariables = Exact<{
  room: RoomInput;
}>;


export type ERoomMutation = { __typename?: 'Mutation', eRoom?: { __typename?: 'Room', id: string, name: string, description?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, deleted?: string | null, type?: string | null } | null };

export type DRoomMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DRoomMutation = { __typename?: 'Mutation', dRoom?: { __typename?: 'Room', id: string } | null };

export type RoomPriceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RoomPriceMutation = { __typename?: 'Mutation', roomPrice?: { __typename?: 'Room', id: string, price?: number | null } | null };

export type RoomsChartQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsChartQuery = { __typename?: 'Query', roomsChart?: Array<{ __typename?: 'Room', id: string, name: string, deleted?: string | null, inDate?: string | null, outDate?: string | null, bookDate?: string | null, status?: string | null, type?: string | null } | null> | null };

export type RoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQuery = { __typename?: 'Query', rooms?: Array<{ __typename?: 'Room', id: string, name: string, description?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, deleted?: string | null, inDate?: string | null, outDate?: string | null, bookDate?: string | null, status?: string | null, type?: string | null } | null> | null };

export type RoomQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RoomQuery = { __typename?: 'Query', room?: { __typename?: 'Room', id: string, name: string, description?: string | null, price?: number | null, sku?: string | null, createdAt?: string | null, deleted?: string | null, inDate?: string | null, outDate?: string | null, bookDate?: string | null, status?: string | null, type?: string | null } | null };

export type NewRouteMutationVariables = Exact<{
  route: NewRouteInput;
}>;


export type NewRouteMutation = { __typename?: 'Mutation', newRoute?: { __typename?: 'Route', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, slug?: string | null, section?: string | null, isSxn?: boolean | null, otherSlugs?: string | null } | null };

export type EditRouteMutationVariables = Exact<{
  route: RouteInput;
}>;


export type EditRouteMutation = { __typename?: 'Mutation', eRoute?: { __typename?: 'Route', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, section?: string | null, slug?: string | null, isSxn?: boolean | null, otherSlugs?: string | null } | null };

export type EditOtherSlugMutationVariables = Exact<{
  route: RouteSlugInput;
}>;


export type EditOtherSlugMutation = { __typename?: 'Mutation', otherSlugs?: { __typename?: 'Route', id: string, name: string, description?: string | null, createdAt?: string | null, deleted?: boolean | null, section?: string | null, slug?: string | null, isSxn?: boolean | null, otherSlugs?: string | null } | null };

export type ParentRouteMutationVariables = Exact<{
  route: ParentRouteInput;
}>;


export type ParentRouteMutation = { __typename?: 'Mutation', parentRoute?: { __typename?: 'Route', id: string, otherSlugs?: string | null, route?: { __typename?: 'Route', id: string, name: string, section?: string | null, slug?: string | null } | null } | null };

export type DelRouteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DelRouteMutation = { __typename?: 'Mutation', dRoute?: { __typename?: 'Route', id: string } | null };

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


export type VerifiedMutation = { __typename?: 'Mutation', verified?: { __typename?: 'User', id: string, surname?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, token?: string | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, message?: string | null, routeSlugs?: string | null, route?: { __typename?: 'Route', id: string, name: string, section?: string | null, slug?: string | null } | null } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, surname?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, salary?: string | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, routeSlugs?: string | null, route?: { __typename?: 'Route', id: string, section?: string | null, name: string, slug?: string | null } | null, deductions?: Array<{ __typename?: 'Deduction', id: string, amount?: string | null } | null> | null } | null> | null };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, surname?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, salary?: string | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, routeSlugs?: string | null, route?: { __typename?: 'Route', id: string, name: string, section?: string | null, slug?: string | null } | null, deductions?: Array<{ __typename?: 'Deduction', id: string, amount?: string | null } | null> | null } | null };

export type NewUserMutationVariables = Exact<{
  user: NewUserInput;
}>;


export type NewUserMutation = { __typename?: 'Mutation', newUser?: { __typename?: 'User', id: string, surname?: string | null, token?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, address?: string | null, active?: boolean | null, username?: string | null, photoUrl?: string | null, createdAt?: string | null, updatedAt?: string | null, routeSlugs?: string | null } | null };

export type SalaryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  salary?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SalaryMutation = { __typename?: 'Mutation', salary?: { __typename?: 'User', id: string, salary?: string | null, routeSlugs?: string | null } | null };

export type EditUserSlugsMutationVariables = Exact<{
  user: UserSlugInput;
}>;


export type EditUserSlugsMutation = { __typename?: 'Mutation', eUserSlugs?: { __typename?: 'User', id: string, routeSlugs?: string | null } | null };

export type LoginMutationVariables = Exact<{
  user: LoggedUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', signed?: { __typename?: 'Session', id: string, accessToken?: string | null } | null };

export type AssignRouteMutationVariables = Exact<{
  user: UserInput;
}>;


export type AssignRouteMutation = { __typename?: 'Mutation', assignRoute?: { __typename?: 'User', id: string, routeSlugs?: string | null, route?: { __typename?: 'Route', id: string, name: string, section?: string | null, slug?: string | null } | null } | null };

export type RefreshCredentialsMutationVariables = Exact<{
  user: UserTokenInput;
}>;


export type RefreshCredentialsMutation = { __typename?: 'Mutation', refreshToken?: { __typename?: 'User', id: string, token?: string | null } | null };


export const NewInventoryDocument = gql`
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
    `;

export function useNewInventoryMutation() {
  return Urql.useMutation<NewInventoryMutation, NewInventoryMutationVariables>(NewInventoryDocument);
};
export const EInventoryDocument = gql`
    mutation EInventory($inventory: EInventoryInput!) {
  eInventory(inventory: $inventory) {
    id
    qtyBought
    priceBought
    deleted
    createdAt
  }
}
    `;

export function useEInventoryMutation() {
  return Urql.useMutation<EInventoryMutation, EInventoryMutationVariables>(EInventoryDocument);
};
export const DInventoryDocument = gql`
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
    `;

export function useDInventoryMutation() {
  return Urql.useMutation<DInventoryMutation, DInventoryMutationVariables>(DInventoryDocument);
};
export const InventoriesItemsDocument = gql`
    query InventoriesItems($date: String) {
  inventories(date: $date) {
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
  dates {
    id
    createdAt
  }
}
    `;

export function useInventoriesItemsQuery(options?: Omit<Urql.UseQueryArgs<InventoriesItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<InventoriesItemsQuery, InventoriesItemsQueryVariables>({ query: InventoriesItemsDocument, ...options });
};
export const InventoriesDocument = gql`
    query Inventories($date: String) {
  inventories(date: $date) {
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
    `;

export function useInventoriesQuery(options?: Omit<Urql.UseQueryArgs<InventoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<InventoriesQuery, InventoriesQueryVariables>({ query: InventoriesDocument, ...options });
};
export const NewItemDocument = gql`
    mutation NewItem($item: NewItemInput!) {
  newItem(item: $item) {
    id
    name
    description
    type
    price
    sku
    createdAt
    deleted
  }
}
    `;

export function useNewItemMutation() {
  return Urql.useMutation<NewItemMutation, NewItemMutationVariables>(NewItemDocument);
};
export const EItemDocument = gql`
    mutation EItem($item: ItemInput!) {
  eItem(item: $item) {
    id
    name
    description
    type
    price
    sku
    createdAt
    deleted
  }
}
    `;

export function useEItemMutation() {
  return Urql.useMutation<EItemMutation, EItemMutationVariables>(EItemDocument);
};
export const DItemDocument = gql`
    mutation DItem($id: ID!) {
  dItem(id: $id) {
    id
  }
}
    `;

export function useDItemMutation() {
  return Urql.useMutation<DItemMutation, DItemMutationVariables>(DItemDocument);
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
export const EOrderDocument = gql`
    mutation EOrder($order: OrderInput!) {
  eOrder(order: $order) {
    id
    price
    qty
    item {
      id
      sku
      name
    }
  }
}
    `;

export function useEOrderMutation() {
  return Urql.useMutation<EOrderMutation, EOrderMutationVariables>(EOrderDocument);
};
export const DOrderDocument = gql`
    mutation DOrder($id: ID!) {
  dOrder(id: $id) {
    id
  }
}
    `;

export function useDOrderMutation() {
  return Urql.useMutation<DOrderMutation, DOrderMutationVariables>(DOrderDocument);
};
export const OrdersDocument = gql`
    query Orders {
  orders {
    id
    price
    qty
    item {
      id
      sku
      name
    }
  }
}
    `;

export function useOrdersQuery(options?: Omit<Urql.UseQueryArgs<OrdersQueryVariables>, 'query'>) {
  return Urql.useQuery<OrdersQuery, OrdersQueryVariables>({ query: OrdersDocument, ...options });
};
export const OrderDocument = gql`
    query Order($id: ID!) {
  order(id: $id) {
    id
    price
    qty
    item {
      id
      sku
      name
    }
  }
}
    `;

export function useOrderQuery(options: Omit<Urql.UseQueryArgs<OrderQueryVariables>, 'query'>) {
  return Urql.useQuery<OrderQuery, OrderQueryVariables>({ query: OrderDocument, ...options });
};
export const NewRoomDocument = gql`
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
    `;

export function useNewRoomMutation() {
  return Urql.useMutation<NewRoomMutation, NewRoomMutationVariables>(NewRoomDocument);
};
export const ERoomDocument = gql`
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
    `;

export function useERoomMutation() {
  return Urql.useMutation<ERoomMutation, ERoomMutationVariables>(ERoomDocument);
};
export const DRoomDocument = gql`
    mutation DRoom($id: ID!) {
  dRoom(id: $id) {
    id
  }
}
    `;

export function useDRoomMutation() {
  return Urql.useMutation<DRoomMutation, DRoomMutationVariables>(DRoomDocument);
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
    deleted
    inDate
    outDate
    bookDate
    status
    type
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
    inDate
    outDate
    bookDate
    status
    type
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
    inDate
    outDate
    bookDate
    status
    type
  }
}
    `;

export function useRoomQuery(options: Omit<Urql.UseQueryArgs<RoomQueryVariables>, 'query'>) {
  return Urql.useQuery<RoomQuery, RoomQueryVariables>({ query: RoomDocument, ...options });
};
export const NewRouteDocument = gql`
    mutation NewRoute($route: NewRouteInput!) {
  newRoute(route: $route) {
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

export function useNewRouteMutation() {
  return Urql.useMutation<NewRouteMutation, NewRouteMutationVariables>(NewRouteDocument);
};
export const EditRouteDocument = gql`
    mutation EditRoute($route: RouteInput!) {
  eRoute(route: $route) {
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

export function useEditRouteMutation() {
  return Urql.useMutation<EditRouteMutation, EditRouteMutationVariables>(EditRouteDocument);
};
export const EditOtherSlugDocument = gql`
    mutation EditOtherSlug($route: RouteSlugInput!) {
  otherSlugs(route: $route) {
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

export function useEditOtherSlugMutation() {
  return Urql.useMutation<EditOtherSlugMutation, EditOtherSlugMutationVariables>(EditOtherSlugDocument);
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
export const DelRouteDocument = gql`
    mutation DelRoute($id: ID!) {
  dRoute(id: $id) {
    id
  }
}
    `;

export function useDelRouteMutation() {
  return Urql.useMutation<DelRouteMutation, DelRouteMutationVariables>(DelRouteDocument);
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
    deductions {
      id
      amount
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
    deductions {
      id
      amount
    }
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};
export const NewUserDocument = gql`
    mutation NewUser($user: NewUserInput!) {
  newUser(user: $user) {
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

export function useNewUserMutation() {
  return Urql.useMutation<NewUserMutation, NewUserMutationVariables>(NewUserDocument);
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
export const EditUserSlugsDocument = gql`
    mutation EditUserSlugs($user: UserSlugInput!) {
  eUserSlugs(user: $user) {
    id
    routeSlugs
  }
}
    `;

export function useEditUserSlugsMutation() {
  return Urql.useMutation<EditUserSlugsMutation, EditUserSlugsMutationVariables>(EditUserSlugsDocument);
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