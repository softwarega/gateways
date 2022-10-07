import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { useGateway, useUpdateGateway } from "../hooks"
import { Loading, Modal } from "../../commons"
import { DevicesList } from "./DevicesList"
import { Device } from "../../types"
import { DeviceForm } from "./DeviceForm"
import { isIPv4 } from "../../utils"

const GatewayFormEdit: React.FC = () => {
  const { gatewayId } = useParams()
  const navigate = useNavigate()
  const { gateway, isLoading } = useGateway(gatewayId!)
  const { updateGateway, isUpdating } = useUpdateGateway()
  const isUpdatingRef = useRef(isUpdating)
  const [formData, setFormData] = useState(gateway)
  const [isValidIP, setIsValidIP] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalDevice, setModalDevice] = useState<Device | undefined>(undefined)

  const handleCancel = useCallback(() => {
    navigate("/gateways")
  }, [navigate])

  useEffect(() => {
    if (isUpdatingRef.current && !isUpdating) {
      handleCancel()
    }
    isUpdatingRef.current = isUpdating
  }, [handleCancel, isUpdating])

  useEffect(() => {
    setFormData(gateway)
  }, [gateway])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      // prevents the submit button from refreshing the page
      event.preventDefault()
      updateGateway(formData)
    },
    [formData, updateGateway],
  )

  const addDevice = useCallback(() => {
    if (modalDevice) {
      setFormData((prev) => ({ ...prev, devices: [modalDevice, ...prev.devices] }))
    }
    closeModal()
  }, [modalDevice])

  const removeDevice = (index: number) => {
    setFormData((prev) => ({ ...prev, devices: [...prev.devices.slice(0, index), ...prev.devices.slice(index + 1)] }))
  }

  const handleShowModal = () => {
    setModalDevice({ status: 1, vendor: "" })
    setShowModal(true)
  }

  const closeModal = () => {
    setModalDevice(undefined)
    setShowModal(false)
  }

  const modalFooter = (
    <>
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>
        Close
      </button>
      <button type="button" className="btn btn-primary" onClick={addDevice}>
        Add
      </button>
    </>
  )

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Loading />
      </div>
    )
  }

  return (
    <div className="col-4" style={{ padding: "2rem" }}>
      <div className="row gateway-form">
        <div className="col">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="name" className="form-label">
                Gateway name
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData?.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="serial_number" className="form-label">
                Serial Number
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="serial_number"
                name="serial_number"
                value={formData?.serial_number}
                onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="ipv4" className="form-label">
                IP address
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="ipv4"
                name="ipv4"
                value={formData?.ipv4}
                onChange={(e) => {
                  const ipv4 = e.target.value

                  setIsValidIP(isIPv4(ipv4))
                  setFormData({ ...formData, ipv4 })
                }}
              />
              {!isValidIP && <span className="text-danger position-absolute">No valid IPV4 address</span>}
            </div>
            <div className="col-12">
              <label
                className="form-label w-100 d-flex justify-content-between align-items-center"
                style={{ marginTop: "1rem", borderBottom: "solid 1px lightgray" }}
              >
                <span>Devices {formData?.devices.length ? `(${formData?.devices.length})` : ""}</span>

                {formData?.devices.length >= 10 ? (
                  <span className="badge text-bg-danger">no capacity</span>
                ) : (
                  <button
                    title="Add device"
                    type="button"
                    className="btn btn-link text-black"
                    onClick={handleShowModal}
                    disabled={formData?.devices.length >= 10}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </label>
              <DevicesList devices={formData?.devices} remove={removeDevice} />
              <div className="col-12 text-end" style={{ marginTop: "5rem" }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={isUpdating}
                  style={{ marginRight: "1rem" }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isUpdating || !isValidIP}>
                  {isUpdating ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        {modalDevice && (
          <Modal
            title="Device"
            show={showModal}
            close={closeModal}
            body={<DeviceForm device={modalDevice} onChangeDevice={setModalDevice} />}
            footer={modalFooter}
          />
        )}
      </div>
    </div>
  )
}

export { GatewayFormEdit }
