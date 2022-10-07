import React, { Suspense } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import "bootstrap/dist/css/bootstrap.css"
import "react-toastify/dist/ReactToastify.css"

import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Loading } from "./commons"

const container = document.getElementById("root")
const root = createRoot(container as HTMLElement)

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
