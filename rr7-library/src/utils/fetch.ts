export default async function fetchJson<Result = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Result> {
  const res = await fetch(input, init);
  return await res.json();
}