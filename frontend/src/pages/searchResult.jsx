
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Navbar से भेजे गए filtered listings yaha milenge
  const { results = [] } = location.state || {};

  const handleBookNow = (listing) => {
    navigate(`/book/${listing.id}`, {
      state: {
        title: listing.title,
        location: listing.location,
        image: listing.image,
      },
    });
  };

  if (results.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>No listings found 😔</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <button
        className="btn btn-light mb-3"
        onClick={() => navigate(-1)}
        style={{ fontSize: "1.2rem" }}
      >
        ←
      </button>
      <h3 className="mb-4">Search Results</h3>
      <div className="row">
        {results.map((listing) => (
          <div className="col-md-4 col-lg-3 mb-4" key={listing._id || listing.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={listing.image || listing.img || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt={listing.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{listing.title}</h5>
                <p className="card-text text-muted">{listing.location}</p>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => handleBookNow(listing)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
