import { createContext, useContext } from "react";

type DatePickerState = {
  isCalendar?: boolean;
  isMonths?: boolean;
  currentDate?: Date;
};

type DatePickerContext = {
  data: DatePickerState;
  dispatch: (action: Action) => void;
};

type Action = {
  type:
    | "TOGGLE_CALENDAR"
    | "OPEN_CALENDAR"
    | "OPEN_MONTHS"
    | "SET_CURRENT_DATE"
    | "CLOSE";
  data: DatePickerState;
};

export const reducer = (state: DatePickerState, action: Action) => {
  switch (action.type) {
    case "TOGGLE_CALENDAR":
      return {
        ...state,
        isCalendar: !state.isCalendar,
        isMonths: false,
      };
      break;
    case "OPEN_MONTHS":
      return {
        ...state,
        isCalendar: false,
        isMonths: true,
      };
      break;
    case "OPEN_CALENDAR":
      return {
        ...state,
        isCalendar: true,
        isMonths: false,
      };
      break;
    case "CLOSE":
      return {
        ...state,
        isCalendar: false,
        isMonths: false,
      };
      break;
    case "SET_CURRENT_DATE":
      return {
        ...state,
        ...action.data,
      };
      break;
    default:
      return {
        ...state,
      };
  }
};

export const PickerContext = createContext<DatePickerContext>(
  {} as DatePickerContext
);
export const useDatePicker = () => useContext(PickerContext);
