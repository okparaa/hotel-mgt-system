import { useState } from "react";
import { permissions } from "./permissions";
import { UserPermissions } from "../lib/types";
import { useChest } from "../app-chest";

export const useAuth = () => {
  const [userPermissions, setUserPermissions] = useState<UserPermissions>({});

  const {
    data: { user },
  } = useChest();

  setUserPermissions(permissions[user.rol]);

  const hasPermission = (resource: string, permission: string) => {
    if (userPermissions) return userPermissions[resource].includes(permission);
    return false;
  };

  return { userPermissions, hasPermission };
};

export default useAuth;
