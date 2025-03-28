import { queryOptions } from "@tanstack/react-query";

async function fetchJson<Result = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Result> {
  const res = await fetch(input, init);
  return await res.json();
}

type Films = {
  count: number
  next: string
  previous: string
  results: {
    episode_id: number
    title: string
    release_date: string
    url: string
  }[]
}
type Film = {
  title: string
  opening_crawl: string
  characters: string[]
}
export type Character = {
  name: string
}

export const filmsQueryOptions = queryOptions({
  queryKey: ['films'],
  queryFn: () => fetchJson<Films>('https://swapi.dev/api/films/'),
})

export const filmQueryOptions = (filmId: string) => queryOptions({
  queryKey: ['film', filmId],
  queryFn: () => fetchJson<Film>(`https://swapi.dev/api/films/${filmId}/`),
})

export const characterQueryOptions = (characterId: string) => queryOptions({
  queryKey: ['character', characterId],
  queryFn: () => fetchJson<Character>(`https://swapi.dev/api/people/${characterId}/`),
})