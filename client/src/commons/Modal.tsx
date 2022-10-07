import classNames from "classnames"
import { FC, ReactNode } from "react"
import ReactDOM from "react-dom"

const Modal: FC<ModalProps> = ({ show, title, body, footer, close, isDisabled, className }) => {
  const rootElement = document.querySelector("#app")

  const content = (
    <div
      data-modal="trigger"
      className={classNames("modal modal-dialog-centered", { show }, className)}
      tabIndex={-1}
      data-bs-backdrop="static"
    >
      <div className="modal-dialog w-100">
        <div className="modal-content w-100">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={close}
              disabled={isDisabled}
            ></button>
          </div>
          <div className="modal-body">{body}</div>
          {footer && <footer className="modal-footer">{footer}</footer>}
        </div>
      </div>
    </div>
  )

  if (show) {
    return rootElement ? ReactDOM.createPortal(content, rootElement) : content
  }
  return null
}

export type ModalProps = {
  show: boolean
  title: string
  body?: ReactNode
  footer?: ReactNode
  isDisabled?: boolean
  className?: string
  close(): void
}

export { Modal }
