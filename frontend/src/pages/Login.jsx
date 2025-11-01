import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      // ✅ Use environment variable for backend URL
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;

      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);

      // ✅ Set token
      localStorage.setItem("token", "dummyToken");

      // ✅ Notify Navbar about token change
      window.dispatchEvent(new Event("tokenChange"));

      setAlertMsg("✅ Login successful!");

      // ✅ Navigate without reload
      setTimeout(() => {
        navigate("/listings");
      }, 1200);
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "❌ Login failed.");
    }
  };

  return (
    <>
      <Alert message={alertMsg} type="success" onClose={() => setAlertMsg(null)} />
      <div className="container mt-3">
        <h1 className="text-center">Login</h1>
        <div className="row">
          <div className="col-6 offset-3">
            <form onSubmit={handleSubmit}>
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

              <button className="btn btn-success w-100 mb-5">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
