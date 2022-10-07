import { MouseEvent } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNetworkWired, faDesktop } from "@fortawesome/free-solid-svg-icons"

import { Gateway } from "../../types"
import { useDeleteGateway } from "../hooks"

const GatewayListItem: React.FC<Props> = ({ gateway: { id, ipv4, name, devices, serial_number }, isDisabled }) => {
  const { removeGateway, isDeleting } = useDeleteGateway()

  const handleRemoveGateway = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (id) {
      removeGateway(id)
    }
  }

  return (
    <div className="col">
      <Link to={`/gateways/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="card gateway-card">
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between">
              <span>
                <span title="Name" style={{ marginRight: "0.5rem" }}>
                  {name}
                </span>
                <span title="Serial number">#{serial_number}</span>
              </span>
              <div className="">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  style={{ marginLeft: "2rm" }}
                  disabled={isDeleting || isDisabled}
                  onClick={handleRemoveGateway}
                >
                  {isDeleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </h5>
            <div>
              <p title="Total devices" className="card-text">
                <FontAwesomeIcon icon={faDesktop} style={{ marginRight: "0.5rem" }} />
                {devices.length} {devices.length >= 10 ? <span className="badge text-bg-danger">No capacity</span> : ""}
              </p>
              <p title="IP address" className="card-text">
                <FontAwesomeIcon icon={faNetworkWired} style={{ marginRight: "0.5rem" }} />
                {ipv4}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

type Props = {
  gateway: Gateway
  isDisabled: boolean
}

export { GatewayListItem }
