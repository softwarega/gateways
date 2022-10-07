export type Gateway = {
  id?: string
  serial_number: string
  name: string
  ipv4: string
  devices: Device[]
}

export type Device = {
  id?: string
  vendor: string
  status: number
  createdAt?: string
}

export type ApiError = Error & { cause: { message: string } }
