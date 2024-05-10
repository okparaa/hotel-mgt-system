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
