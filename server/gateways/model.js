import mongoose from "mongoose"
import { isIPv4 } from "is-ip"
import { schema as device } from "../devices/index.js"

const schema = new mongoose.Schema(
  {
    id: {
      type: mongoose.ObjectId,
      index: true,
    },
    serial_number: { type: String, unique: true },
    name: String,
    ipv4: { type: String, unique: true, validate: (val) => isIPv4(val) },
    devices: [device],
  },
  { timestamps: true },
)

schema.method("toJSON", function () {
  const { __v, _id, ...rest } = this.toObject()
  const devices = rest.devices.map(({ _id, ...device }) => ({ ...device, id: _id }))

  return { ...rest, id: _id, devices }
})

const model = mongoose.model("Gateway", schema)

const isValidId = (id) => mongoose.isValidObjectId(id)

export { model, isValidId }
