function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg nav-bg">
            <div className="container-fluid">
                <button className="logo-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16"
                         height="16"
                         className="bi bi-exclude" viewBox="0 0 16 16">
                        <path
                            d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm12 2H5a1 1 0 0 0-1 1v7h7a1 1 0 0 0 1-1z"/>
                    </svg>
                </button>
                <a className="navbar-brand" href="src/App/App#">foobar_DT</a>
                <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse"
                     id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active"
                               aria-current="page"
                               href="src/App/App#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="src/App/App#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle"
                               href="src/App/App#"
                               role="button"
                               data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item"
                                       href="src/App/App#">Action</a></li>
                                <li><a className="dropdown-item"
                                       href="src/App/App#">Another
                                    action</a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"></hr>
                                </li>
                                <li><a className="dropdown-item"
                                       href="src/App/App#">Something
                                    else
                                    here</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search"
                               placeholder="Search"
                               aria-label="Search"></input>
                        <button className="btn btn-outline-success"
                                type="submit">Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>

    )
}

export default NavBar;