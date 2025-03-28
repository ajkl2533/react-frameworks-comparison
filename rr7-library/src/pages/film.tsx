import { useQuery } from '@tanstack/react-query'
import fetch from '../utils/fetch'
import { useParams } from 'react-router'

type Film = {
  title: string
  opening_crawl: string
  characters: string[]
}

function Film() {
  const params = useParams()
  const filmId = params.filmId
  const { data, status } = useQuery({
    queryKey: ['film', filmId],
    queryFn: () => fetch<Film>(`https://swapi.dev/api/films/${filmId}/`),
  })

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <p>Error :(</p>
  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.opening_crawl}</p>
      <br />
      <h4>Characters</h4>
      <ul>
      {data.characters.map((character) => {
        const characterUrlParts = character.split('/').filter(Boolean)
        const characterId = characterUrlParts[characterUrlParts.length - 1]
        return <Character id={characterId} key={characterId} />
      })}
      </ul>
    </div>
  )
}

type Character = {
  name: string
}

function Character(props: { id: string }) {
  const { id } = props
  const { data, status } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetch<Character>(`https://swapi.dev/api/people/${id}/`),
  })

  if (status === 'pending') return <li>Loading...</li>
  if (status !== 'success') {
    return null
  }

  return (
    <li key={id}>
        <h5>{data.name}</h5>
    </li>
  )
}

export default Film
