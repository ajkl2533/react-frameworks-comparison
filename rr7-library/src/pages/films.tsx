import { useQuery } from "@tanstack/react-query"
import fetch from "../utils/fetch"
import { Link } from "react-router"

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

function Films() {
  const { data, status } = useQuery({
    queryKey: ['films'],
    queryFn: () => fetch<Films>('https://swapi.dev/api/films/'),
  })

  if (status === 'pending') {
    return <p>Loading...</p>
  }
  if (status === 'error') {
    return <p>Error :(</p>
  }

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

export default Films