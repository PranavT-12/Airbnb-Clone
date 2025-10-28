


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Alert from "./Alert";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currUser, setCurrUser] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertType, setAlertType] = useState("success");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Navbar hide/show on scroll
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) setShow(false);
    else setShow(true);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // ✅ Update currUser state, ignore login/signup pages
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Disable search & Airbnb on login/signup pages
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setCurrUser(false);
    } else {
      setCurrUser(!!token);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrUser(false);
    setAlertType("info");
    setAlertMsg("Logged out successfully!");
    navigate("/signup");
    setTimeout(() => window.location.reload(), 1200);
  };

  // ✅ Search logic
  const handleSearch = (e) => {
    e.preventDefault();

    if (!currUser) {
      setAlertType("warning");
      setAlertMsg("Please login to use search!");
      return;
    }

    const query = searchQuery.trim();
    if (!query) {
      setAlertType("warning");
      setAlertMsg("Please enter a something to search!");
      return;
    }

    const listingsData = JSON.parse(localStorage.getItem("listings")) || [];
    const filtered = listingsData.filter((item) =>
      item.location.toLowerCase().includes(query.toLowerCase())
    );

    navigate("/search", { state: { results: filtered } });
    setSearchQuery(""); // ✅ clear search bar
  };

  return (
    <>
      <Alert message={alertMsg} type={alertType} onClose={() => setAlertMsg(null)} />

      <nav
        className={`navbar navbar-expand-md bg-body-light border-bottom ${
          show ? "navbar-show" : "navbar-hide"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/listings">
            <i className="fa-brands fa-airbnb text-danger fa-2x"></i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link className="nav-link fs-5" to="/listings">
                Explore
              </Link>
            </div>

            {/* ✅ Search Bar */}
            <div className="navbar-nav mx-auto">
              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2 rounded-pill search-inp"
                  type="search"
                  placeholder="Search destinations"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={!currUser} // ✅ disable if not logged in or on login/signup page
                />
                <button
                  className="btn search-btn"
                  type="submit"
                  disabled={!currUser} // ✅ disable if not logged in or on login/signup page
                >
                  Search
                </button>
              </form>
            </div>

            <div className="navbar-nav ms-auto">
              <Link
                className={`nav-link ${!currUser ? "disabled" : ""}`}
                to="/create-listing"
                onClick={(e) => !currUser && e.preventDefault()} // prevent click if not logged in
              >
                Airbnb your home
              </Link>

              {!currUser ? (
                <>
                  <Link className="nav-link" to="/signup">
                    <b>Sign up</b>
                  </Link>
                  <Link className="nav-link" to="/login">
                    <b>Log in</b>
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className="btn btn-link nav-link">
                  <b>Log out</b>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
