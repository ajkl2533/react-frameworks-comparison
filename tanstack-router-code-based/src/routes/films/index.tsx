import { createLazyRoute, Link } from '@tanstack/react-router'
import { filmsQueryOptions } from '../../services'
import { useSuspenseQuery } from '@tanstack/react-query'

export const filmsIndexRoute = createLazyRoute('/')({
  component: FilmsComponent,
})

export function FilmsComponent() {
  const { data } = useSuspenseQuery(filmsQueryOptions);

  return <div>
  <h2>Films</h2>
  {data.results.map((film) => {
    const filmUrlParts = film.url.split('/').filter(Boolean)
    const filmId = filmUrlParts[filmUrlParts.length - 1]
    return (
      <article key={filmId}>
        <Link to='/films/$filmId' params={{ filmId }}>
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
}
