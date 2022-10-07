const HeaderApp: React.FC = () => (
  <header data-testid="header" className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/">
      Network
    </a>
    <input
      className="form-control form-control-dark w-100 rounded-0 border-0"
      type="text"
      placeholder="Search"
      aria-label="Search"
    />
  </header>
)

export { HeaderApp }
