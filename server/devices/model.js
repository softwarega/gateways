import mongoose from "mongoose"

const schema = mongoose.Schema(
  {
    id: { type: mongoose.ObjectId, index: true },
    vendor: String,
    status: Number,
  },
  { timestamps: true },
)

schema.method("toJSON", function () {
  const { __v, _id, ...rest } = this.toObject()

  return { ...rest, id: _id }
})

const model = mongoose.model("Device", schema)

const isValidId = (id) => mongoose.isValidObjectId(id)

export { model, isValidId, schema }
