import { Router } from "express"
import { getAllGateways, getGatewayById, createGateway, updateGateway, deleteGateway } from "./controller.js"

const router = Router()

// get all gateways
router.get("/", async (_, res) => {
  try {
    const gateways = await getAllGateways()

    res.status(200).json(gateways)
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

// create a new gateway
router.post("/", async ({ body }, res) => {
  try {
    if (!Object.keys(body).length) {
      res.status(400).json({ message: "No data provided" })
    } else {
      const gateway = await createGateway(body)

      if (gateway) {
        res.status(200).json(gateway)
      } else {
        res.status(500).json({ message: "Something went wrong trying to create a gateway" })
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

// get a gateway by ID
router.get("/:id", async ({ params: { id } }, res) => {
  try {
    if (!id) {
      res.status(400).json({ message: "Param ID is missing" })
    }

    const gateway = await getGatewayById(id)

    if (gateway) {
      res.status(200).json(gateway)
    } else {
      res.status(404).json({ message: `Gateway with ID ${id} not found` })
    }
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

// update a gateway
router.patch("/:id", async ({ params: { id }, body }, res) => {
  if (!id) {
    res.status(400).json({ message: "Param ID is missing" })
  } else if (!Object.keys(body).length) {
    res.status(400).json({ message: "No data provided" })
  } else {
    try {
      const data = await updateGateway(id, body)

      if (!data) {
        res.status(404).json({ message: `Gateway with ID ${id} not found` })
      } else {
        res.status(200).json(data)
      }
    } catch ({ message }) {
      res.status(500).json({ message })
    }
  }
})

// delete a gateway
router.delete("/:id", async ({ params: { id } }, res) => {
  if (!id) {
    res.status(400).json({ message: "Param ID is missing" })
  } else {
    try {
      const data = await deleteGateway(id)

      if (!data) {
        res.status(404).json({ message: `Gateway with ID ${id} not found` })
      } else {
        res.status(200).json(data)
      }
    } catch ({ message }) {
      res.status(500).json({ message })
    }
  }
})

export { router as routes }
