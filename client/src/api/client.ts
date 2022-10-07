const apiUrl = "http://localhost:5000"

const client = async (endpoint: string, { method, body, headers: customHeaders, ...customConfig }: RequestInit) => {
  const config = {
    method,
    body,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...customHeaders,
    },
    ...customConfig,
  }
  const response = await fetch(`${apiUrl}/${endpoint}`, config)

  const data = await response.json()

  if (response.ok) {
    return data
  } else {
    throw new Error(response.statusText, { cause: { name: response.status, message: data.message } })
  }
}

const search = async <T>(endpoint: string, filters?: URLSearchParams, signal?: AbortSignal) => {
  const data = await client(`${endpoint}${filters ? `?${filters}` : ""}`, {
    method: "GET",
    signal,
  })

  return data as T
}

const read = async <T>(endpoint: string, id: string, signal?: AbortSignal) => {
  const data = await client(`${endpoint}/${id}`, {
    method: "GET",
    signal,
  })

  return data as T
}

const remove = async <T>(endpoint: string, id: string) => {
  const data = await client(`${endpoint}/${id}`, {
    method: "DELETE",
  })

  return data as T
}

const patch = async <T>(endpoint: string, id: string, body: Partial<T>) => {
  const data = await client(`${endpoint}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })

  return data as T
}

const create = async <T>(endpoint: string, body: T) => {
  const data = await client(`${endpoint}`, { method: "POST", body: JSON.stringify(body) })

  return data as T
}

export { read, remove, search, patch, create }
