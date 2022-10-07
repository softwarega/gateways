import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import { useGateways } from "../gateways"
import { Dashboard } from "../dashboard"
import { Gateway } from "../types"

// Solves TypeScript Errors
const useGatewaysMock = useGateways as jest.Mock<any>

// Mock the module
jest.mock("../gateways")

describe("<Dashboard />", () => {
  beforeEach(() => {
    useGatewaysMock.mockImplementation(() => ({ isLoading: true }))
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("Render without crashing", () => {
    render(<Dashboard />)
  })

  it("Display loading indicator", () => {
    render(<Dashboard />)

    const dashboardLoading = screen.getByTestId("loading")

    expect(dashboardLoading).toBeInTheDocument()
  })

  it("Display data", () => {
    const gateways: Gateway[] = [
      {
        id: "123456",
        name: "master",
        serial_number: "125",
        ipv4: "11.124.156.12",
        devices: [
          { vendor: "USA", status: 1, createdAt: "2022-05-10", id: "4587545" },
          { vendor: "USA", status: 0, createdAt: "2022-05-10", id: "45875" },
        ],
      },
      {
        id: "1234",
        name: "master1",
        serial_number: "125751",
        ipv4: "11.124.156.125",
        devices: [],
      },
      {
        id: "123",
        name: "master2",
        serial_number: "125751we",
        ipv4: "112.124.156.125",
        devices: [{ vendor: "USA", status: 1, createdAt: "2022-05-10", id: "4587" }],
      },
    ]

    useGatewaysMock.mockImplementation(() => ({ isLoading: false, gateways }))

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    )

    const dashboardTitle = screen.getByTestId("dashboard-title")
    const gatewaysCards = screen.getByTestId("dashboard-gateways-card")
    const devicesCards = screen.getByTestId("dashboard-devices-card")

    expect(dashboardTitle).toBeInTheDocument()
    expect(gatewaysCards).toBeInTheDocument()
    expect(devicesCards).toBeInTheDocument()
  })
})
