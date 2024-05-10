import { FunctionalComponent } from "preact";
import { createContext, useContext, useReducer } from "react";
import {
  ChestAppState,
  ChestBooker,
  ChestInventory,
  ChestMiniSearch,
  ChestOrderItems,
  ChestSearch,
  ChestSession,
  ChestStore,
  ChestUser,
} from "./lib/types";
const SESSION_KEY = "appv2";

type Ops = {
  type:
    | "booker"
    | "user"
    | "store"
    | "order_items"
    | "search"
    | "mini_search"
    | "session"
    | "inventory";
  data:
    | ChestInventory
    | ChestUser
    | ChestStore
    | ChestOrderItems
    | ChestSearch
    | ChestMiniSearch
    | ChestSession
    | ChestBooker;
};

export const reducer = (state: ChestAppState, payload: Ops) => {
  const data = payload.data;
  const usr = state.user;
  if (usr.fir === "") {
    const storedState = localStorage.getItem(SESSION_KEY);
    if (storedState && typeof storedState === "string") {
      state = JSON.parse(storedState);
    }
  }
  let newState = null;
  switch (payload.type) {
    case "store":
      newState = {
        ...state,
        store: { ...state.store, ...(data as ChestStore) },
      };
      break;
    case "session":
      newState = {
        ...state,
        session: { ...state.session, ...(data as ChestSession) },
      };
      break;
    case "user":
      newState = {
        ...state,
        user: { ...state.user, ...(data as ChestUser) },
      };
      break;
    case "inventory":
      newState = {
        ...state,
        inventory: { ...state.inventory, ...(data as ChestInventory) },
      };
      break;
    case "order_items":
      newState = {
        ...state,
        order_items: { ...state.order_items, ...(data as ChestOrderItems) },
      };
      break;
    case "booker":
      newState = {
        ...state,
        booker: { ...state.booker, ...(data as ChestBooker) },
      };
      break;
    case "search":
      newState = {
        ...state,
        search: data as ChestSearch,
      };
      break;
    case "mini_search":
      newState = {
        ...state,
        mini_search: data as ChestMiniSearch,
      };
      break;
    default:
      newState = {
        ...state,
      };
      break;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(newState));
  return newState;
};

interface AppContextState {
  data: ChestAppState;
  updateChest: (payload: Ops) => void;
}

export const AppContext = createContext<AppContextState | null>(null);

export function useChest() {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error("useChest must use the AppContext");
  }
  const storedState = localStorage.getItem(SESSION_KEY);
  if (storedState && typeof storedState === "string") {
    context.data = JSON.parse(storedState);
  }
  return context;
}
export const initBooking = {
  guestName: "",
  guestPhone: "",
  guestEmail: "",
  hash: "",
  cash: 0,
  txfa: 0,
  pos: 0,
  total: 0.0,
  bookables: [],
};
export const initOrderItems = {
  hash: "",
  cash: 0,
  txfa: 0,
  pos: 0,
  total: 0.0,
  items: [],
};
const AppProvider: FunctionalComponent<any> = ({ children }) => {
  const initalState = {
    store: {
      id: "",
      open: false,
      name: "",
      neu: false,
      prev_date: "",
      __typename: "",
    },
    inventory: {
      total: 0,
      hash: "",
      items: [],
    },
    search: "",
    mini_search: "",
    order_items: initOrderItems,
    booker: initBooking,
    session: { id: "", auth: "", vfy: "", iat: "", exp: "" },
    user: {
      id: "",
      sur: "",
      fir: "",
      las: "",
      pic: "",
      usr: "",
      slg: "",
      rut: "",
    },
  };

  const [data, updateChest] = useReducer(reducer, initalState);

  return (
    <AppContext.Provider
      value={{
        data,
        updateChest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
