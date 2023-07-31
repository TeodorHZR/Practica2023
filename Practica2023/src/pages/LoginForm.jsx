import React, { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("https://localhost:7170/api/Admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        setError("Date de autentificare invalide");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/admin/home";
    } catch (error) {
      setError("A aparut o eroare la autentificare. Va rugam sa incercati din nou.");
    }
  };

  return (
    <div>
      <h2>Logare</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nume utilizator</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Parola</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Autentificare
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
