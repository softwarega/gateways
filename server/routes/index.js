import { Router } from "express"
import { routes as gatewaysRoutes } from "../gateways/index.js"

const router = Router()

// Just for have an easy route to check if the server is online
router.get("/", (_, res) => {
  res.send("OK")
})

// app routes
router.use("/gateways", gatewaysRoutes)

export { router }
