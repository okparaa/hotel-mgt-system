import useAuth from "./use-auth";

type ProtectedRouteProps = {
  resource: string;
  permission: string;
  children: React.ReactNode;
};
const ProtectedRoute = ({
  resource,
  permission,
  children,
}: ProtectedRouteProps) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(resource, permission)) {
    //throw dialog or indicate permission denied
    return <div>Access Denied</div>;
  }
  return children;
};

export default ProtectedRoute;
