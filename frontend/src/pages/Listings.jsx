

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Listings({ listings, loading }) {
  const navigate = useNavigate();

  const handleBookNow = (listing) => {

    navigate(`/book/${listing.id}`, {
      state: {
        title: listing.title,
        location: listing.location,
        image: listing.image,
      },
    });
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup"); // agar login nahi hai to login page bhej do
    }
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Destinations</h2>
      <div className="row">
        {listings.map((listing) => (
          <div className="col-md-4 mb-4" key={listing.id}>
            <div className="card shadow-sm h-100">
              <img
                src={listing.image}
                className="card-img-top listing-img"
                alt={listing.title}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{listing.title}</h5>
                  <p className="card-text text-muted">{listing.location}</p>
                </div>
                <div>
                  <p className="card-text mb-2">
                    <strong>₹{listing.price} / night</strong>
                  </p>
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => handleBookNow(listing)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

