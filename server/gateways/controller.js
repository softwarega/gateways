import { isIPv4 } from "is-ip"
import { model, isValidId } from "./model.js"

const getAllGateways = async () => {
  try {
    const gateways = await model.find()

    return gateways
  } catch (error) {
    throw error
  }
}

const getGatewayById = async (id) => {
  if (!isValidId(id)) {
    throw new Error(`No valid id is provided, ${id}`)
  }

  try {
    const gateway = await model.findById(id)

    return gateway
  } catch (error) {
    throw error
  }
}

const createGateway = async (data) => {
  const gateway = new model({
    ...data,
  })

  if (!isIPv4(data.ipv4)) {
    throw new Error(`No valid IPv4 provided, ${data.ipv4}`)
  }

  if (data.devices.length > 10) {
    throw new Error("No more capacity, the max capacity for devices allowed is 10 per gateway")
  }

  try {
    const result = await model.find({ ipv4: data.ipv4 })

    if (result.length) {
      throw new Error(`The IP adderess '${data.ipv4}' has already been assigned to gateway '${result[0].name}'`)
    }

    return gateway.save()
  } catch (error) {
    throw error
  }
}

const updateGateway = async (id, data) => {
  const options = { new: true }

  if (!isValidId(id)) {
    throw new Error(`No valid id provided, ${id}`)
  }

  if (!isIPv4(data.ipv4)) {
    throw new Error(`No valid IPv4 provided, ${data.ipv4}`)
  }

  if (data.devices.length > 10) {
    throw new Error("No more capacity, the max capacity for devices allowed is 10 per gateway")
  }

  try {
    const result = await model.find({ ipv4: data.ipv4 })

    if (result.length && result[0]._id.toString() !== id) {
      throw new Error(`The IP adderess '${data.ipv4}' has already been assigned to gateway '${result[0].name}'`)
    }

    return model.findByIdAndUpdate(id, data, options)
  } catch (error) {
    throw error
  }
}

const deleteGateway = async (id) => {
  if (!isValidId(id)) {
    throw new Error(`No valid id is provided, ${id}`)
  }

  try {
    return model.findByIdAndDelete(id)
  } catch (error) {
    throw error
  }
}

export { getAllGateways, getGatewayById, createGateway, updateGateway, deleteGateway }
