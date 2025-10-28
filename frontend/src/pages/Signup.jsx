

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [alertMsg, setAlertMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      localStorage.setItem("token", "dummyToken");
      setAlertMsg("✅ Signup successful!");
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 1200);
    } catch (err) {
      console.error(err);
      alert("❌ Signup failed. Try again.");
    }
  };

  return (
    <>
      <Alert message={alertMsg} type="success" onClose={() => setAlertMsg(null)} />
      <div className="container mt-3">
        <h1 className="text-center">Signup Now</h1>
        <div className="row">
          <div className="col-6 offset-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-success w-100 mb-5">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
