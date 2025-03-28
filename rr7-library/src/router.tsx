import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layout";

const Home = React.lazy(()=>import('./pages/home'))
const Films = React.lazy(()=>import('./pages/films'))
const Film = React.lazy(()=>import('./pages/film'))

function Router() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path='films'>
              <Route index element={<Films />} />
              <Route path=':filmId' element={<Film />} />
            </Route>
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}
export default Router