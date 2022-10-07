import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import "./App.css"
import { HeaderApp, NotFoundView, SideBar } from "./commons"
import { Dashboard } from "./dashboard"
import { GatewayForm, GatewayFormEdit, GatewayList } from "./gateways"

const App = () => (
  <>
    <HeaderApp />
    <SideBar />
    <div data-testid="content" className="container-fluid">
      <div className="row">
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gateways" element={<GatewayList />}>
              <Route path="new" element={<GatewayForm />} />
              <Route path=":gatewayId" element={<GatewayFormEdit />} />
            </Route>
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </main>
      </div>
    </div>
    <ToastContainer autoClose={10000} theme={"light"} position={"bottom-left"} />
  </>
)

export default App
