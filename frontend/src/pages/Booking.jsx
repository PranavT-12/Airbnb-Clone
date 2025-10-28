
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";

export default function Booking({ listings, setListings }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { title, location: place, image } = location.state || {};

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [alertMsg, setAlertMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show alert
    setAlertMsg(true);
    setTimeout(() => setShowAlert(false), 3000);

    // Clear form
    setFullName("");
    setEmail("");
    setCheckIn("");
    setCheckOut("");
    setGuests(1);
    setRating(0);
    setComment("");
  };

  // ✅ Delete Listing
  const handleDelete = () => {
    const updatedListings = listings.filter((l) => l.id !== parseInt(id));
    setListings(updatedListings);
    navigate("/listings");
  };

  if (!title) return <p>No listing selected.</p>;

  return (
    <>
      {/* <Alert message={alertMsg} type="success" onClose={() => setAlertMsg(null)} /> */}
      {/* Alert center-top */}
      <div
        className="position-fixed top-0 start-50 translate-middle-x mt-3 w-100"
        style={{ zIndex: 9999, width: "auto" }}
      >
        {alertMsg && (
          <Alert
            message={`Booking Confirmed for ${title || "this listing"}!`}
            type="success"
            onClose={() => setAlertMsg(false)}
          />
        )}
      </div>

      <div className="container mt-4">
        {/* Back Button */}
        <button
          className="btn btn-light mb-3"
          onClick={() => navigate(-1)}
          style={{ fontSize: "1.2rem" }}
        >
          ←
        </button>

        <h2>Book Your Stay {title ? `in ${place}` : ""}</h2>
        <p>Listing ID: {id}</p>

        {/* Listing Image */}
        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt={title}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Delete Listing */}
        <div className="mb-4">
          <button className="btn btn-danger me-2" onClick={handleDelete}>
            Delete Listing
          </button>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Check-in Date</label>
            <input
              type="date"
              className="form-control"
              required
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Check-out Date</label>
            <input
              type="date"
              className="form-control"
              required
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Guests</label>
            <input
              type="number"
              className="form-control"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            />
          </div>

          {/* Rating */}
          <div className="mb-3">
            <label className="form-label">Rating</label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: star <= rating ? "gold" : "lightgray",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-3">
            <label className="form-label">Comments</label>
            <textarea
              className="form-control"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
            />
          </div>

          <button type="submit" className="btn btn-danger mb-3">
            Reserve
          </button>
        </form>
      </div>
    </>
  );
}
