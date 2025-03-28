import { data } from "react-router";

export default async function fetchJson<Result = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Result> {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw data("Error occured", { status: res.status });
  }
  console.log("🚀 ~ res:", res)
  return await res.json();
}