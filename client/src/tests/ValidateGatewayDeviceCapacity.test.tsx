import { PropsWithChildren } from "react"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"

import { useCreateGateway } from "../gateways"
import { Gateway } from "../types"

const createWrapper = () => {
  const queryClient = new QueryClient()

  return ({ children }: PropsWithChildren) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

let mockGateway: Gateway = {
  name: "master",
  serial_number: "125",
  ipv4: "11.124.156.125.25",
  devices: [
    { vendor: "USA", status: 1, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
  ],
}

test("validate gateways max devices capacity should be 10", async () => {
  const { result } = renderHook(useCreateGateway, {
    wrapper: createWrapper(),
  })

  await waitFor(() => expect(result.current.isAdding).toBe(false))

  result.current.createGateway(mockGateway)

  await waitFor(() => expect(result.current.isAdding).toBe(false))

  await waitFor(() => expect(result.current.newGateway).not.toBeDefined())
})
