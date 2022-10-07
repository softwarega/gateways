import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

import App from "../App"

const queryClient = new QueryClient()

test("render app", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
      ,
    </QueryClientProvider>,
  )

  const header = screen.getByTestId("header")
  const sidebar = screen.getByTestId("sidebar")
  const content = screen.getByTestId("content")

  expect(header).toBeInTheDocument()
  expect(sidebar).toBeInTheDocument()
  expect(content).toBeInTheDocument()
})
