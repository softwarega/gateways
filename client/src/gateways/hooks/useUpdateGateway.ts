import { useMutation, useQueryClient } from "react-query"

import { useClient } from "../../api"
import { displayNotificationError } from "../../errors/utils"
import { Gateway } from "../../types"

const useUpdateGateway = () => {
  const { patch } = useClient()
  const queryClient = useQueryClient()

  const patchGateway = async (gateway: Gateway) => patch<Gateway>("gateways", gateway.id!, gateway)

  const { mutate, isLoading, data } = useMutation(patchGateway, {
    onSuccess: async (updatedgateway) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("gateways")

      // Update the gateway in memory after success response
      queryClient.setQueryData("gateways", (gateways?: Gateway[]) => {
        const index = (gateways ?? [])?.findIndex((gateway) => gateway.id === updatedgateway.id)

        return [...(gateways ?? [])?.slice(0, index), updatedgateway, ...(gateways ?? [])?.slice(index + 1)]
      })
    },
    onError: displayNotificationError,
    onSettled: () => {
      queryClient.invalidateQueries("gateways")
    },
  })

  return { updateGateway: mutate, isUpdating: isLoading, updatedGateway: data }
}

export { useUpdateGateway }
