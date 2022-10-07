import { useQuery } from "react-query"

import { useClient } from "../../api"
import { Gateway } from "../../types"

const useGateways = () => {
  const { search } = useClient()
  const queryKey = ["gateways"]

  const { data, isLoading } = useQuery(queryKey, async () => {
    const gateways = await search<Gateway[]>("gateways")

    return gateways
  })

  return { gateways: data, isLoading }
}

export { useGateways }
