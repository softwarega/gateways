import { useMutation, useQueryClient } from "react-query"

import { useClient } from "../../api"
import { displayNotificationError } from "../../errors/utils"
import { Gateway } from "../../types"

const useCreateGateway = () => {
  const { create } = useClient()
  const queryClient = useQueryClient()

  const addGateway = async (gateway: Gateway) => create<Gateway>("gateways", gateway)

  const { mutate, isLoading, data } = useMutation(addGateway, {
    onSuccess: async (newGateway) => {
      await queryClient.cancelQueries("gateways")

      queryClient.setQueryData("gateways", (gateways?: Gateway[]) => {
        const index = (gateways ?? [])?.findIndex((gateway) => gateway.id === newGateway.id)

        return [...(gateways ?? []).slice(0, index), newGateway, ...(gateways ?? []).slice(index + 1)]
      })
    },
    onError: displayNotificationError,
    onSettled: () => {
      queryClient.invalidateQueries("gateways")
    },
  })

  return { createGateway: mutate, isAdding: isLoading, newGateway: data }
}

export { useCreateGateway }
