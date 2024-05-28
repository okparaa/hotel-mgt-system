import { eq, getTableColumns, sql } from "drizzle-orm";
import { Context } from "../types/context";
import { items, rooms, users } from "../db/schemas";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import throwError, { ErrorTypes } from "./errors";
import { get20Words, lt20Words } from "../db/constants";
dotenv.config();

export const usernameExists = async (username: string, ctx: Context) => {
  const [user] = await ctx.db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return user;
};

export const phoneExists = async (phone: string, ctx: Context) => {
  const [user] = await ctx.db
    .select()
    .from(users)
    .where(eq(users.phone, phone));
  return user;
};

export const skuExists = async (sku: string, ctx: Context) => {
  const [item] = await ctx.db
    .select()
    .from(items)
    .where(eq(items.sku, Number(sku)));
  return item;
};

type MetaProps = { table: any; column: any; value: any };
export const xExists = async (meta: MetaProps, ctx: Context) => {
  const [xdata] = await ctx.db
    .select()
    .from(meta.table)
    .where(eq(meta.column, meta.value));
  return xdata;
};

type Identity = {
  id: string;
  auth: string;
  ver: string;
  iat: string;
  exp: string;
};

export const getUser = async (req: any) => {
  const secret = process.env.JWT_SECRET || "secret";
  let decoded = null;

  try {
    decoded = jwt.verify(
      req.headers.authorization,
      secret
    ) as unknown as Identity;
  } catch (error) {
    throwError("jwt decode failed", ErrorTypes.UNAUTHENTICATED, [
      ["kode", "code has expired"],
    ]);
  }

  const uroles = ["GUEST", "USER", "STAFF", "ADMIN"];
  return {
    getIdentity: () => decoded,
    hasRole: (roles: string[]) => {
      const roleIndex = uroles.some((role) => roles.indexOf(role) >= 0);
      return roleIndex;
    },
  };
};

export const getKey = () => Math.floor(Math.random() * Date.now()).toString(36);

export const sleep = (millis: number) => {
  return new Promise((resolve) => setTimeout(resolve, millis));
};

export const getDateFromTimestamp = (timestamp: number | null = null) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

type DateDiffProps = {
  inDate: string;
  outDate: string;
};

export const getDays = ({ inDate, outDate }: DateDiffProps) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const date_diff = new Date(outDate).getTime() - new Date(inDate).getTime();
  const days = Math.round(date_diff / oneDay);
  return days;
};

export const itemColumns = {
  ...getTableColumns(items),
  sku: sql<string>`lpad(sku::text, 5, '0')`.as("sku"),
};
export const roomColumns = {
  ...getTableColumns(rooms),
  sku: sql<string>`lpad(sku::text, 3, '0')`.as("sku"),
};

export const getFirst99Words = (n: number) => {
  const isLt20 = n < 20;
  const tensPlace = Math.floor(n / 10);
  const onesPlace = n % 10;
  if (isLt20) return lt20Words[n];
  if (onesPlace) return get20Words[tensPlace] + " " + lt20Words[onesPlace];
  else return get20Words[tensPlace];
};

export const numberToWords = (input: string | number) => {
  const number = typeof input === "string" ? parseInt(input) : input;
  if (isNaN(number)) return "NaN";
  if (number === 0) return "Zero";

  const numStr = number.toString();
  if (numStr.length > 9) {
    return "Overflow"; // Does not support converting more than 9 digits yet
  }

  const numPadStr = numStr.padStart(9, "000000000");
  const n1 = Number(numPadStr.slice(-2));
  const n2 = Number(numPadStr.slice(-3, -2));
  const n3 = Number(numPadStr.slice(-5, -3));
  const n4 = Number(numPadStr.slice(-7, -5));
  const n5 = Number(numPadStr.slice(-9, -7));
  // console.log({ n5, n4, n3, n2, n1, numPadStr });

  let amountInWords = "";
  amountInWords += n5 !== 0 ? getFirst99Words(n5) + " Crore " : "";
  amountInWords += n4 !== 0 ? getFirst99Words(n4) + " Lakh " : "";
  amountInWords += n3 !== 0 ? getFirst99Words(n3) + " Thousand " : "";
  amountInWords += n2 !== 0 ? getFirst99Words(n2) + " Hundred " : "";
  amountInWords += n1 !== 0 ? getFirst99Words(n1) : "";
  return amountInWords.trim();
};
