import { useEffect } from "preact/hooks";
import { lazy, Suspense } from "preact/compat";
const Home = lazy(() => import("./components/home"));
const Wip = lazy(() => import("./components/wip"));
const Login = lazy(() => import("./components/users/login"));
const UsersPot = lazy(() => import("./components/users/users-pot"));
const SignUp = lazy(() => import("./components/users/signup"));
const Port = lazy(() => import("./components/port"));
const Aio = lazy(() => import("./components/dash/aio"));
const SettingsIndex = lazy(
  () => import("./components/settings/settings-index")
);
const Items = lazy(() => import("./components/settings/items"));
const Orders = lazy(() => import("./components/settings/orders"));
const Inventory = lazy(() => import("./components/settings/inventory"));
const Staff = lazy(() => import("./components/settings/staff"));
const StatsIndex = lazy(() => import("./components/stats/stats-index"));
const ItemsStats = lazy(() => import("./components/stats/items-stats"));
const Rooms = lazy(() => import("./components/settings/rooms"));
const OrdersIndex = lazy(() => import("./components/orders/orders-index"));
const StaffMgr = lazy(() => import("./components/settings/staff-mgr"));
const RouteMgr = lazy(() => import("./components/settings/route-mgr"));
const Sections = lazy(() => import("./components/settings/sections"));
const Ruotes = lazy(() => import("./components/settings/routes"));
const DashRooms = lazy(() => import("./components/dash/dash-rooms"));
import { SwInit } from "./sw-init";
import Footer from "./lib/footer";
import Fallback from "./lib/fallback";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  useEffect(() => {
    SwInit.init();
  }, []);

  // useQuery(GET_ROUTES);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Fallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/users"
          element={
            <Suspense fallback={<Fallback />}>
              <UsersPot />
            </Suspense>
          }
        >
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/signup" element={<SignUp />} />
        </Route>
        <Route
          path="/aio"
          element={
            <Suspense fallback={<Fallback />}>
              <Port />
            </Suspense>
          }
        >
          <Route path="/aio" element={<Aio />} />
          <Route path="/aio/settings" element={<SettingsIndex />} />
          <Route path="/aio/settings/items" element={<Items />} />
          <Route path="/aio/settings/purchases" element={<Inventory />} />
          <Route path="/aio/settings/orders" element={<Orders />} />
          <Route path="/aio/settings/sections" element={<Sections />} />
          <Route path="/aio/settings/staff" element={<Staff />} />
          <Route path="/aio/settings/routes" element={<Ruotes />} />
          <Route
            path="/aio/settings/staff-mgr/:userId"
            element={<StaffMgr />}
          />
          <Route
            path="/aio/settings/route-mgr/:routeId"
            element={<RouteMgr />}
          />
          <Route path="/aio/settings/rooms" element={<Rooms />} />
          <Route path="/aio/dash/rooms" element={<DashRooms />} />
          <Route path="/aio/orders" element={<OrdersIndex />} />
          <Route path="/aio/stats" element={<StatsIndex />} />
          <Route path="/aio/stats/items" element={<ItemsStats />} />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<Fallback />}>
              <Wip />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;