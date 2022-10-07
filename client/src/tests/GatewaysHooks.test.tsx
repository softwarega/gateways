import { PropsWithChildren } from "react"
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"

import { useGateways, useUpdateGateway, useGateway, useCreateGateway, useDeleteGateway } from "../gateways"
import { Gateway } from "../types"

const createWrapper = () => {
  const queryClient = new QueryClient()

  return ({ children }: PropsWithChildren) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

let mockGateway: Gateway = {
  name: "master",
  serial_number: "125",
  ipv4: "11.124.156.125",
  devices: [
    { vendor: "USA", status: 1, createdAt: "2022-05-10" },
    { vendor: "USA", status: 0, createdAt: "2022-05-10" },
  ],
}

describe("Gateways hooks", () => {
  it("useCreateGateway", async () => {
    const { result } = renderHook(useCreateGateway, {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isAdding).toBe(false))

    result.current.createGateway(mockGateway)

    await waitFor(() => expect(result.current.isAdding).toBe(false))

    await waitFor(() => expect(result.current.newGateway).toBeDefined())
    await waitFor(() => expect(result.current.newGateway?.id).toBeDefined())
    mockGateway = { ...result.current.newGateway } as Gateway
  })

  it("useGateways", async () => {
    const { result } = renderHook(useGateways, {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.gateways).toBeDefined())
  })

  it("useGateway", async () => {
    expect(mockGateway.id).toBeDefined()

    const { result } = renderHook(() => useGateway(mockGateway.id!), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    await waitFor(() => expect(result.current.gateway).toBeDefined())
  })

  it("useUpdateGateway", async () => {
    const { result } = renderHook(useUpdateGateway, {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isUpdating).toBe(false))

    result.current.updateGateway({ ...mockGateway, name: "Master name changed" })

    await waitFor(() => expect(result.current.isUpdating).toBe(false))

    await waitFor(() => expect(result.current.updatedGateway).toBeDefined())
  })

  it("useDeleteGateway", async () => {
    expect(mockGateway.id).toBeDefined()

    const { result } = renderHook(useDeleteGateway, {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isDeleting).toBe(false))

    result.current.removeGateway(mockGateway.id!)

    await waitFor(() => expect(result.current.isDeleting).toBe(false))

    await waitFor(() => expect(result.current.deletedGateway).toBeDefined())
  })
})
