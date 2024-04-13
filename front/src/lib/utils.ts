import { ApolloError } from "@apollo/client";
import { emailRegex, phoneRegex } from "./regexes";
import { FormRef } from "./forms";
import { gConfig } from "../config";

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

export const ucwords = (words: string | undefined) => {
  if (words) {
    return words.replace(/^\w{1}|\s+\w{1}/g, (ltr) => ltr.toUpperCase());
  }
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

export const errorHandler = (error: ApolloError, formRef: FormRef | null) => {
  if (error.graphQLErrors) {
    for (let erro of error.graphQLErrors) {
      const err = <Array<any>>erro.extensions.info;
      for (let [key, message] of err) {
        formRef?.setError(key, { message });
      }
    }
  }
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

export const addInput = (e: any, prxy: (value: string) => void) => {
  let td = e.target as HTMLElement;
  let revert = "innerText" in td ? td.innerText + "" : "";
  let input = document.createElement("input");

  input.setAttribute("type", "text");
  input.setAttribute("size", "4");
  input.setAttribute("id", "bee");

  input.addEventListener("blur", (e: Event) => {
    e.preventDefault();
    input.disabled = true;
    if (e.type == "blur" && input.value === "") {
      td.innerHTML = revert;
    } else if (e.type == "blur") {
      td.innerHTML = toCommas(input.value);
      prxy(input.value);
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

// var aDay = 24 * 60 * 60 * 1000;
// console.log(time_ago(new Date(Date.now() - aDay)));
// console.log(time_ago(new Date(Date.now() - aDay * 2)));

export const getDateFromTimestamp = (
  timestamp: number | null = null,
  format = "y-m-d"
) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = date.getDate();
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
    default:
      ndate = `${year}-${month}-${day}`;
      break;
  }
  return ndate;
};

export const toCommas = (value: number | string) => {
  if (typeof value === "string") {
    value = +value;
  }
  const num = Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(+value);
  return num;
};

export const toReal = (value: number | string) => {
  if (typeof value === "string") {
    value = +value;
  }
  const num = Intl.NumberFormat("en-US").format(+value);
  return num;
};
