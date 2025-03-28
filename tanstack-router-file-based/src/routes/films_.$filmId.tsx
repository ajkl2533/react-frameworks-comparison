import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { type Character, characterQueryOptions, filmQueryOptions } from '../services'
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/films_/$filmId')({
  loader: async ({ context: { queryClient }, params: { filmId } }) => {
    const filmData = await queryClient.ensureQueryData(filmQueryOptions(filmId))

    filmData.characters.map(async (characterUrl) => {
      const characterUrlParts = characterUrl.split('/').filter(Boolean);
      const characterId = characterUrlParts[characterUrlParts.length - 1];

      queryClient.prefetchQuery(characterQueryOptions(characterId))
    })
  },
  component: FilmComponent,
})

function FilmComponent() {
  const  filmId = Route.useParams().filmId;
  const { data } = useSuspenseQuery(filmQueryOptions(filmId));

  return (<div>
    <h2>{data.title}</h2>
    <p>{data.opening_crawl}</p>
    <br />
    <h4>Characters</h4>
    <ul>
      {data.characters.map((character) => {
        const characterUrlParts = character.split('/').filter(Boolean)
        const characterId = characterUrlParts[characterUrlParts.length - 1]
        return (
          <React.Suspense fallback={<li>Loading...</li>}>
            <Character id={characterId} key={characterId} />
          </React.Suspense>
        )
      })}
      </ul>
  </div>)
}

function Character(props: { id: string }) {
  const { id } = props
  const {data} = useSuspenseQuery(characterQueryOptions(id))

  return (
    <li key={id}>
        <h5>{data.name}</h5>
    </li>
  )
}