import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faServer } from "@fortawesome/free-solid-svg-icons"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { useResolvedPath, useMatch, Link } from "react-router-dom"
import { ReactNode } from "react"
import classnames from "classnames"

const SideBar: React.FC = () => (
  <nav data-testid="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div className="position-sticky pt-3 sidebar-sticky">
      <ul className="nav flex-column">
        <SideBarLink to="/" icon={faHouse}>
          Dashboard
        </SideBarLink>
        <SideBarLink to="/gateways" icon={faServer}>
          Gateways
        </SideBarLink>
      </ul>
    </div>
  </nav>
)

const SideBarLink: React.FC<SideBarLinkProps> = ({ to, icon, children }) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname })

  return (
    <li className="nav-item">
      <Link to={to} className={classnames("nav-link", { active: match })}>
        <span className="align-text-bottom">
          <FontAwesomeIcon icon={icon} />
        </span>
        {children}
      </Link>
    </li>
  )
}

type SideBarLinkProps = {
  to: string
  children: ReactNode
  icon: IconProp
}

export { SideBar }
