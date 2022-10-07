import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt, faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons"
import classnames from "classnames"

import { Device } from "../../types"

const DevicesList: React.FC<Props> = ({ devices, remove }) => {
  if (!devices?.length) {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faCircleInfo} style={{ marginRight: "0.1rem" }} />
        <span>No devices added yet</span>
      </div>
    )
  }

  return (
    <div className="row g-2">
      {devices?.map((device, index) => (
        <DeviceListItem key={index} device={device} remove={() => remove(index)} />
      ))}
    </div>
  )
}

const DeviceListItem: React.FC<{ device: Device; remove(): void }> = ({ device, remove }) => {
  const status = device.status ? "online" : "offline"
  const date = device.createdAt ? new Date(device.createdAt).toDateString() : "right now"

  return (
    <div className="col-12 d-flex justify-content-between align-items-center device-item">
      <div className="d-flex flex-column">
        <span className="fw-bold" title="Vendor">
          {device.vendor}
        </span>
        <span title="Created at">
          <span style={{ marginRight: "0.2rem" }}>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </span>
          {date}
        </span>
      </div>
      <div className="d-flex flex-column text-end">
        <span role={"button"} onClick={remove}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
        <span className={classnames("badge", { "text-bg-danger": !device.status, "text-bg-success": device.status })}>
          {status}
        </span>
      </div>
    </div>
  )
}

type Props = {
  devices?: Device[]
  remove(index: number): void
}

export { DevicesList }
