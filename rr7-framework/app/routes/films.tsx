import { data, isRouteErrorResponse, Link } from "react-router"
import type { Route } from "./+types/films"

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
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Films" },
  ];
}

export async function clientLoader() {
  const res = await fetch('https://swapi.dev/api/films');
  if (!res.ok) {
    throw data("Error occured while fetching data", { status: res.status });
  }
  return await res.json() as Films;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Films({loaderData}: Route.ComponentProps) {
  const data = loaderData;

  return (
    <div>
      <h2>Films</h2>
      {data.results.map((film) => {
        const filmUrlParts = film.url.split('/').filter(Boolean)
        const filmId = filmUrlParts[filmUrlParts.length - 1]
        return (
          <article key={filmId}>
            <Link to={`/films/${filmId}`}>
              <h3>
                {film.episode_id}. {film.title}{' '}
                <em>
                  ({new Date(Date.parse(film.release_date)).getFullYear()})
                </em>
              </h3>
            </Link>
          </article>
        )
      })}
    </div>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = String(error.status);
    details = error.data || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
  }

  return (
    <div>
      <h2>{message}</h2>
      <p>{details}</p>
    </div>
  );
}