import { crudPerm, rPerm, ruPerm } from "../config";
import { Permissions } from "../lib/types";

export const permissions: Permissions = {
  self: {
    kat: crudPerm,
    ova: ruPerm,
  },
  boss: {
    kat: crudPerm,
    ova: ruPerm,
  },
  audit: {
    kat: crudPerm,
    ova: ruPerm,
  },
  mgr: {
    kat: crudPerm,
    ova: ruPerm,
  },
  cash: {
    kat: ruPerm,
    ova: rPerm,
  },
  ant: {
    kat: ruPerm,
    ova: rPerm,
  },
  user: {
    kat: rPerm,
    ova: [],
  },
  guest: {
    kat: rPerm,
    ova: [],
  },
};
