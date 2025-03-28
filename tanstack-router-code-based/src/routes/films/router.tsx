import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import { characterQueryOptions, filmQueryOptions, filmsQueryOptions } from "../../services";

export const filmsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'films',
})

const filmsIndexRoute = createRoute({
  getParentRoute: () => filmsRoute,
  path: '/',
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(filmsQueryOptions),
}).lazy(() => import('./index').then((d) => d.filmsIndexRoute))

const filmRoute = createRoute({
  getParentRoute: () => filmsRoute,
  path: '$filmId',
  loader: async ({ context: { queryClient }, params: { filmId } }) => {
    const filmData = await queryClient.ensureQueryData(filmQueryOptions(filmId))

    filmData.characters.map(async (characterUrl) => {
      const characterUrlParts = characterUrl.split('/').filter(Boolean);
      const characterId = characterUrlParts[characterUrlParts.length - 1];

      queryClient.prefetchQuery(characterQueryOptions(characterId))
    })
  },
}).lazy(() => import('./$filmId').then((d) => d.filmRoute))

export default filmsRoute.addChildren([
  filmsIndexRoute,
  filmRoute
])