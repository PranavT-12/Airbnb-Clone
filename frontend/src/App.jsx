
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Listings from "./pages/Listings";
import Booking from "./pages/Booking";
import CreateListing from "./pages/CreateListing";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SearchResults from "./pages/searchResult";


function App() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 3000); // 3s alert
  };

  // 🔹 Load listings from localStorage or fetch from Pexels
  useEffect(() => {
    const savedListings = localStorage.getItem("listings");

    if (savedListings) {
      setListings(JSON.parse(savedListings));
      setLoading(false);
    } else {
      const fetchListings = async () => {
        try {
          const cities = ["Mumbai", "Pune"];
          let allListings = [];

          for (const city of cities) {
            const res = await fetch(
              `https://api.pexels.com/v1/search?query=${city}+apartment+interior&per_page=9`,
              {
                headers: {
                  Authorization:
                    "QuRNrVMNj7HXdi8feWjnfQFWZjqRkJoTnFZzZNa4OWPCIob5RUMxvN7w",
                },
              }
            );
            const data = await res.json();

            const cityListings = data.photos.map((item, index) => ({
              id: allListings.length + index + 1,
              title:
                item.alt ||
                `Beautiful Apartment Interior #${allListings.length + index + 1}`,
              location: city,
              price: (Math.floor(Math.random() * 5000) + 1500).toLocaleString(),
              image: item.src.large,
            }));

            allListings = [...allListings, ...cityListings];
          }

          setListings(allListings);
          localStorage.setItem("listings", JSON.stringify(allListings)); // save initial fetch
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchListings();
    }
  }, []);

  // 🔹 Whenever listings change → update localStorage
  useEffect(() => {
    if (listings.length > 0) {
      localStorage.setItem("listings", JSON.stringify(listings));
    }
  }, [listings]);

  return (
    <BrowserRouter>
      <Navbar currUser={false} />

      {/* Global Alert */}
      <div
        className="position-fixed top-0 start-50 translate-middle-x mt-3"
        style={{ zIndex: 9999, width: "auto" }}
      >
        {alertMessage && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlertMessage("")}
            ></button>
          </div>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/listings" replace />} />
        <Route
          path="/listings"
          element={<Listings listings={listings} loading={loading} />}
        />
        <Route
          path="/book/:id"
          element={
            <Booking
              listings={listings}
              setListings={setListings}
              showAlert={showAlert}
            />
          }
        />
        <Route
          path="/create-listing"
          element={
            <CreateListing
              listings={listings}
              setListings={setListings}
              showAlert={showAlert}
            />
          }
        />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResults />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;





