import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user/register", {
        name,
        email,
        password
      });

      setMessage("Registration successful!");

      setTimeout(() => navigate("/login"), 1000);

    } catch (err) {
  console.log("Registration Error:", err);

  if (err.response) {
    const errorData = err.response.data;
    setMessage(
      typeof errorData === "string"
        ? errorData
        : errorData.msg || errorData.message || "Registration failed"
    );
  } else {
    setMessage("Server se connection nahi ho pa raha. Backend check karo.");
  }
    }
};

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>NoteSpace.</h1>
        <p className="subtitle">A little space for every thought.</p>

        <h2>Create Account</h2>
        <p>Start organizing your thoughts today.</p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {message && <p>{message}</p>}

          <button type="submit">Create Account</button>

        </form>

        <p className="switch">
          Already registered? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;