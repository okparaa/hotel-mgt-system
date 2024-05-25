import { emailRegex, phoneRegex } from "./regexes";
import { FormRef } from "./forms";
import { gConfig, months } from "../config";
import { GetDaysProps } from "./types";
export type Session = { [x: string]: string | boolean | number };

export const jwt = {
  id: "0",
  auth: "no",
  ver: "no",
  iat: 0,
  exp: 0,
};

export const parseJwt = (token: string): Session => {
  if (!token) return jwt; // if not token return

  var base64Url = token.split(".")[1];
  if (!base64Url) return jwt;

  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const decodeSession = (token: string): Session => {
  return parseJwt(token) || jwt;
};

export const ucwords = (words: string | undefined | null) => {
  if (words) {
    return words.replace(/^\w{1}|\s+\w{1}/g, (ltr) => ltr.toUpperCase());
  }
  return "";
};

export const parseUser = (): Session => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const getValidPattern = (options: any) => {
  const validation: { value?: string | number | RegExp; message?: string } = {};

  if (options.email_msg) {
    validation.value = emailRegex;
    validation.message = options.email_msg;
  } else if (options.phone_msg) {
    validation.value = phoneRegex;
    validation.message = options.phone_msg;
  } else if (options.regx) {
    validation.value = new RegExp(options.regx);
    validation.message = options.regx_msg;
  }
  return validation;
};

export const errorHandler = (error: any, formRef: FormRef | null) => {
  if (error.graphQLErrors) {
    for (let erro of error.graphQLErrors) {
      const err = <Array<any>>erro.extensions.info;
      if (err) {
        for (let [key, message] of err) {
          formRef?.setError(key, { message });
        }
      }
    }
  }
};

export const errorMsgHandler = (error: any) => {
  let errorMsg = null;
  if (error.graphQLErrors) {
    for (let erro of error.graphQLErrors) {
      const err = erro.extensions.info;
      if (err) {
        for (let [key, message] of err) {
          errorMsg = { key, message };
        }
      }
    }
  }
  return errorMsg;
};

export const uploadImage = async (form: FormData) => {
  const url = `${gConfig.baseUrl}/${gConfig.rest}/upld`;
  return await fetch(url, {
    method: "POST",
    body: form,
  }).catch((error) => {
    console.warn(error);
  });
};
export const base64ToUint8Array = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const image64ToBlob = (imgage64: string) => {
  const match = imgage64.match(/^data:image\/(\w+);base64,/);
  if (!match) {
    throw new Error("not a valid base64-image string.");
  }
  const imageSuffix = match[1];
  const base64StringWithoutPrefix = imgage64.replace(
    /^data:image\/\w+;base64,/,
    ""
  );
  const uint8Array = base64ToUint8Array(base64StringWithoutPrefix);
  const blob = new Blob([uint8Array], { type: `image/${imageSuffix}` });
  return blob;
};

export const getKey = () => Math.floor(Math.random() * Date.now()).toString(36);

export const updateFxn = (items: any[], utem: any) => {
  return items.map((item: any) => {
    if (item.id === utem.id) {
      return { ...item, ...utem };
    } else {
      return item;
    }
  });
};

export const addDaysToDate = (date: Date, days: number) => {
  return new Date(date.setDate(date.getDate() + days));
};
export const addInput = (e: any, prxy: (value: number) => void) => {
  let td = e.target as HTMLElement;
  let revert = "innerText" in td ? td.innerText + "" : "";
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "bee");
  input.addEventListener("blur", (e: Event) => {
    e.preventDefault();
    input.disabled = true;
    if (e.type == "blur" && input.value === "") {
      td.innerText = revert;
    } else if (e.type == "blur") {
      td.innerHTML = "";
      prxy(+input.value);
    }
  });
  input.addEventListener("keyup", (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Enter") {
      input.blur();
    }
  });
  td.innerHTML = "";
  td.appendChild(input);
  input.focus();
};

export const getDays = ({ date, inDate, outDate }: GetDaysProps) => {
  const oneDay = 1000 * 60 * 60 * 24;
  if (!date) {
    const days = Math.round(
      (new Date(outDate).getTime() - new Date(inDate).getTime()) / oneDay
    );
    return { days };
  }
  const prev_outDate = outDate;
  outDate = getDateFromTimestamp(date.toDateString());
  const new_day_diff = new Date(date).getTime() - new Date(inDate).getTime();
  const old_day_diff =
    new Date(prev_outDate).getTime() - new Date(inDate).getTime();

  const new_days = Math.round(new_day_diff / oneDay);
  const old_days = Math.round(old_day_diff / oneDay);
  const days = new_days - old_days;
  return { days, outDate };
};
export const timeAgo = (time: any) => {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, "seconds", 1], // 60
    [120, "1 minute ago", "1 minute from now"], // 60*2
    [3600, "minutes", 60], // 60*60, 60
    [7200, "1 hour ago", "1 hour from now"], // 60*60*2
    [86400, "hours", 3600], // 60*60*24, 60*60
    [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
    [604800, "days", 86400], // 60*60*24*7, 60*60*24
    [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
    [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
    [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
    [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
    [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  let seconds = (+new Date() - +time) / 1000,
    token = "ago",
    list_choice = 1;

  if (seconds == 0) {
    return "Just now";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "from now";
    list_choice = 2;
  }
  let i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < +format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
};

export const humanDate = (date: any) => {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const getDateFromTimestamp = (
  timestamp: number | string | null = new Date().valueOf(),
  format = "y-m-d"
) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  let ndate = `${year}-${month}-${day}`;
  switch (format) {
    case "y-m-d":
      ndate = `${year}-${month}-${day}`;
      break;
    case "d/m/y":
      ndate = `${day}/${month}/${year}`;
      break;
    case "d-m-y":
      ndate = `${day}-${month}-${year}`;
      break;
    case "d-msh-y":
      ndate = `${day} ${months[+month - 1]}/${year}`;
      break;
    case "d-sh-y":
      ndate = `${day}/${months[+month - 1]}/${year}`;
      break;
    case "d-ms-y":
      ndate = `${day}/${months[+month - 1]}`;
      break;
    default:
      ndate = `${year}-${month}-${day}`;
      break;
  }
  return ndate;
};

export const toCommas = (value: number | string | null | undefined) => {
  if (value) {
    return Number(Number(value).toFixed(2)).toLocaleString();
  }
  return "0";
};

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "rtoken";

export type AuthState = {
  token: string;
  refreshToken: string;
};

export const saveAuthState = ({ token, refreshToken }: AuthState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getToken = () => {
  if (typeof window === "undefined") return;
  return localStorage.getItem(TOKEN_KEY);
};
export const getRefreshToken = () => {
  if (typeof window === "undefined") return;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const clearAuthState = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
