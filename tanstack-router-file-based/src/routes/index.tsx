import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div>
        <h1>Home</h1>
        <p>This is testing project for:</p>
        <ul>
          <li>@tanstack/router with file-based routing</li>
          <li>@tanstack/react-query</li>
        </ul>
      </div>
  )
}
