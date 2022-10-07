import { createElement } from "react"
import { toast } from "react-toastify"

import { ApiError } from "../types"
import { NotificationError } from "./components"

const displayNotificationError = (error: ApiError) => {
  toast.error(createElement(NotificationError, { error }))
}

export { displayNotificationError }
