import {
  read as clientRead,
  remove as clientRemove,
  search as clientSearch,
  patch as clientPatch,
  create as createClient,
} from "./client"

const useClient = () => {
  const read = <T>(endpoint: string, id: string) => clientRead<T>(endpoint, id)

  const search = <T>(endpoint: string, filters?: URLSearchParams) => clientSearch<T>(endpoint, filters)

  const remove = <T>(endpoint: string, id: string) => clientRemove<T>(endpoint, id)

  const patch = <T>(endpoint: string, id: string, body: Partial<T>) => clientPatch<T>(endpoint, id, body)

  const create = <T>(endpoint: string, body: T) => createClient<T>(endpoint, body)

  return { read, remove, search, patch, create }
}

export { useClient }
