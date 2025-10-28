
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "../components/Alert";

export default function CreateListing({ listings, setListings }) {
  const navigate = useNavigate();
  const location = useLocation();

  const editListing = location.state || null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("India");
  const [locationInput, setLocationInput] = useState("");
  const [alertMsg, setAlertMsg] = useState(null);

  useEffect(() => {
    if (editListing) {
      setTitle(editListing.title || "");
      setDescription(editListing.description || "");
      setImage(editListing.image || null);
      setPrice(editListing.price || "");
      setCountry(editListing.country || "India");
      setLocationInput(editListing.location || "");
    }
  }, [editListing]);

  // ✅ File ko Base64 me convert karna
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editListing) {
      const updatedListings = listings.map((l) =>
        l.id === editListing.id
          ? {
              ...l,
              title,
              description,
              image: image || l.image,
              price,
              country,
              location: locationInput,
            }
          : l
      );
      setListings(updatedListings);
      setAlertMsg(`✏️ Listing "${title}" updated successfully!`);
    } else {
      const newListing = {
        id: listings.length + 1,
        title,
        description,
        image: image || "",
        price,
        country,
        location: locationInput,
      };
      setListings([...listings, newListing]);
      setAlertMsg(`✅ Listing "${title}" created successfully!`);
    }

    setTitle("");
    setDescription("");
    setImage(null);
    setPrice("");
    setCountry("India");
    setLocationInput("");

    navigate("/listings");
  };

  return (
    <>
      <Alert message={alertMsg} type="success" onClose={() => setAlertMsg(null)} />
      <div className="container mt-4">
        <button
          className="btn btn-light mb-3"
          onClick={() => navigate(-1)}
          style={{ fontSize: "1.2rem" }}
        >
          ←
        </button>

        <h2>{editListing ? "Edit Listing" : "Create a New Listing"}</h2>

        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a catchy title"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageUpload}
              required={!editListing}
            />
          </div>

          {image && (
            <div className="mb-3">
              <img
                src={image}
                alt="Preview"
                style={{ width: "200px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}

          <div className="row">
            <div className="mb-3 col-md-4">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1200"
                required
              />
            </div>

            <div className="mb-3 col-md-8">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="India"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Jaipur, Rajasthan"
              required
            />
          </div>

          <button type="submit" className="btn btn-dark mt-3 mb-3">
            {editListing ? "Update Listing" : "Create Listing"}
          </button>
        </form>
      </div>
    </>
  );
}

