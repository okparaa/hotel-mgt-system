import { DatePickerOptions } from "./components/calendar/date-picker";

export const gConfig = {
  baseUrl: "http://localhost:5100",
  rest: "ra",
  image: "img",
  uploadImg: "upld",
  pay: "pay",
  verifyPmt: "vfy",
};
export const options: DatePickerOptions = {
  minYear: 2022,
  maxYear: 2040,
  initialDate: new Date(),
  normal: true,
  events: new Map(),
};

export const cPerm = ["c"];
export const rPerm = ["r"];
export const uPerm = ["u"];
export const dPerm = ["d"];
export const crPerm = ["c", "r"];
export const cuPerm = ["c", "u"];
export const cdPerm = ["c", "d"];
export const rdPerm = ["r", "d"];
export const ruPerm = ["r", "u"];
export const udPerm = ["u", "d"];
export const cruPerm = ["c", "r", "u"];
export const crdPerm = ["c", "r", "d"];
export const cudPerm = ["c", "u", "d"];
export const rudPerm = ["r", "u", "d"];
export const crudPerm = ["c", "r", "u", "d"];

export const roomStatusOptions: { [key: string]: string } = {
  good: "Good",
  "o-of-o": "O-of-O",
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const bookable = ["Room", "Hall", "Pool", "Other"];
