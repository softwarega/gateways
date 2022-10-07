import { Device } from "../../types"

const DeviceForm: React.FC<Props> = ({ device, onChangeDevice }) => (
  <div className="row">
    <div className="col">
      <form className="row g-3">
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Vendor
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={device.vendor}
            onChange={(e) => onChangeDevice({ ...device, vendor: e.target.value })}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="status"
              name="status"
              checked={!!device.status}
              onChange={(e) => onChangeDevice({ ...device, status: e.target.checked ? 1 : 0 })}
            />
            <label className="form-check-label" htmlFor="status">
              Status
            </label>
          </div>
        </div>
      </form>
    </div>
  </div>
)

type Props = {
  device: Device
  onChangeDevice(device: Device): void
}

export { DeviceForm }
