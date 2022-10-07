import { Link, Outlet, useMatch } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"

import { Loading } from "../../commons"
import { useGateways } from "../hooks"
import { GatewayListItem } from "./GatewayListItem"

const pathEdit = "/gateways/:gatewayId"

const GatewayList: React.FC = () => {
  const match = useMatch({ path: pathEdit })

  const { gateways, isLoading } = useGateways()

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center" style={{ padding: "23%" }}>
        <Loading />
      </div>
    )
  }

  return (
    <div style={{ paddingTop: "1rem" }}>
      <div className="text-end">
        <Link to={"/gateways/new"} className="btn btn-primary">
          Add Gateway
        </Link>
      </div>
      <div className="row">
        {gateways?.length ? (
          <div className={`${match ? "col-8" : "col"}`}>
            <div className="row row-cols-2 g-1" style={{ padding: "2rem" }}>
              {(gateways ?? [])?.map((gateway, index) => (
                <GatewayListItem key={gateway?.id ?? index} gateway={gateway} isDisabled={!!match} />
              ))}
            </div>
          </div>
        ) : (
          <div className="col text-center" style={{ paddingTop: "10rem" }}>
            <h5>
              <FontAwesomeIcon icon={faCircleInfo} style={{ marginRight: "0.1rem" }} />
              No gateways found
            </h5>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  )
}

export { GatewayList }
