import { User } from "lucide-react";
import { FunctionalComponent } from "preact";
import { createContext, useContext, useReducer } from "react";
const SESSION_KEY = "appv1";

type User = {
  id: string;
  sur: string;
  fir: string;
  las: string;
  pic: string;
  usr: string;
  slg: string;
  rut: string;
};
type Store = {
  id?: string;
  open?: boolean;
  name?: string;
  neu?: boolean;
  prev_date?: string;
  __typename?: string;
};

type OrderItems = {
  hash: string;
  cash: number;
  txfa: number;
  pos: number;
  total: number;
  items: Record<string, any>[];
};

type Search = string;

type MiniSearch = string;

type Session = {
  id: string;
  auth: string;
  vfy: string;
  iat: string;
  exp: string;
};

interface AppState {
  user: User;
  store: Store;
  order_items: OrderItems;
  search: Search;
  mini_search: MiniSearch;
  session: Session;
}

type Ops = {
  type: "user" | "store" | "order_items" | "search" | "mini_search" | "session";
  data: User | Store | OrderItems | Search | MiniSearch | Session;
};

export const reducer = (state: AppState, payload: Ops) => {
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
        store: { ...state.store, ...(data as Store) },
      };
      break;
    case "session":
      newState = {
        ...state,
        session: { ...state.session, ...(data as Session) },
      };
      break;
    case "user":
      newState = {
        ...state,
        user: { ...state.user, ...(data as User) },
      };
      break;
    case "order_items":
      newState = {
        ...state,
        order_items: { ...state.order_items, ...(data as OrderItems) },
      };
      break;
    case "search":
      newState = {
        ...state,
        search: data as Search,
      };
      break;
    case "mini_search":
      newState = {
        ...state,
        mini_search: data as MiniSearch,
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
  data: AppState;
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
    search: "",
    mini_search: "",
    order_items: {
      hash: "",
      cash: 0,
      txfa: 0,
      pos: 0,
      total: 0.0,
      items: [],
    },
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
