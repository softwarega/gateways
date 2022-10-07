import { useMemo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faServer, faDesktop } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

import { useGateways } from "../../gateways"
import { Loading } from "../../commons"

const Dashboard: React.FC = () => {
  const { isLoading, gateways } = useGateways()
  const { gatewaysFull, gatewaysNoFull, devicesOn, devicesOff } = useMemo(
    () =>
      (gateways ?? []).reduce(
        (prev, gateway) => {
          const isFull = gateway.devices.length >= 10
          const gatewaysFull = isFull ? prev.gatewaysFull + 1 : prev.gatewaysFull
          const gatewaysNoFull = !isFull ? prev.gatewaysNoFull + 1 : prev.gatewaysNoFull

          const { devicesOn, devicesOff } = gateway.devices.reduce(
            (acc, device) => {
              if (device.status) {
                return { ...acc, devicesOn: acc.devicesOn + 1 }
              } else {
                return { ...acc, devicesOff: acc.devicesOff + 1 }
              }
            },
            { devicesOn: 0, devicesOff: 0 },
          )
          return {
            ...prev,
            gatewaysFull,
            gatewaysNoFull,
            devicesOn: prev.devicesOn + devicesOn,
            devicesOff: prev.devicesOff + devicesOff,
          }
        },
        { gatewaysFull: 0, gatewaysNoFull: 0, devicesOn: 0, devicesOff: 0 },
      ),
    [gateways],
  )

  if (isLoading) {
    return (
      <div data-testid="loading" className="d-flex justify-content-center" style={{ padding: "23%" }}>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div
        data-testid="dashboard-title"
        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 className="h2">Dashboard</h1>
      </div>

      <div className="row g-4" style={{ padding: "3rem" }}>
        <div className="col">
          <div
            data-testid="dashboard-gateways-card"
            className="card"
            style={{ paddingTop: "1rem", marginRight: "5rem" }}
          >
            <FontAwesomeIcon icon={faServer} size="6x" />
            <div className="card-body">
              <h5 className="card-title">Gateways</h5>
              <p className="card-text">Gateways currently added to network</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between text-success">
                <span>With capacity</span>
                <span>{gatewaysNoFull}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between text-danger">
                <span>Full capacity</span>
                <span>{gatewaysFull}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>{gatewaysFull + gatewaysNoFull}</span>
              </li>
            </ul>
            <div className="card-body text-end">
              <Link to={"/gateways"} className="card-link">
                Manage gateways
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div data-testid="dashboard-devices-card" className="card" style={{ paddingTop: "1rem" }}>
            <FontAwesomeIcon icon={faDesktop} size="6x" />
            <div className="card-body">
              <h5 className="card-title">Devices</h5>
              <p className="card-text">Devices currently added to network</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between text-success">
                <span>Online</span>
                <span>{devicesOn}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between text-danger">
                <span>Offline</span>
                <span>{devicesOff}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>{devicesOn + devicesOff}</span>
              </li>
            </ul>
            <div className="card-body text-end">
              <Link to={"/gateways"} className="card-link">
                Manage gateways
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { Dashboard }
