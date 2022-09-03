import { Test } from "./interfaces/test.interface";

type Method = "POST" | "GET";

export default async function request(method: Method, url = "", data: Test) {
  const options = {
    method,
    referrerPolicy: "no-referrer",
    credentials: "same-origin",
    cache: "no-cache",
    mode: "cors",
  } as RequestInit;
  if (!!data) {
    options["body"] = JSON.stringify(data);
    options["headers"] = {
      "Content-Type": "application/json",
    };
  }
  // Default options are marked with *
  const response = await fetch(url, options);
  return response.json(); // parses JSON response into native JavaScript objects
}
