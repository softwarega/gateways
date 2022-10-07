import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { useCreateGateway } from "../hooks"
import { Device, Gateway } from "../../types"
import { DevicesList } from "./DevicesList"
import { Modal } from "../../commons"
import { isIPv4 } from "../../utils"
import { DeviceForm } from "./DeviceForm"

const GatewayForm: React.FC = () => {
  const navigate = useNavigate()
  const { createGateway, isAdding } = useCreateGateway()
  const isAddingRef = useRef(isAdding)
  const [formData, setFormData] = useState<Gateway>(initialData)
  const [isValidIP, setIsValidIP] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalDevice, setModalDevice] = useState<Device | undefined>(undefined)

  const handleCancel = useCallback(() => {
    navigate("/gateways")
  }, [navigate])

  useEffect(() => {
    if (isAddingRef.current && !isAdding) {
      handleCancel()
    }
    isAddingRef.current = isAdding
  }, [isAdding, handleCancel])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (formData) {
        createGateway(formData)
      }
    },
    [createGateway, formData],
  )

  const addDevice = useCallback(() => {
    if (modalDevice) {
      setFormData((prev) => ({ ...prev, devices: [modalDevice, ...prev.devices] }))
    }
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
                value={formData.name}
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
                value={formData.serial_number}
                onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="ipv4" className="form-label">
                IP address
              </label>
              <input
                data-testid="ipv4"
                required
                type="text"
                className="form-control"
                id="ipv4"
                name="ipv4"
                value={formData.ipv4}
                onChange={(e) => {
                  const ipv4 = e.target.value

                  setIsValidIP(isIPv4(ipv4))
                  setFormData({ ...formData, ipv4 })
                }}
              />
              {!isValidIP && (
                <span data-testid="ipv4-error" className="text-danger position-absolute">
                  No valid IPV4 address
                </span>
              )}
            </div>
            <div className="col-12">
              <label
                className="form-label w-100 d-flex justify-content-between"
                style={{ marginTop: "1rem", borderBottom: "solid 1px lightgray" }}
              >
                <span>Devices {formData.devices.length ? `(${formData.devices.length})` : ""}</span>
                <span role={"button"} className="align-text-bottom" onClick={handleShowModal}>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </label>
              <DevicesList devices={formData.devices} remove={removeDevice} />
              <div className="col-12 text-end" style={{ marginTop: "5rem" }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={isAdding}
                  style={{ marginRight: "1rem" }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isAdding || !isValidIP}>
                  {isAdding ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Adding...
                    </>
                  ) : (
                    "Create"
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

const initialData: Gateway = {
  serial_number: "",
  name: "",
  ipv4: "",
  devices: [],
}

export { GatewayForm }
