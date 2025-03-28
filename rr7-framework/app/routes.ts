import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix('films', [
    index('routes/films.tsx'),
    route(':filmId', 'routes/film.tsx'),
  ])
] satisfies RouteConfig;
