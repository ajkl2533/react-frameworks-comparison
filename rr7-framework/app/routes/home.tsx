import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div>
  <h1>Home</h1>
  <p>This is testing project for:</p>
  <ul>
    <li>react router v7 in framework mode</li>
    <li>@tanstack/react-query</li>
  </ul>
</div>;
}
