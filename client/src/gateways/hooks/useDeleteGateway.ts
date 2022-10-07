import { useMutation, useQueryClient } from "react-query"

import { useClient } from "../../api"
import { displayNotificationError } from "../../errors/utils"
import { Gateway } from "../../types"

const useDeleteGateway = () => {
  const { remove } = useClient()
  const queryClient = useQueryClient()

  const deleteGateway = async (id: string) => remove<Gateway>("gateways", id)

  const { mutate, isLoading, data } = useMutation(deleteGateway, {
    onSuccess: async (deletedGateway) => {
      await queryClient.cancelQueries("gateways")

      queryClient.setQueryData("gateways", (gateways?: Gateway[]) => {
        const index = (gateways ?? []).findIndex((gateway) => gateway.id === deletedGateway.id)

        return [...(gateways ?? [])?.slice(0, index), ...(gateways ?? [])?.slice(index + 1)]
      })
    },
    onError: displayNotificationError,
    onSettled: () => {
      queryClient.invalidateQueries("gateways")
    },
  })

  return { removeGateway: mutate, isDeleting: isLoading, deletedGateway: data }
}

export { useDeleteGateway }
