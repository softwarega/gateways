import { ApiError } from "../../types"

const NotificationError: React.FC<Props> = ({ error: { message, cause } }) => (
  <div className="flex flex-col">
    <p className="font-bold">{message}</p>
    <p>{cause?.message}</p>
  </div>
)

type Props = { error: ApiError }

export { NotificationError }
