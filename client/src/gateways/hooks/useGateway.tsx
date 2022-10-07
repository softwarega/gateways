import { useQuery } from "react-query"

import { useClient } from "../../api"
import { displayNotificationError } from "../../errors/utils"
import { Gateway } from "../../types"

const useGateway = (id: string) => {
  const { read } = useClient()
  const queryKey = ["gateway", id]

  const { data, isLoading } = useQuery(
    queryKey,
    async () => {
      const gateway = await read<Gateway>("gateways", id)

      return gateway
    },
    {
      onError: displayNotificationError,
    },
  )

  return { gateway: data as Gateway, isLoading }
}

export { useGateway }
