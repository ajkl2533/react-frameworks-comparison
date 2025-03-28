import { rootRoute } from './routes/__root'
import filmsRouter from './routes/films/router'
import { createRoute } from '@tanstack/react-router'

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/'
}).lazy(() => import('./routes/index').then((d) => d.indexRoute))

export const routeTree = rootRoute.addChildren([
  filmsRouter,
  indexRoute
])
