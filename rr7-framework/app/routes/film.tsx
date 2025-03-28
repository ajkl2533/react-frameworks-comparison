import * as React from 'react';
import { data, isRouteErrorResponse } from 'react-router'
import type { Route } from './+types/film'

type Film = {
  title: string
  opening_crawl: string
  characters: string[]
}
type Character = {
  name: string
}

export async function clientLoader({params}: Route.ClientLoaderArgs) {
  const res = await fetch(`https://swapi.dev/api/films/${params.filmId}`);
  if (!res.ok) {
    throw data("Error occured while fetching data", { status: res.status });
  }
  const filmData = await res.json() as Film;

  const charactersPromise = Promise.all<Character>(
    filmData.characters.map(async (characterUrl) => {
      const characterUrlParts = characterUrl.split('/').filter(Boolean);
      const characterId = characterUrlParts[characterUrlParts.length - 1];
      const response = await fetch(`https://swapi.dev/api/people/${characterId}/`);
      return response.json();
    })
  );

  return {filmData, charactersPromise}
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Film({loaderData}:Route.ComponentProps) {
  const {filmData, charactersPromise} = loaderData;

  return (
    <div>
      <h2>{filmData.title}</h2>
      <p>{filmData.opening_crawl}</p>
      <br />
      <h4>Characters</h4>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Characters promise={charactersPromise}/>
      </React.Suspense>

    </div>
  )
}

function Characters ({promise}: {promise: Promise<Character[]>}) {
  const characters = React.use(promise);

  return (<ul>
    {characters.map((character) => (
      <li key={character.name}>
        <h5>{character.name}</h5>
      </li>
    ))}
  </ul>)
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


