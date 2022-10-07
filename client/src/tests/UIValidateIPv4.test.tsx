import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

import { GatewayForm } from "../gateways"

test("if IPv4 validation work from UI", () => {
  const queryClient = new QueryClient()
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <GatewayForm />
      </QueryClientProvider>
    </MemoryRouter>,
  )

  const ipv4Input = screen.getByTestId("ipv4") as HTMLInputElement

  expect(ipv4Input).toBeInTheDocument()

  fireEvent.change(ipv4Input, { target: { value: "11.124.156.256" } }) // wrong IP4v address

  expect(ipv4Input.value).toBe("11.124.156.256")
  expect(screen.getByTestId("ipv4-error")).toBeInTheDocument()
})
