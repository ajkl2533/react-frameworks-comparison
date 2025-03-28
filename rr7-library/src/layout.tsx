import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/films">Films</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout