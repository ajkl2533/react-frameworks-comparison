import * as React from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { type Character, characterQueryOptions, filmQueryOptions } from '../../services'
import { useSuspenseQuery } from '@tanstack/react-query';
import { filmsRoute } from './router';

export const filmRoute = createLazyRoute('/films/$filmId')({
  component: FilmComponent,
})

function FilmComponent() {
  const  { filmId } = filmRoute.useParams();
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