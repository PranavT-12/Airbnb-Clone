import React from "react";

export default function Alert({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,
        width: "fit-content",
        maxWidth: "500px", // 👈 medium size
      }}
    >
      <div
        className={`alert alert-${type} alert-dismissible fade show text-center shadow`}
        role="alert"
        style={{
          fontSize: "1rem",
          padding: "10px 20px",
        }}
      >
        {message}
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
