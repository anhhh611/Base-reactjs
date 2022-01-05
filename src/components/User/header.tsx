import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isProductDetail = location.pathname === '/product-details/1/Bonneville.html';
  const isHome = location.pathname === '/home';

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 header__logo">
            <a href="./home">
              <img src="https://freshdesignweb.com/demo/template/ustora/img/logo.png" alt="logo" />
            </a>
          </div>
        </div>
      </div>
      <div className="mainmenu-area">
        <div className="container">
          <div className="row">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className={`nav-item ${isHome ? 'active' : ''}`}>
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  {/* <li className={`nav-item ${isProductDetail ? 'active' : ''}`}>
                    <Link className="nav-link" to="/details/:id">
                      Product Details
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      checkout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      category
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      others
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/AdminPage">
                      Admin
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
